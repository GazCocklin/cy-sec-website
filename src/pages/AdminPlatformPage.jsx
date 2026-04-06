import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagement from '@/components/admin/UserManagement';
import PlanManagement from '@/components/admin/PlanManagement';
import ModuleManagement from '@/components/admin/ModuleManagement';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import AdminSystem from '@/components/admin/AdminSystem';

const AdminPlatformPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <Helmet>
        <title>Platform Administration - Admin Dashboard</title>
        <meta name="description" content="Manage users, plans, modules, and system settings." />
      </Helmet>
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm">
            <Link to="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Home
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Settings2 className="h-6 w-6 mr-3 text-blue-600" />
              Platform Administration Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="plans">Plan Management</TabsTrigger>
                <TabsTrigger value="modules">Module Management</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
              <TabsContent value="users" className="pt-4">
                <UserManagement />
              </TabsContent>
              <TabsContent value="plans" className="pt-4">
                <PlanManagement />
              </TabsContent>
              <TabsContent value="modules" className="pt-4">
                <ModuleManagement />
              </TabsContent>
              <TabsContent value="analytics" className="pt-4">
                <AdminAnalytics />
              </TabsContent>
              <TabsContent value="system" className="pt-4">
                <AdminSystem />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPlatformPage;