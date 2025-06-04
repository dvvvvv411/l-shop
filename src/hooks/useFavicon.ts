
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadFaviconForPath } from '@/utils/faviconGenerator';

export const useFavicon = () => {
  const location = useLocation();

  useEffect(() => {
    // Load favicon for current path
    loadFaviconForPath(location.pathname);
  }, [location.pathname]);
};
