import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';

const TopRisks = ({ responses, questions }) => {
  const getRiskBadge = (risk) => {
    const riskLevel = risk?.toLowerCase();
    if (riskLevel === 'critical') {
      return <Badge variant="destructive" className="bg-red-700 text-white">Critical</Badge>;
    }
    if (riskLevel === 'high') {
      return <Badge variant="destructive">High</Badge>;
    }
    if (riskLevel === 'medium') {
      return <Badge variant="secondary" className="bg-yellow-500 text-black">Medium</Badge>;
    }
    if (riskLevel === 'low') {
      return <Badge className="bg-green-500 text-white">Low</Badge>;
    }
    return <Badge variant="outline">Unknown</Badge>;
  };

  const getRiskIcon = (risk) => {
    const riskLevel = risk?.toLowerCase();
    if (riskLevel === 'critical') {
      return <ShieldAlert className="h-5 w-5 text-red-700" />;
    }
    if (riskLevel === 'high') {
      return <ShieldAlert className="h-5 w-5 text-red-500" />;
    }
    if (riskLevel === 'medium') {
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
    if (riskLevel === 'low') {
      return <ShieldCheck className="h-5 w-5 text-green-500" />;
    }
    return <ShieldQuestion className="h-5 w-5 text-slate-500" />;
  };

  const topRisks = responses
    .filter(r => r.score < 80)
    .sort((a, b) => (a.score || 0) - (b.score || 0))
    .slice(0, 5)
    .map(response => {
      const question = questions.find(q => q.id === response.question_id);
      return {
        ...response,
        questionText: question ? `${question.section_code}-${question.question_number}: ${question.question_text}` : 'Unknown Question',
      };
    });

  if (topRisks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Highest-Risk Controls</CardTitle>
          <CardDescription>Controls with the lowest compliance scores.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-center">
          <ShieldCheck className="h-12 w-12 text-green-500 mb-4" />
          <p className="font-semibold">No significant risks found!</p>
          <p className="text-sm text-slate-500">All controls are compliant.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Highest-Risk Controls</CardTitle>
        <CardDescription>Controls with the lowest compliance scores.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {topRisks.map(risk => (
            <li key={risk.id} className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="flex-shrink-0 pt-1">
                {getRiskIcon(risk.risk_rating)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{risk.questionText}</p>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-slate-500">Score: <span className="font-bold text-red-600">{risk.score}%</span></span>
                  {getRiskBadge(risk.risk_rating)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TopRisks;