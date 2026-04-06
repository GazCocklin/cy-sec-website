import React from 'react';
import { FileText, CheckCircle, Clock, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ComplianceStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Total Assessments</p>
              <p className="text-3xl font-bold">{stats?.total || 0}</p>
            </div>
            <FileText className="h-8 w-8 text-white/60" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold">{stats?.completed || 0}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-white/60" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold">{stats?.inProgress || 0}</p>
            </div>
            <Clock className="h-8 w-8 text-white/60" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Not Started</p>
              <p className="text-3xl font-bold">{stats?.notStarted || 0}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-white/60" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceStats;