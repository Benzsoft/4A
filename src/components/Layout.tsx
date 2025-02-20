import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { MusicPlayer } from './MusicPlayer';
import { Helmet } from 'react-helmet-async';
import { usePageTransition } from '../hooks/usePageTransition';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';

const pageTitles: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Bible Me - Discover Biblical Wisdom & Test Your Knowledge',
    description: 'Explore Bible verses, test your biblical knowledge with trivia, and listen to inspiring Christian music. Your daily companion for spiritual growth.'
  },
  '/verses': {
    title: 'Verse Finder - Bible Me',
    description: 'Search and discover Bible verses that speak to your heart. Find comfort, wisdom, and guidance in God\'s Word.'
  },
  '/trivia': {
    title: 'Bible Trivia - Test Your Knowledge',
    description: 'Challenge yourself with our Bible trivia game. Learn more about Scripture while having fun!'
  },
  '/study': {
    title: 'Bible Study - Deepen Your Understanding',
    description: 'Engage in structured Bible study plans and grow in your faith journey.'
  },
  '/profile': {
    title: 'Your Profile - Bible Me',
    description: 'View your saved verses, trivia scores, and manage your Bible Me profile.'
  },
  '/contact': {
    title: 'Contact Us - Bible Me',
    description: 'Get in touch with us. Share your feedback, questions, or suggestions about Bible Me.'
  }
};

export default function Layout() {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || pageTitles['/'];
  usePageTransition();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col transition-colors duration-200">
      <Helmet>
        <title>{pageInfo.title}</title>
        <meta name="description" content={pageInfo.description} />
      </Helmet>
      
      <Navbar />
      
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <main className="flex-grow container mx-auto px-4 py-8 mt-16 sm:mt-20 lg:mt-24 page-transition">
          <Outlet />
        </main>
      </ErrorBoundary>

      <div className="h-48" />
      
      <div className="fixed bottom-20 left-0 right-0 z-40">
        <div className="container mx-auto px-4">
          <MusicPlayer />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <Footer />
      </div>
    </div>
  );
}