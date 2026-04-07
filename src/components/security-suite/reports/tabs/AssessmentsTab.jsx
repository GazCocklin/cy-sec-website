import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AssessmentsTab = ({ assessments }) => {
  const navigate = useNavigate();
  const metrics = {
    totalAssessments: assessments.length,
    averageScore: assessments.length > 0 
      ? Math.round(assessments.reduce((sum, a) => sum + (a.overall_score || 0), 0) / assessments.length)
      : 0
  };

  if (assessments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assessment Analysis</CardTitle>
          <CardDescription>Detailed breakdown of your security assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No assessment data</h3>
            <p className="text-slate-600">Complete some assessments to see detailed reports here.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment Analysis</CardTitle>
        <CardDescription>Detailed breakdown of your security assessments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{metrics.totalAssessments}</div>
              <div className="text-sm text-blue-800">Total Assessments</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{metrics.averageScore}%</div>
              <div className="text-sm text-purple-800">Average Score</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Assessment Details</h3>
            {assessments.map((assessment) => (
              <div key={assessment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{assessment.title}</h4>
                    <p className="text-sm text-slate-600">{assessment.organisation_name} | {assessment.compliance_frameworks.name}</p>
                  </div>
                  <Badge variant="default" className="bg-green-500 text-white">
                    Completed
                  </Badge>
                </div>
                
                {assessment.overall_score != null && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Score</span>
                      <span className="font-medium">{assessment.overall_score}%</span>
                    </div>
                    <Progress value={assessment.overall_score} className="h-2" />
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                   <p className="text-sm text-slate-500">
                    Completed on: {new Date(assessment.completion_date).toLocaleDateString()}
                  </p>
                  <Button size="sm" onClick={() => navigate(`/fortify-one/assessment-report/${assessment.id}`)}>
                    View Full Report
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentsTab;