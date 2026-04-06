import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const NotificationsTab = ({ securitySettings, setSecuritySettings }) => {
  const { toast } = useToast();

  const notificationSettings = [
    {
      key: 'email_notifications',
      title: 'Email Notifications',
      description: 'Receive email notifications for important updates'
    },
    {
      key: 'security_alerts',
      title: 'Security Alerts',
      description: 'Get alerts for security-related events'
    },
    {
      key: 'login_notifications',
      title: 'Login Notifications',
      description: 'Notifications for new login sessions'
    }
  ];

  const handleSavePreferences = () => {
    toast({
      title: 'Preferences Saved',
      description: 'Your notification preferences have been updated.'
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Notification Preferences</h2>
      <div className="space-y-6">
        {notificationSettings.map((setting) => (
          <div key={setting.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">{setting.title}</h3>
              <p className="text-slate-600">{setting.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings[setting.key]}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, [setting.key]: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
        <div className="mt-8">
          <Button
            onClick={handleSavePreferences}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            <Save className="h-4 w-4 mr-2" /> Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;