import React from 'react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { FileText, Users, BarChart3, Zap, CalendarCheck } from 'lucide-react';
    import { useNavigate } from 'react-router-dom';

    const QuickActions = ({ openCreateAssessmentDialog }) => {
      const navigate = useNavigate();

      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={openCreateAssessmentDialog}
              >
                <FileText className="h-6 w-6" />
                New Assessment
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/fortify-one/vendor-risk')}
              >
                <Users className="h-6 w-6" />
                Vendor Risk
              </Button>
               <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/fortify-one/calendar')}
              >
                <CalendarCheck className="h-6 w-6" />
                Operations Console
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/fortify-one/reports')}
              >
                <BarChart3 className="h-6 w-6" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    };

    export default QuickActions;