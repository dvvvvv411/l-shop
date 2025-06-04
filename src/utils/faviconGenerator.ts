
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
  // Find exact match first
  const exactMatch = faviconConfigs.find(config => pathname === config.path);
  if (exactMatch) return exactMatch;
  
  // Find path that starts with the config path
  const pathMatch = faviconConfigs.find(config => 
    config.path !== '/' && pathname.startsWith(config.path)
  );
  if (pathMatch) return pathMatch;
  
  // Default to root config
  return faviconConfigs[0];
};

export const loadFaviconForPath = (pathname: string): void => {
  const config = getFaviconConfigForPath(pathname);
  
  // Remove existing favicon links
  const existingLinks = document.querySelectorAll('link[rel*="icon"]');
  existingLinks.forEach(link => link.remove());
  
  // Create new favicon link
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  
  // Generate SVG favicon
  const svg = getIconSVG(config.iconType, config.color);
  const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  link.href = svgDataUrl;
  
  // Add to head
  document.head.appendChild(link);
  
  console.log(`Favicon loaded for path: ${pathname} (${config.name})`);
};
