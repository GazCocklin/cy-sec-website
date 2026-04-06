import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, BarChart2, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TrendsSnapshot = ({ assessments }) => {
  const navigate = useNavigate();

  const trendsByFramework = assessments.reduce((acc, assessment) => {
    const frameworkName = assessment.compliance_frameworks.name;
    if (!acc[frameworkName]) {
      acc[frameworkName] = [];
    }
    acc[frameworkName].push({
      date: new Date(assessment.completion_date),
      score: assessment.overall_score,
      id: assessment.id,
    });
    return acc;
  }, {});

  Object.keys(trendsByFramework).forEach(framework => {
    trendsByFramework[framework].sort((a, b) => a.date - b.date);
  });

  const getTrendIndicator = (currentScore, prevScore) => {
    if (prevScore === null || prevScore === undefined) {
      return { Icon: Minus, colour: 'text-slate-500', change: 0 };
    }
    const change = currentScore - prevScore;
    if (change > 0) return { Icon: ArrowUp, colour: 'text-green-500', change };
    if (change < 0) return { Icon: ArrowDown, colour: 'text-red-500', change };
    return { Icon: Minus, colour: 'text-slate-500', change: 0 };
  };

  const snapshotData = Object.entries(trendsByFramework).map(([framework, data]) => {
    if (data.length === 0) return null;
    const latest = data[data.length - 1];
    const previous = data.length > 1 ? data[data.length - 2] : null;
    return {
      framework,
      latestScore: latest.score,
      trend: getTrendIndicator(latest.score, previous?.score)
    };
  }).filter(Boolean).slice(0, 4);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trends Snapshot
        </CardTitle>
        <CardDescription>Recent score changes by framework</CardDescription>
      </CardHeader>
      <CardContent>
        {snapshotData.length > 0 ? (
          <div className="space-y-4">
            {snapshotData.map(item => (
              <div key={item.framework} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-sm">{item.framework}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{item.latestScore}%</span>
                  <div className={`flex items-center font-semibold text-sm ${item.trend.colour}`}>
                    <item.trend.Icon className="h-4 w-4" />
                    <span>{item.trend.change > 0 ? `+${item.trend.change}` : item.trend.change}</span>
                  </div>
                </div>
              </div>
            ))}
             <Button className="w-full mt-4" variant="outline" onClick={() => navigate('/security-suite/reports')}>
              View Full Trends Report
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <BarChart2 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Complete more assessments to see trends.</p>
            <Button className="mt-4" onClick={() => navigate('/security-suite/reports')}>
              Go to Reports
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendsSnapshot;