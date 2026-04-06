import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ComplianceBySection = ({ data, title = "Compliance by Section", description = "Your compliance score for each framework section." }) => {
  const getScoreColour = (score) => score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map(section => (
            <div key={section.name}>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-slate-700">{section.name}</p>
                <p className="text-sm font-semibold text-slate-800">{section.score}%</p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${getScoreColour(section.score)}`}
                  style={{ width: `${section.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceBySection;