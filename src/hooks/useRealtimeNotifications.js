import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export const useRealtimeNotifications = (user, isAdmin) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNewSubmission = useCallback((payload) => {
    const newSubmission = payload.new;
    
    const notification = {
      id: newSubmission.id,
      type: 'new_contact',
      title: 'New Contact Submission',
      message: `${newSubmission.name} from ${newSubmission.company || 'your website'} sent a message.`,
      timestamp: new Date(),
      data: newSubmission,
      read: false
    };

    setNotifications(prev => [notification, ...prev.slice(0, 49)]);
    setUnreadCount(prev => prev + 1);

    toast({
      title: '🔔 New Contact Submission!',
      description: `${newSubmission.name} has sent a message.`,
      duration: 8000,
      action: {
        label: 'View',
        onClick: () => navigate('/admin/crm')
      }
    });

    try {
      const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'+Array(1e3).join('h'));
      audio.volume = 0.2;
      audio.play().catch(() => {});
    } catch (e) {}
  }, [toast, navigate]);

  useEffect(() => {
    if (!user || !isAdmin) return;

    const channel = supabase
      .channel('contact_submissions_notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_submissions'
        },
        handleNewSubmission
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isAdmin, handleNewSubmission]);

  const markAsRead = (notificationId) => {
    const notificationExists = notifications.some(n => n.id === notificationId && !n.read);
    if (notificationExists) {
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications
  };
};