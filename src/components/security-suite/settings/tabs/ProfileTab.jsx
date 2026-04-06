import React from 'react';
import { User, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfileTab = ({ user, userProfile, setUserProfile, loading, updateProfile }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
        <CardDescription>Update your personal and company information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              value={userProfile.first_name || ''}
              onChange={(e) => setUserProfile(prev => ({ ...prev, first_name: e.target.value }))}
              placeholder="Enter your first name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              value={userProfile.last_name || ''}
              onChange={(e) => setUserProfile(prev => ({ ...prev, last_name: e.target.value }))}
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={user?.email || ''}
            disabled
            className="bg-gray-50"
          />
          <p className="text-sm text-slate-500">Email cannot be changed from this interface</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="organisation_name">Organisation Name</Label>
          <Input
            id="organisation_name"
            value={userProfile.organisation_name || userProfile.company_name || ''}
            onChange={(e) => setUserProfile(prev => ({ 
              ...prev, 
              organisation_name: e.target.value,
              company_name: e.target.value 
            }))}
            placeholder="Enter your organisation name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="job_title">Job Title</Label>
            <Input
              id="job_title"
              value={userProfile.job_title || ''}
              onChange={(e) => setUserProfile(prev => ({ ...prev, job_title: e.target.value }))}
              placeholder="Enter your job title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={userProfile.phone || ''}
              onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+44 20 1234 5678"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={userProfile.country || ''}
            onChange={(e) => setUserProfile(prev => ({ ...prev, country: e.target.value }))}
            placeholder="United Kingdom"
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={updateProfile} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;