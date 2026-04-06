import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isAuthenticated = !!(user && session);

  if (!isAuthenticated) {
    return <Navigate to="/security-suite/login" state={{ from: location }} replace />;
  }

  if (adminOnly) {
    const userEmail = (user && user.email) ? user.email.toLowerCase() : '';
    const isAdmin = userEmail === 'gazc@cy-sec.co.uk' || userEmail === 'aimeec@cy-sec.co.uk';
    
    if (!isAdmin) {
      return <Navigate to="/security-suite/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;