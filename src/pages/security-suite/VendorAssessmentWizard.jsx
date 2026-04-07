import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useDebounce } from '@/hooks/useDebounce';
import WizardHeader from '@/components/security-suite/compliance/wizard/WizardHeader';
import SectionNavigation from '@/components/security-suite/compliance/wizard/SectionNavigation';
import QuestionCard from '@/components/security-suite/compliance/wizard/QuestionCard';
import WizardNavigation from '@/components/security-suite/compliance/wizard/WizardNavigation';
import { Progress } from '@/components/ui/progress';

const VendorAssessmentWizard = () => {
  const { questionnaireId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [questionnaire, setQuestionnaire] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [notes, setNotes] = useState({});
  const [sections, setSections] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const debouncedNotes = useDebounce(notes, 500);

  const scoreMap = {
    'Fully implemented with documented policies and procedures': 100,
    'Mostly implemented with some documentation gaps': 80,
    'Partially implemented with limited documentation': 60,
    'Basic implementation without formal documentation': 40,
    'Not implemented or no documentation available': 0
  };

  const fetchAssessmentData = useCallback(async () => {
    if (!user || !questionnaireId) return;
    setLoading(true);
    try {
      const { data: qData, error: qError } = await supabase
        .from('vendor_questionnaires')
        .select('*, vendors(name, id), compliance_frameworks(name)')
        .eq('id', questionnaireId)
        .eq('user_id', user.id)
        .single();
      
      if (qError) throw qError;
      setQuestionnaire(qData);

      const { data: questionsData, error: questionsError } = await supabase
        .from('compliance_questions')
        .select('*')
        .eq('framework_id', qData.framework_id)
        .order('section_code')
        .order('question_number');
      
      if (questionsError) throw questionsError;
      setQuestions(questionsData);
      
      const sectionMap = questionsData.reduce((acc, q) => {
        if (!acc[q.section_code]) {
          acc[q.section_code] = { code: q.section_code, title: q.section_title };
        }
        return acc;
      }, {});
      setSections(Object.values(sectionMap));

      const { data: responsesData, error: responsesError } = await supabase
        .from('vendor_responses')
        .select('*')
        .eq('questionnaire_id', questionnaireId);

      if (responsesError) throw responsesError;
      const responsesMap = {};
      const notesMap = {};
      responsesData.forEach(resp => {
        responsesMap[resp.question_id] = resp.response_value;
        notesMap[resp.question_id] = resp.notes || '';
      });
      setResponses(responsesMap);
      setNotes(notesMap);

    } catch (error) {
      console.error('Error fetching assessment data:', error);
      toast({ title: 'Error', description: 'Could not load assessment.', variant: 'destructive' });
      navigate('/fortify-one/vendor-risk');
    } finally {
      setLoading(false);
    }
  }, [questionnaireId, user, toast, navigate]);

  useEffect(() => {
    fetchAssessmentData();
  }, [fetchAssessmentData]);

  const saveResponse = useCallback(async (questionId, responseValue, noteValue) => {
    setSaving(true);
    const score = scoreMap[responseValue] ?? 0;
    const riskRating = score >= 80 ? 'low' : score >= 60 ? 'medium' : 'high';

    const { error } = await supabase
      .from('vendor_responses')
      .upsert({
        questionnaire_id: questionnaireId,
        question_id: questionId,
        response_value: responseValue,
        notes: noteValue,
        score: score,
        risk_rating: riskRating,
      }, { onConflict: 'questionnaire_id, question_id' });

    if (error) {
      toast({ title: 'Error Saving Response', variant: 'destructive' });
      console.error(error);
    }
    setSaving(false);
  }, [questionnaireId, toast]);

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    saveResponse(questionId, value, notes[questionId] || '');
  };

  const handleNotesChange = (questionId, value) => {
    setNotes(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNotesBlur = (questionId) => {
    if (responses[questionId]) {
      saveResponse(questionId, responses[questionId], notes[questionId] || '');
    }
  };

  useEffect(() => {
    if (Object.keys(debouncedNotes).length > 0) {
      Object.keys(debouncedNotes).forEach(questionId => {
        if (responses[questionId] && debouncedNotes[questionId] !== (notes[questionId] || '')) {
           saveResponse(questionId, responses[questionId], debouncedNotes[questionId]);
        }
      });
    }
  }, [debouncedNotes, responses, saveResponse]);

  const handleFinishAssessment = async () => {
    setSaving(true);
    try {
      const totalScore = Object.values(responses).reduce((sum, response) => {
        return sum + (scoreMap[response] ?? 0);
      }, 0);
      const overallScore = questions.length > 0 ? Math.round(totalScore / questions.length) : 0;

      const { error } = await supabase
        .from('vendor_questionnaires')
        .update({ 
          status: 'completed', 
          completion_date: new Date().toISOString(),
          overall_score: overallScore
        })
        .eq('id', questionnaireId);
      if (error) throw error;
      toast({ title: 'Assessment Completed!', description: 'Vendor risk assessment has been finalized.' });
      navigate(`/fortify-one/vendor-assessment-report/${questionnaireId}`);
    } catch(error) {
      toast({ title: 'Error', description: 'Could not finalize assessment.', variant: 'destructive'});
    } finally {
      setSaving(false);
    }
  };

  const handleSectionSelect = (sectionCode) => {
    const firstQuestionIndex = questions.findIndex(q => q.section_code === sectionCode);
    if (firstQuestionIndex !== -1) {
      setCurrentQuestionIndex(firstQuestionIndex);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (loading || !questionnaire || !questions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(responses).filter(k => responses[k]).length;
  const overallProgress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  return (
    <>
      <Helmet>
        <title>{questionnaire?.title || 'Vendor Assessment'}</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8 flex flex-col h-[calc(100vh-8rem)]">
        <WizardHeader
          title={questionnaire.title}
          vendorName={questionnaire.vendors.name}
          frameworkName={questionnaire.compliance_frameworks.name}
          onBack={() => navigate(`/fortify-one/vendor-risk/${questionnaire.vendors.id}`)}
        />
        
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-600">Overall Progress</span>
                <span className="text-sm font-bold text-blue-600">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
        </div>

        <div className="flex-grow lg:grid lg:grid-cols-12 lg:gap-8 overflow-hidden">
          <div className="hidden lg:block lg:col-span-3 overflow-y-auto pr-4">
            <SectionNavigation
              sections={sections}
              questions={questions}
              responses={responses}
              currentQuestion={currentQuestion}
              onSectionSelect={handleSectionSelect}
            />
          </div>
          
          <main className="lg:col-span-9 flex flex-col overflow-hidden">
            <motion.div
              key={currentQuestion?.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-grow overflow-y-auto pr-4"
            >
              <QuestionCard
                question={currentQuestion}
                response={responses[currentQuestion?.id]}
                notes={notes[currentQuestion?.id]}
                onResponseChange={handleResponseChange}
                onNotesChange={handleNotesChange}
                onNotesBlur={handleNotesBlur}
              />
            </motion.div>
            <WizardNavigation 
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onComplete={handleFinishAssessment}
              saving={saving}
              answeredCount={answeredCount}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default VendorAssessmentWizard;