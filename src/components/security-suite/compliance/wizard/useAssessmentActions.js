import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

export const useAssessmentActions = (assessment) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const scoreMap = {
    'Fully implemented with documented policies and procedures': 100,
    'Mostly implemented with some documentation gaps': 80,
    'Partially implemented with limited documentation': 60,
    'Basic implementation without formal documentation': 40,
    'Not implemented or no documentation available': 0
  };

  const saveResponse = async (questionId, responseValue, questionNotes = '') => {
    try {
      setSaving(true);
      const score = scoreMap[responseValue] ?? 50;
      const riskRating = score >= 80 ? 'low' : score >= 60 ? 'medium' : 'high';

      const { error } = await supabase
        .from('assessment_responses')
        .upsert(
          {
            assessment_id: assessment.id,
            question_id: questionId,
            response_value: responseValue,
            notes: questionNotes,
            score: score,
            risk_rating: riskRating,
          },
          { onConflict: 'assessment_id, question_id' }
        );

      if (error) throw error;
      
    } catch (error) {
      console.error('Error saving response:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save your response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateAssessmentProgress = async (questions, responses) => {
    try {
      const totalQuestions = questions.length;
      const answeredQuestions = Object.keys(responses).length;
      
      const totalScore = Object.values(responses).reduce((sum, response) => {
        return sum + (scoreMap[response] ?? 0);
      }, 0);

      const avgScore = answeredQuestions > 0 ? Math.round(totalScore / answeredQuestions) : 0;
      const isCompleted = answeredQuestions === totalQuestions && totalQuestions > 0;
      
      const updateData = {
        overall_score: avgScore,
        status: isCompleted ? 'completed' : answeredQuestions > 0 ? 'in_progress' : 'not_started',
        updated_at: new Date().toISOString()
      };

      if (isCompleted) {
        updateData.completion_date = new Date().toISOString();
      }
      
      const { error } = await supabase
        .from('security_assessments')
        .update(updateData)
        .eq('id', assessment.id);
        
      if(error) throw error;

    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };
  
  const completeAssessment = async (questions, responses) => {
    try {
      console.log('completeAssessment called with:', { questionsCount: questions.length, responsesCount: Object.keys(responses).length });
      setSaving(true);
      
      const totalQuestions = questions.length;
      const answeredQuestions = Object.keys(responses).length;
      
      const totalScore = Object.values(responses).reduce((sum, response) => {
        return sum + (scoreMap[response] ?? 0);
      }, 0);

      const avgScore = answeredQuestions > 0 ? Math.round(totalScore / answeredQuestions) : 0;
      
      console.log('Updating assessment with:', { avgScore, status: 'completed' });
      
      const { data, error } = await supabase
        .from('security_assessments')
        .update({
          overall_score: avgScore,
          status: 'completed',
          completion_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', assessment.id)
        .select()
        .single();
        
      if(error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Assessment updated successfully:', data);

      toast({
        title: "Assessment Completed",
        description: "Your compliance assessment has been successfully completed and your report is ready.",
      });

      return data;
    } catch (error) {
      console.error('Error completing assessment:', error);
      toast({
        title: "Completion Failed",
        description: "Failed to complete assessment. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setSaving(false);
    }
  };

  return { saving, saveResponse, updateAssessmentProgress, completeAssessment };
};