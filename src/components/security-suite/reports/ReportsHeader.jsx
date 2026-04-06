import React from 'react';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ReportsHeader = ({ selectedPeriod, setSelectedPeriod }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Security Reports</h1>
        <p className="text-slate-600">Comprehensive analytics and insights into your security posture</p>
      </div>
      <div className="flex gap-3">
        <select
          className="px-3 py-2 border border-gray-300 rounded-md"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default ReportsHeader;