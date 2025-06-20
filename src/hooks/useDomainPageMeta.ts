
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDomainShop } from '@/hooks/useDomainShop';
import { getDomainPageMeta, getDomainShopConfig } from '@/config/domainMetaConfig';
import { 
  updateTitle, 
  updateMetaTag, 
  updateCanonicalUrl, 
  updateStructuredData 
} from '@/utils/metaUtils';

export function useDomainPageMeta(pageName: string) {
  const location = useLocation();
  const shopConfig = useDomainShop();
  
  useEffect(() => {
    const shopMetaConfig = getDomainShopConfig(shopConfig.shopType);
    const pageMeta = getDomainPageMeta(shopConfig.shopType, pageName);
    
    // Update document title
    updateTitle(pageMeta.title);
    
    // Update basic meta tags
    updateMetaTag('description', pageMeta.description);
    updateMetaTag('author', shopMetaConfig.name);
    
    // Update keywords if available
    if (pageMeta.keywords) {
      updateMetaTag('keywords', pageMeta.keywords);
    }
    
    // Update canonical URL using current domain
    const canonicalUrl = `${shopMetaConfig.baseUrl}${location.pathname}`;
    updateCanonicalUrl(canonicalUrl);
    
    // Update Open Graph meta tags
    const ogTitle = pageMeta.ogTitle || pageMeta.title;
    const ogDescription = pageMeta.ogDescription || pageMeta.description;
    
    updateMetaTag('og:title', ogTitle, 'property');
    updateMetaTag('og:description', ogDescription, 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    updateMetaTag('og:site_name', shopMetaConfig.name, 'property');
    updateMetaTag('og:type', 'website', 'property');
    
    // Set locale based on shop type
    const locale = shopConfig.shopType === 'france' ? 'fr_FR' : 
                   shopConfig.shopType === 'italy' ? 'it_IT' :
                   shopConfig.shopType === 'malta' ? 'en_MT' : 'de_DE';
    updateMetaTag('og:locale', locale, 'property');
    
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
      "name": shopMetaConfig.name,
      "telephone": shopMetaConfig.phone,
      "email": shopMetaConfig.email,
      "url": shopMetaConfig.baseUrl,
      "description": pageMeta.description,
      "serviceType": shopConfig.shopType === 'france' ? "Livraison de fioul" : 
                    shopConfig.shopType === 'italy' ? "Consegna gasolio" :
                    shopConfig.shopType === 'malta' ? "Heating Oil Delivery" : "Heizöl-Lieferung",
      "areaServed": shopConfig.shopType === 'france' ? "France" : 
                    shopConfig.shopType === 'italy' ? "Italia" :
                    shopConfig.shopType === 'malta' ? "Malta" : "Deutschland"
    };
    
    updateStructuredData(structuredData);
    
    console.log(`Domain meta updated for ${shopMetaConfig.name} - ${pageName}:`, {
      title: pageMeta.title,
      description: pageMeta.description,
      canonicalUrl,
      locale
    });
    
  }, [location.pathname, pageName, shopConfig]);
  
  return {
    shopConfig: getDomainShopConfig(shopConfig.shopType),
    pageMeta: getDomainPageMeta(shopConfig.shopType, pageName)
  };
}
