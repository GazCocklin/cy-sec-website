import React from 'react';
import { Bell, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NotificationsTab = ({ securitySettings, setSecuritySettings }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
        <CardDescription>Choose what notifications you want to receive</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-slate-600">Receive general updates via email</p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings.email_notifications}
              onChange={(e) => setSecuritySettings(prev => ({ ...prev, email_notifications: e.target.checked }))}
              className="h-4 w-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Security Alerts</p>
              <p className="text-sm text-slate-600">Get notified about security events</p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings.security_alerts}
              onChange={(e) => setSecuritySettings(prev => ({ ...prev, security_alerts: e.target.checked }))}
              className="h-4 w-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Login Notifications</p>
              <p className="text-sm text-slate-600">Receive alerts for new login attempts</p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings.login_notifications}
              onChange={(e) => setSecuritySettings(prev => ({ ...prev, login_notifications: e.target.checked }))}
              className="h-4 w-4"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;