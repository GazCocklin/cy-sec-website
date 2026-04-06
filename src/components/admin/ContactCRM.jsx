import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download, Mail, Inbox } from 'lucide-react';

import ContactSubmissionsList from '@/components/admin/contact/ContactSubmissionsList';
import ContactSubmissionDetails from '@/components/admin/contact/ContactSubmissionDetails';
import ContactSubmissionsStats from '@/components/admin/contact/ContactSubmissionsStats';
import ContactSubmissionsFilters from '@/components/admin/contact/ContactSubmissionsFilters';

const ContactCRM = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [stats, setStats] = useState({ total: 0, new: 0, inProgress: 0, completed: 0 });

  const loadSubmissions = useCallback(async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) setLoading(true);
      
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const submissionsData = data || [];
      setSubmissions(submissionsData);
      
      const newCount = submissionsData.filter(s => s.status === 'new').length;
      const inProgressCount = submissionsData.filter(s => s.status === 'in_progress').length;
      const completedCount = submissionsData.filter(s => s.status === 'completed').length;
      
      setStats({
        total: submissionsData.length,
        new: newCount,
        inProgress: inProgressCount,
        completed: completedCount
      });
      
      if (selectedSubmission) {
        const stillExists = submissionsData.find(s => s.id === selectedSubmission.id);
        if (!stillExists) {
            const currentFiltered = submissionsData.filter(s => statusFilter === 'all' || s.status === statusFilter);
            setSelectedSubmission(currentFiltered.length > 0 ? currentFiltered[0] : null);
        } else {
          setSelectedSubmission(stillExists);
        }
      } else if (submissionsData.length > 0) {
        const currentFiltered = submissionsData.filter(s => statusFilter === 'all' || s.status === statusFilter);
        setSelectedSubmission(currentFiltered.length > 0 ? currentFiltered[0] : null);
      } else {
        setSelectedSubmission(null);
      }

    } catch (error) {
      console.error('Error loading submissions:', error);
      toast({ title: 'Error', description: 'Failed to load contact submissions.', variant: 'destructive' });
    } finally {
      if (isInitialLoad) setLoading(false);
    }
  }, [toast, selectedSubmission, statusFilter]);

  useEffect(() => {
    loadSubmissions(true);
    
    const channel = supabase
      .channel('contact_submissions_realtime_crm')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_submissions' }, (payload) => {
        loadSubmissions(false);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Removed loadSubmissions from dependency array to prevent re-subscribing

  const handleSubmissionDeleted = (deletedId) => {
    const newSubmissions = submissions.filter(s => s.id !== deletedId);
    setSubmissions(newSubmissions);
    if (selectedSubmission?.id === deletedId) {
        const remainingSubmissions = newSubmissions.filter(s => statusFilter === 'all' || s.status === statusFilter);
        setSelectedSubmission(remainingSubmissions.length > 0 ? remainingSubmissions[0] : null);
    }
  };
  
    useEffect(() => {
        const currentFiltered = submissions.filter(submission =>
            (statusFilter === 'all' || submission.status === statusFilter) &&
            (searchTerm === '' ||
                submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                submission.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                submission.message.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        if (!selectedSubmission || !currentFiltered.some(s => s.id === selectedSubmission.id)) {
            setSelectedSubmission(currentFiltered.length > 0 ? currentFiltered[0] : null);
        }
    }, [statusFilter, searchTerm, submissions, selectedSubmission]);


  const updateSubmissionStatus = async (submissionId, newStatus) => {
    // Optimistic UI Update
    const originalSubmissions = [...submissions];
    const updatedSubmissions = submissions.map(s => 
      s.id === submissionId ? { ...s, status: newStatus, updated_at: new Date().toISOString() } : s
    );
    setSubmissions(updatedSubmissions);
    if (selectedSubmission?.id === submissionId) {
      setSelectedSubmission(prev => ({ ...prev, status: newStatus }));
    }

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', submissionId);

      if (error) {
        // Revert on error
        setSubmissions(originalSubmissions);
        if (selectedSubmission?.id === submissionId) {
            const originalSubmission = originalSubmissions.find(s => s.id === submissionId);
            setSelectedSubmission(originalSubmission);
        }
        throw error;
      }
      toast({ title: 'Status Updated', description: `Submission marked as ${newStatus.replace('_', ' ')}.` });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({ title: 'Error', description: 'Failed to update submission status.', variant: 'destructive' });
    }
  };

  const exportSubmissions = () => {
    const csvContent = [
      ['Name', 'Email', 'Company', 'Message', 'Status', 'Submitted At'],
      ...filteredSubmissions.map(sub => [
        sub.name, sub.email, sub.company || '', `"${sub.message.replace(/"/g, '""')}"`, sub.status, new Date(sub.created_at).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast({ title: 'Export Complete', description: 'Contact submissions exported.' });
  };

  const filteredSubmissions = submissions.filter(submission => 
    (statusFilter === 'all' || submission.status === statusFilter) &&
    (searchTerm === '' || 
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Mail className="h-8 w-8 text-blue-600" />
            Contact CRM
          </h2>
          <p className="text-slate-600 mt-1">Manage and respond to website contact submissions.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => loadSubmissions(true)}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportSubmissions} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <ContactSubmissionsStats stats={stats} activeFilter={statusFilter} setStatusFilter={setStatusFilter} />
      
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4 xl:col-span-3">
            <ContactSubmissionsFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
            <ContactSubmissionsList
              submissions={filteredSubmissions}
              selectedSubmission={selectedSubmission}
              setSelectedSubmission={setSelectedSubmission}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSubmission ? selectedSubmission.id : 'empty'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {selectedSubmission ? (
                  <ContactSubmissionDetails
                    selectedSubmission={selectedSubmission}
                    updateSubmissionStatus={updateSubmissionStatus}
                    currentUserEmail={user?.email}
                    onSubmissionDeleted={handleSubmissionDeleted}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 p-8">
                    <Inbox className="h-20 w-20 text-slate-300 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-700">No Submissions Found</h3>
                    <p className="text-slate-500 mt-2 text-center">There are no submissions matching your current filters.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCRM;