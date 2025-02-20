import React from 'react';
import { Link } from 'react-router-dom';
import { User as UserType } from '@supabase/supabase-js';
import { Sun, Moon, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileMenuProps {
  navItems: Array<{
    to: string;
    icon: React.ComponentType<any>;
    text: string;
    requiresAuth: boolean;
  }>;
  user: UserType | null;
  isDark: boolean;
  onToggleTheme: () => void;
  onSignOut: () => void;
  onClose: () => void;
}

export function MobileMenu({ navItems, user, isDark, onToggleTheme, onSignOut, onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="md:hidden py-4 space-y-2"
    >
      {navItems.map((item) => (
        (!item.requiresAuth || user) && (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            onClick={onClose}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.text}</span>
          </Link>
        )
      ))}

      <button
        onClick={() => {
          onToggleTheme();
          onClose();
        }}
        className="w-full flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        {isDark ? (
          <>
            <Sun className="w-5 h-5" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-5 h-5" />
            <span>Dark Mode</span>
          </>
        )}
      </button>

      {user && (
        <>
          <Link
            to="/profile"
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            onClick={onClose}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <button
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </>
      )}
    </motion.div>
  );
}