import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ContactSubmissionsFilters = ({ 
  searchTerm, 
  setSearchTerm, 
}) => {
  return (
    <div className="p-2 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search submissions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-slate-100 border-slate-200 focus:bg-white"
        />
      </div>
    </div>
  );
};

export default ContactSubmissionsFilters;