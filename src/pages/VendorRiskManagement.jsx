import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useNavigate } from 'react-router-dom';

import VendorHeader from '@/components/security-suite/vendor/VendorHeader';
import VendorStats from '@/components/security-suite/vendor/VendorStats';
import VendorFilters from '@/components/security-suite/vendor/VendorFilters';
import VendorsList from '@/components/security-suite/vendor/VendorsList';
import CreateVendorDialog from '@/components/security-suite/vendor/CreateVendorDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const VendorRiskManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  const fetchVendors = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch your vendors.',
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
    if (!newVendor.name || !newVendor.contact_email || !newVendor.service_type) {
      toast({ title: 'Missing Information', description: 'Please fill out all required fields.', variant: 'destructive' });
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('vendors')
        .insert({ ...newVendor, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;

      toast({ title: 'Vendor Added', description: `Successfully added ${data.name}.` });
      setVendors(prev => [data, ...prev]);
      setShowCreateDialog(false);
      return true;
    } catch (error) {
      console.error('Error adding vendor:', error);
      toast({ title: 'Error', description: 'Could not add the vendor.', variant: 'destructive' });
      return false;
    }
  };

  const handleDeleteVendor = async () => {
    if (!vendorToDelete) return;

    try {
      const { error } = await supabase
        .from('vendors')
        .delete()
        .eq('id', vendorToDelete.id);

      if (error) throw error;

      toast({ title: 'Vendor Deleted', description: `"${vendorToDelete.name}" has been removed.` });
      setVendors(prev => prev.filter(v => v.id !== vendorToDelete.id));
      setVendorToDelete(null);
    } catch (error) {
      console.error('Error deleting vendor:', error);
      toast({ title: 'Deletion Failed', description: 'Could not delete the vendor.', variant: 'destructive' });
      setVendorToDelete(null);
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const searchMatch = `${vendor.name} ${vendor.service_type}`.toLowerCase().includes(searchTerm.toLowerCase());
    // Risk filter to be implemented later if needed
    // const riskMatch = riskFilter === 'all' || vendor.risk_level === riskFilter;
    return searchMatch;
  });

  const vendorStats = {
    total: vendors.length,
    high: vendors.filter(v => v.risk_level === 'high').length, // Placeholder
    medium: vendors.filter(v => v.risk_level === 'medium').length, // Placeholder
    low: vendors.filter(v => v.risk_level === 'low').length, // Placeholder
    avgScore: 0 // Placeholder
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Vendor Risk Management - FortifyOne</title>
        <meta name="description" content="Assess, monitor, and manage risks associated with your third-party vendors." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VendorHeader onAddVendor={() => setShowCreateDialog(true)} />
          <VendorStats vendors={vendors} />
          <VendorFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            riskFilter={riskFilter}
            setRiskFilter={setRiskFilter}
          />
          <VendorsList
            vendors={filteredVendors}
            onDeleteVendor={(vendor) => setVendorToDelete(vendor)}
            onAddFirst={() => setShowCreateDialog(true)}
            searchTerm={searchTerm}
            riskFilter={riskFilter}
          />
        </motion.div>
      </div>

      <CreateVendorDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onAddVendor={handleAddVendor}
      />

      <AlertDialog open={!!vendorToDelete} onOpenChange={() => setVendorToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this vendor?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete "{vendorToDelete?.name}" and all associated questionnaire data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteVendor} className="bg-red-600 hover:bg-red-700">
              Yes, delete vendor
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default VendorRiskManagement;