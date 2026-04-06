import React from 'react';
import { Shield, FileText, Target, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ReportsMetrics = ({ reportData }) => {
  const metrics = {
    totalAssessments: reportData.assessments.length,
    completedAssessments: reportData.assessments.filter(a => a.assessment_status === 'completed').length,
    averageScore: reportData.assessments.length > 0 
      ? Math.round(reportData.assessments.reduce((sum, a) => sum + (a.overall_score || 0), 0) / reportData.assessments.length)
      : 0,
    highRiskItems: reportData.assessments.filter(a => a.risk_level === 'high').length,
    complianceFrameworks: reportData.compliance.length,
    averageCompliance: reportData.compliance.length > 0
      ? Math.round(reportData.compliance.reduce((sum, c) => sum + (c.compliance_percentage || 0), 0) / reportData.compliance.length)
      : 0
  };

  const metricCards = [
    {
      title: 'Security Score',
      value: metrics.averageScore + '%',
      icon: Shield,
      gradient: 'from-blue-500 to-blue-600',
      trend: '+3% from last period',
      trendIcon: TrendingUp
    },
    {
      title: 'Assessments',
      value: metrics.totalAssessments,
      icon: FileText,
      gradient: 'from-green-500 to-green-600',
      trend: '+2 this period',
      trendIcon: TrendingUp
    },
    {
      title: 'Compliance',
      value: metrics.averageCompliance + '%',
      icon: Target,
      gradient: 'from-purple-500 to-purple-600',
      trend: '+5% improvement',
      trendIcon: TrendingUp
    },
    {
      title: 'High Risk Items',
      value: metrics.highRiskItems,
      icon: AlertTriangle,
      gradient: 'from-orange-500 to-orange-600',
      trend: '-1 from last period',
      trendIcon: TrendingDown
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricCards.map((metric, index) => (
        <Card key={index} className={`bg-gradient-to-br ${metric.gradient} text-white border-0`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">{metric.title}</p>
                <p className="text-3xl font-bold">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <metric.trendIcon className="h-4 w-4 text-white/60 mr-1" />
                  <span className="text-white/60 text-sm">{metric.trend}</span>
                </div>
              </div>
              <metric.icon className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReportsMetrics;