import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ModuleForm = ({ module, newModule, onSave, onCancel }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(module || newModule);
  const [featuresText, setFeaturesText] = useState(
    module?.features ? JSON.stringify(module.features, null, 2) : '[]'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const features = JSON.parse(featuresText);
      onSave({
        ...formData,
        features
      });
    } catch (error) {
      toast({
        title: 'Invalid Features JSON',
        description: 'Please provide valid JSON for features.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{module ? 'Edit Module' : 'Add New Module'}</CardTitle>
        <CardDescription>
          {module ? 'Update module details and configuration' : 'Create a new FortifyOne GRC platform module'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Module Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Advanced Analytics"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Module Key</label>
              <Input
                value={formData.module_key}
                onChange={(e) => setFormData({ ...formData, module_key: e.target.value })}
                placeholder="e.g., advanced_analytics"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this module provides..."
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Pricing Tier</label>
              <select
                value={formData.pricing_tier}
                onChange={(e) => setFormData({ ...formData, pricing_tier: e.target.value })}
                className="w-full h-10 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-sm"
              >
                <option value="free">Free</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            <div className="flex items-center pt-6 space-x-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                Module Active
              </label>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Features (JSON Array)</label>
            <Textarea
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder='["Feature 1", "Feature 2", "Feature 3"]'
              rows={4}
              className="font-mono text-xs"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Module
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ModuleForm;