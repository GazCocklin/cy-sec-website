import { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

export const useAdminStats = (user, isAdmin) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [overviewStats, setOverviewStats] = useState({
    totalUsers: 0,
    totalSubmissions: 0,
    activeModules: 0,
    systemHealth: 'excellent'
  });

  useEffect(() => {
    if (user && isAdmin) {
      loadOverviewStats();
    }
  }, [user, isAdmin]);

  const loadOverviewStats = async () => {
    try {
      setLoading(true);
      
      // Load overview statistics
      const [usersResult, submissionsResult, modulesResult] = await Promise.all([
        supabase.from('user_profiles').select('id', { count: 'exact' }),
        supabase.from('contact_submissions').select('id', { count: 'exact' }),
        supabase.from('security_suite_modules').select('id', { count: 'exact' }).eq('is_active', true)
      ]);

      setOverviewStats({
        totalUsers: usersResult.count || 0,
        totalSubmissions: submissionsResult.count || 0,
        activeModules: modulesResult.count || 0,
        systemHealth: 'excellent'
      });

    } catch (error) {
      console.error('Error loading overview stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard overview.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, overviewStats };
};