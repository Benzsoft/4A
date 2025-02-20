import React, { useState, useEffect } from 'react';
import { Sparkles, Share2, Heart, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { getCurrentHoliday, getDefaultTheme } from '../utils/holidays';
import { TextToSpeech } from '../components/audio/TextToSpeech';
import { getVerseOfDay } from '../services/ai';

interface DailyMessage {
  message: string;
  encouragement: string;
  verse: string;
  theme: string;
  date: string;
}

export default function DailyMotivation() {
  const [message, setMessage] = useState<DailyMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadDailyMessage();
  }, []);

  const loadDailyMessage = async () => {
    try {
      // Check cache first
      const cached = localStorage.getItem('dailyMessage');
      if (cached) {
        const { message, timestamp } = JSON.parse(cached);
        const now = new Date();
        const messageDate = new Date(timestamp);
        
        // Use cached message if it's from today
        if (now.toDateString() === messageDate.toDateString()) {
          setMessage(message);
          setIsLoading(false);
          return;
        }
      }

      // Get current holiday or default theme
      const holiday = getCurrentHoliday();
      const defaultTheme = getDefaultTheme();
      const themeContent = holiday || defaultTheme;

      // Get verse of the day related to the theme
      const verseResponse = await getVerseOfDay(themeContent.theme);
      if (!verseResponse) throw new Error('Failed to get verse of the day');

      const newMessage = {
        message: themeContent.message,
        encouragement: themeContent.encouragement,
        verse: verseResponse,
        theme: themeContent.theme,
        date: new Date().toISOString()
      };

      // Cache the message
      localStorage.setItem('dailyMessage', JSON.stringify({
        message: newMessage,
        timestamp: new Date().toISOString()
      }));

      setMessage(newMessage);
    } catch (error) {
      console.error('Error loading daily message:', error);
      toast.error('Failed to load daily message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!message) return;

    try {
      await navigator.share({
        title: 'Daily Christian Motivation',
        text: `${message.message}\n\n${message.verse}\n\n${message.encouragement}`,
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share message');
    }
  };

  const handleSave = async () => {
    if (!user || !message) return;

    try {
      const { error } = await supabase
        .from('saved_messages')
        .insert([{
          user_id: user.id,
          message: message.message,
          verse: message.verse,
          theme: message.theme,
          saved_at: new Date().toISOString()
        }]);

      if (error) throw error;
      toast.success('Message saved!');
    } catch (error) {
      console.error('Error saving message:', error);
      toast.error('Failed to save message');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-3xl mx-auto overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <span>Daily Inspiration</span>
            </CardTitle>
          </CardHeader>
          {message && (
            <>
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581595220892-b0739db3ba8c"
                  alt="Daily Inspiration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white text-sm font-medium">
                    Theme: {message.theme}
                  </p>
                </div>
              </div>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Today's Message
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
                    {message.message}
                  </p>
                </div>

                <blockquote className="pl-4 border-l-4 border-indigo-500 italic text-gray-600 dark:text-gray-400 text-justify">
                  {message.verse}
                </blockquote>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Daily Encouragement
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
                    {message.encouragement}
                  </p>
                </div>

                <TextToSpeech
                  text={`${message.message}\n\n${message.verse}\n\n${message.encouragement}`}
                />

                <div className="flex justify-end space-x-4">
                  <Button onClick={handleShare} variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  {user && (
                    <Button onClick={handleSave}>
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  )}
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
}