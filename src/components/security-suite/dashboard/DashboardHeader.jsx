import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

const DashboardHeader = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setUserProfile(data);
        }
      } catch (error) {
        console.log('Profile loading handled gracefully');
      }
    };

    loadUserProfile();
  }, [user]);

  const getWelcomeMessage = () => {
    if (!user) return "";

    let name = '';
    let company = '';

    if (userProfile) {
      name = userProfile.full_name || `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim();
      company = userProfile.organisation_name || userProfile.company || '';
    }

    if (!name) {
      name = user.email ? user.email.split('@')[0] : 'User';
    }

    if (name && company) {
      return `${name} (${company})`;
    }
    
    return name;
  };

  return (
    <div className="mb-12 text-center">
      <img 
        src="/logos/fortifyone-logo.svg" 
        alt="Cy-Sec FortifyOne Logo" 
        className="h-24 w-auto mx-auto mb-6"
      />
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-r-4 border-blue-500 p-6 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Welcome to <span className="text-slate-900">Cy-Sec</span> <span className="gradient-text">FortifyOne</span>
          <span className="text-blue-800 ml-2">{getWelcomeMessage()}</span>
        </h2>
        <p className="text-blue-700 text-lg mt-4">Monitor your compliance status, track assessments, and manage your organisation's security posture.</p>
      </div>
    </div>
  );
};

export default DashboardHeader;