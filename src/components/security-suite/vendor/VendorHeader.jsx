import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VendorHeader = ({ onAddVendor }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Vendor Risk Management</h1>
        <p className="text-slate-600 text-lg">Assess and monitor third-party vendor security risks from a centralized dashboard.</p>
      </div>
      <Button 
        onClick={onAddVendor}
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-shadow"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Vendor
      </Button>
    </div>
  );
};

export default VendorHeader;