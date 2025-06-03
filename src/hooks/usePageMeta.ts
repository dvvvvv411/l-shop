
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta, getShopConfig } from '@/config/metaConfig';
import { 
  updateTitle, 
  updateMetaTag, 
  updateCanonicalUrl, 
  updateStructuredData 
} from '@/utils/metaUtils';

export function usePageMeta(pageName: string) {
  const location = useLocation();
  
  useEffect(() => {
    const shopConfig = getShopConfig(location.pathname);
    const pageMeta = getPageMeta(location.pathname, pageName);
    
    // Update document title
    updateTitle(pageMeta.title);
    
    // Update basic meta tags
    updateMetaTag('description', pageMeta.description);
    updateMetaTag('author', shopConfig.name);
    
    // Update keywords if available
    if (pageMeta.keywords) {
      updateMetaTag('keywords', pageMeta.keywords);
    }
    
    // Update canonical URL
    const canonicalUrl = `${shopConfig.baseUrl}${location.pathname}`;
    updateCanonicalUrl(canonicalUrl);
    
    // Update Open Graph meta tags
    const ogTitle = pageMeta.ogTitle || pageMeta.title;
    const ogDescription = pageMeta.ogDescription || pageMeta.description;
    
    updateMetaTag('og:title', ogTitle, 'property');
    updateMetaTag('og:description', ogDescription, 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    updateMetaTag('og:site_name', shopConfig.name, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:locale', 'de_DE', 'property');
    
    // Update Twitter Card meta tags
    const twitterTitle = pageMeta.twitterTitle || pageMeta.title;
    const twitterDescription = pageMeta.twitterDescription || pageMeta.description;
    
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', twitterTitle);
    updateMetaTag('twitter:description', twitterDescription);
    updateMetaTag('twitter:site', '@heizoel_netz');
    
    // Add structured data for local business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": shopConfig.name,
      "telephone": shopConfig.phone,
      "email": shopConfig.email,
      "url": shopConfig.baseUrl,
      "description": pageMeta.description,
      "serviceType": "Heizöl-Lieferung",
      "areaServed": "Deutschland"
    };
    
    updateStructuredData(structuredData);
    
    console.log(`Meta updated for ${shopConfig.name} - ${pageName}:`, {
      title: pageMeta.title,
      description: pageMeta.description,
      canonicalUrl
    });
    
  }, [location.pathname, pageName]);
  
  return {
    shopConfig: getShopConfig(location.pathname),
    pageMeta: getPageMeta(location.pathname, pageName)
  };
}
