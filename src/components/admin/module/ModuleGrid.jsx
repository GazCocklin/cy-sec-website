import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Edit, 
  Trash2, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Users, 
  Package, 
  Plus 
} from 'lucide-react';

const ModuleGrid = ({ 
  modules, 
  stats, 
  setEditingModule, 
  deleteModule, 
  toggleModuleStatus,
  setShowAddForm 
}) => {
  const getPricingTierColor = (tier) => {
    switch (tier) {
      case 'free': return 'bg-gray-100 text-gray-800';
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (modules.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Modules Found</h3>
          <p className="text-gray-500 mb-4">
            Get started by creating your first security suite module.
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Module
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <Card key={module.id} className="relative flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-2">
                <CardTitle className="text-lg">{module.name}</CardTitle>
                <CardDescription className="mt-1 line-clamp-2">
                  {module.description}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setEditingModule(module)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 hover:bg-red-100"
                  onClick={() => deleteModule(module.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getPricingTierColor(module.pricing_tier)}>
                  <DollarSign className="h-3 w-3 mr-1" />
                  {module.pricing_tier}
                </Badge>
                <button
                  onClick={() => toggleModuleStatus(module.id, module.is_active)}
                  className="flex items-center space-x-1"
                >
                  {module.is_active ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800">
                      <XCircle className="h-3 w-3 mr-1" />
                      Inactive
                    </Badge>
                  )}
                </button>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Module Key</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {module.module_key}
                </code>
              </div>

              {module.features && module.features.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Features</p>
                  <div className="space-y-1">
                    {module.features.slice(0, 3).map((feature, index) => (
                      <p key={index} className="text-xs text-gray-700">
                        • {feature}
                      </p>
                    ))}
                    {module.features.length > 3 && (
                      <p className="text-xs text-gray-500">
                        +{module.features.length - 3} more features
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-4 mt-4 border-t">
              <span>
                <Users className="h-3 w-3 inline mr-1" />
                {stats.moduleUsage[module.id] || 0} users
              </span>
              <span>
                Created {new Date(module.created_at).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModuleGrid;