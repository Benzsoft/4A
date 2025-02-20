import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  darkMode: boolean;
  audioVolume: number;
  notifications: boolean;
  setDarkMode: (darkMode: boolean) => void;
  setAudioVolume: (volume: number) => void;
  setNotifications: (enabled: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      audioVolume: 1,
      notifications: true,
      setDarkMode: (darkMode) => set({ darkMode }),
      setAudioVolume: (volume) => set({ audioVolume: volume }),
      setNotifications: (enabled) => set({ notifications: enabled }),
    }),
    {
      name: 'bible-me-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        audioVolume: state.audioVolume,
        notifications: state.notifications,
      }),
    }
  )
);