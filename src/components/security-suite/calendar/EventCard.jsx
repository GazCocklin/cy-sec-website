import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, CalendarPlus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const eventTypes = {
  assessment: {
    icon: FileText,
    color: 'blue',
    label: 'Assessment',
  },
  vendor: {
    icon: Users,
    color: 'purple',
    label: 'Vendor Review',
  },
  manual: {
    icon: CalendarPlus,
    color: 'teal',
    label: 'Manual Event',
  }
};

const EventCard = ({ event, isCompact = false }) => {
  const eventConfig = eventTypes[event.type] || eventTypes.manual;
  const Icon = eventConfig.icon;
  const eventDate = new Date(event.date);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const colorClasses = {
    blue: {
      bg: 'bg-white',
      border: 'border-blue-500',
      icon: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    purple: {
      bg: 'bg-white',
      border: 'border-purple-500',
      icon: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-800 border-purple-200',
    },
    teal: {
      bg: 'bg-white',
      border: 'border-teal-500',
      icon: 'text-teal-600',
      badge: 'bg-teal-100 text-teal-800 border-teal-200',
    }
  };
  const colors = colorClasses[eventConfig.color];
  
  const day = eventDate.toLocaleDateString(undefined, { day: '2-digit' });
  const month = eventDate.toLocaleDateString(undefined, { month: 'short' });

  if (isCompact) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <motion.div
            variants={cardVariants}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all bg-white hover:shadow-md border-l-4 ${colors.border}`}
          >
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-slate-50 rounded-md shadow-sm">
                <span className="text-sm font-bold text-slate-700">{month}</span>
                <span className="text-xl font-extrabold text-slate-900">{day}</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-slate-800 truncate">{event.title}</p>
              <Badge variant="outline" className={`font-mono text-xs ${colors.badge}`}>{eventConfig.label}</Badge>
            </div>
          </motion.div>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${colors.icon}`} />
                    {event.title}
                </AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div>
                    <p className="mt-2 text-base text-slate-700">
                        {event.description || "No description provided."}
                    </p>
                    <div className="mt-4 flex gap-4">
                        <Badge variant="outline" className={`font-mono ${colors.badge}`}>
                            {eventDate.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                        </Badge>
                        <Badge className={`${colors.badge}`}>{eventConfig.label}</Badge>
                    </div>
                  </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <motion.div variants={cardVariants} className="relative">
      <div className={`absolute -left-11 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-10 h-10 bg-white rounded-full border-2 shadow-sm ${colors.border}`}>
        <span className="text-xs font-bold text-slate-700 -mb-1">{month}</span>
        <span className="text-lg font-extrabold text-slate-900">{day}</span>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
           <Card className={`ml-4 hover:shadow-xl transition-shadow duration-300 bg-white border-l-4 ${colors.border} cursor-pointer`}>
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-4 flex-grow">
                <Icon className={`h-6 w-6 flex-shrink-0 ${colors.icon}`} />
                <div>
                  <h3 className="font-semibold text-slate-800">{event.title}</h3>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0 mt-2 sm:mt-0">
                <Badge className={`${colors.badge}`}>{eventConfig.label}</Badge>
              </div>
            </CardContent>
          </Card>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${colors.icon}`} />
                    {event.title}
                </AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div>
                    <p className="mt-2 text-base text-slate-700">
                        {event.description || "No description provided."}
                    </p>
                    <div className="mt-4 flex gap-4">
                        <Badge variant="outline" className={`font-mono ${colors.badge}`}>
                            {eventDate.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                        </Badge>
                        <Badge className={`${colors.badge}`}>{eventConfig.label}</Badge>
                    </div>
                  </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default EventCard;