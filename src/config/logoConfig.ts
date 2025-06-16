
export type ShopType = 'root' | 'stanton' | 'greenoil' | 'austria' | 'france' | 'italy' | 'malta' | 'belgium';

export interface LogoConfig {
  name: string;
  useImage: boolean;
  imageUrl?: string;
  className?: string;
  textContent?: string;
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
