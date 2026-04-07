import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Shield, Check, X, Plus, Trash2 } from 'lucide-react';

const UserPermissionsDialog = ({ user, open, onOpenChange, onPermissionsUpdated }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [availablePermissions] = useState([
    { type: 'user_management', label: 'User Management', description: 'Create, edit, and manage user accounts' },
    { type: 'module_management', label: 'Module Management', description: 'Manage FortifyOne GRC platform modules' },
    { type: 'system_admin', label: 'System Administration', description: 'Full system administrative access' },
    { type: 'analytics', label: 'Analytics Access', description: 'View analytics and reports' },
    { type: 'contact_management', label: 'Contact Management', description: 'Manage contact form submissions' },
    { type: 'compliance_admin', label: 'Compliance Administration', description: 'Manage compliance frameworks and questions' },
    { type: 'vendor_admin', label: 'Vendor Administration', description: 'Manage vendor risk assessments' },
    { type: 'reports_admin', label: 'Reports Administration', description: 'Generate and manage security reports' }
  ]);

  useEffect(() => {
    if (user && open) {
      loadUserPermissions();
    }
  }, [user, open]);

  const loadUserPermissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_permissions')
        .select('*')
        .eq('user_id', user.user_id);

      if (error) throw error;
      setPermissions(data || []);
    } catch (error) {
      console.error('Error loading permissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user permissions.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const grantPermission = async (permissionType) => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      const { error } = await supabase
        .from('user_permissions')
        .insert({
          user_id: user.user_id,
          permission_type: permissionType,
          permission_value: 'granted',
          granted_by: currentUser?.id
        });

      if (error) throw error;
      
      toast({
        title: 'Permission Granted',
        description: `${permissionType.replace('_', ' ')} permission has been granted.`,
      });
      
      loadUserPermissions();
      onPermissionsUpdated?.();
    } catch (error) {
      console.error('Error granting permission:', error);
      toast({
        title: 'Error',
        description: 'Failed to grant permission.',
        variant: 'destructive',
      });
    }
  };

  const revokePermission = async (permissionId) => {
    try {
      const { error } = await supabase
        .from('user_permissions')
        .delete()
        .eq('id', permissionId);

      if (error) throw error;
      
      toast({
        title: 'Permission Revoked',
        description: 'Permission has been revoked successfully.',
      });
      
      loadUserPermissions();
      onPermissionsUpdated?.();
    } catch (error) {
      console.error('Error revoking permission:', error);
      toast({
        title: 'Error',
        description: 'Failed to revoke permission.',
        variant: 'destructive',
      });
    }
  };

  const makeAdmin = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      const { error: adminError } = await supabase
        .from('admin_users')
        .upsert({
          user_id: user.user_id,
          email: user.full_name,
          role: 'admin',
          permissions: {
            user_management: true,
            module_management: false,
            system_admin: false,
            analytics: true,
            contact_management: true
          }
        });

      if (adminError) throw adminError;

      const adminPermissions = [
        'user_management',
        'analytics',
        'contact_management'
      ];

      for (const perm of adminPermissions) {
        await supabase
          .from('user_permissions')
          .upsert({
            user_id: user.user_id,
            permission_type: perm,
            permission_value: 'granted',
            granted_by: currentUser?.id
          });
      }

      toast({
        title: 'Admin Role Granted',
        description: `${user.full_name} has been granted administrator privileges.`,
      });
      
      loadUserPermissions();
      onPermissionsUpdated?.();
    } catch (error) {
      console.error('Error making admin:', error);
      toast({
        title: 'Error',
        description: 'Failed to grant admin role.',
        variant: 'destructive',
      });
    }
  };

  const removeAdmin = async () => {
    try {
      const { error: adminError } = await supabase
        .from('admin_users')
        .delete()
        .eq('user_id', user.user_id);

      if (adminError) throw adminError;

      const { error: permError } = await supabase
        .from('user_permissions')
        .delete()
        .eq('user_id', user.user_id);

      if (permError) throw permError;

      toast({
        title: 'Admin Role Removed',
        description: `${user.full_name} is no longer an administrator.`,
      });
      
      loadUserPermissions();
      onPermissionsUpdated?.();
    } catch (error) {
      console.error('Error removing admin:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove admin role.',
        variant: 'destructive',
      });
    }
  };

  if (!user) return null;

  const userPermissionTypes = permissions.map(p => p.permission_type);
  const isAdmin = permissions.some(p => p.permission_type === 'user_management');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            Manage Permissions: {user.full_name}
          </DialogTitle>
          <DialogDescription>
            Grant or revoke specific permissions for this user account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Administrator Status</h4>
              <p className="text-sm text-gray-600">
                {isAdmin ? 'This user has administrator privileges' : 'This user is a standard user'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {isAdmin ? (
                <Badge className="bg-green-100 text-green-800">Administrator</Badge>
              ) : (
                <Badge className="bg-gray-100 text-gray-800">Standard User</Badge>
              )}
              <Button
                size="sm"
                variant={isAdmin ? "destructive" : "default"}
                onClick={isAdmin ? removeAdmin : makeAdmin}
                disabled={loading}
              >
                {isAdmin ? 'Remove Admin' : 'Make Admin'}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Current Permissions</h4>
            {permissions.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <Shield className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p>No special permissions assigned</p>
              </div>
            ) : (
              <div className="space-y-2">
                {permissions.map((permission) => {
                  const permInfo = availablePermissions.find(p => p.type === permission.permission_type);
                  return (
                    <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium text-sm">
                          {permInfo?.label || permission.permission_type}
                        </h5>
                        <p className="text-xs text-gray-500">
                          {permInfo?.description || 'Custom permission'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Granted: {new Date(permission.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => revokePermission(permission.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={loading}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Revoke
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-4">Available Permissions</h4>
            <div className="space-y-2">
              {availablePermissions.map((permission) => {
                const hasPermission = userPermissionTypes.includes(permission.type);
                return (
                  <div key={permission.type} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50/50">
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{permission.label}</h5>
                      <p className="text-xs text-gray-500">{permission.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {hasPermission ? (
                        <Badge className="text-xs bg-green-100 text-green-800">
                          <Check className="h-3 w-3 mr-1" />
                          Granted
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => grantPermission(permission.type)}
                          disabled={loading}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Grant
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserPermissionsDialog;