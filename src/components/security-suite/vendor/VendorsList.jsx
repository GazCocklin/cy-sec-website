import React from 'react';
import { motion } from 'framer-motion';
import { Users, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VendorCard from './VendorCard';

const VendorsList = ({ vendors, onDeleteVendor, onAddFirst, searchTerm, riskFilter }) => {
  if (vendors.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vendor Portfolio</CardTitle>
          <CardDescription>Manage and assess your third-party vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No vendors found</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm || riskFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first vendor to track their security posture.'
              }
            </p>
            {!searchTerm && riskFilter === 'all' && (
              <Button onClick={onAddFirst}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Vendor
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Portfolio</CardTitle>
        <CardDescription>Manage and assess your third-party vendors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VendorCard 
                vendor={vendor} 
                onDelete={onDeleteVendor}
              />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorsList;