import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/auth/AuthModal';
import { VerseOfDay } from '../components/home/VerseOfDay';
import { FeatureCard } from '../components/home/FeatureCard';
import { ShinyButton } from '../components/ui/shiny-button';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    to: '/verses',
    title: 'Verse Finder',
    description: 'Discover verses that speak to your heart',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65',
    requiresAuth: true
  },
  {
    to: '/trivia',
    title: 'Bible Trivia',
    description: 'Test your biblical knowledge',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8',
    requiresAuth: true
  },
  {
    to: '/daily-motivation',
    title: 'Daily Motivation',
    description: 'Get inspired with daily verses and reflections',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df',
    requiresAuth: false
  },
  {
    to: '/bible',
    title: 'Bible',
    description: 'Read and study the Bible in multiple translations',
    image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c',
    requiresAuth: false
  }
];

export default function Home() {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      {showAuth && !user ? (
        <AuthModal onClose={() => setShowAuth(false)} />
      ) : null}

      {user ? (
        <div className="w-full max-w-2xl mx-auto mb-8">
          <VerseOfDay />
        </div>
      ) : (
        <div className="text-center max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Discover Biblical Wisdom Daily
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Join our community to explore Bible verses, test your knowledge, and grow in your faith journey.
          </p>
          <ShinyButton onClick={() => setShowAuth(true)}>
            <span className="text-lg">Start Your Journey</span>
          </ShinyButton>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl px-4 mb-16">
        {FEATURES.map((feature) => (
          <FeatureCard
            key={feature.to}
            {...feature}
            onAuthClick={() => !user && setShowAuth(true)}
          />
        ))}
      </div>
    </div>
  );
}