import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const WizardHeader = ({ title, vendorName, frameworkName, onBack }) => {
  return (
    <div className="mb-8">
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
      <p className="text-slate-600 mt-1">
        {vendorName ? `Assessing Vendor: ${vendorName}` : ''}
        {vendorName && frameworkName ? ' | ' : ''}
        {frameworkName ? `Using Framework: ${frameworkName}` : ''}
      </p>
    </div>
  );
};

export default WizardHeader;