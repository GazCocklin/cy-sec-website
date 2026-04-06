import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const StatCard = ({ title, value, icon: Icon, color, isActive, onClick }) => {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
        isActive ? 'ring-2 ring-offset-2 shadow-xl' : 'shadow-md',
        color === 'blue' && (isActive ? 'ring-blue-500' : 'hover:ring-blue-300'),
        color === 'yellow' && (isActive ? 'ring-yellow-500' : 'hover:ring-yellow-300'),
        color === 'green' && (isActive ? 'ring-green-500' : 'hover:ring-green-300'),
        color === 'gray' && (isActive ? 'ring-slate-500' : 'hover:ring-slate-300')
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
          </div>
          <Icon className={cn(
            "h-8 w-8",
            color === 'blue' && 'text-blue-600',
            color === 'yellow' && 'text-yellow-600',
            color === 'green' && 'text-green-600',
            color === 'gray' && 'text-gray-600'
          )} />
        </div>
      </CardContent>
    </Card>
  )
};

const ContactSubmissionsStats = ({ stats, activeFilter, setStatusFilter }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard 
        title="Total Submissions"
        value={stats.total}
        icon={Mail}
        color="gray"
        isActive={activeFilter === 'all'}
        onClick={() => setStatusFilter('all')}
      />
      <StatCard 
        title="New"
        value={stats.new}
        icon={Clock}
        color="blue"
        isActive={activeFilter === 'new'}
        onClick={() => setStatusFilter('new')}
      />
      <StatCard 
        title="In Progress"
        value={stats.inProgress}
        icon={AlertCircle}
        color="yellow"
        isActive={activeFilter === 'in_progress'}
        onClick={() => setStatusFilter('in_progress')}
      />
      <StatCard 
        title="Completed"
        value={stats.completed}
        icon={CheckCircle}
        color="green"
        isActive={activeFilter === 'completed'}
        onClick={() => setStatusFilter('completed')}
      />
    </div>
  );
};

export default ContactSubmissionsStats;