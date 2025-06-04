
export interface FaviconConfig {
  path: string;
  color: string;
  iconType: 'flame' | 'drop' | 'leaf';
  name: string;
}

export const faviconConfigs: FaviconConfig[] = [
  {
    path: '/',
    color: '#dc2626', // red-600
    iconType: 'flame',
    name: 'HeizölNetz Deutschland'
  },
  {
    path: '/1/',
    color: '#dc2626', // red-600
    iconType: 'drop',
    name: 'STANTON Heizöl'
  },
  {
    path: '/2/',
    color: '#059669', // emerald-600
    iconType: 'leaf',
    name: 'GreenOil Eco-Heizöl'
  }
];

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
    default:
      return getIconSVG('flame', color);
  }
};

export const generateFaviconDataURL = (config: FaviconConfig): string => {
  const svg = getIconSVG(config.iconType, config.color);
  const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
  return URL.createObjectURL(svgBlob);
};

export const getFaviconConfigForPath = (pathname: string): FaviconConfig => {
  console.log('Getting favicon config for path:', pathname);
  
  // Find exact match first
  const exactMatch = faviconConfigs.find(config => pathname === config.path);
  if (exactMatch) {
    console.log('Found exact match:', exactMatch);
    return exactMatch;
  }
  
  // Find path that starts with the config path
  const pathMatch = faviconConfigs.find(config => 
    config.path !== '/' && pathname.startsWith(config.path)
  );
  if (pathMatch) {
    console.log('Found path match:', pathMatch);
    return pathMatch;
  }
  
  // Default to root config
  console.log('Using default root config');
  return faviconConfigs[0];
};

const removeFaviconElements = (): void => {
  // Remove all existing favicon-related elements
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

export const loadFaviconForPath = (pathname: string): void => {
  try {
    const config = getFaviconConfigForPath(pathname);
    
    console.log(`Loading favicon for path: ${pathname} (${config.name})`);
    
    // Remove existing favicon elements
    removeFaviconElements();
    
    // Generate SVG favicon
    const svg = getIconSVG(config.iconType, config.color);
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
    
    console.log(`Favicon successfully loaded for: ${config.name}`);
    
  } catch (error) {
    console.error('Error loading favicon:', error);
    // Fallback to default favicon if something goes wrong
    const defaultConfig = faviconConfigs[0];
    if (pathname !== defaultConfig.path) {
      loadFaviconForPath(defaultConfig.path);
    }
  }
};
