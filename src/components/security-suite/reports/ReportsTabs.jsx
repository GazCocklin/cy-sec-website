import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from './tabs/OverviewTab';
import AssessmentsTab from './tabs/AssessmentsTab';
import ComplianceTab from './tabs/ComplianceTab';
import TrendsTab from './tabs/TrendsTab';
import ExecutiveTab from './tabs/ExecutiveTab';

const ReportsTabs = ({ reportData, generateReport, exportReport }) => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="assessments">Assessments</TabsTrigger>
        <TabsTrigger value="compliance">Compliance</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
        <TabsTrigger value="executive">Executive</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <OverviewTab reportData={reportData} generateReport={generateReport} />
      </TabsContent>

      <TabsContent value="assessments">
        <AssessmentsTab reportData={reportData} />
      </TabsContent>

      <TabsContent value="compliance">
        <ComplianceTab reportData={reportData} />
      </TabsContent>

      <TabsContent value="trends">
        <TrendsTab />
      </TabsContent>

      <TabsContent value="executive">
        <ExecutiveTab reportData={reportData} exportReport={exportReport} />
      </TabsContent>
    </Tabs>
  );
};

export default ReportsTabs;