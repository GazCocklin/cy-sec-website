import React from 'react';
import { Database, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PrivacyTab = ({ securitySettings, setSecuritySettings, exportData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Privacy & Data
        </CardTitle>
        <CardDescription>Control how your data is stored and used</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="data_retention">Data Retention (days)</Label>
            <Input
              id="data_retention"
              type="number"
              value={securitySettings.data_retention_days}
              onChange={(e) => setSecuritySettings(prev => ({ ...prev, data_retention_days: parseInt(e.target.value) }))}
              min="30"
              max="2555"
            />
            <p className="text-sm text-slate-500">How long to keep your data before automatic deletion</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Data Export & Deletion</h3>
            <div className="space-y-3">
              <Button variant="outline" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export My Data
              </Button>
              <p className="text-sm text-slate-600">Download a copy of all your data</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyTab;