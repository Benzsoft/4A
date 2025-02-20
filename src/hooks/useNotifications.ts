import { useEffect, useCallback } from 'react';
import { formatTime } from '../utils/date';

export function useNotifications(readingTime: string, enabled: boolean) {
  const scheduleNotification = useCallback(() => {
    if (!enabled || !readingTime) return;

    const [hours, minutes] = readingTime.split(':').map(Number);
    const now = new Date();
    const notificationTime = new Date(now);
    notificationTime.setHours(hours, minutes - 15, 0); // 15 minutes before reading time

    // If the time has passed today, schedule for tomorrow
    if (notificationTime < now) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    const timeUntilNotification = notificationTime.getTime() - now.getTime();

    return setTimeout(() => {
      new Notification('Bible Study Reminder', {
        body: `Your reading time (${formatTime(readingTime)}) is in 15 minutes!`,
        icon: '/favicon.svg'
      });
      // Schedule next notification
      scheduleNotification();
    }, timeUntilNotification);
  }, [readingTime, enabled]);

  useEffect(() => {
    if (!enabled) return;

    // Request permission if needed
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const timerId = scheduleNotification();
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [enabled, scheduleNotification]);
}