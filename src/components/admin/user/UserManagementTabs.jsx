import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const UserManagementTabs = ({ 
  selectedUser, 
  plans, 
  getUserSubscriptions, 
  getUserPermissions,
  assignPlan,
  revokePlan 
}) => {
  const { toast } = useToast();

  if (!selectedUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>
            Select a user from the list to view and manage their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p>Select a user to manage their settings</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const userId = selectedUser?.user_id;
  const userSubscriptions = getUserSubscriptions(userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Managing: {selectedUser.full_name}</CardTitle>
        <CardDescription>
          Manage user permissions and plan/service access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="plans" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plans">Plan & Service Access</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-4 max-h-[25rem] overflow-y-auto p-1">
            <div className="space-y-3">
              {plans.map((plan) => {
                const subscription = userSubscriptions.find(sub => sub.plan_id === plan.id);
                const hasAccess = !!subscription;
                
                return (
                  <div key={plan.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50/50">
                    <div className="flex-1 pr-2">
                       <div className="flex items-center gap-2">
                         <h5 className="font-medium text-sm">{plan.name}</h5>
                         {hasAccess && <Badge variant="secondary" className="bg-green-100 text-green-800">Assigned</Badge>}
                       </div>
                      <p className="text-xs text-gray-500 line-clamp-1">{plan.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {hasAccess ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => revokePlan(subscription.id)}
                          className="text-white"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Revoke
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => assignPlan(userId, plan.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Assign
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <h4 className="font-medium text-slate-800 mb-3">User Permissions</h4>
            <div className="space-y-3 max-h-[25rem] overflow-y-auto p-1">
              {getUserPermissions(userId).map((permission) => (
                <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50/50">
                  <div>
                    <h5 className="font-medium text-sm">{permission.permission_type}</h5>
                    <p className="text-xs text-gray-500">{permission.permission_value}</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              
              {getUserPermissions(userId).length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No special permissions assigned
                </div>
              )}
              
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => {
                  toast({
                    title: 'Feature Coming Soon',
                    description: 'Permission management interface will be available soon.',
                  });
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Permission
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <h4 className="font-medium text-slate-800 mb-3">User Profile</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-sm text-gray-900">{selectedUser.full_name || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Company</label>
                  <p className="text-sm text-gray-900">{selectedUser.company || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Position</label>
                  <p className="text-sm text-gray-900">{selectedUser.position || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-sm text-gray-900">{selectedUser.phone || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Account Status</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium text-gray-600">Created</span>
                  <span className="text-sm text-gray-900">
                    {new Date(selectedUser.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserManagementTabs;