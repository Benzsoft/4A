import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Badge } from '../types/bibleStudy';
import toast from 'react-hot-toast';

const ACHIEVEMENTS = [
  {
    id: 'first-day',
    name: 'First Step',
    description: 'Complete your first day of reading',
    icon: '/badges/first-day.svg',
    condition: (progress: any) => progress.versesRead > 0
  },
  {
    id: 'week-streak',
    name: 'Week Warrior',
    description: 'Maintain a 7-day reading streak',
    icon: '/badges/week-streak.svg',
    condition: (progress: any) => progress.streak >= 7
  },
  {
    id: 'month-streak',
    name: 'Monthly Master',
    description: 'Maintain a 30-day reading streak',
    icon: '/badges/month-streak.svg',
    condition: (progress: any) => progress.streak >= 30
  },
  {
    id: '100-verses',
    name: 'Century Reader',
    description: 'Read 100 verses',
    icon: '/badges/100-verses.svg',
    condition: (progress: any) => progress.versesRead >= 100
  }
];

export function useAchievements(userId: string) {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    loadBadges();
  }, [userId]);

  const loadBadges = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('achievements')
        .eq('id', userId)
        .single();

      const unlockedAchievements = profile?.achievements || [];
      
      setBadges(ACHIEVEMENTS.map(achievement => ({
        ...achievement,
        unlockedAt: unlockedAchievements.find((a: any) => a.id === achievement.id)?.unlockedAt
      })));
    } catch (error) {
      console.error('Error loading achievements:', error);
    }
  };

  const checkAchievements = async (progress: any) => {
    try {
      const newAchievements = [];

      for (const achievement of ACHIEVEMENTS) {
        if (!badges.find(b => b.id === achievement.id)?.unlockedAt && 
            achievement.condition(progress)) {
          newAchievements.push({
            id: achievement.id,
            unlockedAt: new Date().toISOString()
          });
        }
      }

      if (newAchievements.length > 0) {
        const { error } = await supabase
          .from('profiles')
          .update({
            achievements: newAchievements
          })
          .eq('id', userId);

        if (error) throw error;

        // Show notifications for new achievements
        newAchievements.forEach(achievement => {
          const badge = ACHIEVEMENTS.find(a => a.id === achievement.id);
          if (badge) {
            toast.success(`Achievement Unlocked: ${badge.name}! 🏆`);
          }
        });

        loadBadges();
      }
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  };

  return { badges, checkAchievements };
}