import React, { useState, useEffect } from 'react';

export function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-gray-600 dark:text-gray-300">
      <div className="text-sm font-medium">
        {dateTime.toLocaleDateString(undefined, { 
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
      <div className="text-lg font-bold">
        {dateTime.toLocaleTimeString()}
      </div>
    </div>
  );
}