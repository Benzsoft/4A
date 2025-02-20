import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  to: string;
  title: string;
  description: string;
  image: string;
  requiresAuth?: boolean;
  onAuthClick?: () => void;
}

export function FeatureCard({ to, title, description, image, requiresAuth, onAuthClick }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative group h-64 w-full rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 w-full h-full transform transition-transform duration-500 group-hover:scale-110">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      </div>

      <Link
        to={requiresAuth ? '#' : to}
        onClick={requiresAuth ? onAuthClick : undefined}
        className="absolute inset-0 p-6 flex flex-col justify-end text-white"
      >
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-2"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-200"
        >
          {description}
        </motion.p>
      </Link>
    </motion.div>
  );
}