import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight, Database, Settings, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';

const AdminHomePage = () => {
  const { user, loading } = useAuth();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const options = [
    {
      title: 'CRM',
      description: 'Manage contact submissions and client interactions.',
      link: '/admin/crm',
      icon: <Database className="h-8 w-8 text-blue-500" />,
    },
    {
      title: 'Platform Administration',
      description: 'Control users, plans, modules, and system settings.',
      link: '/admin/platform',
      icon: <Settings className="h-8 w-8 text-green-500" />,
    },
    {
      title: 'Admin Pages',
      description: 'View strategic guides and internal documentation.',
      link: '/admin/pages',
      icon: <FileText className="h-8 w-8 text-yellow-500" />,
    },
  ];

  if (loading) {
    return <AdminLoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <Helmet>
        <title>Admin Home - Cy-Sec</title>
        <meta name="description" content="Admin home dashboard for Cy-Sec." />
      </Helmet>
      <div className="container mx-auto max-w-7xl">
        <AdminHeader
          user={user}
          title="Admin Dashboard"
          subtitle={`Welcome back, ${user?.email || 'Admin'}. Select an area to manage.`}
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {options.map((option, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link to={option.link}>
                <Card className="h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 ease-in-out group">
                  <CardHeader className="flex-row items-center gap-4">
                    {option.icon}
                    <div>
                      <CardTitle className="text-2xl font-bold text-slate-800">{option.title}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow"></CardContent>
                  <div className="p-6 pt-0 flex justify-end">
                    <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-800">
                      Go to {option.title}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHomePage;