
export interface LogoConfig {
  name: string;
  className: string;
  textContent: string;
  imageUrl?: string;
  useImage?: boolean;
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
    className: 'h-12 w-auto',
    textContent: 'OilExpress',
    imageUrl: 'https://i.imgur.com/qwFr7Og.png',
    useImage: true
  }
};

export const getLogoConfig = (referrer?: string): LogoConfig => {
  if (referrer && logoConfigs[referrer]) {
    return logoConfigs[referrer];
  }
  
  // Default fallback to HeizölDirekt style
  return logoConfigs['/1/home'];
};
