import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Database } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminAnalytics = () => {
  const { toast } = useToast();

  return (
    <div>
      <h3 className="text-2xl font-bold text-slate-800 mb-4">Analytics & Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              User Engagement
            </CardTitle>
            <CardDescription>
              Track user activity and engagement metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Analytics dashboard coming soon</p>
              <Button 
                className="mt-4" 
                onClick={() => toast({
                  title: 'Feature Coming Soon',
                  description: 'Advanced analytics will be available in the next update.',
                })}
              >
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2 text-purple-600" />
              Data Insights
            </CardTitle>
            <CardDescription>
              Generate reports and export data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Database className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Data insights dashboard coming soon</p>
              <Button 
                className="mt-4" 
                onClick={() => toast({
                  title: 'Feature Coming Soon',
                  description: 'Data insights and reporting will be available soon.',
                })}
              >
                Generate Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;