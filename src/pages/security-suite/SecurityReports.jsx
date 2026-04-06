import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import * as Tabs from "@/components/ui/tabs";
import AssessmentsTab from '@/components/security-suite/reports/tabs/AssessmentsTab';
import TrendsTab from '@/components/security-suite/reports/tabs/TrendsTab';

const SecurityReports = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('security_assessments')
        .select('*, compliance_frameworks(id, name)')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('completion_date', { ascending: false });

      if (assessmentError) throw assessmentError;
      setAssessments(assessmentData || []);

    } catch (error) {
      console.error('Error fetching report data:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch your reports.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Security Reports - Cy-Sec FortifyOne</title>
        <meta name="description" content="Comprehensive analytics and insights into your security posture." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Security Reports</h1>
          </div>
          
          <Tabs.Tabs defaultValue="assessments" className="w-full">
            <Tabs.TabsList className="grid w-full grid-cols-2">
              <Tabs.TabsTrigger value="assessments">Assessment Reports</Tabs.TabsTrigger>
              <Tabs.TabsTrigger value="trends">Trends</Tabs.TabsTrigger>
            </Tabs.TabsList>
            <Tabs.TabsContent value="assessments" className="mt-6">
                <AssessmentsTab assessments={assessments} />
            </Tabs.TabsContent>
            <Tabs.TabsContent value="trends" className="mt-6">
                <TrendsTab assessments={assessments} />
            </Tabs.TabsContent>
          </Tabs.Tabs>

        </motion.div>
      </div>
    </>
  );
};

export default SecurityReports;