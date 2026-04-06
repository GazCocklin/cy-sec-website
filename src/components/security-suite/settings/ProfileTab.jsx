import React from 'react';
import { Save, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfileTab = ({ user, userProfile, setUserProfile, loading, updateProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Profile Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="first_name" className="text-slate-700">First Name</Label>
          <Input
            id="first_name"
            value={userProfile.first_name}
            onChange={(e) => setUserProfile(prev => ({ ...prev, first_name: e.target.value }))}
            className="bg-white border-slate-300 text-slate-800"
          />
        </div>
        <div>
          <Label htmlFor="last_name" className="text-slate-700">Last Name</Label>
          <Input
            id="last_name"
            value={userProfile.last_name}
            onChange={(e) => setUserProfile(prev => ({ ...prev, last_name: e.target.value }))}
            className="bg-white border-slate-300 text-slate-800"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="email" className="text-slate-700 flex items-center">
            <Mail className="h-4 w-4 mr-1" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={user?.email || ''}
            disabled
            className="bg-slate-100 border-slate-300 text-slate-600"
          />
          <p className="text-xs text-slate-500 mt-1">Email cannot be changed from this interface</p>
        </div>
        <div>
          <Label htmlFor="phone" className="text-slate-700">Phone Number</Label>
          <Input
            id="phone"
            value={userProfile.phone}
            onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
            className="bg-white border-slate-300 text-slate-800"
          />
        </div>
        <div>
          <Label htmlFor="company_name" className="text-slate-700">Company Name</Label>
          <Input
            id="company_name"
            value={userProfile.company_name}
            onChange={(e) => setUserProfile(prev => ({ ...prev, company_name: e.target.value }))}
            className="bg-white border-slate-300 text-slate-800"
          />
        </div>
        <div>
          <Label htmlFor="job_title" className="text-slate-700">Job Title</Label>
          <Input
            id="job_title"
            value={userProfile.job_title}
            onChange={(e) => setUserProfile(prev => ({ ...prev, job_title: e.target.value }))}
            className="bg-white border-slate-300 text-slate-800"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="country" className="text-slate-700">Country</Label>
          <Input
            id="country"
            value={userProfile.country}
            onChange={(e) => setUserProfile(prev => ({ ...prev, country: e.target.value }))}
            className="bg-white border-slate-300 text-slate-800"
          />
        </div>
      </div>
      <div className="mt-8">
        <Button
          onClick={updateProfile}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </div>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfileTab;