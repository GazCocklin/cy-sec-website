import React, { useState } from 'react';
import { User, Shield, Bell, Database, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import ProfileTab from './ProfileTab';
import SecurityTab from './SecurityTab';
import NotificationsTab from './NotificationsTab';
import PrivacyTab from './PrivacyTab';

const SettingsTabs = ({ 
  user, 
  userProfile, 
  setUserProfile, 
  securitySettings, 
  setSecuritySettings, 
  loading, 
  updateProfile, 
  updatePassword, 
  exportData, 
  deleteAccount 
}) => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Data & Privacy', icon: Database }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/fortify-one/login';
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.'
      });
    } catch (error) {
      toast({
        title: 'Error Signing Out',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <Card>
          <CardContent className="p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full text-red-600 border-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <Card>
          <CardContent className="p-8">
            {activeTab === 'profile' && (
              <ProfileTab
                user={user}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                loading={loading}
                updateProfile={updateProfile}
              />
            )}

            {activeTab === 'security' && (
              <SecurityTab
                updatePassword={updatePassword}
                loading={loading}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationsTab
                securitySettings={securitySettings}
                setSecuritySettings={setSecuritySettings}
              />
            )}

            {activeTab === 'privacy' && (
              <PrivacyTab
                exportData={exportData}
                deleteAccount={deleteAccount}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsTabs;