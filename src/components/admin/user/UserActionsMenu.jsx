import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { MoreVertical, Shield, ShieldOff, UserX, UserCheck, Edit, Trash2, Key } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import PasswordManagement from '@/components/admin/user/PasswordManagement';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const UserActionsMenu = ({ user, onUserUpdated, onPermissionsClick, onEditClick }) => {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const isSuperAdmin = currentUser?.email?.toLowerCase() === 'gazc@cy-sec.co.uk' || 
                      currentUser?.email?.toLowerCase() === 'aimeec@cy-sec.co.uk';

  const toggleUserStatus = async (newStatus) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ 
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'User Status Updated',
        description: `User has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`,
      });
      
      onUserUpdated?.();
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user status.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    const userConfirmed = window.confirm(`Are you sure you want to delete ${user.full_name}? This action cannot be undone.`);
    
    if (!userConfirmed) {
      return;
    }

    try {
      setLoading(true);
      
      const userIdToDelete = user.user_id || user.id;
      
      await supabase.from('user_permissions').delete().eq('user_id', userIdToDelete);
      await supabase.from('user_module_access').delete().eq('user_id', userIdToDelete);
      await supabase.from('admin_users').delete().eq('user_id', userIdToDelete);
      await supabase.from('user_roles').delete().eq('user_id', userIdToDelete);
      
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'User Deleted',
        description: `${user.full_name} has been removed from the system.`,
      });
      
      onUserUpdated?.();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const makeAdmin = async () => {
    try {
      setLoading(true);
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      const userIdToUpdate = user.user_id || user.id;
      
      const { error } = await supabase
        .from('admin_users')
        .upsert({
          user_id: userIdToUpdate,
          email: user.full_name,
          role: 'admin',
          permissions: {
            user_management: true,
            analytics: true,
            contact_management: true
          }
        });

      if (error) throw error;

      await supabase
        .from('user_permissions')
        .upsert({
          user_id: userIdToUpdate,
          permission_type: 'user_management',
          permission_value: 'granted',
          granted_by: currentUser?.id
        });

      toast({
        title: 'Admin Role Granted',
        description: `${user.full_name} is now an administrator.`,
      });
      
      onUserUpdated?.();
    } catch (error) {
      console.error('Error making admin:', error);
      toast({
        title: 'Error',
        description: 'Failed to grant admin role.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {isSuperAdmin && (
        <PasswordManagement user={user} currentUser={currentUser} />
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" disabled={loading}>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>User Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => onPermissionsClick?.(user)}>
            <Shield className="h-4 w-4 mr-2" />
            Manage Permissions
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => onEditClick?.(user)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={makeAdmin}>
            <Shield className="h-4 w-4 mr-2" />
            Make Administrator
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => toggleUserStatus('inactive')}>
            <UserX className="h-4 w-4 mr-2" />
            Deactivate User
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={deleteUser}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserActionsMenu;