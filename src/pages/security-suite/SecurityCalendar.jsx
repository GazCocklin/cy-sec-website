import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Plus, ArrowLeft, Loader2, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddEventDialog from '@/components/security-suite/calendar/AddEventDialog';
import EventCard from '@/components/security-suite/calendar/EventCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import UpcomingDeadlines from '@/components/security-suite/dashboard/UpcomingDeadlines';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className={`bg-white/70 backdrop-blur-sm feature-card-border overflow-hidden`}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          <p className="text-sm text-slate-500">{title}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const SecurityCalendar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const fetchEvents = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [assessmentsRes, vendorsRes, manualEventsRes] = await Promise.all([
        supabase.from('security_assessments').select('*').eq('user_id', user.id),
        supabase.from('vendor_assessments').select('*').eq('user_id', user.id),
        supabase.from('manual_security_events').select('*').eq('user_id', user.id)
      ]);

      if (assessmentsRes.error) throw assessmentsRes.error;
      if (vendorsRes.error) throw vendorsRes.error;
      if (manualEventsRes.error) throw manualEventsRes.error;

      const assessmentEvents = (assessmentsRes.data || []).flatMap(a => [
        (a.assessment_date || a.created_at) && { id: `assess-start-${a.id}`, title: `${a.title} - Start`, date: a.assessment_date || a.created_at, type: 'assessment' },
        a.completion_date && { id: `assess-comp-${a.id}`, title: `${a.title} - Completed`, date: a.completion_date, type: 'assessment' },
        a.next_review_date && { id: `assess-review-${a.id}`, title: `${a.title} - Review Due`, date: a.next_review_date, type: 'assessment' },
      ]).filter(Boolean);

      const vendorEvents = (vendorsRes.data || []).flatMap(v => [
        v.last_assessment_date && { id: `vendor-last-${v.id}`, title: `Review: ${v.vendor_name}`, date: v.last_assessment_date, type: 'vendor' },
        v.next_assessment_date && { id: `vendor-next-${v.id}`, title: `Next Review: ${v.vendor_name}`, date: v.next_assessment_date, type: 'vendor' },
      ]).filter(Boolean);
      
      const manualEvents = (manualEventsRes.data || []).map(e => ({
        id: `manual-${e.id}`,
        title: e.title,
        date: e.event_date,
        type: 'manual',
        description: e.description,
        isManual: true
      }));

      const allEvents = [...assessmentEvents, ...vendorEvents, ...manualEvents];
      setEvents(allEvents.sort((a,b) => new Date(a.date) - new Date(b.date)));

    } catch (error) {
      console.error("Error fetching calendar events:", error);
      toast({
        title: "Error",
        description: "Could not fetch calendar events. " + error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  
  const handleAddEvent = async (newEvent) => {
    if(!user) return;
    try {
      const { data, error } = await supabase
        .from('manual_security_events')
        .insert({ ...newEvent, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;

      toast({
        title: "Event Added",
        description: `"${data.title}" has been added to your calendar.`
      });
      fetchEvents(); // Refresh events
      return true;
    } catch(error) {
       console.error("Error adding event:", error);
      toast({
        title: "Error",
        description: "Could not add the event.",
        variant: "destructive"
      });
      return false;
    }
  };

  const filteredEvents = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return events.filter(event => {
      const eventDate = new Date(event.date);
      const matchesType = typeFilter === 'all' || event.type === typeFilter;
      
      if (!matchesType) return false;

      if (timeFilter === '7d') {
        const next7Days = new Date(today);
        next7Days.setDate(today.getDate() + 7);
        return eventDate >= today && eventDate <= next7Days;
      }
      if (timeFilter === '30d') {
        const next30Days = new Date(today);
        next30Days.setDate(today.getDate() + 30);
        return eventDate >= today && eventDate <= next30Days;
      }
      return true;
    });
  }, [events, timeFilter, typeFilter]);

  const stats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return {
      overdue: events.filter(e => new Date(e.date) < today && !e.title.includes('Completed')).length,
      thisMonth: events.filter(e => new Date(e.date) >= startOfMonth && new Date(e.date) <= endOfMonth).length,
      upcomingTotal: events.filter(e => new Date(e.date) >= today).length,
    };
  }, [events]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-gray-600">Loading Security Operations Console...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Helmet>
        <title>Operations Console - Cy-Sec FortifyOne</title>
        <meta name="description" content="Holistic console view of all security activities, including assessments, vendor reviews, and manual events." />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              Security Operations Console
            </h1>
            <p className="text-slate-600 mt-1">Your central hub for all security-related activities and deadlines.</p>
          </div>
          <div className="flex items-start md:items-center justify-start md:justify-end gap-2 sm:gap-4">
            <Button 
              variant="outline"
              onClick={() => navigate('/fortify-one/dashboard')}
              className="bg-white hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Add Event</span>
            </Button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Overdue Tasks" value={stats.overdue} icon={AlertTriangle} color="red" />
          <StatCard title="Events This Month" value={stats.thisMonth} icon={Clock} color="blue" />
          <StatCard title="Total Upcoming" value={stats.upcomingTotal} icon={CheckCircle} color="green" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm feature-card-border">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <CardTitle>Master Timeline</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="7d">Next 7 Days</SelectItem>
                        <SelectItem value="30d">Next 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                     <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="assessment">Assessments</SelectItem>
                        <SelectItem value="vendor">Vendor Reviews</SelectItem>
                        <SelectItem value="manual">Manual Events</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                 <div className="relative pl-8 max-h-[600px] overflow-y-auto pr-4">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                  {filteredEvents.length > 0 ? (
                    <motion.div
                      className="space-y-8"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                      }}
                    >
                      {filteredEvents.map((event, index) => (
                        <EventCard key={event.id || index} event={event} />
                      ))}
                    </motion.div>
                  ) : (
                    <div className="text-center py-16 text-slate-500">
                      <p className="text-lg">No events match your current filters.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <UpcomingDeadlines events={events} isConsolePage={true} />
          </motion.div>
        </div>
      </div>
      <AddEventDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
};

export default SecurityCalendar;