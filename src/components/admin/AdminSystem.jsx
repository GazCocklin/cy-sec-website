import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Activity } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminSystem = () => {
  const { toast } = useToast();

  return (
    <div>
      <h3 className="text-2xl font-bold text-slate-800 mb-4">System Administration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-gray-600" />
              System Settings
            </CardTitle>
            <CardDescription>
              Configure system-wide settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Maintenance Mode</span>
                <Badge className="bg-green-100 text-green-800">Disabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Auto Backups</span>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email Notifications</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={() => toast({
                  title: 'Feature Coming Soon',
                  description: 'System settings panel will be available soon.',
                })}
              >
                Configure Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              System Health
            </CardTitle>
            <CardDescription>
              Monitor system performance and health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Status</span>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Response Time</span>
                <span className="text-sm text-green-600">&lt; 100ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage Usage</span>
                <span className="text-sm text-blue-600">15% used</span>
              </div>
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={() => toast({
                  title: 'System Status',
                  description: 'All systems are operating normally.',
                })}
              >
                View Detailed Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSystem;