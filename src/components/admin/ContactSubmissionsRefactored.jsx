import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download } from 'lucide-react';

import ContactSubmissionsList from '@/components/admin/contact/ContactSubmissionsList';
import ContactSubmissionDetails from '@/components/admin/contact/ContactSubmissionDetails';
import ContactSubmissionsStats from '@/components/admin/contact/ContactSubmissionsStats';
import ContactSubmissionsFilters from '@/components/admin/contact/ContactSubmissionsFilters';

const ContactSubmissionsRefactored = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [stats, setStats] = useState({ total: 0, new: 0, inProgress: 0, completed: 0 });

  const loadSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      
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
        setSelectedSubmission(submissionsData.find(s => s.id === selectedSubmission.id) || null);
      } else if (submissionsData.length > 0) {
        setSelectedSubmission(submissionsData[0]);
      }

    } catch (error) {
      console.error('Error loading submissions:', error);
      toast({ title: 'Error', description: 'Failed to load contact submissions.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast, selectedSubmission]);

  useEffect(() => {
    loadSubmissions();
    
    const channel = supabase
      .channel('contact_submissions_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_submissions' }, (payload) => {
        console.log('Real-time change received:', payload);
        loadSubmissions();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadSubmissions]);

  const updateSubmissionStatus = async (submissionId, newStatus) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', submissionId);

      if (error) throw error;
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

  if (loading && submissions.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Contact Form Management</h2>
          <p className="text-slate-600">Manage and respond to website contact submissions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={loadSubmissions} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportSubmissions} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <ContactSubmissionsStats stats={stats} />
      <ContactSubmissionsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContactSubmissionsList
          submissions={filteredSubmissions}
          selectedSubmission={selectedSubmission}
          setSelectedSubmission={setSelectedSubmission}
        />
        <ContactSubmissionDetails
          selectedSubmission={selectedSubmission}
          updateSubmissionStatus={updateSubmissionStatus}
          currentUserEmail={user?.email}
        />
      </div>
    </div>
  );
};

export default ContactSubmissionsRefactored;