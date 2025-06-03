
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta, getShopConfig } from '@/config/metaConfig';

export function usePageMeta(pageName: string) {
  const location = useLocation();
  
  useEffect(() => {
    const shopConfig = getShopConfig(location.pathname);
    const pageMeta = getPageMeta(location.pathname, pageName);
    
    // Update document title
    document.title = pageMeta.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageMeta.description);
    }
    
    // Update meta keywords
    if (pageMeta.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', pageMeta.keywords);
    }
    
    // Update Open Graph meta tags
    const ogTitle = pageMeta.ogTitle || pageMeta.title;
    const ogDescription = pageMeta.ogDescription || pageMeta.description;
    
    let ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', ogTitle);
    }
    
    let ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', ogDescription);
    }
    
    let ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', `${shopConfig.baseUrl}${location.pathname}`);
    }
    
    // Update Twitter Card meta tags
    const twitterTitle = pageMeta.twitterTitle || pageMeta.title;
    const twitterDescription = pageMeta.twitterDescription || pageMeta.description;
    
    let twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitleMeta) {
      twitterTitleMeta = document.createElement('meta');
      twitterTitleMeta.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitleMeta);
    }
    twitterTitleMeta.setAttribute('content', twitterTitle);
    
    let twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescriptionMeta) {
      twitterDescriptionMeta = document.createElement('meta');
      twitterDescriptionMeta.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescriptionMeta);
    }
    twitterDescriptionMeta.setAttribute('content', twitterDescription);
    
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
    
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);
    
  }, [location.pathname, pageName]);
  
  return {
    shopConfig: getShopConfig(location.pathname),
    pageMeta: getPageMeta(location.pathname, pageName)
  };
}
