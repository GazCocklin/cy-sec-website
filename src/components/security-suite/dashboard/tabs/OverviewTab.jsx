import React from 'react';
import { BarChart3, CheckCircle, FileText, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const OverviewTab = ({ dashboardData }) => {
  const getScoreColour = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
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

  const recentAssessments = dashboardData.assessments?.slice(0, 3) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Assessments
            </CardTitle>
            <CardDescription>Your latest security assessments</CardDescription>
          </CardHeader>
          <CardContent>
            {recentAssessments.length > 0 ? (
              <div className="space-y-4">
                {recentAssessments.map((assessment) => {
                  const displayScore = getDisplayScore(assessment);
                  const scoreLabel = getScoreLabel(assessment);
                  
                  return (
                    <div key={assessment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{assessment.title || assessment.organisation_name}</p>
                        <p className="text-sm text-slate-600">
                          {assessment.organisation_name || 'Organisation Assessment'}
                        </p>
                        <p className="text-xs text-slate-500">
                          Framework: {assessment.compliance_frameworks?.name || 'Unknown Framework'}                        </p>
                        <p className="text-xs text-slate-500">
                          {assessment.created_at ? new Date(assessment.created_at).toLocaleDateString() : 'Recent'}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getScoreBadgeVariant(displayScore)}>
                          {displayScore}% {scoreLabel}
                        </Badge>
                        <p className="text-xs text-slate-500 mt-1">
                          <Badge variant={getStatusBadgeVariant(assessment.status)} className="text-xs">
                            {assessment.status === 'completed' ? 'Completed' :
                             assessment.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No assessments yet</p>
                <Button className="mt-4" onClick={() => window.location.href = '/fortify-one/compliance'}>
                  Start Assessment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Compliance Status
            </CardTitle>
            <CardDescription>Framework compliance overview</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(dashboardData.complianceStatus).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(dashboardData.complianceStatus).map(([framework, data]) => (
                  <div key={framework} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{framework}</span>
                      <span className={`font-bold ${getScoreColour(data.percentage)}`}>
                        {data.percentage}% Compliant
                      </span>
                    </div>
                    <Progress value={data.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No compliance data yet</p>
                <Button className="mt-4" onClick={() => window.location.href = '/fortify-one/compliance'}>
                  Start Compliance Check
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;