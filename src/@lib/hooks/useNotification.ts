import { useEffect } from 'react';

/**
 * Custom hook to handle browser notifications
 * @returns {function} triggerNotification - Function to trigger a notification
 */
const useNotification = () => {
  useEffect(() => {
    // Request notification permission on component mount
    const requestNotificationPermission = async () => {
      if (Notification.permission === 'default') {
        try {
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            console.warn('Notification permission denied.');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      }
    };

    requestNotificationPermission();
  }, []);

  /**
   * Function to trigger a notification
   * @param {string} title - Notification title
   * @param {NotificationOptions} options - Notification options (body, icon, etc.)
   */
  const triggerNotification = (title, options) => {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    } else {
      console.warn('Notifications are not enabled or permission is denied.');
    }
  };

  return triggerNotification;
};

export default useNotification;
