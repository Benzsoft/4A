import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Moon, Sun, MessageSquare, Menu, X, User, LogOut,
  Book, Sparkles, Search, Brain, GraduationCap
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { NavLink } from './navbar/NavLink';
import { MobileMenu } from './navbar/MobileMenu';

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    {
      to: '/verses',
      icon: Search,
      text: 'Verse Finder',
      requiresAuth: true
    },
    {
      to: '/daily-motivation',
      icon: Sparkles,
      text: 'Daily Motivation',
      requiresAuth: false
    },
    {
      to: '/trivia',
      icon: Brain,
      text: 'Bible Trivia',
      requiresAuth: true
    },
    {
      to: '/bible',
      icon: Book,
      text: 'Bible',
      requiresAuth: false
    },
    {
      to: '/study',
      icon: GraduationCap,
      text: 'Bible Study',
      requiresAuth: true
    },
    {
      to: '/contact',
      icon: MessageSquare,
      text: 'Contact',
      requiresAuth: false
    }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm' : 'bg-white dark:bg-gray-800'
      } shadow-lg`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Bible Me</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              (!item.requiresAuth || user) && (
                <NavLink
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  text={item.text}
                />
              )
            ))}

            <button
              onClick={toggle}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {user && (
              <>
                <Link
                  to="/profile"
                  className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Profile"
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <MobileMenu
            navItems={navItems}
            user={user}
            isDark={isDark}
            onToggleTheme={toggle}
            onSignOut={handleSignOut}
            onClose={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}