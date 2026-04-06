import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePdfFromComponent } from '@/lib/pdfGenerator';
import VendorReport from '@/components/security-suite/assessment-report/pdf-templates/VendorReport';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import ReportHeader from '@/components/security-suite/assessment-report/ReportHeader';
import OverallScore from '@/components/security-suite/assessment-report/OverallScore';
import KeyMetrics from '@/components/security-suite/assessment-report/KeyMetrics';
import ComplianceBySection from '@/components/security-suite/assessment-report/ComplianceBySection';
import TopRisks from '@/components/security-suite/assessment-report/TopRisks';
import DetailedFindings from '@/components/security-suite/assessment-report/DetailedFindings';

const VendorAssessmentReport = () => {
  const { questionnaireId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [questionnaire, setQuestionnaire] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadReportData = async () => {
      try {
        setLoading(true);

        const { data: qData, error: qError } = await supabase
          .from('vendor_questionnaires')
          .select('*, vendors(*), compliance_frameworks(*)')
          .eq('id', questionnaireId)
          .single();
        if (qError) throw qError;

        const adaptedAssessment = {
          ...qData,
          title: qData.title,
          organisation_name: qData.vendors.name,
          completion_date: qData.completion_date,
          overall_score: qData.overall_score,
          compliance_frameworks: qData.compliance_frameworks
        };
        setQuestionnaire(adaptedAssessment);
        setVendor(qData.vendors);

        const { data: responsesData, error: responsesError } = await supabase
          .from('vendor_responses')
          .select('*')
          .eq('questionnaire_id', questionnaireId);
        if (responsesError) throw responsesError;
        setResponses(responsesData);
        
        const { data: questionsData, error: questionsError } = await supabase
          .from('compliance_questions')
          .select('*')
          .eq('framework_id', qData.framework_id);
        if (questionsError) throw questionsError;
        setQuestions(questionsData);
        
      } catch (error) {
        console.error("Error loading vendor report data:", error);
        toast({ title: "Error", description: "Could not load vendor assessment report.", variant: "destructive" });
        navigate('/security-suite/vendor-risk');
      } finally {
        setLoading(false);
      }
    };
    loadReportData();
  }, [questionnaireId, toast, navigate]);

  const reportData = useMemo(() => {
    if (!questionnaire || responses.length === 0 || questions.length === 0) return null;

    const sections = questions.reduce((acc, q) => {
      if (!acc[q.section_code]) {
        acc[q.section_code] = { code: q.section_code, title: q.section_title, scores: [] };
      }
      const response = responses.find(r => r.question_id === q.id);
      if (response) acc[q.section_code].scores.push(response.score || 0);
      return acc;
    }, {});

    const sectionScores = Object.values(sections).map(s => ({
      name: s.title,
      score: s.scores.length > 0 ? Math.round(s.scores.reduce((a, b) => a + b, 0) / s.scores.length) : 0,
    }));

    return { sectionScores };
  }, [questionnaire, responses, questions]);
  
  const handleDownloadPdf = async () => {
    if (!questionnaire || !reportData || !vendor) return;
    setIsDownloading(true);
    toast({ title: "Generating PDF", description: "Please wait while your report is being generated..." });
    
    const reportProps = { assessment: questionnaire, vendor, responses, questions, reportData };
    
    try {
      await generatePdfFromComponent(<VendorReport {...reportProps} />, `Vendor-Report-${questionnaire.title.replace(/\s+/g, '-')}`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast({ title: "PDF Error", description: "Could not generate the PDF report.", variant: "destructive" });
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!questionnaire || !vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p>Vendor assessment report not found.</p>
      </div>
    );
  }
  
  const overallScore = questionnaire?.overall_score || 0;
  const certifications = [
    { name: 'Cyber Essentials', certified: vendor.cyber_essentials },
    { name: 'Cyber Essentials +', certified: vendor.cyber_essentials_plus },
    { name: 'ISO 27001', certified: vendor.iso27001 },
  ].filter(c => c.certified);

  return (
    <>
      <Helmet>
        <title>Vendor Report: {questionnaire.title}</title>
      </Helmet>

      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button variant="outline" onClick={() => navigate(`/security-suite/vendor-risk/${questionnaire.vendors.id}`)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Vendor Details
            </Button>
          </div>

          <div id="report-view" className="bg-white p-8 rounded-lg shadow-lg">
            <ReportHeader 
              assessment={questionnaire}
              onDownloadPdf={handleDownloadPdf}
              isDownloading={isDownloading}
              onDownloadExcel={() => toast({ title: 'Feature coming soon!' })}
              isDownloadingExcel={false}
            />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-1">
                  <OverallScore score={overallScore} title="Overall Vendor Risk Score" description="The vendor's calculated risk score based on the assessment." />
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <KeyMetrics responses={responses} />
                  <Card>
                    <CardHeader>
                      <CardTitle>Declared Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {certifications.length > 0 ? (
                        <ul className="space-y-3">
                          {certifications.map(cert => (
                            <li key={cert.name} className="flex items-center gap-3 text-green-700 font-medium">
                              <ShieldCheck className="h-5 w-5" />
                              <span>{cert.name}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-500 text-center py-4">No certifications declared by this vendor.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ComplianceBySection data={reportData?.sectionScores || []} title="Risk Score by Section" description="A breakdown of the vendor's risk score for each section." />
                <TopRisks responses={responses} questions={questions} />
              </div>
              <DetailedFindings responses={responses} questions={questions} />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorAssessmentReport;