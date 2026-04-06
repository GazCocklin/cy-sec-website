import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const RiskDistribution = ({ data }) => {
  const totalRisks = Object.values(data).reduce((sum, count) => sum + count, 0);
  if (totalRisks === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Distribution</CardTitle>
          <CardDescription>Breakdown of identified risks by severity.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <p>No risk data available.</p>
        </CardContent>
      </Card>
    );
  }

  const riskLevels = [
    { name: 'low', colour: 'bg-green-500', label: 'Low' },
    { name: 'medium', colour: 'bg-yellow-500', label: 'Medium' },
    { name: 'high', colour: 'bg-red-500', label: 'High' },
  ];

  let accumulatedPercentage = 0;
  const segments = riskLevels.map(level => {
    const percentage = totalRisks > 0 ? (data[level.name] || 0) / totalRisks * 100 : 0;
    const item = { ...level, percentage };
    accumulatedPercentage += percentage;
    return item;
  });

  const gradient = `conic-gradient(
    from 0deg,
    ${riskLevels[0].colour.replace('bg-', '')}-500 0deg ${segments[0].percentage}%,
    ${riskLevels[1].colour.replace('bg-', '')}-500 ${segments[0].percentage}% ${segments[0].percentage + segments[1].percentage}%,
    ${riskLevels[2].colour.replace('bg-', '')}-500 ${segments[0].percentage + segments[1].percentage}% 100%
  )`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Distribution</CardTitle>
        <CardDescription>Breakdown of identified risks by severity.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center justify-around gap-6">
        <div 
          className="w-40 h-40 rounded-full flex items-center justify-center"
          style={{ background: gradient }}
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-center">
            <span className="text-2xl font-bold text-slate-800">{totalRisks}</span>
            <span className="text-xs text-slate-500 ml-1">Risks</span>
          </div>
        </div>
        <div className="space-y-3">
          {riskLevels.map(level => (
            <div key={level.name} className="flex items-center">
              <span className={`w-4 h-4 rounded-full mr-3 ${level.colour}`}></span>
              <span className="font-medium text-slate-700">{level.label}:</span>
              <span className="ml-auto font-semibold text-slate-800">{data[level.name] || 0}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskDistribution;