import React from 'react';
import { Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ComplianceTab = ({ reportData }) => {
  if (reportData.compliance.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Compliance Analysis</CardTitle>
          <CardDescription>Track your compliance across different frameworks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No compliance data</h3>
            <p className="text-slate-600">Start tracking compliance to see detailed reports here.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Analysis</CardTitle>
        <CardDescription>Track your compliance across different frameworks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportData.compliance.map((item) => (
              <div key={item.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">{item.compliance_frameworks?.name}</h3>
                  <Badge variant={item.compliance_percentage >= 80 ? 'default' : item.compliance_percentage >= 60 ? 'secondary' : 'destructive'}>
                    {item.compliance_status}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compliance Progress</span>
                      <span className="font-medium">{item.compliance_percentage}%</span>
                    </div>
                    <Progress value={item.compliance_percentage} className="h-3" />
                  </div>
                  <div className="text-sm text-slate-600">
                    <p>Framework: {item.compliance_frameworks?.description}</p>
                    <p>Version: {item.compliance_frameworks?.version}</p>
                    {item.last_assessment_date && (
                      <p>Last assessed: {new Date(item.last_assessment_date).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceTab;