import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const OverallScore = ({ score, title = "Overall Compliance Score", description = "A measure of your adherence to the framework." }) => {
  const getScoreColour = (s) => s >= 80 ? 'text-green-500' : s >= 60 ? 'text-yellow-500' : 'text-red-500';
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card className="h-full bg-gradient-to-br from-slate-50 to-gray-100">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={radius} strokeWidth="15" className="stroke-slate-200" fill="none" />
            <circle
              cx="70" cy="70" r={radius} strokeWidth="15"
              className={`transform -rotate-90 origin-center transition-all duration-1000 ${getScoreColour(score)}`}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold ${getScoreColour(score)}`}>{score}%</span>
            <span className="text-slate-500 font-medium">Risk Score</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallScore;