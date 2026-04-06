import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Users, FileText, TrendingUp, AlertTriangle, CheckCircle, Clock, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const SecuritySuiteDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    assessments: [],
    vendors: [],
    compliance: [],
    recentActivity: []
  });
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/security-suite/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setIsLoadingData(true);
      
      // Load security assessments
      const { data: assessments, error: assessmentsError } = await supabase
        .from('security_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (assessmentsError) throw assessmentsError;

      // Load compliance tracking
      const { data: compliance, error: complianceError } = await supabase
        .from('compliance_tracking')
        .select(`
          *,
          compliance_frameworks (
            name,
            description
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (complianceError) throw complianceError;

      setDashboardData({
        assessments: assessments || [],
        vendors: [], // Will be populated when vendor management is implemented
        compliance: compliance || [],
        recentActivity: []
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: 'Error Loading Dashboard',
        description: 'Failed to load dashboard data. Please refresh the page.',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleCreateAssessment = () => {
    navigate('/security-suite/compliance');
  };

  const handleViewReports = () => {
    navigate('/security-suite/reports');
  };

  const handleManageVendors = () => {
    navigate('/security-suite/vendor-risk');
  };

  if (loading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your security dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Shield,
      title: 'Active Assessments',
      value: dashboardData.assessments.filter(a => a.assessment_status === 'in_progress').length,
      change: '+12%',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Vendor Assessments',
      value: dashboardData.vendors.length,
      change: '+5%',
      color: 'text-green-600'
    },
    {
      icon: CheckCircle,
      title: 'Compliance Score',
      value: dashboardData.compliance.length > 0 
        ? Math.round(dashboardData.compliance.reduce((acc, c) => acc + (c.compliance_percentage || 0), 0) / dashboardData.compliance.length) + '%'
        : '0%',
      change: '+8%',
      color: 'text-purple-600'
    },
    {
      icon: AlertTriangle,
      title: 'Critical Issues',
      value: dashboardData.assessments.filter(a => a.risk_level === 'critical').length,
      change: '-15%',
      color: 'text-red-600'
    }
  ];

  const quickActions = [
    {
      icon: Plus,
      title: 'New Assessment',
      description: 'Start a new compliance assessment',
      action: handleCreateAssessment,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: Users,
      title: 'Manage Vendors',
      description: 'Review vendor risk assessments',
      action: handleManageVendors,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: FileText,
      title: 'Generate Report',
      description: 'Create compliance reports',
      action: handleViewReports,
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Security Suite Dashboard - Cy-Sec</title>
        <meta name="description" content="Your comprehensive cybersecurity and vendor risk management dashboard." />
      </Helmet>
      
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Security Suite <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-xl text-slate-600">
              Welcome back, {user?.user_metadata?.first_name || user?.email}! Here's your security overview.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="feature-card-border rounded-xl p-6 bg-white/90 backdrop-blur-sm shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</h3>
                <p className="text-slate-600 text-sm">{stat.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="feature-card-border rounded-xl p-6 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 cursor-pointer group shadow-lg"
                  onClick={action.action}
                >
                  <action.icon className="h-12 w-12 text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-3 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{action.title}</h3>
                  <p className="text-slate-600">{action.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity & Assessments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Assessments */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="feature-card-border rounded-xl p-6 bg-white/90 backdrop-blur-sm shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Recent Assessments</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/security-suite/compliance')}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  <Eye className="h-4 w-4 mr-2" /> View All
                </Button>
              </div>
              
              {dashboardData.assessments.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.assessments.slice(0, 3).map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-slate-800">{assessment.organization_name}</h4>
                        <p className="text-sm text-slate-600">{assessment.assessment_type} Assessment</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          assessment.assessment_status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : assessment.assessment_status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assessment.assessment_status}
                        </span>
                        {assessment.overall_score && (
                          <p className="text-sm text-slate-600 mt-1">Score: {assessment.overall_score}%</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-4">No assessments yet</p>
                  <Button
                    onClick={handleCreateAssessment}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    Create Your First Assessment
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Compliance Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="feature-card-border rounded-xl p-6 bg-white/90 backdrop-blur-sm shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Compliance Status</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/security-suite/compliance')}
                  className="text-purple-600 border-purple-600 hover:bg-purple-50"
                >
                  <BarChart3 className="h-4 w-4 mr-2" /> View Details
                </Button>
              </div>
              
              {dashboardData.compliance.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.compliance.slice(0, 3).map((item, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-800">
                          {item.compliance_frameworks?.name || 'Framework'}
                        </h4>
                        <span className="text-sm font-medium text-purple-600">
                          {item.compliance_percentage || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.compliance_percentage || 0}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        Status: {item.compliance_status}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-4">No compliance tracking yet</p>
                  <Button
                    onClick={() => navigate('/security-suite/compliance')}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    Start Compliance Tracking
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecuritySuiteDashboard;