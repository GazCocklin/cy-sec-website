import React from 'react';
import { Shield, Activity, CheckCircle, AlertTriangle, BarChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import QuickActions from '@/components/security-suite/dashboard/QuickActions';

const ExecutiveOverviewTab = ({ assessments, riskData }) => {
  const metrics = {
    totalAssessments: assessments.length,
    averageScore: assessments.length > 0 
      ? Math.round(assessments.reduce((sum, a) => sum + (a.overall_score || 0), 0) / assessments.length)
      : 0,
    frameworksCovered: new Set(assessments.map(a => a.compliance_frameworks.name)).size
  };

  const riskCounts = riskData.reduce((acc, curr) => {
    if (curr.risk_rating) {
      const rating = curr.risk_rating.toLowerCase();
      acc[rating] = (acc[rating] || 0) + 1;
    }
    return acc;
  }, { critical: 0, high: 0, medium: 0, low: 0 });

  const riskColours = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-400',
    low: 'bg-blue-500',
  };

  const totalRisks = Object.values(riskCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <div className="text-2xl font-bold text-green-600">{metrics.totalAssessments}</div>
                  <div className="text-sm text-slate-600">Completed Assessments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{metrics.frameworksCovered}</div>
                  <div className="text-sm text-slate-600">Frameworks Covered</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Distribution
            </CardTitle>
            <CardDescription>Breakdown of identified risks by severity</CardDescription>
          </CardHeader>
          <CardContent>
            {totalRisks > 0 ? (
              <div className="space-y-3">
                <div className="w-full flex h-8 rounded-full overflow-hidden">
                  {Object.entries(riskCounts).map(([level, count]) => {
                    if (count === 0) return null;
                    const percentage = (count / totalRisks) * 100;
                    return (
                      <div
                        key={level}
                        className={`${riskColours[level]}`}
                        style={{ width: `${percentage}%` }}
                        title={`${level.charAt(0).toUpperCase() + level.slice(1)}: ${count}`}
                      />
                    );
                  })}
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
                  {Object.entries(riskCounts).map(([level, count]) => (
                     <div key={level} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${riskColours[level]}`}></span>
                        <span className="capitalize">{level}</span>
                      </div>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No risk data available.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <QuickActions />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recently Completed Assessments
          </CardTitle>
          <CardDescription>Latest security assessments that have been finalised</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.slice(0, 5).map((assessment) => (
              <div key={assessment.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{assessment.title}</p>
                  <p className="text-xs text-slate-600">{assessment.organisation_name} | {assessment.compliance_frameworks.name}</p>
                </div>
                <div className="text-right">
                  <Badge variant={assessment.overall_score >= 80 ? 'default' : assessment.overall_score >= 60 ? 'secondary' : 'destructive'}>
                    {assessment.overall_score || 0}%
                  </Badge>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(assessment.completion_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            
            {assessments.length === 0 && (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No recent activity</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveOverviewTab;