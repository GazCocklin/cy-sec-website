import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const CreateVendorDialog = ({ open, onOpenChange, onAddVendor }) => {
  const [newVendor, setNewVendor] = useState({
    name: '',
    service_type: '',
    contact_email: '',
    contact_phone: '',
    website: '',
    cyber_essentials: false,
    cyber_essentials_plus: false,
    iso27001: false,
    cyber_essentials_expiry: '',
    cyber_essentials_plus_expiry: '',
    iso27001_expiry: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewVendor(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id, checked) => {
    setNewVendor(prev => ({ ...prev, [id]: checked }));
  };

  const handleSelectChange = (value) => {
    setNewVendor(prev => ({ ...prev, service_type: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Prepare vendor data, setting expiry dates to null if checkbox is false
    const vendorDataToSubmit = { ...newVendor };
    if (!vendorDataToSubmit.cyber_essentials) vendorDataToSubmit.cyber_essentials_expiry = null;
    if (!vendorDataToSubmit.cyber_essentials_plus) vendorDataToSubmit.cyber_essentials_plus_expiry = null;
    if (!vendorDataToSubmit.iso27001) vendorDataToSubmit.iso27001_expiry = null;

    const success = await onAddVendor(vendorDataToSubmit);
    setLoading(false);
    if (success) {
      onOpenChange(false);
      setNewVendor({
        name: '',
        service_type: '',
        contact_email: '',
        contact_phone: '',
        website: '',
        cyber_essentials: false,
        cyber_essentials_plus: false,
        iso27001: false,
        cyber_essentials_expiry: '',
        cyber_essentials_plus_expiry: '',
        iso27001_expiry: '',
      });
    }
  };

  const CertificationRow = ({ id, label, checked, onCheckedChange, dateValue, onDateChange }) => (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2 w-1/3">
        <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
        <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      </div>
      {checked && (
        <div className="w-2/3">
           <Input
            id={`${id}_expiry`}
            type="date"
            value={dateValue}
            onChange={onDateChange}
            className="h-8"
          />
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Vendor</DialogTitle>
          <DialogDescription>
            Add a new third-party vendor to your risk management portfolio.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Vendor Name *</Label>
              <Input id="name" placeholder="Company name" value={newVendor.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service_type">Risk Level *</Label>
              <Select onValueChange={handleSelectChange} value={newVendor.service_type} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a risk level..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_email">Contact Email *</Label>
              <Input id="contact_email" type="email" placeholder="contact@vendor.com" value={newVendor.contact_email} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Phone</Label>
                <Input id="contact_phone" placeholder="+44 20 1234 5678" value={newVendor.contact_phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="https://vendor.com" value={newVendor.website} onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                 <Label>Security Certifications</Label>
                 <Label className="text-xs text-slate-500">Expiry Date</Label>
              </div>
              <div className="flex flex-col space-y-3">
                <CertificationRow 
                  id="cyber_essentials"
                  label="Cyber Essentials"
                  checked={newVendor.cyber_essentials}
                  onCheckedChange={(checked) => handleCheckboxChange('cyber_essentials', checked)}
                  dateValue={newVendor.cyber_essentials_expiry}
                  onDateChange={handleChange}
                />
                 <CertificationRow 
                  id="cyber_essentials_plus"
                  label="Cyber Essentials +"
                  checked={newVendor.cyber_essentials_plus}
                  onCheckedChange={(checked) => handleCheckboxChange('cyber_essentials_plus', checked)}
                  dateValue={newVendor.cyber_essentials_plus_expiry}
                  onDateChange={handleChange}
                />
                <CertificationRow 
                  id="iso27001"
                  label="ISO 27001"
                  checked={newVendor.iso27001}
                  onCheckedChange={(checked) => handleCheckboxChange('iso27001', checked)}
                  dateValue={newVendor.iso27001_expiry}
                  onDateChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Vendor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVendorDialog;