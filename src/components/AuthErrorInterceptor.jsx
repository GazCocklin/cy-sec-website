import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

const AuthErrorInterceptor = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInvalidSession = useCallback(async () => {
    if (location.pathname.startsWith('/security-suite/login')) {
      return;
    }
    
    await signOut({ scope: 'local' });
    
    navigate('/security-suite/login', {
      state: {
        from: location,
        message: 'Your session has expired or is invalid. Please sign in again.',
      },
      replace: true,
    });
  }, [signOut, navigate, location]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'TOKEN_REFRESHED' && !session) {
        if (user) {
          handleInvalidSession();
        }
      }

      if(event === 'INITIAL_SESSION' && !session) {
        const token = localStorage.getItem('sb-aixxbakynzjkdezzklbk-auth-token');
        if (token) {
            handleInvalidSession();
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [handleInvalidSession, user]);

  return <>{children}</>;
};

export default AuthErrorInterceptor;