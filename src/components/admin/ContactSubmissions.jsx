import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ContactSubmissions = () => {
  return (
    <div className="text-center p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Component Deprecated</h1>
      <p className="text-gray-600 mb-6">
        This component has been refactored and moved. Please use the new ContactCRM component.
      </p>
      <Button asChild>
        <Link to="/admin/crm">
          Go to CRM
        </Link>
      </Button>
    </div>
  );
};

export default ContactSubmissions;