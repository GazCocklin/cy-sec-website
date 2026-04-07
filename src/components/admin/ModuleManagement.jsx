import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

import ModuleManagementStats from '@/components/admin/module/ModuleManagementStats';
import ModuleForm from '@/components/admin/module/ModuleForm';
import ModuleGrid from '@/components/admin/module/ModuleGrid';

const ModuleManagement = () => {
  const { toast } = useToast();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingModule, setEditingModule] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [stats, setStats] = useState({
    totalModules: 0,
    activeModules: 0,
    totalUsers: 0,
    moduleUsage: {}
  });

  const initialNewModuleState = {
    name: '',
    description: '',
    module_key: '',
    pricing_tier: 'standard',
    features: [],
    is_active: true
  };
  const [newModule, setNewModule] = useState(initialNewModuleState);

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('security_suite_modules')
        .select(`
          *,
          user_module_access (
            user_id
          )
        `)
        .order('name', { ascending: true });

      if (error) throw error;

      setModules(data || []);
      
      const { data: usageData, error: usageError } = await supabase
        .from('user_module_access')
        .select('module_id');
      
      if (usageError) throw usageError;

      const totalModules = data?.length || 0;
      const activeModules = data?.filter(m => m.is_active).length || 0;
      
      const moduleUsage = {};
      data?.forEach(module => {
        moduleUsage[module.id] = usageData?.filter(u => u.module_id === module.id).length || 0;
      });

      const totalUsers = new Set(usageData?.map(u => u.user_id)).size;

      setStats({
        totalModules,
        activeModules,
        totalUsers,
        moduleUsage
      });

    } catch (error) {
      console.error('Error loading modules:', error);
      toast({
        title: 'Error',
        description: 'Failed to load FortifyOne GRC platform modules.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (moduleData) => {
    const isEditing = !!moduleData.id;
    const dataToSave = { ...moduleData, updated_at: new Date().toISOString() };
    if (!isEditing) {
      delete dataToSave.id;
    }

    try {
      const { error } = await supabase
        .from('security_suite_modules')
        .upsert(dataToSave);

      if (error) throw error;

      toast({
        title: `Module ${isEditing ? 'Updated' : 'Created'}`,
        description: `Module "${moduleData.name}" has been saved successfully.`,
      });

      loadModules();
      setEditingModule(null);
      setShowAddForm(false);
      setNewModule(initialNewModuleState);

    } catch (error) {
      console.error('Error saving module:', error);
      toast({
        title: 'Error',
        description: 'Failed to save FortifyOne GRC platform module.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (moduleId) => {
    if (!window.confirm('Are you sure you want to delete this module? This action cannot be undone.')) {
      return;
    }

    try {
      await supabase.from('user_module_access').delete().eq('module_id', moduleId);

      const { error } = await supabase
        .from('security_suite_modules')
        .delete()
        .eq('id', moduleId);

      if (error) throw error;

      toast({
        title: 'Module Deleted',
        description: 'Security suite module has been deleted successfully.',
      });

      loadModules();
    } catch (error) {
      console.error('Error deleting module:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete FortifyOne GRC platform module. It might be in use.',
        variant: 'destructive',
      });
    }
  };

  const handleToggleStatus = async (moduleId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('security_suite_modules')
        .update({ 
          is_active: !currentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', moduleId);

      if (error) throw error;

      toast({
        title: 'Module Status Updated',
        description: `Module has been ${!currentStatus ? 'activated' : 'deactivated'}.`,
      });

      loadModules();
    } catch (error) {
      console.error('Error updating module status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update module status.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingModule(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ModuleManagementStats stats={stats} />

      {!showAddForm && !editingModule && (
        <div className="flex justify-end">
          <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Module
          </Button>
        </div>
      )}

      {(showAddForm || editingModule) && (
        <ModuleForm
          module={editingModule}
          newModule={newModule}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <ModuleGrid
        modules={modules}
        stats={stats}
        setEditingModule={setEditingModule}
        deleteModule={handleDelete}
        toggleModuleStatus={handleToggleStatus}
        setShowAddForm={setShowAddForm}
      />
    </div>
  );
};

export default ModuleManagement;