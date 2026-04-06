import React from 'react';
import { Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FrameworksGrid = ({ frameworks }) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Available Compliance Frameworks
        </CardTitle>
        <CardDescription>Industry-standard frameworks we support</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {frameworks.map((framework) => (
            <div key={framework.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">{framework.name}</h3>
              <p className="text-sm text-slate-600 mb-3">{framework.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Requirements: {framework.requirements_count}</span>
                <Badge variant="outline">{framework.version}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FrameworksGrid;