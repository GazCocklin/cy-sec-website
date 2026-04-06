import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from './tabs/OverviewTab';
import AssessmentsTab from './tabs/AssessmentsTab';
import ActivityTab from './tabs/ActivityTab';

const DashboardTabs = ({ dashboardData }) => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="assessments">Assessments</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <OverviewTab dashboardData={dashboardData} />
      </TabsContent>

      <TabsContent value="assessments">
        <AssessmentsTab dashboardData={dashboardData} />
      </TabsContent>

      <TabsContent value="activity">
        <ActivityTab dashboardData={dashboardData} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;