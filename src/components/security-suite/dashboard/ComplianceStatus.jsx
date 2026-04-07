import React from 'react';
import { CheckCircle, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

const ComplianceStatus = ({ complianceStatus }) => {
  const navigate = useNavigate();

  const getScoreColour = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Compliance Status
        </CardTitle>
        <CardDescription>Framework compliance overview</CardDescription>
      </CardHeader>
      <CardContent>
        {Object.keys(complianceStatus).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(complianceStatus).map(([framework, data]) => (
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
            <Button className="mt-4" onClick={() => navigate('/fortify-one/compliance')}>
              Start Compliance Check
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceStatus;