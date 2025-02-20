import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  text: string;
}

export function NavLink({ to, icon: Icon, text }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className="relative flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
    >
      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
      <span className="text-sm font-medium">{text}</span>
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
}