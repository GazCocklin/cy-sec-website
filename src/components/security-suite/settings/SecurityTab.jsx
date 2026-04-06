import React, { useState } from 'react';
import { Key, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const SecurityTab = ({ updatePassword, loading }) => {
  const { toast } = useToast();
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
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Security Settings</h2>
      <div className="space-y-6">
        <div className="p-6 bg-slate-50 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Change Password</h3>
          <div className="grid grid-cols-1 gap-4 max-w-md">
            <div>
              <Label htmlFor="current_password" className="text-slate-700">Current Password</Label>
              <Input
                id="current_password"
                type="password"
                value={passwordData.current_password}
                onChange={(e) => setPasswordData(prev => ({ ...prev, current_password: e.target.value }))}
                className="bg-white border-slate-300 text-slate-800"
              />
            </div>
            <div>
              <Label htmlFor="new_password" className="text-slate-700">New Password</Label>
              <Input
                id="new_password"
                type="password"
                value={passwordData.new_password}
                onChange={(e) => setPasswordData(prev => ({ ...prev, new_password: e.target.value }))}
                className="bg-white border-slate-300 text-slate-800"
              />
            </div>
            <div>
              <Label htmlFor="confirm_password" className="text-slate-700">Confirm New Password</Label>
              <Input
                id="confirm_password"
                type="password"
                value={passwordData.confirm_password}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirm_password: e.target.value }))}
                className="bg-white border-slate-300 text-slate-800"
              />
            </div>
            <Button
              onClick={handlePasswordUpdate}
              disabled={loading || !passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
            >
              <Key className="h-4 w-4 mr-2" /> Update Password
            </Button>
          </div>
        </div>
        
        <div className="p-6 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Two-Factor Authentication</h3>
              <p className="text-slate-600">Add an extra layer of security to your account</p>
            </div>
            <Button
              variant="outline"
              onClick={() => toast({
                title: "🚧 Feature Coming Soon!",
                description: "Two-factor authentication is being implemented! 🚀"
              })}
            >
              <Shield className="h-4 w-4 mr-2" /> Enable 2FA
            </Button>
          </div>
        </div>

        <div className="p-6 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Active Sessions</h3>
              <p className="text-slate-600">Manage your active login sessions</p>
            </div>
            <Button
              variant="outline"
              onClick={() => toast({
                title: "🚧 Feature Coming Soon!",
                description: "Session management is being developed! 🚀"
              })}
            >
              View Sessions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;