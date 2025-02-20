import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function useTheme() {
  const darkMode = useStore((state) => state.darkMode);
  const setDarkMode = useStore((state) => state.setDarkMode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setDarkMode]);

  return { isDark: darkMode, toggle: () => setDarkMode(!darkMode) };
}