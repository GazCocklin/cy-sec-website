import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Building, Calendar, Clock, AlertCircle, CheckCircle, MessageSquare, Send, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Badge } from '@/components/ui/badge';
import DeleteSubmissionDialog from './DeleteSubmissionDialog';

const ContactSubmissionDetails = ({ 
  selectedSubmission, 
  updateSubmissionStatus,
  currentUserEmail,
  onSubmissionDeleted
}) => {
  const [note, setNote] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddNote = async () => {
    if (!note.trim()) {
      toast({ title: 'Note is empty', description: 'Please write a note before saving.', variant: 'destructive' });
      return;
    }

    const newNote = {
      content: note,
      author: currentUserEmail,
      timestamp: new Date().toISOString(),
    };

    const existingNotes = selectedSubmission.admin_notes || [];
    const updatedNotes = [...existingNotes, newNote];

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ admin_notes: updatedNotes })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      toast({ title: 'Note Added', description: 'Your note has been successfully saved.' });
      setNote('');
    } catch (error) {
      console.error('Error adding note:', error);
      toast({ title: 'Error', description: 'Failed to add the note.', variant: 'destructive' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <Clock className="h-4 w-4 mr-2" />;
      case 'in_progress': return <AlertCircle className="h-4 w-4 mr-2" />;
      case 'completed': return <CheckCircle className="h-4 w-4 mr-2" />;
      default: return null;
    }
  }

  return (
    <>
      <Card className="h-full flex flex-col bg-slate-50/50 border-slate-200/80 shadow-sm">
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-slate-800">{selectedSubmission.name}</CardTitle>
            <CardDescription>
              <a href={`mailto:${selectedSubmission.email}`} className="text-blue-600 hover:underline">{selectedSubmission.email}</a>
            </CardDescription>
          </div>
          <Badge variant="outline" className={`text-sm capitalize py-1 px-3 rounded-full flex items-center ${getStatusColor(selectedSubmission.status)} border-0`}>
            {getStatusIcon(selectedSubmission.status)}
            {selectedSubmission.status.replace('_', ' ')}
          </Badge>
        </CardHeader>
        <CardContent className="flex-grow space-y-6 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Details & Message */}
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Contact Information</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center"><User className="h-4 w-4 text-gray-400 mr-3" /><span>{selectedSubmission.name}</span></div>
                  {selectedSubmission.company && <div className="flex items-center"><Building className="h-4 w-4 text-gray-400 mr-3" /><span>{selectedSubmission.company}</span></div>}
                  <div className="flex items-center"><Calendar className="h-4 w-4 text-gray-400 mr-3" /><span>{new Date(selectedSubmission.created_at).toLocaleString()}</span></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Message</CardTitle></CardHeader>
                <CardContent className="bg-white p-4 rounded-lg border max-h-48 overflow-y-auto">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </CardContent>
              </Card>
            </div>
            {/* Right Column: Notes */}
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center"><MessageSquare className="h-5 w-5 mr-2 text-blue-600" />Admin Notes</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-lg border max-h-48 overflow-y-auto space-y-3">
                  {selectedSubmission.admin_notes && selectedSubmission.admin_notes.length > 0 ? (
                    selectedSubmission.admin_notes.slice().reverse().map((note, index) => (
                      <div key={index} className="text-sm border-b border-slate-100 pb-2 last:border-b-0">
                        <p className="text-gray-800">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-1">- {note.author} on {new Date(note.timestamp).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No notes yet.</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Textarea placeholder="Add a new note..." value={note} onChange={(e) => setNote(e.target.value)} className="flex-grow" rows={2} />
                  <Button onClick={handleAddNote} size="icon" aria-label="Add Note"><Send className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="bg-slate-100/70 border-t p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-medium text-slate-800 mb-2 text-sm">Status Management</h4>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant={selectedSubmission.status === 'new' ? 'default' : 'outline'} onClick={() => updateSubmissionStatus(selectedSubmission.id, 'new')}><Clock className="h-3 w-3 mr-1" />New</Button>
              <Button size="sm" variant={selectedSubmission.status === 'in_progress' ? 'default' : 'outline'} onClick={() => updateSubmissionStatus(selectedSubmission.id, 'in_progress')}><AlertCircle className="h-3 w-3 mr-1" />In Progress</Button>
              <Button size="sm" variant={selectedSubmission.status === 'completed' ? 'default' : 'outline'} onClick={() => updateSubmissionStatus(selectedSubmission.id, 'completed')}><CheckCircle className="h-3 w-3 mr-1" />Completed</Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const subject = `Re: Your inquiry - ${selectedSubmission.name}`;
                const body = `Hi ${selectedSubmission.name},\n\nThank you for contacting Cy-Sec. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Cy-Sec Team`;
                window.open(`mailto:${selectedSubmission.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
              }}
            >
              <Mail className="h-3 w-3 mr-1" />
              Reply
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
      <DeleteSubmissionDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        submissionId={selectedSubmission.id}
        submissionName={selectedSubmission.name}
        onDeleted={onSubmissionDeleted}
      />
    </>
  );
};

export default ContactSubmissionDetails;