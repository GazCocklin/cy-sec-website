import React from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ComplianceHeader = ({ onCreateAssessment }) => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 pb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Compliance Assessments</h1>
          <p className="text-slate-600">Manage and track your compliance across multiple frameworks</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => navigate('/security-suite/dashboard')}
            className="bg-white hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button 
            onClick={onCreateAssessment}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceHeader;