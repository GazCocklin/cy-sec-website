import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, Loader2 } from 'lucide-react';

const ReportHeader = ({ assessment, onDownloadPdf, isDownloading, onDownloadExcel, isDownloadingExcel }) => {
  const getOrganisationName = () => {
    return assessment?.organisation_name || 'Your Organisation';
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b">
      <div>
        <p className="text-sm text-blue-600 font-semibold">{assessment.compliance_frameworks?.name}</p>
        <h1 className="text-4xl font-bold text-slate-800">{assessment.title}</h1>
        <p className="text-slate-500 mt-2">
          For: {getOrganisationName()} | Completed: {new Date(assessment.completion_date || assessment.updated_at).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex items-center gap-2">
        <Button onClick={onDownloadExcel} disabled={isDownloadingExcel} variant="outline">
          {isDownloadingExcel ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <FileSpreadsheet className="h-4 w-4 mr-2" />
          )}
          {isDownloadingExcel ? 'Exporting...' : 'Export Risks'}
        </Button>
        <Button onClick={onDownloadPdf} disabled={isDownloading}>
          {isDownloading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {isDownloading ? 'Generating...' : 'Download PDF'}
        </Button>
      </div>
    </div>
  );
};

export default ReportHeader;