import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReportHeader from '@/components/security-suite/assessment-report/ReportHeader';
import OverallScore from '@/components/security-suite/assessment-report/OverallScore';
import KeyMetrics from '@/components/security-suite/assessment-report/KeyMetrics';
import ComplianceBySection from '@/components/security-suite/assessment-report/ComplianceBySection';
import TopRisks from '@/components/security-suite/assessment-report/TopRisks';
import DetailedFindings from '@/components/security-suite/assessment-report/DetailedFindings';
import { generatePdfFromComponent } from '@/lib/pdfGenerator';
import { exportToExcel } from '@/lib/excelGenerator';
import FoundationReport from '@/components/security-suite/assessment-report/pdf-templates/FoundationReport.jsx';
import BusinessReport from '@/components/security-suite/assessment-report/pdf-templates/BusinessReport.jsx';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';

const AssessmentReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingExcel, setIsDownloadingExcel] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [subscriptionPlan, setSubscriptionPlan] = useState('foundation-plan'); // Default to foundation
  
  useEffect(() => {
    const loadReportData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('security_assessments')
          .select('*, compliance_frameworks(*)')
          .eq('id', id)
          .single();
        if (assessmentError) throw assessmentError;
        setAssessment(assessmentData);

        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('plan_id')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        if (subscriptionData && !subscriptionError) {
            setSubscriptionPlan(subscriptionData.plan_id);
        }

        const { data: responsesData, error: responsesError } = await supabase
          .from('assessment_responses')
          .select('*')
          .eq('assessment_id', id);
        if (responsesError) throw responsesError;
        setResponses(responsesData);
        
        const { data: questionsData, error: questionsError } = await supabase
          .from('compliance_questions')
          .select('*')
          .eq('framework_id', assessmentData.framework_id);
        if (questionsError) throw questionsError;
        setQuestions(questionsData);
        
      } catch (error) {
        console.error("Error loading report data:", error);
        toast({ title: "Error", description: "Could not load assessment report.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    loadReportData();
  }, [id, toast, user]);

  const reportData = useMemo(() => {
    if (!assessment || responses.length === 0 || questions.length === 0) return null;

    const sections = questions.reduce((acc, q) => {
      if (!acc[q.section_code]) {
        acc[q.section_code] = { code: q.section_code, title: q.section_title, scores: [] };
      }
      const response = responses.find(r => r.question_id === q.id);
      if(response) acc[q.section_code].scores.push(response.score || 0);
      return acc;
    }, {});

    const sectionScores = Object.values(sections).map(s => ({
      name: s.title,
      score: s.scores.length > 0 ? Math.round(s.scores.reduce((a, b) => a + b, 0) / s.scores.length) : 0,
    }));

    const riskCounts = responses.reduce((acc, r) => {
      acc[r.risk_rating] = (acc[r.risk_rating] || 0) + 1;
      return acc;
    }, {});
    
    return { sectionScores, riskCounts };
  }, [assessment, responses, questions]);
  
  const handleDownloadPdf = async () => {
    if (!assessment || !reportData) return;
    setIsDownloading(true);
    toast({ title: "Generating PDF", description: "Please wait while your report is being generated..." });
    
    const reportProps = { assessment, responses, questions, reportData };
    
    const ReportComponent = subscriptionPlan === 'business-suite' 
        ? <BusinessReport {...reportProps} /> 
        : <FoundationReport {...reportProps} />;

    try {
      await generatePdfFromComponent(ReportComponent, `Assessment-Report-${assessment.title.replace(/\s+/g, '-')}`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast({ title: "PDF Error", description: "Could not generate the PDF report.", variant: "destructive" });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadExcel = async () => {
    if (!assessment || responses.length === 0) return;
    setIsDownloadingExcel(true);
    toast({ title: "Exporting Risks", description: "Please wait while your Excel file is being generated..." });

    try {
      const severityOrder = {
        'critical': 3,
        'high': 2,
        'medium': 1,
      };

      const risks = responses
        .filter(r => r.risk_rating && ['critical', 'high', 'medium'].includes(r.risk_rating?.toLowerCase()))
        .map(response => {
          const question = questions.find(q => q.id === response.question_id);
          return {
            'Assessment Title': assessment.title,
            'Organization': assessment.organization_name,
            'Control ID': question ? `${question.section_code}-${question.question_number}` : 'N/A',
            'Control Description': question ? question.question_text : 'Unknown Question',
            'Risk Rating': response.risk_rating,
            'Score': response.score,
            'Notes': response.notes,
          };
        })
        .sort((a, b) => {
           const severityA = severityOrder[a['Risk Rating']?.toLowerCase()] || 0;
           const severityB = severityOrder[b['Risk Rating']?.toLowerCase()] || 0;
           return severityB - severityA;
        });

      if (risks.length === 0) {
        toast({ title: "No Significant Risks Found", description: "There are no medium, high, or critical risks to export." });
        setIsDownloadingExcel(false);
        return;
      }

      exportToExcel(risks, `Risk-Report-${assessment.title.replace(/\s+/g, '-')}`);
      toast({ title: "Success!", description: "Risk report has been exported to Excel." });
    } catch (error) {
      console.error("Excel Export Error:", error);
      toast({ title: "Export Error", description: "Could not export risks to Excel.", variant: "destructive" });
    } finally {
      setIsDownloadingExcel(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p>Assessment not found.</p>
      </div>
    );
  }
  
  const overallScore = assessment?.overall_score || 0;

  return (
    <>
      <Helmet>
        <title>Assessment Report: {assessment.title}</title>
      </Helmet>

      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button variant="outline" onClick={() => navigate('/fortify-one/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div id="report-view" className="bg-white p-8 rounded-lg shadow-lg">
            <ReportHeader 
              assessment={assessment}
              onDownloadPdf={handleDownloadPdf}
              isDownloading={isDownloading}
              onDownloadExcel={handleDownloadExcel}
              isDownloadingExcel={isDownloadingExcel}
            />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-1">
                  <OverallScore score={overallScore} />
                </div>
                <div className="lg:col-span-2">
                  <KeyMetrics responses={responses} />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ComplianceBySection data={reportData?.sectionScores || []} />
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

export default AssessmentReport;