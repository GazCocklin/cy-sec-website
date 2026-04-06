import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import VendorHeader from '@/components/security-suite/vendor/VendorHeader';
import VendorStats from '@/components/security-suite/vendor/VendorStats';
import VendorFilters from '@/components/security-suite/vendor/VendorFilters';
import VendorsList from '@/components/security-suite/vendor/VendorsList';
import CreateVendorDialog from '@/components/security-suite/vendor/CreateVendorDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const VendorRiskManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  const fetchVendors = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select(`
          *,
          vendor_assessments (
            status,
            overall_score
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const vendorsWithRisk = data.map(v => {
        const latestAssessment = v.vendor_assessments?.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))[0];
        let risk_level = 'low';
        if (latestAssessment?.overall_score < 50) risk_level = 'high';
        else if (latestAssessment?.overall_score < 80) risk_level = 'medium';
        
        return {
          ...v,
          assessment_status: latestAssessment?.status || 'none',
          risk_level
        };
      });

      setVendors(vendorsWithRisk);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch vendors.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const handleAddVendor = async (newVendor) => {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .insert({ ...newVendor, user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Vendor Added',
        description: `${data.name} has been successfully added.`,
      });
      fetchVendors();
      return true;
    } catch (error) {
      console.error('Error adding vendor:', error);
      toast({
        title: 'Error',
        description: 'Could not add the vendor.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const openDeleteDialog = (vendor) => {
    setVendorToDelete(vendor);
  };

  const handleDeleteVendor = async () => {
    if (!vendorToDelete) return;

    try {
      // 1. Delete vendor assessments
      const { error: vaError } = await supabase
        .from('vendor_assessments')
        .delete()
        .eq('vendor_id', vendorToDelete.id);
      if (vaError) throw vaError;

      // 2. Get all questionnaires for the vendor
      const { data: questionnaires, error: qError } = await supabase
        .from('vendor_questionnaires')
        .select('id')
        .eq('vendor_id', vendorToDelete.id);
      if (qError) throw qError;

      const questionnaireIds = questionnaires.map(q => q.id);

      // 3. Delete all responses for those questionnaires (if any)
      if (questionnaireIds.length > 0) {
        const { error: rError } = await supabase
          .from('vendor_responses')
          .delete()
          .in('questionnaire_id', questionnaireIds);
        if (rError) throw rError;
      }

      // 4. Delete all questionnaires for the vendor
      const { error: qDeleteError } = await supabase
        .from('vendor_questionnaires')
        .delete()
        .eq('vendor_id', vendorToDelete.id);
      if (qDeleteError) throw qDeleteError;

      // 5. Delete the vendor
      const { error: vError } = await supabase
        .from('vendors')
        .delete()
        .eq('id', vendorToDelete.id);
      if (vError) throw vError;

      toast({
        title: 'Vendor Deleted',
        description: `${vendorToDelete.name} has been permanently removed.`,
      });

      fetchVendors();
      setVendorToDelete(null);
    } catch (error) {
      console.error('Error deleting vendor:', error);
      toast({
        title: 'Deletion Failed',
        description: 'Could not delete the vendor. Please try again.',
        variant: 'destructive',
      });
      setVendorToDelete(null);
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const searchTermMatch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            vendor.service_type.toLowerCase().includes(searchTerm.toLowerCase());
    const riskFilterMatch = riskFilter === 'all' || vendor.risk_level === riskFilter;
    return searchTermMatch && riskFilterMatch;
  });

  return (
    <>
      <Helmet>
        <title>Vendor Risk Management - Cy-Sec FortifyOne</title>
        <meta name="description" content="Manage and assess your third-party vendor risks with Cy-Sec's intuitive dashboard." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <VendorHeader onAddVendor={() => setCreateDialogOpen(true)} />
          <VendorStats vendors={vendors} />
          <VendorFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            riskFilter={riskFilter}
            setRiskFilter={setRiskFilter}
          />
          <VendorsList 
            vendors={filteredVendors} 
            loading={loading} 
            onDeleteVendor={openDeleteDialog}
            onAddFirst={() => setCreateDialogOpen(true)}
            searchTerm={searchTerm}
            riskFilter={riskFilter}
          />
        </motion.div>
      </div>
      <CreateVendorDialog
        open={isCreateDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onAddVendor={handleAddVendor}
      />
      <AlertDialog open={!!vendorToDelete} onOpenChange={() => setVendorToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the "{vendorToDelete?.name}" vendor and all of its associated assessments and data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteVendor}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, delete vendor
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default VendorRiskManagement;