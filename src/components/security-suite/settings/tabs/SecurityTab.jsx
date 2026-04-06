import React, { useState } from 'react';
import { Key, Shield, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const SecurityTab = ({ securitySettings, setSecuritySettings, loading, updatePassword }) => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const handlePasswordUpdate = async () => {
    const success = await updatePassword(passwordData);
    if (success) {
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current_password">Current Password</Label>
            <div className="relative">
              <Input
                id="current_password"
                type={showPassword ? "text" : "password"}
                value={passwordData.current_password}
                onChange={(e) => setPasswordData(prev => ({ ...prev, current_password: e.target.value }))}
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new_password">New Password</Label>
              <Input
                id="new_password"
                type="password"
                value={passwordData.new_password}
                onChange={(e) => setPasswordData(prev => ({ ...prev, new_password: e.target.value }))}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm New Password</Label>
              <Input
                id="confirm_password"
                type="password"
                value={passwordData.confirm_password}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirm_password: e.target.value }))}
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handlePasswordUpdate} disabled={loading}>
              <Key className="h-4 w-4 mr-2" />
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-slate-600">
                {securitySettings.two_factor_enabled 
                  ? 'Your account is protected with 2FA' 
                  : 'Enable 2FA for enhanced security'
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={securitySettings.two_factor_enabled ? 'default' : 'secondary'}>
                {securitySettings.two_factor_enabled ? 'Enabled' : 'Disabled'}
              </Badge>
              <Button 
                variant={securitySettings.two_factor_enabled ? 'destructive' : 'default'}
                onClick={() => {
                  setSecuritySettings(prev => ({ ...prev, two_factor_enabled: !prev.two_factor_enabled }));
                  toast({
                    title: securitySettings.two_factor_enabled ? "2FA Disabled" : "2FA Enabled",
                    description: securitySettings.two_factor_enabled 
                      ? "Two-factor authentication has been disabled." 
                      : "Two-factor authentication has been enabled.",
                  });
                }}
              >
                {securitySettings.two_factor_enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
          <CardDescription>Control your active sessions and auto-logout settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="auto_logout">Auto-logout (minutes)</Label>
            <Input
              id="auto_logout"
              type="number"
              value={securitySettings.auto_logout_minutes}
              onChange={(e) => setSecuritySettings(prev => ({ ...prev, auto_logout_minutes: parseInt(e.target.value) }))}
              min="5"
              max="480"
            />
            <p className="text-sm text-slate-500">Automatically log out after period of inactivity</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;