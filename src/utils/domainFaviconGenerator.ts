
import { useDomainShop, type DomainShopConfig } from '@/hooks/useDomainShop';

const getIconSVG = (iconType: string, color: string): string => {
  switch (iconType) {
    case 'flame':
      return `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2c-2 4-4 8-2 12 1 2 3 3 5 2 1-1 1-3 0-4-1-1-2-1-2-2 0-1 1-2 2-1 3 2 5 6 3 10-1 2-3 4-6 4s-6-2-7-5c-2-4 0-9 3-12 1-1 2-3 4-4z" fill="${color}"/>
          <circle cx="16" cy="22" r="2" fill="${color}" opacity="0.7"/>
        </svg>
      `;
    case 'drop':
      return `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2c-6 8-10 14-10 18 0 5.5 4.5 10 10 10s10-4.5 10-10c0-4-4-10-10-18z" fill="${color}"/>
          <ellipse cx="13" cy="20" rx="3" ry="4" fill="${color}" opacity="0.6"/>
        </svg>
      `;
    case 'leaf':
      return `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 16c0-8 8-14 16-14 0 8-6 16-14 16-1 0-2-1-2-2z" fill="${color}"/>
          <path d="M8 16c0 8 8 14 16 14 0-8-6-16-14-16-1 0-2 1-2 2z" fill="${color}" opacity="0.7"/>
          <line x1="16" y1="16" x2="24" y2="8" stroke="${color}" stroke-width="1" opacity="0.5"/>
        </svg>
      `;
    case 'mountain':
      return `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4L8 24h16L16 4z" fill="${color}"/>
          <path d="M10 20L16 10l6 10H10z" fill="${color}" opacity="0.7"/>
        </svg>
      `;
    case 'sun':
      return `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="6" fill="${color}"/>
          <path d="M16 2v4M16 26v4M30 16h-4M6 16H2M26.5 5.5l-2.8 2.8M8.3 23.7l-2.8 2.8M26.5 26.5l-2.8-2.8M8.3 8.3L5.5 5.5" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    default:
      return getIconSVG('flame', color);
  }
};

const removeFaviconElements = (): void => {
  const selectors = [
    'link[rel*="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]'
  ];
  
  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => element.remove());
  });
};

const createFaviconElement = (href: string, type: string = 'image/svg+xml'): HTMLLinkElement => {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = type;
  link.href = href;
  return link;
};

export const loadFaviconForDomain = (shopConfig: DomainShopConfig): void => {
  try {
    console.log(`Loading favicon for shop: ${shopConfig.name}`);
    
    // Remove existing favicon elements
    removeFaviconElements();
    
    // Generate SVG favicon
    const svg = getIconSVG(shopConfig.faviconIcon, shopConfig.faviconColor);
    const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    
    // Create primary SVG favicon
    const svgLink = createFaviconElement(svgDataUrl, 'image/svg+xml');
    
    // Create PNG fallback for better browser support
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 32, 32);
        const pngDataUrl = canvas.toDataURL('image/png');
        const pngLink = createFaviconElement(pngDataUrl, 'image/png');
        document.head.appendChild(pngLink);
        console.log('PNG fallback favicon added');
      };
      img.src = svgDataUrl;
    }
    
    // Add SVG favicon to head
    document.head.appendChild(svgLink);
    
    // Force browser to refresh favicon
    const timestamp = Date.now();
    svgLink.href = `${svgDataUrl}?t=${timestamp}`;
    
    console.log(`Favicon successfully loaded for: ${shopConfig.name}`);
    
  } catch (error) {
    console.error('Error loading favicon:', error);
  }
};
