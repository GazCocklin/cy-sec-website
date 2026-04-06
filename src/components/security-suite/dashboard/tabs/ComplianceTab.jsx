import React from 'react';
import { Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ComplianceTab = ({ dashboardData }) => {
  const getScoreColour = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Overview</CardTitle>
        <CardDescription>Track your compliance across different frameworks</CardDescription>
      </CardHeader>
      <CardContent>
        {Object.keys(dashboardData.complianceStatus).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(dashboardData.complianceStatus).map(([framework, data]) => (
              <div key={framework} className="border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">{framework}</h3>
                  <Badge variant={data.percentage >= 80 ? 'default' : data.percentage >= 60 ? 'secondary' : 'destructive'}>
                    {data.status}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compliance Progress</span>
                      <span className={`font-medium ${getScoreColour(data.percentage)}`}>
                        {data.percentage}%
                      </span>
                    </div>
                    <Progress value={data.percentage} className="h-3" />
                  </div>
                  {data.lastAssessment && (
                    <p className="text-sm text-slate-600">
                      Last assessed: {new Date(data.lastAssessment).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No compliance data</h3>
            <p className="text-slate-600 mb-6">Start tracking your compliance with industry frameworks.</p>
            <Button onClick={() => window.location.href = '/security-suite/compliance'}>
              Start Compliance Assessment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceTab;