import React from 'react';
import { Shield, Activity, Building, FileText, Target, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const OverviewTab = ({ reportData, generateReport }) => {
  const metrics = {
    totalAssessments: reportData.assessments.length,
    completedAssessments: reportData.assessments.filter(a => a.assessment_status === 'completed').length,
    averageScore: reportData.assessments.length > 0 
      ? Math.round(reportData.assessments.reduce((sum, a) => sum + (a.overall_score || 0), 0) / reportData.assessments.length)
      : 0,
    complianceFrameworks: reportData.compliance.length
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Posture Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Posture Summary
            </CardTitle>
            <CardDescription>Overall security health of your organisation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Security Score</span>
                  <span className="font-medium">{metrics.averageScore}%</span>
                </div>
                <Progress value={metrics.averageScore} className="h-3" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{metrics.completedAssessments}</div>
                  <div className="text-sm text-slate-600">Completed Assessments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{metrics.complianceFrameworks}</div>
                  <div className="text-sm text-slate-600">Compliance Frameworks</div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Risk Distribution</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">High Risk</span>
                    <Badge variant="destructive">2</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medium Risk</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Low Risk</span>
                    <Badge variant="default">8</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Security Activity
            </CardTitle>
            <CardDescription>Latest security events and assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.assessments.slice(0, 5).map((assessment, index) => (
                <div key={assessment.id || index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {assessment.assessment_status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{assessment.assessment_type} Assessment</p>
                    <p className="text-xs text-slate-600">{assessment.organisation_name}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={assessment.overall_score >= 80 ? 'default' : assessment.overall_score >= 60 ? 'secondary' : 'destructive'}>
                      {assessment.overall_score || 0}%
                    </Badge>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(assessment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {reportData.assessments.length === 0 && (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>Create detailed reports for different stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => generateReport('Executive Summary')}
            >
              <Building className="h-6 w-6" />
              Executive Summary
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => generateReport('Technical Report')}
            >
              <FileText className="h-6 w-6" />
              Technical Report
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => generateReport('Compliance Report')}
            >
              <Target className="h-6 w-6" />
              Compliance Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;