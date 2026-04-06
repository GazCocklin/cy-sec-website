import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, FileText, Lightbulb, ListChecks, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import AdminLoadingScreen from '@/components/admin/AdminLoadingScreen';

const AdminPagesList = () => {
  const { user, loading } = useAuth();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const pages = [
    {
      title: 'Pre-Launch Checklist',
      description: 'Essential steps to ensure a smooth product launch.',
      link: '/admin/pre-launch-checklist',
      icon: <ListChecks className="h-8 w-8 text-purple-500" />,
    },
    {
      title: 'Marketing Insights',
      description: 'Data-driven insights for marketing strategies.',
      link: '/admin/marketing-insights',
      icon: <Lightbulb className="h-8 w-8 text-orange-500" />,
    },
    {
      title: 'Plan Logic Guide',
      description: 'Detailed guide on subscription plan logic and features.',
      link: '/admin/plan-logic-guide',
      icon: <FileText className="h-8 w-8 text-green-500" />,
    },
    {
      title: 'Strategic Roadmap',
      description: 'High-level overview of the product and company strategy.',
      link: '/admin/strategic-roadmap',
      icon: <Map className="h-8 w-8 text-red-500" />,
    },
  ];

  if (loading) {
    return <AdminLoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <Helmet>
        <title>Admin Pages - Cy-Sec</title>
        <meta name="description" content="List of internal admin pages and guides." />
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
        <AdminHeader
          user={user}
          title="Admin Pages"
          subtitle="Internal documentation and strategic guides."
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
          {pages.map((page, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link to={page.link}>
                <Card className="h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 ease-in-out group">
                  <CardHeader className="flex-row items-center gap-4">
                    {page.icon}
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-800">{page.title}</CardTitle>
                      <CardDescription>{page.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow"></CardContent>
                  <div className="p-6 pt-0 flex justify-end">
                    <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-800">
                      View Page
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

export default AdminPagesList;