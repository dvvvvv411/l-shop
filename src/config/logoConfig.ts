
export interface LogoConfig {
  name: string;
  className: string;
  textContent: string;
  imageUrl?: string;
  useImage?: boolean;
  footerImageUrl?: string;
}

export const logoConfigs: Record<string, LogoConfig> = {
  '/1/home': {
    name: 'HeizölDirekt',
    className: 'h-12 md:h-15',
    textContent: 'H',
    imageUrl: 'https://i.imgur.com/vX78e29.png',
    useImage: true
  },
  '/2/home': {
    name: 'OilExpress',
    className: 'h-24 w-auto',
    textContent: 'OilExpress',
    imageUrl: 'https://i.imgur.com/HvoI1pD.png',
    useImage: true
  },
  '/3/home': {
    name: 'Heizöl Österreich',
    className: 'h-16 w-auto',
    textContent: 'Heizöl AT',
    imageUrl: 'https://i.imgur.com/FrtZ9Dd.png',
    useImage: true
  },
  '/4/home': {
    name: 'Fioul Rapide',
    className: 'h-16 w-auto',
    textContent: 'Fioul FR',
    imageUrl: 'https://i.imgur.com/TLLkTFB.png',
    useImage: true,
    footerImageUrl: 'https://i.imgur.com/ew2noHy.png'
  },
  '/5/home': {
    name: 'Gasolio Veloce',
    className: 'h-24 w-auto',
    textContent: 'Gasolio IT',
    imageUrl: 'https://i.imgur.com/jqTOPp6.png',
    useImage: true,
    footerImageUrl: 'https://i.imgur.com/jqTOPp6.png'
  },
  '/6/home': {
    name: 'Malta Heating Oil',
    className: 'h-16 w-auto',
    textContent: 'Malta Energy',
    imageUrl: 'https://i.imgur.com/placeholder-malta-logo.png',
    useImage: false // Using text until proper logo is provided
  },
  '/7/home': {
    name: 'MazoutVandaag',
    className: 'h-24 w-auto',
    textContent: 'MazoutVandaag',
    imageUrl: 'https://i.imgur.com/placeholder-belgium-logo.png',
    useImage: false // Using text until proper logo is provided
  },
  // Domain-specific configurations
  'stanton': {
    name: 'HeizölDirekt',
    className: 'h-12 md:h-15',
    textContent: 'H',
    imageUrl: 'https://i.imgur.com/vX78e29.png',
    useImage: true
  },
  'greenoil': {
    name: 'OilExpress',
    className: 'h-24 w-auto',
    textContent: 'OilExpress',
    imageUrl: 'https://i.imgur.com/HvoI1pD.png',
    useImage: true
  },
  'austria': {
    name: 'Heizöl Österreich',
    className: 'h-16 w-auto',
    textContent: 'Heizöl AT',
    imageUrl: 'https://i.imgur.com/FrtZ9Dd.png',
    useImage: true
  },
  'france': {
    name: 'Fioul Rapide',
    className: 'h-16 w-auto',
    textContent: 'Fioul FR',
    imageUrl: 'https://i.imgur.com/TLLkTFB.png',
    useImage: true,
    footerImageUrl: 'https://i.imgur.com/ew2noHy.png'
  },
  'italy': {
    name: 'Gasolio Veloce',
    className: 'h-24 w-auto',
    textContent: 'Gasolio IT',
    imageUrl: 'https://i.imgur.com/jqTOPp6.png',
    useImage: true,
    footerImageUrl: 'https://i.imgur.com/jqTOPp6.png'
  },
  'malta': {
    name: 'Malta Heating Oil',
    className: 'h-16 w-auto',
    textContent: 'Malta Energy',
    imageUrl: 'https://i.imgur.com/placeholder-malta-logo.png',
    useImage: false
  },
  'belgium': {
    name: 'MazoutVandaag',
    className: 'h-24 w-auto',
    textContent: 'MazoutVandaag',
    imageUrl: 'https://i.imgur.com/placeholder-belgium-logo.png',
    useImage: false
  },
  'root': {
    name: 'HeizölDirekt',
    className: 'h-12 md:h-15',
    textContent: 'H',
    imageUrl: 'https://i.imgur.com/vX78e29.png',
    useImage: true
  }
};

export const getLogoConfig = (referrer?: string): LogoConfig => {
  // Check current URL path first for V7 routes
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/7/') || currentPath === '/7') {
      return logoConfigs['/7/home'];
    }
    if (currentPath.startsWith('/6/') || currentPath === '/6') {
      return logoConfigs['/6/home'];
    }
    if (currentPath.startsWith('/5/') || currentPath === '/5') {
      return logoConfigs['/5/home'];
    }
    if (currentPath.startsWith('/4/') || currentPath === '/4') {
      return logoConfigs['/4/home'];
    }
    if (currentPath.startsWith('/3/') || currentPath === '/3') {
      return logoConfigs['/3/home'];
    }
    if (currentPath.startsWith('/2/') || currentPath === '/2') {
      return logoConfigs['/2/home'];
    }
    if (currentPath.startsWith('/1/') || currentPath === '/1') {
      return logoConfigs['/1/home'];
    }
  }
  
  // Check for order referrer stored in localStorage (for checkout pages)
  if (typeof window !== 'undefined') {
    const orderReferrer = localStorage.getItem('orderReferrer');
    if (orderReferrer && logoConfigs[orderReferrer]) {
      return logoConfigs[orderReferrer];
    }
  }
  
  // Use explicit referrer parameter
  if (referrer && logoConfigs[referrer]) {
    return logoConfigs[referrer];
  }
  
  // Default fallback to HeizölDirekt style
  return logoConfigs['/1/home'];
};

// New function to get logo config by domain shop type
export const getLogoConfigByShopType = (shopType: 'root' | 'stanton' | 'greenoil' | 'austria' | 'france' | 'italy' | 'malta' | 'belgium'): LogoConfig => {
  return logoConfigs[shopType] || logoConfigs['root'];
};

// Enhanced function to get logo config for V3 routes specifically
export const getLogoConfigForV3 = (): LogoConfig => {
  return logoConfigs['/3/home'];
};

// New function to get logo config for V4 routes specifically
export const getLogoConfigForV4 = (): LogoConfig => {
  return logoConfigs['/4/home'];
};

// New function to get logo config for V5 routes specifically
export const getLogoConfigForV5 = (): LogoConfig => {
  return logoConfigs['/5/home'];
};

// New function to get logo config for V6 routes specifically
export const getLogoConfigForV6 = (): LogoConfig => {
  return logoConfigs['/6/home'];
};

// New function to get logo config for V7 routes specifically
export const getLogoConfigForV7 = (): LogoConfig => {
  return logoConfigs['/7/home'];
};
