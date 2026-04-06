import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock } from 'lucide-react';

export const AdminAccessControl = ({ user, children }) => {
  // Check if user has admin access (case-insensitive email comparison)
  const isAdmin = user?.email?.toLowerCase() === 'gazc@cy-sec.co.uk' || 
                  user?.email?.toLowerCase() === 'aimeec@cy-sec.co.uk';

  // Access control - show access denied if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-gray-600">Please sign in to access the admin dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Access control - show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this admin dashboard.
            </p>
            <p className="text-xs text-gray-500">
              Current user: {user.email}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return children;
};

export default AdminAccessControl;