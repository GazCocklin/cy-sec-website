import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContactCRM from '@/components/admin/ContactCRM';
import FortifyLearnFeedback from '@/components/admin/FortifyLearnFeedback';

const AdminCrmPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <Helmet>
        <title>CRM - Admin Dashboard</title>
        <meta name="description" content="Manage contact submissions, client interactions and platform feedback." />
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
              <Users className="h-6 w-6 mr-3 text-blue-600" />
              Customer Relationship Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="contacts" className="w-full">
              <TabsList>
                <TabsTrigger value="contacts">
                  <Users className="h-4 w-4 mr-2" />
                  Contact Submissions
                </TabsTrigger>
                <TabsTrigger value="feedback">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  FortifyLearn Feedback
                </TabsTrigger>
              </TabsList>
              <TabsContent value="contacts" className="pt-4">
                <ContactCRM />
              </TabsContent>
              <TabsContent value="feedback" className="pt-4">
                <FortifyLearnFeedback />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCrmPage;