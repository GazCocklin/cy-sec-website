import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

export const useAssessmentData = (assessment, open) => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && assessment?.framework_id) {
      console.log('Loading assessment data for framework_id:', assessment.framework_id);
      loadAssessmentData();
    } else if (open) {
      console.log('Assessment wizard opened but no framework_id found:', assessment);
      setLoading(false);
    }
  }, [open, assessment]);

  const loadAssessmentData = async () => {
    try {
      setLoading(true);
      console.log('Starting to load assessment data...');

      console.log('Fetching questions for framework_id:', assessment.framework_id);
      const questionsRes = await supabase
        .from('compliance_questions')
        .select('*')
        .eq('framework_id', assessment.framework_id)
        .order('section_code')
        .order('question_number');

      console.log('Questions query result:', questionsRes);

      if (questionsRes.error) {
        console.error('Error fetching questions:', questionsRes.error);
        throw questionsRes.error;
      }

      console.log('Fetching existing responses for assessment_id:', assessment.id);
      const responsesRes = await supabase
        .from('assessment_responses')
        .select('*')
        .eq('assessment_id', assessment.id);

      console.log('Responses query result:', responsesRes);

      if (responsesRes.error) {
        console.error('Error fetching responses:', responsesRes.error);
        throw responsesRes.error;
      }

      const questionsData = questionsRes.data || [];
      console.log('Questions loaded:', questionsData.length, 'questions');
      
      if (questionsData.length === 0) {
        console.warn('No questions found for framework_id:', assessment.framework_id);
        
        const frameworkCheck = await supabase
          .from('compliance_frameworks')
          .select('id, name')
          .eq('id', assessment.framework_id);
        
        console.log('Framework check:', frameworkCheck);
        
        const totalQuestionsCheck = await supabase
          .from('compliance_questions')
          .select('id', { count: 'exact' });
        
        console.log('Total questions in database:', totalQuestionsCheck);
        
        const questionsForThisFramework = await supabase
          .from('compliance_questions')
          .select('id', { count: 'exact' })
          .eq('framework_id', assessment.framework_id);
        
        console.log('Questions for this framework:', questionsForThisFramework);
      }

      setQuestions(questionsData);

      const existingResponses = {};
      const existingNotes = {};
      (responsesRes.data || []).forEach(resp => {
        existingResponses[resp.question_id] = resp.response_value;
        existingNotes[resp.question_id] = resp.notes || '';
      });
      
      console.log('Existing responses loaded:', Object.keys(existingResponses).length);
      setResponses(existingResponses);
      setNotes(existingNotes);

    } catch (error) {
      console.error('Error loading assessment data:', error);
      toast({
        title: "Error Loading Assessment",
        description: "Failed to load questions and responses. Please check the console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sections = useMemo(() => {
    if (!questions || questions.length === 0) return [];
    const sectionMap = questions.reduce((acc, q) => {
      if (!acc[q.section_code]) {
        acc[q.section_code] = {
          code: q.section_code,
          title: q.section_title,
        };
      }
      return acc;
    }, {});
    return Object.values(sectionMap);
  }, [questions]);

  return {
    questions,
    responses,
    notes,
    loading,
    sections,
    setResponses,
    setNotes
  };
};