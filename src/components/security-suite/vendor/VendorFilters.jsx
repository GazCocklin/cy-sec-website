import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const VendorFilters = ({ searchTerm, setSearchTerm, riskFilter, setRiskFilter }) => {
  return (
    <Card className="mb-6 bg-white/60 backdrop-blur-sm">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search vendors by name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-11 text-base"
              />
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Select onValueChange={setRiskFilter} value={riskFilter}>
              <SelectTrigger className="w-full md:w-[180px] h-11 text-base">
                <SelectValue placeholder="Filter by risk..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorFilters;