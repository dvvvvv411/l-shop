
import { useEffect } from 'react';
import { useDomainShop } from '@/hooks/useDomainShop';
import { loadFaviconForDomain } from '@/utils/domainFaviconGenerator';

export const useDomainFavicon = () => {
  const shopConfig = useDomainShop();

  useEffect(() => {
    console.log('useDomainFavicon: Domain shop changed:', shopConfig.shopType);
    
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      try {
        loadFaviconForDomain(shopConfig);
      } catch (error) {
        console.error('useDomainFavicon: Error loading favicon:', error);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [shopConfig]);

  return shopConfig;
};
