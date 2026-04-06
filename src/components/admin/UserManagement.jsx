import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, UserCheck, Shield, Calendar, Building, Mail, Layers } from 'lucide-react';
import { planDefinitions } from '@/components/admin/PlanManagement';

import UserManagementStats from '@/components/admin/user/UserManagementStats';
import UserManagementTabs from '@/components/admin/user/UserManagementTabs';
import CreateUserDialog from '@/components/admin/user/CreateUserDialog';
import UserPermissionsDialog from '@/components/admin/user/UserPermissionsDialog';
import UserActionsMenu from '@/components/admin/user/UserActionsMenu';
import EditUserDialog from '@/components/admin/user/EditUserDialog';

const UserManagement = () => {
  const { toast } = useToast();
  const [userProfiles, setUserProfiles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    adminUsers: 0,
    recentSignups: 0
  });

  const calculateStats = (profiles, adminUsersData) => {
    const totalUsers = profiles?.length || 0;
    const adminUsers = adminUsersData?.length || 0;
    const recentSignups = profiles?.filter(user => {
      const createdAt = new Date(user.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return createdAt > weekAgo;
    }).length || 0;

    setStats({
      totalUsers,
      activeUsers: totalUsers,
      adminUsers,
      recentSignups
    });
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      
      const [profilesRes, permsRes, subsRes, adminRes, modulesRes] = await Promise.all([
        supabase.from('user_profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('user_permissions').select('*'),
        supabase.from('subscriptions').select('*'),
        supabase.from('admin_users').select('*'),
        supabase.from('security_suite_modules').select('*')
      ]);

      if (profilesRes.error) throw profilesRes.error;
      if (permsRes.error) throw permsRes.error;
      if (subsRes.error) throw subsRes.error;
      if (adminRes.error) throw adminRes.error;
      if (modulesRes.error) throw modulesRes.error;

      const profilesData = profilesRes.data || [];
      setUserProfiles(profilesData);
      setPermissions(permsRes.data || []);
      setSubscriptions(subsRes.data || []);
      setModules(modulesRes.data || []);
      calculateStats(profilesData, adminRes.data);

    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user management data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadData();

    const channel = supabase
      .channel('public:user_profiles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_profiles' }, (payload) => {
        console.log('Realtime user_profiles change received!', payload);
        loadData();
        toast({
          title: 'User List Updated',
          description: 'The user list has been updated in real-time.',
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadData, toast]);

  const grantModuleAccess = async (userId, moduleKey) => {
    const module = modules.find(m => m.module_key === moduleKey);
    if (!module) return;

    await supabase.from('user_module_access').upsert({
      user_id: userId,
      module_id: module.id,
      access_level: 'read'
    }, { onConflict: 'user_id, module_id' });
  };

  const revokeModuleAccess = async (userId, moduleKey) => {
    const module = modules.find(m => m.module_key === moduleKey);
    if (!module) return;

    await supabase.from('user_module_access').delete()
      .eq('user_id', userId)
      .eq('module_id', module.id);
  };

  const assignPlan = async (userId, planId) => {
    try {
      if (!userId) throw new Error("User ID is missing.");
      const plan = planDefinitions.find(p => p.id === planId);
      if (!plan) throw new Error("Plan definition not found.");

      const { error } = await supabase
        .from('subscriptions')
        .insert({ user_id: userId, plan_id: planId, status: 'active' });

      if (error) {
        if (error.message.includes("schema cache")) {
          toast({ title: 'Schema Updated', description: 'Database schema has been updated. Please try again.', variant: 'default' });
          setTimeout(() => window.location.reload(), 2000);
        }
        throw error;
      }
      
      const moduleKeysToGrant = plan.included_modules;
      if (moduleKeysToGrant.includes('all')) {
        for (const module of modules) {
          await grantModuleAccess(userId, module.module_key);
        }
      } else {
        for (const moduleKey of moduleKeysToGrant) {
          await grantModuleAccess(userId, moduleKey);
        }
      }

      toast({ title: 'Plan Assigned', description: 'The plan and relevant modules have been assigned.' });
      loadData();
    } catch (error) {
      console.error('Error assigning plan:', error);
      toast({ title: 'Error', description: error.message || 'Failed to assign plan.', variant: 'destructive' });
    }
  };

  const revokePlan = async (subscriptionId) => {
    try {
      const { data: subData, error: subError } = await supabase.from('subscriptions').select('*').eq('id', subscriptionId).single();
      if (subError || !subData) throw subError || new Error("Subscription not found");

      const plan = planDefinitions.find(p => p.id === subData.plan_id);
      if(!plan) throw new Error("Plan definition not found");
      
      const { error } = await supabase.from('subscriptions').delete().eq('id', subscriptionId);
      if (error) throw error;

      const moduleKeysToRevoke = plan.included_modules;
      if (moduleKeysToRevoke.includes('all')) {
          for (const module of modules) {
              await revokeModuleAccess(subData.user_id, module.module_key);
          }
      } else {
          for (const moduleKey of moduleKeysToRevoke) {
              await revokeModuleAccess(subData.user_id, moduleKey);
          }
      }

      toast({ title: 'Plan Revoked', description: 'The plan and module access have been revoked.' });
      loadData();
    } catch (error) {
      console.error('Error revoking plan:', error);
      toast({ title: 'Error', description: error.message || 'Failed to revoke plan.', variant: 'destructive' });
    }
  };

  const handlePermissionsClick = (user) => {
    setSelectedUser(user);
    setPermissionsDialogOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditUserDialogOpen(true);
  };

  const filteredUsers = userProfiles.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.company?.toLowerCase().includes(searchLower) ||
      user.position?.toLowerCase().includes(searchLower)
    );
  });

  const getUserSubscriptions = (userId) => {
    if (!userId) return [];
    return subscriptions.filter(sub => sub.user_id === userId);
  };
  
  const getUserPermissions = (userId) => {
    if (!userId) return [];
    return permissions.filter(perm => perm.user_id === userId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
        <p className="text-slate-600">Manage user profiles, plans, and permissions.</p>
      </div>

      <UserManagementStats stats={stats} />

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name, email, company, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <CreateUserDialog onUserCreated={loadData} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-0">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Users ({filteredUsers.length})</h3>
              <p className="text-sm text-gray-600">Click a user to manage their details.</p>
            </div>
            <div className="max-h-[30rem] overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No users found matching your criteria.
                </div>
              ) : (
                filteredUsers.map((user) => {
                  const userSubs = getUserSubscriptions(user.user_id);
                  const userPerms = getUserPermissions(user.user_id);
                  
                  return (
                    <div
                      key={user.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => setSelectedUser(user)}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-slate-800">{user.full_name || user.email || 'Unnamed User'}</h3>
                            <Badge className="text-xs bg-green-100 text-green-800">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          </div>
                          
                          {user.email && (
                            <p className="text-sm text-blue-600 mb-1 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {user.email}
                            </p>
                          )}
                          
                          {user.company && (
                            <p className="text-sm text-gray-600 mb-1 flex items-center">
                              <Building className="h-3 w-3 mr-1" />
                              {user.company}
                            </p>
                          )}
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-400 mt-2">
                            <span className="flex items-center">
                              <Layers className="h-3 w-3 mr-1" />
                              {userSubs.length} Plans/Services
                            </span>
                            <span className="flex items-center">
                              <Shield className="h-3 w-3 mr-1" />
                              {userPerms.length} Permissions
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(user.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <UserActionsMenu 
                          user={user} 
                          onUserUpdated={loadData}
                          onPermissionsClick={handlePermissionsClick}
                          onEditClick={handleEditClick}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
        
        <UserManagementTabs
          selectedUser={selectedUser}
          plans={planDefinitions}
          getUserSubscriptions={getUserSubscriptions}
          getUserPermissions={getUserPermissions}
          assignPlan={assignPlan}
          revokePlan={revokePlan}
        />
      </div>

      <UserPermissionsDialog
        user={selectedUser}
        open={permissionsDialogOpen}
        onOpenChange={setPermissionsDialogOpen}
        onPermissionsUpdated={loadData}
      />
      <EditUserDialog
        user={selectedUser}
        open={editUserDialogOpen}
        onOpenChange={setEditUserDialogOpen}
        onUserUpdated={() => {
          loadData();
          if (selectedUser) {
            const updatedUser = userProfiles.find(p => p.id === selectedUser.id);
            setSelectedUser(updatedUser || null);
          }
        }}
      />
    </div>
  );
};

export default UserManagement;