import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle, AlertTriangle, Save } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const WizardNavigation = ({ 
  currentQuestionIndex, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onComplete,
  onSaveProgress,
  saving,
  answeredCount,
}) => {
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const allAnswered = answeredCount === totalQuestions;

  const handleCompleteClick = () => {
    if (allAnswered) {
      setShowCompletionDialog(true);
    }
  };

  const handleConfirmComplete = () => {
    setShowCompletionDialog(false);
    onComplete();
  };

  const handleSaveProgress = () => {
    if (onSaveProgress) {
      onSaveProgress();
    }
  };

  return (
    <div className="flex-shrink-0 flex items-center justify-between pt-6 border-t mt-auto">
      <Button variant="outline" onClick={onPrevious} disabled={currentQuestionIndex === 0}>
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={handleSaveProgress}
          disabled={saving}
          className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Progress'}
        </Button>
        
        {saving && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Auto-saving...</span>
          </div>
        )}
      </div>

      {isLastQuestion ? (
        <AlertDialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
          <AlertDialogTrigger asChild>
            <Button 
              onClick={handleCompleteClick} 
              className="bg-green-600 hover:bg-green-700 text-white" 
              disabled={!allAnswered}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Assessment
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Complete Assessment
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <p>
                  You are about to complete this compliance assessment. Once completed:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Your responses will be finalised and a comprehensive report will be generated</li>
                  <li>You can still edit your responses later if needed</li>
                  <li>The assessment status will be marked as "Completed"</li>
                  <li>You'll be redirected to view your detailed compliance report</li>
                </ul>
                <p className="font-medium text-slate-700">
                  Are you ready to complete this assessment?
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continue Editing</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleConfirmComplete}
                className="bg-green-600 hover:bg-green-700"
              >
                Yes, Complete Assessment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button onClick={onNext}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default WizardNavigation;