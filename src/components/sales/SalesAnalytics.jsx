import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Mail, 
  Phone,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const SalesAnalytics = () => {
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState({
    leads: {
      total: 0,
      thisMonth: 0,
      conversionRate: 0,
      sources: {}
    },
    revenue: {
      mrr: 0,
      arr: 0,
      growth: 0
    },
    customers: {
      total: 0,
      active: 0,
      churn: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      
      // Load contact submissions as leads
      const { data: submissions, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Calculate analytics
      const now = new Date();
      const thisMonth = submissions?.filter(sub => {
        const subDate = new Date(sub.created_at);
        return subDate.getMonth() === now.getMonth() && subDate.getFullYear() === now.getFullYear();
      }).length || 0;

      // Mock revenue data (replace with actual subscription data)
      const mockRevenue = {
        mrr: 15750, // Monthly Recurring Revenue
        arr: 189000, // Annual Recurring Revenue
        growth: 23.5 // Growth percentage
      };

      // Mock customer data
      const mockCustomers = {
        total: 127,
        active: 119,
        churn: 2.3
      };

      setAnalytics({
        leads: {
          total: submissions?.length || 0,
          thisMonth,
          conversionRate: 12.5, // Mock conversion rate
          sources: {
            'Website Contact': thisMonth * 0.6,
            'Lead Magnet': thisMonth * 0.25,
            'Referral': thisMonth * 0.15
          }
        },
        revenue: mockRevenue,
        customers: mockCustomers
      });

    } catch (error) {
      console.error('Error loading analytics:', error);
      toast({
        title: 'Error',
        description: 'Failed to load sales analytics.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const salesActions = [
    {
      title: 'Follow Up Leads',
      description: 'Contact new leads from this week',
      count: analytics.leads.thisMonth,
      action: 'View Leads',
      colour: 'blue',
      icon: Mail
    },
    {
      title: 'Schedule Demos',
      description: 'Book product demonstrations',
      count: Math.floor(analytics.leads.thisMonth * 0.3),
      action: 'Schedule',
      colour: 'purple',
      icon: Calendar
    },
    {
      title: 'Close Deals',
      description: 'Opportunities ready to close',
      count: Math.floor(analytics.leads.thisMonth * 0.15),
      action: 'Review',
      colour: 'green',
      icon: Target
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Sales Analytics</h2>
          <p className="text-slate-600">Track leads, revenue, and growth metrics</p>
        </div>
        <Button 
          onClick={loadAnalytics}
          variant="outline"
          className="bg-white"
        >
          <Activity className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-slate-800">{analytics.leads.total}</p>
                <p className="text-xs text-green-600">+{analytics.leads.thisMonth} this month</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-slate-800">£{analytics.revenue.mrr.toLocaleString()}</p>
                <p className="text-xs text-green-600">+{analytics.revenue.growth}% growth</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-slate-800">{analytics.leads.conversionRate}%</p>
                <p className="text-xs text-blue-600">Industry avg: 8%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-slate-800">{analytics.customers.active}</p>
                <p className="text-xs text-green-600">{analytics.customers.churn}% churn rate</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {salesActions.map((action, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <action.icon className={`h-8 w-8 text-${action.colour}-600`} />
                <Badge className={`bg-${action.colour}-100 text-${action.colour}-800`}>
                  {action.count}
                </Badge>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{action.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{action.description}</p>
              <Button 
                size="sm" 
                className={`w-full bg-${action.colour}-600 hover:bg-${action.colour}-700`}
                onClick={() => toast({
                  title: `${action.title} Action`,
                  description: `Opening ${action.title.toLowerCase()} management interface...`,
                })}
              >
                {action.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Professional Plans</span>
                <span className="font-medium">£{Math.floor(analytics.revenue.mrr * 0.65).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Enterprise Plans</span>
                <span className="font-medium">£{Math.floor(analytics.revenue.mrr * 0.30).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Training Services</span>
                <span className="font-medium">£{Math.floor(analytics.revenue.mrr * 0.05).toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total MRR</span>
                  <span>£{analytics.revenue.mrr.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-purple-600" />
              Lead Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analytics.leads.sources).map(([source, count]) => (
                <div key={source} className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">{source}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(count / analytics.leads.thisMonth) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-sm">{Math.floor(count)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Projections */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Projections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-2">Next Month Target</h4>
              <p className="text-2xl font-bold text-blue-600">£{Math.floor(analytics.revenue.mrr * 1.15).toLocaleString()}</p>
              <p className="text-sm text-slate-600">+15% growth target</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-2">Quarterly Goal</h4>
              <p className="text-2xl font-bold text-green-600">£{Math.floor(analytics.revenue.mrr * 1.45).toLocaleString()}</p>
              <p className="text-sm text-slate-600">+45% quarterly target</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-2">Annual Target</h4>
              <p className="text-2xl font-bold text-purple-600">£{Math.floor(analytics.revenue.arr * 2.5).toLocaleString()}</p>
              <p className="text-sm text-slate-600">2.5x annual growth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesAnalytics;