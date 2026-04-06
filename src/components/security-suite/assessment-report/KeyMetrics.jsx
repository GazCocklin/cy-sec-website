import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, ShieldOff, FileQuestion } from 'lucide-react';

const KeyMetrics = ({ responses }) => {
  const metrics = {
    compliant: responses.filter(r => r.score >= 80).length,
    mediumRisk: responses.filter(r => r.risk_rating === 'medium').length,
    highRisk: responses.filter(r => r.risk_rating === 'high' || r.risk_rating === 'critical').length,
    totalQuestions: responses.length,
  };

  const metricCards = [
    { title: 'Compliant Controls', value: metrics.compliant, icon: CheckCircle, colour: 'text-green-500' },
    { title: 'High-Risk Items', value: metrics.highRisk, icon: ShieldOff, colour: 'text-red-500' },
    { title: 'Medium-Risk Items', value: metrics.mediumRisk, icon: AlertTriangle, colour: 'text-yellow-500' },
    { title: 'Total Controls Assessed', value: metrics.totalQuestions, icon: FileQuestion, colour: 'text-blue-500' },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {metricCards.map(metric => (
          <div key={metric.title} className="bg-slate-50 p-3 rounded-lg flex items-center space-x-3">
            <metric.icon className={`h-8 w-8 ${metric.colour}`} />
            <div>
              <p className="text-xl font-bold text-slate-800">{metric.value}</p>
              <p className="text-xs text-slate-600">{metric.title}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default KeyMetrics;