import React from 'react';
import { Building, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ExecutiveTab = ({ reportData, exportReport }) => {
  const metrics = {
    totalAssessments: reportData.assessments.length,
    completedAssessments: reportData.assessments.filter(a => a.assessment_status === 'completed').length,
    averageScore: reportData.assessments.length > 0 
      ? Math.round(reportData.assessments.reduce((sum, a) => sum + (a.overall_score || 0), 0) / reportData.assessments.length)
      : 0,
    highRiskItems: reportData.assessments.filter(a => a.risk_level === 'high').length
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Executive Summary
        </CardTitle>
        <CardDescription>High-level security overview for leadership</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key Highlights */}
          <div>
            <h3 className="font-semibold mb-4">Key Security Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">Strengths</span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Strong overall security score ({metrics.averageScore}%)</li>
                  <li>• {metrics.completedAssessments} assessments completed</li>
                  <li>• Compliance tracking active</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Areas for Improvement</span>
                </div>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• {metrics.highRiskItems} high-risk items need attention</li>
                  <li>• Vendor risk management expansion needed</li>
                  <li>• Regular assessment schedule recommended</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-semibold mb-4">Strategic Recommendations</h3>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">1. Enhance Risk Management</h4>
                <p className="text-sm text-slate-600">
                  Implement a comprehensive vendor risk management programme to address third-party security concerns.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">2. Regular Assessment Schedule</h4>
                <p className="text-sm text-slate-600">
                  Establish quarterly security assessments to maintain continuous improvement and compliance.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">3. Staff Training Programme</h4>
                <p className="text-sm text-slate-600">
                  Develop ongoing cybersecurity awareness training to strengthen the human element of security.
                </p>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Export Options</h3>
            <div className="flex gap-3">
              <Button onClick={() => exportReport('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Export as PDF
              </Button>
              <Button variant="outline" onClick={() => exportReport('excel')}>
                <Download className="h-4 w-4 mr-2" />
                Export as Excel
              </Button>
              <Button variant="outline" onClick={() => exportReport('powerpoint')}>
                <Download className="h-4 w-4 mr-2" />
                Export as PowerPoint
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutiveTab;