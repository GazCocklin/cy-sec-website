import React from 'react';
import { Activity, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ActivityTab = ({ dashboardData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your recent actions in the FortifyOne</CardDescription>
      </CardHeader>
      <CardContent>
        {dashboardData.recentActivity.length > 0 ? (
          <div className="space-y-4">
            {dashboardData.recentActivity.map((activity, index) => (
              <div key={activity.id || index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Eye className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.activity_type}</p>
                  <p className="text-sm text-slate-600">{activity.activity_description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(activity.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Activity className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No recent activity</h3>
            <p className="text-slate-600">Your activity will appear here as you use the FortifyOne.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTab;