import React from 'react';
import { User } from '@supabase/supabase-js';
import { LogOut, User as UserIcon } from 'lucide-react';

interface UserInfoProps {
  user: User;
  onSignOut: () => void;
}

export function UserInfo({ user, onSignOut }: UserInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
            {user.user_metadata.avatar_url ? (
              <img 
                src={user.user_metadata.avatar_url} 
                alt="Profile" 
                className="w-14 h-14 rounded-full"
              />
            ) : (
              <UserIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.user_metadata.full_name || user.email}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Member since {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}