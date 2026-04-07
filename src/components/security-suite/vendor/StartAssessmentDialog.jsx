import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2 } from 'lucide-react';

const StartAssessmentDialog = ({ open, onOpenChange, vendor }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [frameworks, setFrameworks] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingFrameworks, setLoadingFrameworks] = useState(true);

  useEffect(() => {
    const fetchFrameworks = async () => {
      try {
        setLoadingFrameworks(true);
        const { data, error } = await supabase.from('compliance_frameworks').select('id, name');
        if (error) throw error;
        setFrameworks(data);
      } catch (error) {
        console.error('Error fetching frameworks:', error);
        toast({ title: 'Error', description: 'Could not fetch compliance frameworks.', variant: 'destructive' });
      } finally {
        setLoadingFrameworks(false);
      }
    };

    if (open) {
      fetchFrameworks();
    }
  }, [open, toast]);

  useEffect(() => {
    if (vendor) {
      setTitle(`${vendor.name} - Security Assessment`);
    }
  }, [vendor]);

  const handleStartAssessment = async () => {
    if (!selectedFramework || !title) {
      toast({ title: 'Missing Information', description: 'Please select a framework and provide a title.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vendor_questionnaires')
        .insert({
          vendor_id: vendor.id,
          framework_id: selectedFramework,
          user_id: user.id,
          title,
          status: 'in_progress',
          assessment_date: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      toast({ title: 'Assessment Started!', description: `Questionnaire created for ${vendor.name}.` });
      onOpenChange(false);
      navigate(`/fortify-one/vendor-assessment/${data.id}`);
    } catch (error) {
      console.error('Error starting assessment:', error);
      toast({ title: 'Error', description: 'Failed to create the assessment.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start New Vendor Assessment</DialogTitle>
          <DialogDescription>
            Begin a new security questionnaire for {vendor?.name}. You will answer questions on their behalf.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Assessment Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Q3 Security Review" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="framework">Compliance Framework</Label>
            {loadingFrameworks ? (
              <div className="flex items-center justify-center p-2">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              <Select onValueChange={setSelectedFramework} value={selectedFramework}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a framework..." />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.map((fw) => (
                    <SelectItem key={fw.id} value={fw.id}>
                      {fw.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleStartAssessment} disabled={loading || loadingFrameworks}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Start Assessment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StartAssessmentDialog;