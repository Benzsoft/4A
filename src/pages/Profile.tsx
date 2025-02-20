import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { UserInfo } from '../components/profile/UserInfo';
import { SavedVerses } from '../components/profile/SavedVerses';
import { TriviaScores } from '../components/profile/TriviaScores';
import { PrayerJournal } from '../components/profile/PrayerJournal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Prayer, SavedVerse } from '../types';

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { profile, loading, error, setProfile } = useProfile(user?.id);

  if (!user) {
    navigate('/');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Profile not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <UserInfo user={user} onSignOut={signOut} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SavedVerses verses={profile.saved_verses || []} />
          <TriviaScores scores={profile.trivia_scores || []} />
        </div>
        <div>
          <PrayerJournal prayers={profile.prayers || []} />
        </div>
      </div>
    </div>
  );
}