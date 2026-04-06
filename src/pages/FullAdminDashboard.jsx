import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Settings2, Lock, Shield } from 'lucide-react';

// Import admin components
import ContactCRM from '@/components/admin/ContactCRM';
import UserManagement from '@/components/admin/UserManagement';
import ModuleManagement from '@/components/admin/ModuleManagement';
import PlanManagement from '@/components/admin/PlanManagement';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import AdminSystem from '@/components/admin/AdminSystem';
import AdminStatsCards from '@/components/admin/AdminStatsCards';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';

// Import custom hook
import { useAdminStats } from '@/hooks/useAdminStats';

const FullAdminDashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.email?.toLowerCase() === 'gazc@cy-sec.co.uk' || 
                  user?.email?.toLowerCase() === 'aimeec@cy-sec.co.uk';
  const { loading, overviewStats } = useAdminStats(user, isAdmin);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-gray-600">Please sign in to access the admin dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this admin dashboard.
            </p>
            <p className="text-xs text-gray-500">
              Current user: {user.email}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return <AdminLoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <Helmet>
        <title>Cy-Sec Admin Dashboard (Legacy)</title>
        <meta name="description" content="Cy-Sec administrative dashboard for website and platform management." />
      </Helmet>
      <div className="container mx-auto max-w-7xl">
        <AdminHeader 
          user={user}
          title="Cy-Sec Admin Dashboard (Legacy)"
          subtitle="Manage your website interactions and platform administration."
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AdminStatsCards overviewStats={overviewStats} />

          <Tabs defaultValue="website" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="website">
                <Globe className="h-4 w-4 mr-2" /> Website Interactions
              </TabsTrigger>
              <TabsTrigger value="platform">
                <Settings2 className="h-4 w-4 mr-2" /> Platform Administration
              </TabsTrigger>
            </TabsList>

            <TabsContent value="website">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Website Interaction Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="contacts" className="w-full">
                    <TabsList>
                      <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="contacts" className="pt-4">
                      <ContactCRM />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="platform">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Platform Administration Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="users" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
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
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default FullAdminDashboard;