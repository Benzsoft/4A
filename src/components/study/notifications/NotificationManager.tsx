import React, { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface NotificationManagerProps {
  readingTime: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function NotificationManager({ readingTime, enabled, onToggle }: NotificationManagerProps) {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (enabled && permission === 'default') {
      requestPermission();
    }
  }, [enabled]);

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        toast.success('Notifications enabled successfully!');
      } else {
        toast.error('Please enable notifications in your browser settings');
        onToggle(false);
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Failed to enable notifications');
      onToggle(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {enabled ? (
            <Bell className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <BellOff className="w-6 h-6 text-gray-400" />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Reading Reminders
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Get notified 15 minutes before {readingTime}
            </p>
          </div>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggle(!enabled)}
          className={`relative w-14 h-8 rounded-full transition-colors ${
            enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <motion.div
            animate={{ x: enabled ? 24 : 4 }}
            className="absolute top-1 left-0 w-6 h-6 bg-white rounded-full shadow"
          />
        </motion.button>
      </div>
    </div>
  );
}