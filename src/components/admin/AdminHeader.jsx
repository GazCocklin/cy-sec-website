import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { User, Shield, Home } from 'lucide-react';
import NotificationCenter from '@/components/admin/NotificationCenter';

const AdminHeader = ({ user, title, subtitle }) => {
  const isAdmin = user?.email?.toLowerCase() === 'gazc@cy-sec.co.uk' || 
                  user?.email?.toLowerCase() === 'aimeec@cy-sec.co.uk';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            {title}
          </h1>
          <p className="text-slate-600">
            {subtitle}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/admin">
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50 cursor-pointer p-2">
              <Home className="h-4 w-4" />
            </Badge>
          </Link>
          <NotificationCenter user={user} isAdmin={isAdmin} />
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <User className="h-3 w-3 mr-1" />
            {user.email}
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            <Shield className="h-3 w-3 mr-1" />
            Super Admin
          </Badge>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminHeader;