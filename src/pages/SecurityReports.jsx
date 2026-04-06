import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, BarChart3, Shield, Users, Filter, Search, Plus, Eye, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const SecurityReports = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    type: 'compliance',
    description: '',
    include_assessments: true,
    include_vendors: true,
    include_compliance: true
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/security-suite/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadSampleReports();
    }
  }, [user]);

  const loadSampleReports = () => {
    const sampleReports = [
      {
        id: '1',
        title: 'Q1 2024 Compliance Report',
        type: 'compliance',
        description: 'Comprehensive compliance assessment across all frameworks',
        status: 'completed',
        created_at: '2024-01-15',
        file_size: '2.4 MB',
        pages: 45,
        frameworks: ['ISO 27001', 'NIST CSF'],
        overall_score: 87
      },
      {
        id: '2',
        title: 'Vendor Risk Assessment Summary',
        type: 'vendor_risk',
        description: 'Third-party vendor risk analysis and recommendations',
        status: 'completed',
        created_at: '2024-01-10',
        file_size: '1.8 MB',
        pages: 32,
        vendors_assessed: 12,
        high_risk_vendors: 2
      },
      {
        id: '3',
        title: 'Security Posture Dashboard',
        type: 'dashboard',
        description: 'Executive summary of current security status',
        status: 'generating',
        created_at: '2024-01-20',
        file_size: 'Pending',
        pages: 'Pending',
        estimated_completion: '2024-01-21'
      },
      {
        id: '4',
        title: 'GDPR Compliance Assessment',
        type: 'compliance',
        description: 'Detailed GDPR compliance review and gap analysis',
        status: 'completed',
        created_at: '2024-01-05',
        file_size: '3.1 MB',
        pages: 58,
        frameworks: ['GDPR'],
        overall_score: 92
      }
    ];
    setReports(sampleReports);
  };

  const handleCreateReport = () => {
    if (!newReport.title || !newReport.description) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in report title and description.',
        variant: 'destructive'
      });
      return;
    }

    const report = {
      id: Date.now().toString(),
      ...newReport,
      status: 'generating',
      created_at: new Date().toISOString().split('T')[0],
      file_size: 'Generating...',
      pages: 'Calculating...',
      estimated_completion: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setReports(prev => [report, ...prev]);
    setShowCreateModal(false);
    setNewReport({
      title: '',
      type: 'compliance',
      description: '',
      include_assessments: true,
      include_vendors: true,
      include_compliance: true
    });

    toast({
      title: 'Report Generation Started',
      description: 'Your report is being generated and will be ready shortly.'
    });

    // Simulate report completion after 3 seconds
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === report.id 
          ? { 
              ...r, 
              status: 'completed', 
              file_size: '2.1 MB', 
              pages: Math.floor(Math.random() * 30) + 20,
              overall_score: Math.floor(Math.random() * 20) + 80
            }
          : r
      ));
      toast({
        title: 'Report Ready!',
        description: 'Your report has been generated successfully.'
      });
    }, 3000);
  };

  const handleDownloadReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    if (report?.status !== 'completed') {
      toast({
        title: 'Report Not Ready',
        description: 'Please wait for the report generation to complete.',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Download Started',
      description: `Downloading ${report.title}...`
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'generating':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'compliance':
        return <Shield className="h-5 w-5" />;
      case 'vendor_risk':
        return <Users className="h-5 w-5" />;
      case 'dashboard':
        return <BarChart3 className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || report.type === selectedType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading security reports...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Security Reports - Security Suite</title>
        <meta name="description" content="Generate and manage comprehensive security reports for compliance and vendor risk assessments." />
      </Helmet>
      
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                Security <span className="gradient-text">Reports</span>
              </h1>
              <p className="text-xl text-slate-600">
                Generate comprehensive reports for compliance, vendor risk, and security assessments.
              </p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              <Plus className="h-5 w-5 mr-2" /> Generate Report
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              { title: 'Total Reports', value: reports.length, color: 'text-blue-600' },
              { title: 'Completed', value: reports.filter(r => r.status === 'completed').length, color: 'text-green-600' },
              { title: 'Generating', value: reports.filter(r => r.status === 'generating').length, color: 'text-yellow-600' },
              { title: 'This Month', value: reports.filter(r => new Date(r.created_at).getMonth() === new Date().getMonth()).length, color: 'text-purple-600' }
            ].map((stat, index) => (
              <div key={index} className="feature-card-border rounded-xl p-6 bg-white/90 backdrop-blur-sm shadow-lg">
                <h3 className="text-sm font-medium text-slate-600 mb-2">{stat.title}</h3>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="feature-card-border rounded-xl p-6 bg-white/90 backdrop-blur-sm shadow-lg mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-slate-300 text-slate-800"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-800"
                >
                  <option value="all">All Types</option>
                  <option value="compliance">Compliance</option>
                  <option value="vendor_risk">Vendor Risk</option>
                  <option value="dashboard">Dashboard</option>
                </select>
                <Button variant="outline" className="text-slate-600 border-slate-300">
                  <Filter className="h-4 w-4 mr-2" /> More Filters
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Reports Grid */}
          {filteredReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="feature-card-border rounded-xl p-6 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {getTypeIcon(report.type)}
                      <span className="ml-2 text-sm font-medium text-slate-600 capitalize">
                        {report.type.replace('_', ' ')}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2">{report.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{report.description}</p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Created:</span>
                      <span className="text-slate-800">{new Date(report.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Size:</span>
                      <span className="text-slate-800">{report.file_size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Pages:</span>
                      <span className="text-slate-800">{report.pages}</span>
                    </div>
                    {report.overall_score && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Score:</span>
                        <span className="font-semibold text-blue-600">{report.overall_score}%</span>
                      </div>
                    )}
                  </div>

                  {report.status === 'generating' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Generating...</span>
                        <span className="text-slate-600">Est. completion: {new Date(report.estimated_completion).toLocaleDateString()}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {report.status === 'completed' ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                          onClick={() => handleDownloadReport(report.id)}
                        >
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-purple-600 border-purple-600 hover:bg-purple-50"
                          onClick={() => toast({
                            title: "🚧 Feature Coming Soon!",
                            description: "Report preview functionality is being developed! 🚀"
                          })}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => toast({
                            title: "🚧 Feature Coming Soon!",
                            description: "Report sharing functionality is being developed! 🚀"
                          })}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-slate-400 border-slate-300"
                        disabled
                      >
                        <Calendar className="h-4 w-4 mr-2" /> Generating...
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center py-16"
            >
              <FileText className="h-24 w-24 text-slate-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">No Reports Yet</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Generate your first security report to get comprehensive insights into your compliance status and vendor risks.
              </p>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                <Plus className="h-5 w-5 mr-2" /> Generate Your First Report
              </Button>
            </motion.div>
          )}

          {/* Create Report Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-4">Generate New Report</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Report Title *
                    </label>
                    <Input
                      placeholder="Enter report title"
                      value={newReport.title}
                      onChange={(e) => setNewReport(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-white border-slate-300 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Report Type
                    </label>
                    <select
                      value={newReport.type}
                      onChange={(e) => setNewReport(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-800"
                    >
                      <option value="compliance">Compliance Report</option>
                      <option value="vendor_risk">Vendor Risk Report</option>
                      <option value="dashboard">Executive Dashboard</option>
                      <option value="custom">Custom Report</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      placeholder="Describe what this report should include"
                      value={newReport.description}
                      onChange={(e) => setNewReport(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-800 h-20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Include Sections
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newReport.include_assessments}
                          onChange={(e) => setNewReport(prev => ({ ...prev, include_assessments: e.target.checked }))}
                          className="mr-2"
                        />
                        <span className="text-sm text-slate-700">Security Assessments</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newReport.include_vendors}
                          onChange={(e) => setNewReport(prev => ({ ...prev, include_vendors: e.target.checked }))}
                          className="mr-2"
                        />
                        <span className="text-sm text-slate-700">Vendor Risk Analysis</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newReport.include_compliance}
                          onChange={(e) => setNewReport(prev => ({ ...prev, include_compliance: e.target.checked }))}
                          className="mr-2"
                        />
                        <span className="text-sm text-slate-700">Compliance Status</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateReport}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    Generate Report
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SecurityReports;