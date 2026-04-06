import React from 'react';
import OverallScore from './OverallScore';
import KeyMetrics from './KeyMetrics';
import ComplianceBySection from './ComplianceBySection';
import TopRisks from './TopRisks';
import DetailedFindings from './DetailedFindings';

const PdfReportLayout = React.forwardRef(({ assessment, responses, questions, reportData, calculatedOverallScore }, ref) => {
  const getOrganisationName = () => {
    return assessment?.organisation_name || 'Your Organisation';
  };

  return (
    <div ref={ref} id="pdf-content-to-print">
        <div className="p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b">
                <div>
                    <p className="text-sm text-blue-600 font-semibold">{assessment.compliance_frameworks?.name}</p>
                    <h1 className="text-4xl font-bold text-slate-800">{assessment.title}</h1>
                    <p className="text-slate-500 mt-2">
                    For: {getOrganisationName()} | Completed: {new Date(assessment.completion_date || assessment.updated_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mb-4 pb-2 border-b">Executive Summary</h2>
            <p className="text-slate-700 mb-8 text-base leading-relaxed">
                The NIST Cybersecurity Framework (CSF) 2.0 provides a comprehensive, voluntary framework of standards, guidelines, and best practices to manage cybersecurity-related risk. Its core mission is to help organisations better understand, manage, and reduce their cybersecurity risks and protect their networks and data. Adopting NIST CSF 2.0 is crucial for establishing a robust security posture, enabling proactive risk management, and demonstrating a commitment to security to stakeholders, customers, and regulators. This report provides an executive overview of your organisation's compliance with this framework, followed by a detailed analysis of all assessed controls.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-1">
                <OverallScore score={assessment?.overall_score || 0} />
                </div>
                <div className="lg:col-span-2">
                <KeyMetrics responses={responses} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ComplianceBySection data={reportData?.sectionScores || []} />
                <TopRisks responses={responses} questions={questions} />
            </div>

            <div style={{ pageBreakBefore: 'always' }}></div>

            <h2 className="text-3xl font-bold text-slate-800 mt-10 mb-6 pb-2 border-b">Detailed Findings Report</h2>
            <DetailedFindings responses={responses} questions={questions} />
        </div>
    </div>
  );
});

export default PdfReportLayout;