import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Plus, FileText, Building, AlertTriangle, Lock } from 'lucide-react';
import { planDefinitions } from '@/components/admin/PlanManagement';

const CreateAssessmentDialog = ({ open, onOpenChange, onAssessmentCreated, children }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [frameworks, setFrameworks] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState('');
  const [title, setTitle] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [usage, setUsage] = useState({ count: 0, limit: 0, planName: 'No Plan' });
  const [canCreate, setCanCreate] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [frameworksRes, subscriptionsRes, assessmentsRes] = await Promise.all([
        supabase.from('compliance_frameworks').select('*'),
        supabase.from('subscriptions').select('*').eq('user_id', user.id),
        supabase.from('security_assessments').select('id, assessment_type').eq('user_id', user.id)
      ]);

      if (frameworksRes.error) throw frameworksRes.error;
      if (subscriptionsRes.error) throw subscriptionsRes.error;
      if (assessmentsRes.error) throw assessmentsRes.error;

      setFrameworks(frameworksRes.data || []);

      const currentPlanId = subscriptionsRes.data?.[0]?.plan_id;
      const plan = planDefinitions.find(p => p.id === currentPlanId);
      const assessmentCount = (assessmentsRes.data || []).filter(a => a.assessment_type !== 'vendor').length;
      const limit = plan?.limits?.frameworks || 0;
      const planName = plan?.name || 'No active plan';

      setUsage({ count: assessmentCount, limit, planName });
      setCanCreate(assessmentCount < limit);

    } catch (error) {
      console.error('Error fetching data for assessment creation:', error);
      toast({
        title: 'Error',
        description: 'Could not load necessary data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open, fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canCreate) {
      toast({
        title: 'Limit Reached',
        description: 'You have reached the maximum number of assessments for your plan.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('security_assessments')
        .insert({
          user_id: user.id,
          framework_id: selectedFramework,
          title,
          organization_name: organizationName,
          status: 'not_started', // Start as not_started
          assessment_date: new Date().toISOString(),
          assessment_type: 'internal', // Ensure assessment_type is set
        })
        .select('*, compliance_frameworks(name)')
        .single();

      if (error) throw error;

      toast({
        title: 'Assessment Created',
        description: `The assessment "${data.title}" has been successfully created.`,
      });

      onAssessmentCreated?.(data);
      onOpenChange?.(false);
      setTitle('');
      setSelectedFramework('');
      setOrganizationName('');
    } catch (error) {
      console.error('Error creating assessment:', error);
      toast({
        title: 'Error Creating Assessment',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Compliance Assessment</DialogTitle>
          <DialogDescription>
            Start a new assessment by selecting a framework and providing details.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg my-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-blue-800">Current Plan: {usage.planName}</p>
            <p className="text-sm font-medium text-blue-700">
              Assessments: {usage.count} / {usage.limit === Infinity ? 'Unlimited' : usage.limit}
            </p>
          </div>
        </div>

        {!canCreate && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg my-4 flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800">Framework Limit Reached</h4>
              <p className="text-sm text-yellow-700">
                You have used all available frameworks for your current plan. Please upgrade to create more assessments.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="framework">Framework</Label>
            <select
              id="framework"
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
              disabled={!canCreate || loading}
            >
              <option value="" disabled>Select a framework</option>
              {frameworks.map((fw) => (
                <option key={fw.id} value={fw.id}>
                  {fw.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Assessment Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Q3 2025 Cyber Essentials Audit"
              required
              disabled={!canCreate || loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organizationName" className="flex items-center">
              <Building className="h-4 w-4 mr-1" />
              Organization Name
            </Label>
            <Input
              id="organizationName"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              placeholder="e.g., Your Company Inc."
              required
              disabled={!canCreate || loading}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!canCreate || loading}>
              {loading ? 'Creating...' : (canCreate ? 'Create Assessment' : 'Limit Reached')}
              {!canCreate && <Lock className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssessmentDialog;