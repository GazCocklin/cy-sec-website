import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Building, Mail, Phone, Globe, FileText, Plus, CheckCircle, Clock, AlertTriangle, ShieldQuestion, Loader2, ShieldCheck } from 'lucide-react';

const VendorDetailsPage = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [vendor, setVendor] = useState(null);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStartingAssessment, setIsStartingAssessment] = useState(false);

  const fetchVendorData = useCallback(async () => {
    if (!user || !vendorId) return;
    setLoading(true);
    try {
      // Fetch vendor details
      const { data: vendorData, error: vendorError } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', vendorId)
        .eq('user_id', user.id)
        .single();

      if (vendorError) throw vendorError;
      setVendor(vendorData);

      // Fetch associated questionnaires
      const { data: questionnaireData, error: questionnaireError } = await supabase
        .from('vendor_questionnaires')
        .select('*, compliance_frameworks(name)')
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

      if (questionnaireError) throw questionnaireError;
      setQuestionnaires(questionnaireData);

    } catch (error) {
      console.error('Error fetching vendor details:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch vendor details. You may not have permission or the vendor does not exist.',
        variant: 'destructive',
      });
      navigate('/security-suite/vendor-risk');
    } finally {
      setLoading(false);
    }
  }, [vendorId, user, toast, navigate]);

  useEffect(() => {
    fetchVendorData();
  }, [fetchVendorData]);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return { icon: <CheckCircle className="h-5 w-5 text-green-600" />, text: 'Completed', color: 'text-green-600' };
      case 'in_progress':
        return { icon: <Clock className="h-5 w-5 text-blue-600" />, text: 'In Progress', color: 'text-blue-600' };
      case 'pending':
        return { icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />, text: 'Pending', color: 'text-yellow-600' };
      default:
        return { icon: <ShieldQuestion className="h-5 w-5 text-gray-500" />, text: status || 'Unknown', color: 'text-gray-500' };
    }
  };

  const handleViewAssessment = (questionnaireId, status) => {
    if (status === 'in_progress') {
      navigate(`/security-suite/vendor-assessment/${questionnaireId}`);
    } else if (status === 'completed') {
      navigate(`/security-suite/vendor-assessment-report/${questionnaireId}`);
    } else {
      toast({ title: 'Feature Coming Soon!', description: 'Viewing reports for this status is not yet implemented.' });
    }
  };

  const handleStartNewAssessment = async () => {
    if (!vendor) return;
    setIsStartingAssessment(true);
    try {
      const frameworkId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef'; // Hardcoded "CySec Vendor Risk" Framework ID
      const title = `${vendor.name} - CySec Vendor Risk Assessment`;

      const { data, error } = await supabase
        .from('vendor_questionnaires')
        .insert({
          vendor_id: vendor.id,
          framework_id: frameworkId,
          user_id: user.id,
          title,
          status: 'in_progress',
          assessment_date: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      toast({ title: 'Assessment Started!', description: `Questionnaire created for ${vendor.name}.` });
      navigate(`/security-suite/vendor-assessment/${data.id}`);
    } catch (error) {
      console.error('Error starting assessment:', error);
      toast({ title: 'Error', description: 'Failed to create the assessment.', variant: 'destructive' });
    } finally {
      setIsStartingAssessment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!vendor) {
    return null;
  }

  const certifications = [
    { name: 'Cyber Essentials', certified: vendor.cyber_essentials, expiry: vendor.cyber_essentials_expiry },
    { name: 'Cyber Essentials +', certified: vendor.cyber_essentials_plus, expiry: vendor.cyber_essentials_plus_expiry },
    { name: 'ISO 27001', certified: vendor.iso27001, expiry: vendor.iso27001_expiry },
  ].filter(c => c.certified);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0,0,0,0);
    const isExpired = date < today;
    return (
        <span className={isExpired ? 'text-red-500 font-semibold' : ''}>
            Expires: {new Date(dateString).toLocaleDateString()}
            {isExpired && ' (Expired)'}
        </span>
    );
  };

  return (
    <>
      <Helmet>
        <title>{vendor.name} - Vendor Details</title>
        <meta name="description" content={`Details and risk assessments for ${vendor.name}.`} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6">
            <Button variant="outline" onClick={() => navigate('/security-suite/vendor-risk')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Vendor List
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Building className="h-10 w-10 text-blue-600" />
                <div>
                  <CardTitle className="text-3xl">{vendor.name}</CardTitle>
                  <CardDescription className="capitalize">{vendor.service_type} Risk</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 text-slate-700">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-slate-500" />
                      <span>{vendor.contact_email}</span>
                    </div>
                    {vendor.contact_phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-slate-500" />
                        <span>{vendor.contact_phone}</span>
                      </div>
                    )}
                    {vendor.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-slate-500" />
                        <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {vendor.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-slate-700">Security Certifications</h4>
                  {certifications.length > 0 ? (
                    <div className="space-y-2">
                      {certifications.map(cert => (
                        <div key={cert.name}>
                          <div className="flex items-center gap-2 text-green-700">
                            <ShieldCheck className="h-5 w-5" />
                            <span>{cert.name}</span>
                          </div>
                          {cert.expiry && (
                            <p className="text-xs text-slate-500 ml-7">{formatDate(cert.expiry)}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500">No certifications declared.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Assessments</CardTitle>
                  <CardDescription>Internal risk assessments for {vendor.name}.</CardDescription>
                </div>
                <Button onClick={handleStartNewAssessment} disabled={isStartingAssessment}>
                  {isStartingAssessment ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  New Assessment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {questionnaires.length > 0 ? (
                <ul className="space-y-4">
                  {questionnaires.map(q => {
                    const statusInfo = getStatusInfo(q.status);
                    const buttonText = q.status === 'in_progress' ? 'Continue' : 'View Report';
                    return (
                      <li key={q.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <FileText className="h-8 w-8 text-slate-400" />
                          <div>
                            <p className="font-semibold text-slate-800">{q.title}</p>
                            <p className="text-sm text-slate-500">
                              Framework: {q.compliance_frameworks?.name || 'N/A'} | Started: {new Date(q.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center gap-2 font-medium ${statusInfo.color}`}>
                            {statusInfo.icon}
                            <span>{statusInfo.text}</span>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleViewAssessment(q.id, q.status)}>
                            {buttonText}
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-800">No Assessments Found</h3>
                  <p className="text-slate-500 mb-6">Get started by performing the first risk assessment for this vendor.</p>
                  <Button onClick={handleStartNewAssessment} disabled={isStartingAssessment}>
                    {isStartingAssessment ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    Start First Assessment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default VendorDetailsPage;