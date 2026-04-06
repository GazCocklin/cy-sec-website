import React from 'react';
import { Users, AlertTriangle, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const VendorStats = ({ vendors }) => {
  const riskStats = {
    total: (vendors || []).length,
    high: (vendors || []).filter(v => v.risk_level === 'high').length || 0,
    medium: (vendors || []).filter(v => v.risk_level === 'medium').length || 0,
    low: (vendors || []).filter(v => v.risk_level === 'low').length || 0,
    avgScore: 0 // Placeholder
  };

  const stats = [
    {
      title: 'Total Vendors',
      value: riskStats.total,
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'High Risk',
      value: riskStats.high,
      icon: AlertTriangle,
      gradient: 'from-red-500 to-rose-600'
    },
    {
      title: 'Medium Risk',
      value: riskStats.medium,
      icon: Clock,
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Low Risk',
      value: riskStats.low,
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Avg Score',
      value: riskStats.avgScore + '%',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-violet-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className={`bg-gradient-to-br ${stat.gradient} text-white border-0 shadow-lg`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VendorStats;