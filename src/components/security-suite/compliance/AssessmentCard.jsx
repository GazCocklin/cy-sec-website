import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FileText, FileSpreadsheet, Loader2, Play, ChevronsRight, MoreVertical, Trash2, FileDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { exportToExcel } from '@/lib/excelGenerator';

const AssessmentCard = ({ assessment, onOpenWizard, onDelete }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500 text-white">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'not_started':
        return <Badge variant="outline">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleExportRisks = async (e) => {
    e.stopPropagation();
    setIsExporting(true);
    toast({ title: "Exporting Risks", description: "Please wait while your Excel file is being generated..." });

    try {
      const { data: responses, error: responsesError } = await supabase
        .from('assessment_responses')
        .select('*')
        .eq('assessment_id', assessment.id)
        .or('risk_rating.eq.high,risk_rating.eq.critical,risk_rating.eq.medium');

      if (responsesError) throw responsesError;

      if (!responses || responses.length === 0) {
        toast({ title: "No Risks Found", description: "No medium, high, or critical risks to export for this assessment." });
        setIsExporting(false);
        return;
      }

      const { data: questions, error: questionsError } = await supabase
        .from('compliance_questions')
        .select('*')
        .eq('framework_id', assessment.framework_id);

      if (questionsError) throw questionsError;

      const questionMap = new Map(questions.map(q => [q.id, q]));

      const risksData = responses.map(response => {
        const question = questionMap.get(response.question_id);
        return {
          'Assessment Title': assessment.title,
          'Organisation': assessment.organisation_name,
          'Control ID': question ? `${question.section_code}-${question.question_number}` : 'N/A',
          'Control Description': question?.question_text || 'Unknown Question',
          'Risk Rating': response.risk_rating,
          'Score': response.score,
          'Notes': response.notes,
        };
      });

      exportToExcel(risksData, `Risk-Report-${assessment.title.replace(/\s+/g, '-')}`);
      toast({ title: "Success!", description: "Risk report has been exported to Excel." });
    } catch (error) {
      console.error("Excel Export Error:", error);
      toast({ title: "Export Error", description: "Could not export risks to Excel.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPdf = (e) => {
    e.stopPropagation();
    toast({
      title: "Coming Soon!",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(assessment);
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="pr-2">{assessment.title}</CardTitle>
          {getStatusBadge(assessment.status)}
        </div>
        <CardDescription>
          {assessment.compliance_frameworks?.name} | For: {assessment.organisation_name || 'N/A'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{assessment.description}</p>
        {assessment.status === 'completed' && (
          <div className="mt-4">
            <p className="text-sm font-medium">Overall Score: <span className="font-bold text-blue-600">{assessment.overall_score}%</span></p>
            <p className="text-xs text-muted-foreground">Completed on: {new Date(assessment.completion_date).toLocaleDateString()}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto pt-4">
        <div className="flex flex-wrap items-center gap-2">
          {assessment.status === 'completed' ? (
            <>
              <Button size="sm" onClick={() => navigate(`/security-suite/assessment-report/${assessment.id}`)}>
                <FileText className="h-4 w-4 mr-2" />
                View Report
              </Button>
              <Button size="sm" variant="outline" onClick={handleExportRisks} disabled={isExporting}>
                {isExporting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileSpreadsheet className="h-4 w-4 mr-2" />}
                {isExporting ? 'Exporting...' : 'Download Risks'}
              </Button>
              <Button size="sm" variant="outline" onClick={handleDownloadPdf}>
                <FileDown className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </>
          ) : assessment.status === 'in_progress' ? (
            <Button onClick={() => onOpenWizard(assessment)}>
              <ChevronsRight className="h-4 w-4 mr-2" />
              Continue Assessment
            </Button>
          ) : (
            <Button onClick={() => onOpenWizard(assessment)}>
              <Play className="h-4 w-4 mr-2" />
              Start Assessment
            </Button>
          )}
        </div>
        
        <div className="pl-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDeleteClick} className="text-red-600 focus:text-red-50 focus:bg-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AssessmentCard;