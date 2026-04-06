import React, { useMemo } from 'react';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import EventCard from '@/components/security-suite/calendar/EventCard';

    const UpcomingDeadlines = ({ events, isConsolePage = false }) => {
      const upcomingDeadlines = useMemo(() => {
        if (!events) return [];
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const next7Days = new Date(today);
        next7Days.setDate(today.getDate() + 7);
        return events
          .filter(e => {
            const eventDate = new Date(e.date);
            return eventDate >= today && eventDate <= next7Days && !e.title.includes('Completed');
          })
          .slice(0, 5);
      }, [events]);

      const cardClassName = isConsolePage 
        ? "bg-white/70 backdrop-blur-sm feature-card-border h-full"
        : "h-full";

      return (
        <Card className={cardClassName}>
          <CardHeader>
            <CardTitle>Upcoming Deadlines (Next 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingDeadlines.length > 0 ? (
              <div className="space-y-4">
                {upcomingDeadlines.map((event, index) => (
                  <EventCard key={event.id || index} event={event} isCompact={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500">
                <p className="text-lg">No deadlines in the next 7 days.</p>
              </div>
            )}
          </CardContent>
        </Card>
      );
    };

    export default UpcomingDeadlines;