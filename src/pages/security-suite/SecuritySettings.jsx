import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import SettingsHeader from '@/components/security-suite/settings/SettingsHeader';
import SettingsTabs from '@/components/security-suite/settings/SettingsTabs';
import { useNavigate } from 'react-router-dom';

const SecuritySettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    organisation_name: '',
    job_title: '',
    phone: '',
    country: ''
  });
  const [securitySettings, setSecuritySettings] = useState({
    two_factor_enabled: false,
    email_notifications: true,
    security_alerts: true,
    login_notifications: true,
    data_retention_days: 365,
    auto_logout_minutes: 30
  });

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setUserProfile({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          company_name: data.company || data.company_name || '',
          organisation_name: data.organisation_name || data.company || '',
          job_title: data.job_title || data.position || '',
          phone: data.phone || '',
          country: data.country || ''
        });
      }

      await supabase
        .from('user_activity_logs')
        .insert({
          user_id: user.id,
          platform: 'security_suite',
          activity_type: 'settings_view',
          activity_description: 'Viewed Security Settings page'
        });

    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error Loading Profile",
        description: "Failed to load your profile data.",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to update your profile.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          email: user.email,
          first_name: userProfile.first_name,
          last_name: userProfile.last_name,
          company: userProfile.organisation_name || userProfile.company_name,
          company_name: userProfile.organisation_name || userProfile.company_name,
          organisation_name: userProfile.organisation_name || userProfile.company_name,
          job_title: userProfile.job_title,
          position: userProfile.job_title,
          phone: userProfile.phone,
          country: userProfile.country,
          full_name: `${userProfile.first_name} ${userProfile.last_name}`.trim(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      await supabase
        .from('user_activity_logs')
        .insert({
          user_id: user.id,
          platform: 'security_suite',
          activity_type: 'profile_updated',
          activity_description: 'Updated user profile information'
        });

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (passwordData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to update your password.",
        variant: "destructive",
      });
      return false;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return false;
    }

    if (passwordData.new_password.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.new_password
      });

      if (error) throw error;

      await supabase
        .from('user_activity_logs')
        .insert({
          user_id: user.id,
          platform: 'security_suite',
          activity_type: 'password_updated',
          activity_description: 'Updated account password'
        });

      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      });
      return true;
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const exportData = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to export your data.",
        variant: "destructive",
      });
      return;
    }

    try {
      await supabase
        .from('user_activity_logs')
        .insert({
          user_id: user.id,
          platform: 'security_suite',
          activity_type: 'data_export_requested',
          activity_description: 'Requested data export'
        });

      toast({
        title: "Data Export Initiated",
        description: "Your data export will be emailed to you within 24 hours.",
      });
    } catch (error) {
      console.error('Error requesting data export:', error);
      toast({
        title: "Export Failed",
        description: "Failed to initiate data export. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteAccount = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to delete your account.",
        variant: "destructive",
      });
      return;
    }

    try {
      await supabase
        .from('user_activity_logs')
        .insert({
          user_id: user.id,
          platform: 'security_suite',
          activity_type: 'account_deletion_requested',
          activity_description: 'Requested account deletion'
        });

      toast({
        title: "Account Deletion Requested",
        description: "Your account deletion request has been submitted. You will receive confirmation via email.",
      });
    } catch (error) {
      console.error('Error requesting account deletion:', error);
      toast({
        title: "Deletion Failed",
        description: "Failed to process deletion request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Helmet>
        <title>Security Settings - Cy-Sec FortifyOne</title>
        <meta name="description" content="Manage your account security settings, privacy preferences, and data controls." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/security-suite/dashboard')}
              className="flex items-center gap-2 hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          
          <SettingsHeader />
          
          <SettingsTabs
            user={user}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            securitySettings={securitySettings}
            setSecuritySettings={setSecuritySettings}
            loading={loading}
            updateProfile={updateProfile}
            updatePassword={updatePassword}
            exportData={exportData}
            deleteAccount={deleteAccount}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SecuritySettings;