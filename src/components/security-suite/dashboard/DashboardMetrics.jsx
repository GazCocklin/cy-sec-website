import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Target, AlertTriangle, FileSpreadsheet, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const DashboardMetrics = ({ dashboardData, onDownloadRiskSummary, isDownloadingSummary }) => {
  const getRiskProfile = () => {
    if (!dashboardData.riskSummary) {
      return {
        level: 'Unknown',
        subtitle: 'Risk data unavailable.',
        gradient: 'from-slate-500 to-slate-600',
      };
    }

    const { critical = 0, high = 0, medium = 0, low = 0 } = dashboardData.riskSummary;
    let level, gradient;

    if (critical > 0) {
      level = 'Critical';
      gradient = 'from-black to-red-800';
    } else if (high > 0) {
      level = 'High';
      gradient = 'from-red-500 to-red-600';
    } else if (medium > 0) {
      level = 'Medium';
      gradient = 'from-orange-500 to-orange-600';
    } else {
      level = 'Low';
      gradient = 'from-green-500 to-green-600';
    }

    const subtitleParts = [];
    if (critical > 0) subtitleParts.push(`${critical} critical`);
    if (high > 0) subtitleParts.push(`${high} high`);
    if (medium > 0) subtitleParts.push(`${medium} medium`);
    if (low > 0) subtitleParts.push(`${low} low`);

    const subtitle = subtitleParts.length > 0 
      ? `${subtitleParts.join(', ')}.`
      : 'No significant risks found.';
    
    return { level, subtitle, gradient };
  };

  const riskProfile = getRiskProfile();

  const metrics = [
    {
      title: 'Overall Security Score',
      value: dashboardData.overallScore + '%',
      icon: Shield,
      gradient: 'from-blue-500 to-blue-600',
      showProgress: true,
      progressValue: dashboardData.overallScore
    },
    {
      title: 'Active Assessments',
      value: dashboardData.assessments.length,
      icon: FileText,
      gradient: 'from-green-500 to-green-600',
      subtitle: `${dashboardData.assessments.filter(a => a.status === 'in_progress').length} in progress`
    },
    {
      title: 'Compliance Frameworks',
      value: Object.keys(dashboardData.complianceStatus).length,
      icon: Target,
      gradient: 'from-purple-500 to-purple-600',
      subtitle: 'Actively monitored'
    },
    {
      title: 'Risk Summary',
      value: riskProfile.level,
      icon: AlertTriangle,
      gradient: riskProfile.gradient,
      subtitle: riskProfile.subtitle,
      hasExtraAction: true,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="h-full"
        >
          <Card className={`bg-gradient-to-br ${metric.gradient} text-white border-0 flex flex-col h-full`}>
            <CardContent className="p-6 flex-grow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{metric.title}</p>
                  <p className="text-3xl font-bold">{metric.value}</p>
                </div>
                <metric.icon className="h-8 w-8 text-white/60" />
              </div>
              {metric.showProgress && (
                <Progress value={metric.progressValue} className="mt-3 bg-white/20" />
              )}
              {metric.subtitle && (
                <p className="text-white/80 text-sm mt-2">{metric.subtitle}</p>
              )}
            </CardContent>
            {metric.hasExtraAction && (
              <div className="px-6 pb-4">
                <Button
                  variant="secondary"
                  className="w-full bg-white/20 hover:bg-white/30 text-white"
                  onClick={onDownloadRiskSummary}
                  disabled={isDownloadingSummary}
                >
                  {isDownloadingSummary ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                  )}
                  {isDownloadingSummary ? 'Exporting...' : 'Export Risk Summary'}
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardMetrics;