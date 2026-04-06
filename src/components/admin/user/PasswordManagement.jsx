import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Key, Shield, AlertTriangle, Eye, EyeOff } from 'lucide-react';

const PasswordManagement = ({ user, currentUser }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const isSuperAdmin = currentUser?.email?.toLowerCase() === 'gazc@cy-sec.co.uk' || 
                      currentUser?.email?.toLowerCase() === 'aimeec@cy-sec.co.uk';

  if (!isSuperAdmin) {
    return null;
  }

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, newPassword: password, confirmPassword: password }));
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      errors: [
        ...(password.length < minLength ? ['At least 8 characters'] : []),
        ...(!hasUpperCase ? ['One uppercase letter'] : []),
        ...(!hasLowerCase ? ['One lowercase letter'] : []),
        ...(!hasNumbers ? ['One number'] : []),
        ...(!hasSpecialChar ? ['One special character'] : [])
      ]
    };
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    const validation = validatePassword(formData.newPassword);
    if (!validation.isValid) {
      toast({
        title: 'Invalid Password',
        description: `Password must include: ${validation.errors.join(', ')}`,
        variant: 'destructive',
      });
      return;
    }

    const userConfirmed = window.confirm(
      `Are you sure you want to change the password for ${user.full_name || user.email}? This action cannot be undone.`
    );

    if (!userConfirmed) {
      return;
    }

    const userIdToUpdate = user.user_id;
    if (!userIdToUpdate) {
      toast({
        title: 'Password Change Failed',
        description: 'This user profile is not linked to an authentication account.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.functions.invoke('admin-password-reset', {
        body: JSON.stringify({
          userId: userIdToUpdate,
          newPassword: formData.newPassword,
          adminEmail: currentUser.email
        })
      });

      if (error) throw error;

      toast({
        title: 'Password Changed Successfully',
        description: `Password has been updated for ${user.full_name || user.email}.`,
      });

      setFormData({ newPassword: '', confirmPassword: '' });
      setOpen(false);

    } catch (error) {
      console.error('Error changing password:', error);
      
      let description = error.message;
      if (error.context && typeof error.context.json === 'function') {
        try {
          const functionError = await error.context.json();
          description = functionError.error || description;
        } catch (e) {
          description = "Could not parse error response from function.";
        }
      }
      
      toast({
        title: 'Password Change Failed',
        description: description,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const passwordValidation = validatePassword(formData.newPassword);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
          <Key className="h-3 w-3 mr-1" />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-orange-600" />
            Change User Password
          </DialogTitle>
          <DialogDescription>
            Change the password for <strong>{user.full_name || user.email}</strong>. 
            This action will immediately update their login credentials.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Super Admin Action</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Only super administrators can change user passwords. This action is logged for security purposes.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                placeholder="Enter new password"
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
            
            {formData.newPassword && (
              <div className="space-y-1">
                <p className="text-xs text-gray-600">Password requirements:</p>
                <div className="flex flex-wrap gap-1">
                  {passwordValidation.errors.map((error, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                      {error}
                    </Badge>
                  ))}
                  {passwordValidation.isValid && (
                    <Badge className="text-xs bg-green-100 text-green-800">
                      Password meets all requirements
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="Confirm new password"
              required
            />
            {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
              <p className="text-xs text-red-600">Passwords do not match</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={generateRandomPassword}
              size="sm"
            >
              Generate Random Password
            </Button>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !passwordValidation.isValid || formData.newPassword !== formData.confirmPassword}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordManagement;