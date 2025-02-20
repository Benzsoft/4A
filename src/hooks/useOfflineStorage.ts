import { useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

export function useOfflineStorage<T>(key: string, initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Load cached data
    const cached = getStorageItem<T>(key, initialData);
    if (cached) setData(cached);

    // Set up online/offline listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [key, initialData]);

  const updateData = (newData: T) => {
    setData(newData);
    setStorageItem(key, newData);
  };

  return { data, updateData, isOnline };
}