import { supabase, handleSupabaseError } from '../config/supabase';

export class NotificationService {
  constructor() {
    this.subscription = null;
  }

  subscribeToNotifications(userId, callback) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // First, get existing notifications
    this.fetchNotifications(userId, callback);

    // Then, subscribe to real-time changes
    this.subscription = supabase
      .from('notifications')
      .on('*', (payload) => {
        if (payload.new.user_id === userId) {
          this.fetchNotifications(userId, callback);
        }
      })
      .subscribe();

    return () => {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    };
  }

  async fetchNotifications(userId, callback) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .eq('read', false)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      callback(data || []);
    } catch (error) {
      handleSupabaseError(error);
    }
  }

  async markAsRead(notificationIds) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ 
          read: true,
          updated_at: new Date()
        })
        .in('id', notificationIds);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      handleSupabaseError(error);
    }
  }
} 