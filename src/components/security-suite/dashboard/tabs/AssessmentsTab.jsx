import React from 'react';
import { FileText, Play, BarChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AssessmentsTab = ({ dashboardData }) => {
  const getScoreColour = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'in_progress':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const calculateCompletionPercentage = (assessment) => {
    if (!assessment.assessment_progress || assessment.assessment_progress.length === 0) {
      return 0;
    }
    
    const totalQuestions = assessment.assessment_progress.reduce((sum, progress) => sum + (progress.total_questions || 0), 0);
    const answeredQuestions = assessment.assessment_progress.reduce((sum, progress) => sum + (progress.answered_questions || 0), 0);
    
    if (totalQuestions === 0) return 0;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const getDisplayScore = (assessment) => {
    if (assessment.status === 'completed') {
      return assessment.overall_score || 0;
    } else {
      return calculateCompletionPercentage(assessment);
    }
  };

  const getScoreLabel = (assessment) => {
    if (assessment.status === 'completed') {
      return 'Compliant';
    } else {
      return 'Complete';
    }
  };

  const handleViewReport = (assessment) => {
    window.location.href = `/fortify-one/assessment-report/${assessment.id}`;
  };

  const handleStartAssessment = (assessment) => {
    window.location.href = '/fortify-one/compliance';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Assessments</CardTitle>
        <CardDescription>Complete list of your security assessments</CardDescription>
      </CardHeader>
      <CardContent>
        {dashboardData.assessments.length > 0 ? (
          <div className="space-y-4">
            {dashboardData.assessments.map((assessment) => {
              const displayScore = getDisplayScore(assessment);
              const scoreLabel = getScoreLabel(assessment);
              
              return (
                <div key={assessment.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{assessment.title || assessment.organisation_name}</h3>
                      <p className="text-slate-600">{assessment.organisation_name || assessment.compliance_frameworks?.name}</p>
                      <p className="text-sm text-slate-500">
                        Framework: {assessment.compliance_frameworks?.name || 'Unknown'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(assessment.status)}>
                        {assessment.status === 'completed' ? 'Completed' :
                         assessment.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                      </Badge>
                      {assessment.status === 'completed' ? (
                        <Button 
                          size="sm" 
                          onClick={() => handleViewReport(assessment)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <BarChart className="h-4 w-4 mr-1" />
                          View Report
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleStartAssessment(assessment)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          {assessment.status === 'in_progress' ? 'Continue' : 'Start'}
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Score:</span>
                      <span className={`ml-2 font-medium ${getScoreColour(displayScore)}`}>
                        {displayScore}% {scoreLabel}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Risk Level:</span>
                      <span className="ml-2 font-medium">{assessment.risk_level || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Start Date:</span>
                      <span className="ml-2">{assessment.created_at ? new Date(assessment.created_at).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Completion:</span>
                      <span className="ml-2">{assessment.completion_date ? new Date(assessment.completion_date).toLocaleDateString() : 'In Progress'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No assessments found</h3>
            <p className="text-slate-600 mb-6">Get started by creating your first security assessment.</p>
            <Button onClick={() => window.location.href = '/fortify-one/compliance'}>
              Create Assessment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssessmentsTab;