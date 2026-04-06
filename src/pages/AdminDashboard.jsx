import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Helmet>
        <title>Dashboard Deprecated</title>
      </Helmet>
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">This Dashboard is Deprecated</h1>
        <p className="text-gray-600 mb-6">
          This dashboard has been replaced by a new, more powerful admin interface.
        </p>
        <Button asChild>
          <Link to="/admin/legacy">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go to the new Admin Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;