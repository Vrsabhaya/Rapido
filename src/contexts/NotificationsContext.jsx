import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { NotificationService } from '../services/notifications';

const NotificationsContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationsContext);
};

export function NotificationsProvider({ children }) {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const notificationService = new NotificationService();

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = notificationService.subscribeToNotifications(
        currentUser.uid,
        (newNotifications) => {
          setNotifications(newNotifications);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } else {
      setNotifications([]);
      setLoading(false);
    }
  }, [currentUser]);

  const markAsRead = async (notificationIds) => {
    try {
      await notificationService.markAsRead(notificationIds);
      setNotifications(prev => 
        prev.filter(notification => !notificationIds.includes(notification.id))
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    notifications,
    unreadCount: notifications.length,
    loading,
    error,
    markAsRead
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
} 