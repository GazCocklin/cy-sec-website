import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import AssessmentsList from '@/components/security-suite/compliance/AssessmentsList';
import CreateAssessmentDialog from '@/components/security-suite/compliance/CreateAssessmentDialog';
import AssessmentWizard from '@/components/security-suite/compliance/AssessmentWizard';
import ComplianceHeader from '@/components/security-suite/compliance/ComplianceHeader';
import FrameworksGrid from '@/components/security-suite/compliance/FrameworksGrid';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const ComplianceAssessments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [frameworks, setFrameworks] = useState([]);
  
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [assessmentToDelete, setAssessmentToDelete] = useState(null);

  const fetchAssessments = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('security_assessments')
        .select('*, compliance_frameworks(name)')
        .eq('user_id', user.id)
        .neq('assessment_type', 'vendor') // Correctly filter out only vendor assessments
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error) {
      console.error('Error fetching assessments:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch your assessments.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    const fetchFrameworks = async () => {
      try {
        const { data, error } = await supabase
          .from('compliance_frameworks')
          .select('*')
          .neq('id', 'a1b2c3d4-e5f6-7890-1234-567890abcdef') // Exclude vendor framework
          .order('name');
        if (error) throw error;
        setFrameworks(data || []);
      } catch (error) {
        console.error('Error fetching frameworks:', error);
        toast({ title: 'Error', description: 'Could not fetch compliance frameworks.' });
      }
    };

    if (user) {
      fetchAssessments();
      fetchFrameworks();
    }
  }, [user, toast, fetchAssessments]);
  
  const handleAssessmentCreated = (newAssessmentData) => {
    fetchAssessments();
    handleStartOrContinue(newAssessmentData);
  };

  const handleStartOrContinue = async (assessment) => {
    let assessmentToStart = assessment;

    if (assessment.status === 'not_started') {
      try {
        const { data, error } = await supabase
          .from('security_assessments')
          .update({ status: 'in_progress', updated_at: new Date().toISOString() })
          .eq('id', assessment.id)
          .select('*, compliance_frameworks(name)')
          .single();

        if (error) throw error;
        assessmentToStart = data;
        setAssessments(prev => prev.map(a => a.id === assessment.id ? data : a));
      } catch (error) {
        console.error('Error updating assessment status:', error);
        toast({ title: 'Error', description: 'Could not start assessment. Please try again.', variant: 'destructive'});
        return;
      }
    }
    setSelectedAssessment(assessmentToStart);
    setIsWizardOpen(true);
  };
  
  const handleWizardComplete = () => {
    setIsWizardOpen(false);
    setSelectedAssessment(null);
    fetchAssessments();
  };

  const openDeleteDialog = (assessment) => {
    setAssessmentToDelete(assessment);
  };

  const handleDeleteAssessment = async () => {
    if (!assessmentToDelete) return;

    try {
      const { error: responsesError } = await supabase
        .from('assessment_responses')
        .delete()
        .eq('assessment_id', assessmentToDelete.id);
      if (responsesError) throw responsesError;

      const { error: progressError } = await supabase
        .from('assessment_progress')
        .delete()
        .eq('assessment_id', assessmentToDelete.id);
      if (progressError) throw progressError;

      const { error: assessmentError } = await supabase
        .from('security_assessments')
        .delete()
        .eq('id', assessmentToDelete.id);
      if (assessmentError) throw assessmentError;

      toast({
        title: 'Assessment Deleted',
        description: `"${assessmentToDelete.title}" has been permanently removed.`,
      });

      setAssessments(prev => prev.filter(a => a.id !== assessmentToDelete.id));
      setAssessmentToDelete(null);
    } catch (error) {
      console.error('Error deleting assessment:', error);
      toast({
        title: 'Deletion Failed',
        description: 'Could not delete the assessment. Please try again.',
        variant: 'destructive',
      });
      setAssessmentToDelete(null);
    }
  };

  if (loading && frameworks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Compliance Assessments - Cy-Sec FortifyOne</title>
        <meta name="description" content="Manage, track, and perform compliance assessments." />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ComplianceHeader onCreateAssessment={() => setCreateDialogOpen(true)} />
          <AssessmentsList assessments={assessments} onOpenWizard={handleStartOrContinue} onDelete={openDeleteDialog} />
          <FrameworksGrid frameworks={frameworks} />
        </motion.div>
      </div>

      <CreateAssessmentDialog 
        open={isCreateDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onAssessmentCreated={handleAssessmentCreated}
      />
      
      {selectedAssessment && (
        <AssessmentWizard
          open={isWizardOpen}
          onOpenChange={setIsWizardOpen}
          selectedAssessment={selectedAssessment}
          onComplete={handleWizardComplete}
        />
      )}

      <AlertDialog open={!!assessmentToDelete} onOpenChange={() => setAssessmentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the "{assessmentToDelete?.title}" assessment and all of its associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAssessment}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, delete assessment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ComplianceAssessments;