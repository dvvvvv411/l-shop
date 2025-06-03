
export function updateMetaTag(name: string, content: string, property?: string) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let metaTag = document.querySelector(selector) as HTMLMetaElement;
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    if (property) {
      metaTag.setAttribute('property', name);
    } else {
      metaTag.setAttribute('name', name);
    }
    document.head.appendChild(metaTag);
  }
  
  metaTag.setAttribute('content', content);
}

export function updateTitle(title: string) {
  document.title = title;
}

export function updateCanonicalUrl(url: string) {
  let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  
  canonicalTag.setAttribute('href', url);
}

export function updateStructuredData(data: object) {
  let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
  
  if (!structuredDataScript) {
    structuredDataScript = document.createElement('script');
    structuredDataScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(structuredDataScript);
  }
  
  structuredDataScript.textContent = JSON.stringify(data);
}

export function removeMetaTag(name: string, property?: string) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  const metaTag = document.querySelector(selector);
  if (metaTag) {
    metaTag.remove();
  }
}
