import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/security-suite/dashboard/DashboardHeader';
import ExecutiveOverview from '@/components/security-suite/dashboard/ExecutiveOverview';
import ComplianceStatus from '@/components/security-suite/dashboard/ComplianceStatus';
import TrendsSnapshot from '@/components/security-suite/dashboard/TrendsSnapshot';
import CreateAssessmentDialog from '@/components/security-suite/compliance/CreateAssessmentDialog';
import UpcomingDeadlines from '@/components/security-suite/dashboard/UpcomingDeadlines';

const SecurityDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  const handleAssessmentCreated = (newAssessment) => {
    toast({
      title: "Assessment Created",
      description: `"${newAssessment.title}" is ready. You will be redirected to the assessment page.`,
    });
    navigate(`/fortify-one/compliance`);
  };

  const calculateAssessmentCompletion = (assessment) => {
    if (!assessment.assessment_progress || assessment.assessment_progress.length === 0) {
      return 0;
    }
    const totalQuestions = assessment.assessment_progress.reduce((sum, progress) => sum + (progress.total_questions || 0), 0);
    const answeredQuestions = assessment.assessment_progress.reduce((sum, progress) => sum + (progress.answered_questions || 0), 0);
    if (totalQuestions === 0) return 0;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const processComplianceDataFromAssessments = (assessments) => {
    const status = {};
    const latestAssessments = {};

    assessments.forEach(assessment => {
      if (assessment.compliance_frameworks) {
        const frameworkName = assessment.compliance_frameworks.name;
        const assessmentDate = new Date(assessment.updated_at || assessment.created_at);
        if (!latestAssessments[frameworkName] || assessmentDate > latestAssessments[frameworkName].date) {
            latestAssessments[frameworkName] = { assessment, date: assessmentDate };
        }
      }
    });

    Object.keys(latestAssessments).forEach(frameworkName => {
        const { assessment } = latestAssessments[frameworkName];
        let score = 0;
        if (assessment.status === 'completed') {
            score = assessment.overall_score || 0;
        } else if (assessment.status === 'in_progress') {
            score = calculateAssessmentCompletion(assessment);
        }

        if(assessment.status !== 'not_started') {
            status[frameworkName] = {
                percentage: score,
                status: score >= 80 ? 'compliant' : score >= 60 ? 'partially_compliant' : 'non_compliant',
                lastAssessment: assessment.completion_date ? new Date(assessment.completion_date).toISOString().split('T')[0] : assessment.assessment_date
            };
        }
    });

    return status;
  };

  const loadDashboardData = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);

      const { data: assessments, error: assessmentsError } = await supabase
        .from('security_assessments')
        .select(`*, compliance_frameworks(name), assessment_progress(*)`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (assessmentsError) throw assessmentsError;
      
      const allAssessmentsData = assessments || [];
      
      const completed = allAssessmentsData.filter(a => a.status === 'completed');

      let risksData = [];
      if (completed.length > 0) {
        const assessmentIds = completed.map(a => a.id);
        const { data: risks, error: riskError } = await supabase
          .from('assessment_responses')
          .select('risk_rating')
          .in('assessment_id', assessmentIds)
          .in('risk_rating', ['critical', 'high', 'medium', 'low']);
        
        if (riskError) throw riskError;
        risksData = risks || [];
      }

      // Fetch calendar events
      const [vendorsRes, manualEventsRes] = await Promise.all([
        supabase.from('vendor_questionnaires').select('*').eq('user_id', user.id),
        supabase.from('manual_security_events').select('*').eq('user_id', user.id)
      ]);

      if (vendorsRes.error) throw vendorsRes.error;
      if (manualEventsRes.error) throw manualEventsRes.error;

      const assessmentEvents = allAssessmentsData.flatMap(a => [
        (a.assessment_date || a.created_at) && { id: `assess-start-${a.id}`, title: `${a.title} - Start`, date: a.assessment_date || a.created_at, type: 'assessment' },
        a.completion_date && { id: `assess-comp-${a.id}`, title: `${a.title} - Completed`, date: a.completion_date, type: 'assessment' },
        a.next_review_date && { id: `assess-review-${a.id}`, title: `${a.title} - Review Due`, date: a.next_review_date, type: 'assessment' },
      ]).filter(Boolean);

      const vendorEvents = (vendorsRes.data || []).flatMap(v => [
        v.assessment_date && { id: `vendor-last-${v.id}`, title: `Review: ${v.vendor_name}`, date: v.assessment_date, type: 'vendor' },
        v.next_review_date && { id: `vendor-next-${v.id}`, title: `Next Review: ${v.vendor_name}`, date: v.next_review_date, type: 'vendor' },
      ]).filter(Boolean);
      
      const manualEvents = (manualEventsRes.data || []).map(e => ({
        id: `manual-${e.id}`,
        title: e.title,
        date: e.event_date,
        type: 'manual',
        description: e.description,
        isManual: true
      }));

      const allEvents = [...assessmentEvents, ...vendorEvents, ...manualEvents];
      const sortedEvents = allEvents.sort((a,b) => new Date(a.date) - new Date(b.date));
      
      setDashboardData({
        completedAssessments: completed,
        riskSummary: risksData,
        complianceStatus: processComplianceDataFromAssessments(allAssessmentsData),
        calendarEvents: sortedEvents,
      });
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error Loading Dashboard",
        description: "There was an issue fetching your data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your security dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Helmet>
        <title>Dashboard - Cy-Sec FortifyOne</title>
        <meta name="description" content="Executive security overview dashboard with real-time insights, compliance tracking, and risk management." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <DashboardHeader />
          
          <ExecutiveOverview 
            assessments={dashboardData.completedAssessments} 
            riskData={dashboardData.riskSummary} 
            complianceStatus={dashboardData.complianceStatus} 
            openCreateAssessmentDialog={() => setIsCreateDialogOpen(true)} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComplianceStatus complianceStatus={dashboardData.complianceStatus} />
              <TrendsSnapshot assessments={dashboardData.completedAssessments} />
            </div>
            <div className="lg:col-span-1">
              <UpcomingDeadlines events={dashboardData.calendarEvents} />
            </div>
          </div>
        </motion.div>
      </div>
      
      <CreateAssessmentDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onAssessmentCreated={handleAssessmentCreated}
      />
    </div>
  );
};

export default SecurityDashboard;