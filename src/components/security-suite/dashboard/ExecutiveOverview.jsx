import React from 'react';
    import { Shield, Activity, CheckCircle, AlertTriangle, BarChart, TrendingUp, ThumbsUp, AlertCircle, Award } from 'lucide-react';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { Badge } from '@/components/ui/badge';
    import QuickActions from '@/components/security-suite/dashboard/QuickActions';
    import RiskDistributionChart from '@/components/security-suite/dashboard/RiskDistributionChart';

    const ExecutiveOverview = ({ assessments, riskData, complianceStatus, openCreateAssessmentDialog }) => {
      const complianceScores = Object.values(complianceStatus || {}).map(s => s.percentage);

      const maturityScore = complianceScores.length > 0
        ? Math.round(complianceScores.reduce((sum, score) => sum + score, 0) / complianceScores.length)
        : 0;

      const getMaturityLevel = (score) => {
        if (score >= 90) return { label: 'Excellent', color: 'text-emerald-500', bgColor: 'bg-emerald-500', Icon: Award };
        if (score >= 75) return { label: 'Good', color: 'text-green-500', bgColor: 'bg-green-500', Icon: ThumbsUp };
        if (score >= 50) return { label: 'Needs Improvement', color: 'text-yellow-500', bgColor: 'bg-yellow-500', Icon: AlertCircle };
        return { label: 'Poor', color: 'text-red-500', bgColor: 'bg-red-500', Icon: AlertTriangle };
      };

      const maturity = getMaturityLevel(maturityScore);

      const maturityLevels = [
        { label: 'Excellent', range: '90-100%', description: 'Proactive and adaptive security posture.', Icon: Award, color: 'text-emerald-500' },
        { label: 'Good', range: '75-89%', description: 'Effective security controls are in place.', Icon: ThumbsUp, color: 'text-green-500' },
        { label: 'Needs Improvement', range: '50-74%', description: 'Basic controls exist but require attention.', Icon: AlertCircle, color: 'text-yellow-500' },
        { label: 'Poor', range: '0-49%', description: 'Significant security gaps identified.', Icon: AlertTriangle, color: 'text-red-500' },
      ];

      const metrics = {
        totalAssessments: assessments.length,
        frameworksCovered: new Set(assessments.map(a => a.compliance_frameworks.name)).size
      };

      const riskCounts = riskData.reduce((acc, curr) => {
        if (curr.risk_rating) {
          const rating = curr.risk_rating.toLowerCase();
          acc[rating] = (acc[rating] || 0) + 1;
        }
        return acc;
      }, { critical: 0, high: 0, medium: 0, low: 0 });
      
      const riskDefinitions = [
        { level: 'critical', color: 'bg-red-500', description: 'Immediate threat; requires urgent action.' },
        { level: 'high', color: 'bg-orange-500', description: 'Significant threat; requires prompt attention.' },
        { level: 'medium', color: 'bg-yellow-400', description: 'Moderate threat; address in a timely manner.' },
        { level: 'low', color: 'bg-blue-500', description: 'Minor threat; address during regular maintenance.' },
      ];

      const totalRisks = Object.values(riskCounts).reduce((sum, count) => sum + count, 0);

      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Organisational Security Maturity
                </CardTitle>
                <CardDescription>A holistic score based on your latest compliance assessments.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative h-32 w-32">
                      <svg className="transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="54" fill="none" strokeWidth="12" className="stroke-slate-200" />
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          strokeWidth="12"
                          className={`stroke-current ${maturity.color}`}
                          strokeDasharray={2 * Math.PI * 54}
                          strokeDashoffset={(2 * Math.PI * 54) * (1 - maturityScore / 100)}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-slate-800">{maturityScore}%</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 text-lg font-semibold ${maturity.color}`}>
                      <maturity.Icon className="h-6 w-6" />
                      <span>{maturity.label}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 w-full">
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
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-700 text-center md:text-left">Maturity Level Guide</h4>
                    {maturityLevels.map((level) => (
                      <div key={level.label} className="flex items-start gap-3 p-2 rounded-lg bg-slate-50">
                        <level.Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${level.color}`} />
                        <div>
                          <p className="font-semibold text-sm">
                            {level.label} <span className="font-normal text-slate-500">({level.range})</span>
                          </p>
                          <p className="text-xs text-slate-600">{level.description}</p>
                        </div>
                      </div>
                    ))}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <RiskDistributionChart riskCounts={riskCounts} totalRisks={totalRisks} />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-700 text-center md:text-left">Risk Level Definitions</h4>
                      {riskDefinitions.map((risk) => (
                        <div key={risk.level} className="flex items-start gap-3 p-2 rounded-lg bg-slate-50">
                          <span className={`h-3 w-3 mt-1.5 flex-shrink-0 rounded-full ${risk.color}`}></span>
                          <div>
                            <p className="font-semibold text-sm capitalize">{risk.level}</p>
                            <p className="text-xs text-slate-600">{risk.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BarChart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">No risk data available.</p>
                    <p className="text-sm text-slate-500 mt-2">Complete an assessment to see your risk distribution.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <QuickActions openCreateAssessmentDialog={openCreateAssessmentDialog} />

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
    export default ExecutiveOverview;