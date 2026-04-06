import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAssessmentData } from './wizard/useAssessmentData';
import { useAssessmentActions } from './wizard/useAssessmentActions';
import WizardHeader from './wizard/WizardHeader';
import SectionNavigation from './wizard/SectionNavigation';
import QuestionCard from './wizard/QuestionCard';
import WizardNavigation from './wizard/WizardNavigation';

const AssessmentWizard = ({ open, onOpenChange, selectedAssessment, onComplete }) => {
  const { toast } = useToast();
  const { questions, responses, notes, loading, sections, setResponses, setNotes } = useAssessmentData(selectedAssessment, open);
  const { saving, saveResponse, updateAssessmentProgress, completeAssessment } = useAssessmentActions(selectedAssessment);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (open) {
      setCurrentQuestionIndex(0);
      setCompleting(false);
    }
  }, [open]);

  const handleResponseChange = async (questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    await saveResponse(questionId, value, notes[questionId] || '');
  };

  const handleNotesChange = (questionId, value) => {
    setNotes(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNotesBlur = (questionId) => {
    if (responses[questionId]) {
      saveResponse(questionId, responses[questionId], notes[questionId] || '');
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

  const handleSaveProgress = async () => {
    try {
      await updateAssessmentProgress(questions, responses);
      toast({
        title: "Progress Saved",
        description: "Your assessment progress has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save progress. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleComplete = async () => {
    try {
      console.log('Starting assessment completion...');
      setCompleting(true);
      
      console.log('Calling completeAssessment...');
      const updatedAssessment = await completeAssessment(questions, responses);
      console.log('Assessment completed successfully:', updatedAssessment);
      
      console.log('Closing wizard...');
      setCompleting(false);
      onOpenChange(false);
      
      console.log('Calling onComplete callback...');
      if (onComplete) {
        onComplete(updatedAssessment || selectedAssessment);
      }
    } catch (error) {
      console.error('Error in handleComplete:', error);
      setCompleting(false);
    }
  };

  const handleRetryLoad = () => {
    window.location.reload();
  };
  
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
        updateAssessmentProgress(questions, responses);
    }
  }, [responses]);

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(responses).filter(k => responses[k]).length;

  if (completing) {
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Completing Assessment...</h3>
            <p className="text-gray-600">Please wait while we finalize your assessment and generate your report.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl">Compliance Assessment Wizard</DialogTitle>
          <DialogDescription className="text-lg">
            Complete your {selectedAssessment?.compliance_frameworks?.name} assessment for {selectedAssessment?.organization_name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-grow flex p-6 overflow-hidden space-x-6">
          {loading ? (
            <div className="w-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading assessment questions...</p>
              </div>
            </div>
          ) : questions.length === 0 ? (
            <div className="w-full text-center py-12">
              <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-red-800">No Assessment Questions Found</h3>
              <p className="text-gray-600 mb-4 max-w-md mx-auto">
                We couldn't load the questions for this compliance framework. This might be a temporary issue or a problem with the framework configuration.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <p>Framework ID: {selectedAssessment?.framework_id}</p>
                <p>Assessment ID: {selectedAssessment?.id}</p>
                <p>Framework Name: {selectedAssessment?.compliance_frameworks?.name}</p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleRetryLoad} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry Loading
                </Button>
                <Button onClick={() => onOpenChange(false)}>Close Wizard</Button>
              </div>
            </div>
          ) : (
            <>
              <SectionNavigation 
                sections={sections}
                questions={questions}
                responses={responses}
                currentQuestion={currentQuestion}
                onSectionSelect={handleSectionSelect}
              />
              <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
                <WizardHeader
                  assessment={selectedAssessment}
                  questions={questions}
                  currentQuestionIndex={currentQuestionIndex}
                  answeredCount={answeredCount}
                />
                <div className="flex-grow overflow-y-auto pr-4">
                  <QuestionCard 
                    question={currentQuestion}
                    response={responses[currentQuestion?.id]}
                    notes={notes[currentQuestion?.id]}
                    onResponseChange={handleResponseChange}
                    onNotesChange={handleNotesChange}
                    onNotesBlur={handleNotesBlur}
                  />
                </div>
                <WizardNavigation 
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestions={questions.length}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onComplete={handleComplete}
                  onSaveProgress={handleSaveProgress}
                  saving={saving}
                  answeredCount={answeredCount}
                />
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentWizard;