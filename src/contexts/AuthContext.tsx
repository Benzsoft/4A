import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase, Profile, createProfile, getProfile } from '../lib/supabase';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function initializeAuth() {
      try {
        // Get initial session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          try {
            const profile = await getProfile(session.user.id);
            setProfile(profile);
          } catch (error) {
            // If profile doesn't exist, create one
            await createProfile(session.user.id);
            const newProfile = await getProfile(session.user.id);
            setProfile(newProfile);
          }
        }

        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);

          if (event === 'SIGNED_IN') {
            try {
              let userProfile = null;
              try {
                userProfile = await getProfile(session!.user.id);
              } catch {
                await createProfile(session!.user.id);
                userProfile = await getProfile(session!.user.id);
              }
              setProfile(userProfile);
              toast.success('Successfully signed in!');
              navigate('/', { replace: true });
            } catch (error) {
              console.error('Error setting up profile:', error);
              toast.error('Error setting up profile. Please try again.');
            }
          } else if (event === 'SIGNED_OUT') {
            setProfile(null);
            navigate('/', { replace: true });
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
        toast.error('Authentication error. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    initializeAuth();
  }, [navigate]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Successfully signed out!');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ session, user, profile, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}