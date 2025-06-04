
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadFaviconForPath } from '@/utils/faviconGenerator';

export const useFavicon = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('useFavicon: Route changed to:', location.pathname);
    
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      try {
        loadFaviconForPath(location.pathname);
      } catch (error) {
        console.error('useFavicon: Error loading favicon:', error);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);
};
