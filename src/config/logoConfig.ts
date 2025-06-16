
export type ShopType = 'root' | 'stanton' | 'greenoil' | 'austria' | 'france' | 'italy' | 'malta' | 'belgium';

export interface LogoConfig {
  name: string;
  useImage: boolean;
  imageUrl?: string;
  className?: string;
  textContent?: string;
  footerImageUrl?: string;
}

const logoConfigurations: Record<ShopType, LogoConfig> = {
  root: {
    name: 'Heizöl-Service',
    useImage: false,
    textContent: 'Heizöl'
  },
  stanton: {
    name: 'STANTON Energie',
    useImage: true,
    imageUrl: '/images/stanton-logo.png',
    className: 'h-12 w-auto'
  },
  greenoil: {
    name: 'GreenOil',
    useImage: false,
    textContent: 'GreenOil'
  },
  austria: {
    name: 'Heizöl Österreich',
    useImage: false,
    textContent: 'Heizöl AT'
  },
  france: {
    name: 'Fioul Rapide',
    useImage: false,
    textContent: 'Fioul FR'
  },
  italy: {
    name: 'OIL & OIL',
    useImage: false,
    textContent: 'Gasolio IT'
  },
  malta: {
    name: 'Malta Heating Oil',
    useImage: false,
    textContent: 'Malta Energy'
  },
  belgium: {
    name: 'Mazout Vandaag',
    useImage: false,
    textContent: 'Mazout BE'
  }
};

export const getLogoConfigByShopType = (shopType: ShopType): LogoConfig => {
  return logoConfigurations[shopType] || logoConfigurations.root;
};

// Legacy function for CheckoutHeader and v2/Footer compatibility
export const getLogoConfig = (routePath?: string): LogoConfig => {
  if (typeof window === 'undefined') {
    return logoConfigurations.root;
  }

  // Check order referrer first
  const orderReferrer = localStorage.getItem('orderReferrer');
  if (orderReferrer || routePath) {
    const path = routePath || orderReferrer || '';
    
    if (path.includes('/1/')) return logoConfigurations.stanton;
    if (path.includes('/2/')) return logoConfigurations.greenoil;
    if (path.includes('/3/')) return logoConfigurations.austria;
    if (path.includes('/4/')) return logoConfigurations.france;
    if (path.includes('/5/')) return logoConfigurations.italy;
    if (path.includes('/6/')) return logoConfigurations.malta;
    if (path.includes('/7/')) return logoConfigurations.belgium;
  }

  // Fallback to domain-based detection
  const hostname = window.location.hostname;
  if (hostname === 'stanton-energie.de') return logoConfigurations.stanton;
  if (hostname === 'greenoil-lieferung.de') return logoConfigurations.greenoil;
  if (hostname === 'heizoel-austria.com') return logoConfigurations.austria;
  if (hostname === 'fioul-rapide.fr') return logoConfigurations.france;
  if (hostname === 'gasoliocasa.com') return logoConfigurations.italy;
  if (hostname === 'malta-heating-oil.com') return logoConfigurations.malta;
  if (hostname === 'mazoutvandaag.com') return logoConfigurations.belgium;

  return logoConfigurations.root;
};

// Version-specific logo functions
export const getLogoConfigForV4 = (): LogoConfig => {
  return logoConfigurations.france;
};

export const getLogoConfigForV5 = (): LogoConfig => {
  return logoConfigurations.italy;
};

export const getLogoConfigForV6 = (): LogoConfig => {
  return logoConfigurations.malta;
};
