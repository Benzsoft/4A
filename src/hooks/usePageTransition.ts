import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageTransition() {
  const location = useLocation();

  useEffect(() => {
    // Add transition class to main content
    const main = document.querySelector('main');
    if (main) {
      main.classList.add('fade-enter');
      main.classList.remove('fade-exit');

      const timer = setTimeout(() => {
        main.classList.remove('fade-enter');
      }, 300);

      return () => {
        clearTimeout(timer);
        main.classList.add('fade-exit');
      };
    }
  }, [location.pathname]);
}