
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDomainDetection } from '@/hooks/useDomainDetection';
import { updateMetaTag, updateTitle } from '@/utils/metaUtils';
import { getShopConfig, getPageMeta } from '@/config/metaConfig';

interface DomainRouterProps {
  children: React.ReactNode;
}

const DomainRouter: React.FC<DomainRouterProps> = ({ children }) => {
  const location = useLocation();
  const { getShopFromDomain, currentDomain } = useDomainDetection();

  useEffect(() => {
    // Update meta tags based on domain and current route
    const shop = getShopFromDomain(currentDomain);
    const shopConfig = getShopConfig(location.pathname);
    
    // Detect page type from pathname
    const pathname = location.pathname;
    let pageName = 'home';
    
    if (pathname.includes('/impressum')) pageName = 'impressum';
    else if (pathname.includes('/agb')) pageName = 'agb';
    else if (pathname.includes('/datenschutz')) pageName = 'datenschutz';
    else if (pathname.includes('/widerrufsrecht')) pageName = 'widerrufsrecht';
    else if (pathname.includes('/kontakt')) pageName = 'kontakt';
    else if (pathname.includes('/service')) pageName = 'service';
    else if (pathname.includes('/produkte')) pageName = 'produkte';
    else if (pathname.includes('/liefergebiet')) pageName = 'liefergebiet';

    const pageMeta = getPageMeta(location.pathname, pageName);

    // Update basic meta tags
    updateTitle(pageMeta.title);
    updateMetaTag('description', pageMeta.description);
    updateMetaTag('application-name', shopConfig.name);
    
    // Update Open Graph tags
    updateMetaTag('og:title', pageMeta.title, 'property');
    updateMetaTag('og:description', pageMeta.description, 'property');
    updateMetaTag('og:site_name', shopConfig.name, 'property');
    
    console.log(`Domain router updated meta for ${shop} on ${pathname}:`, {
      title: pageMeta.title,
      description: pageMeta.description
    });
    
  }, [location.pathname, currentDomain, getShopFromDomain]);

  return <>{children}</>;
};

export default DomainRouter;
