import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Mail, Phone, Globe, Edit, FileText, Trash2, CheckCircle, Clock, AlertTriangle, ShieldQuestion, Play, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const VendorCard = ({ vendor, onDelete }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isStartingAssessment, setIsStartingAssessment] = React.useState(false);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return { icon: <CheckCircle className="h-4 w-4 text-green-600" />, text: 'Completed' };
      case 'in_progress':
        return { icon: <Clock className="h-4 w-4 text-blue-600" />, text: 'In Progress' };
      case 'pending':
        return { icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />, text: 'Pending Assessment' };
      default:
        return { icon: <ShieldQuestion className="h-4 w-4 text-gray-500" />, text: 'No Assessments' };
    }
  };

  const statusInfo = getStatusInfo(vendor.assessment_status);

  const handleActionClick = (featureName) => {
    toast({
      title: `🚧 ${featureName} Coming Soon!`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleViewDetails = () => {
    navigate(`/fortify-one/vendor-risk/${vendor.id}`);
  };

  const handleStartAssessment = async () => {
    setIsStartingAssessment(true);
    try {
      const frameworkId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef'; // Hardcoded "CySec Vendor Risk" Framework ID
      const title = `${vendor.name} - CySec Vendor Risk Assessment`;

      const { data, error } = await supabase
        .from('vendor_questionnaires')
        .insert({
          vendor_id: vendor.id,
          framework_id: frameworkId,
          user_id: user.id,
          title,
          status: 'in_progress',
          assessment_date: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      toast({ title: 'Assessment Started!', description: `Questionnaire created for ${vendor.name}.` });
      navigate(`/fortify-one/vendor-assessment/${data.id}`);
    } catch (error) {
      console.error('Error starting assessment:', error);
      toast({ title: 'Error', description: 'Failed to create the assessment.', variant: 'destructive' });
    } finally {
      setIsStartingAssessment(false);
    }
  };

  return (
    <>
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Building className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-800">{vendor.name}</h3>
            </div>
            <p className="text-slate-600 mb-3 capitalize">{vendor.service_type} Risk</p>
            
            <div className="flex items-center gap-2 text-sm text-slate-600">
              {statusInfo.icon}
              <span>{statusInfo.text}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" onClick={() => handleActionClick("Edit Vendor")}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(vendor)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="h-4 w-4 text-slate-400" />
              <span>{vendor.contact_email}</span>
            </div>
            {vendor.contact_phone && (
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>{vendor.contact_phone}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            {vendor.website && (
              <div className="flex items-center gap-2 text-slate-700">
                <Globe className="h-4 w-4 text-slate-400" />
                <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {vendor.website}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
           <div className="text-xs text-slate-500">
              Created on: {new Date(vendor.created_at).toLocaleDateString()}
          </div>
          <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleStartAssessment} disabled={isStartingAssessment}>
                  {isStartingAssessment ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4 mr-2" />
                  )}
                  Start Assessment
              </Button>
              <Button variant="default" size="sm" onClick={handleViewDetails}>
                  <FileText className="h-4 w-4 mr-2" />
                  View Details
              </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorCard;