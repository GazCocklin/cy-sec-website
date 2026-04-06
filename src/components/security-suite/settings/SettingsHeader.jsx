import React from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const SettingsHeader = () => {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Settings className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Account <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Settings</span>
          </h1>
          <div className="flex items-center gap-4 text-slate-600 mt-1">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="text-sm">Logged in as</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600">
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-lg text-slate-600">
        Manage your account settings, security preferences, and privacy controls.
      </p>
    </motion.div>
  );
};

export default SettingsHeader;