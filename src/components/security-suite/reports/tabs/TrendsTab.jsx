import React from 'react';
import { TrendingUp, BarChart2, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const TrendsTab = ({ assessments }) => {
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Score Trends by Framework
          </CardTitle>
          <CardDescription>Track your assessment scores over time for each compliance framework.</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(trendsByFramework).length > 0 ? (
            <div className="space-y-8">
              {Object.entries(trendsByFramework).map(([framework, data]) => (
                <div key={framework}>
                  <h3 className="font-semibold mb-4 text-lg text-slate-800">{framework}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {data.map((item, index) => {
                      const prevScore = index > 0 ? data[index - 1].score : null;
                      const { Icon, colour, change } = getTrendIndicator(item.score, prevScore);

                      return (
                        <motion.div
                          key={item.id}
                          className="bg-slate-50 rounded-lg p-4 flex flex-col items-center justify-center text-center border-l-4"
                          style={{ borderLeftColor: item.score >= 80 ? '#22c55e' : item.score >= 60 ? '#f59e0b' : '#ef4444' }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="text-3xl font-bold" style={{ color: item.score >= 80 ? '#16a34a' : item.score >= 60 ? '#d97706' : '#dc2626' }}>
                            {item.score}%
                          </div>
                          <div className={`flex items-center font-semibold text-sm mt-1 ${colour}`}>
                            <Icon className="h-4 w-4 mr-1" />
                            <span>{change > 0 ? `+${change}` : change}{change !== 0 && '%'}</span>
                          </div>
                          <span className="text-xs text-slate-500 mt-2">{item.date.toLocaleDateString()}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart2 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Not enough data for trends</h3>
              <p className="text-slate-600">Complete more assessments to see your progress over time.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendsTab;