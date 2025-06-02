
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
    className: 'h-8 md:h-10',
    textContent: 'H',
    imageUrl: 'https://i.imgur.com/vX78e29.png',
    useImage: true
  },
  '/2/home': {
    name: 'OilExpress',
    className: 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-5 py-2 rounded-md font-bold text-xl',
    textContent: 'OilExpress'
  }
};

export const getLogoConfig = (referrer?: string): LogoConfig => {
  if (referrer && logoConfigs[referrer]) {
    return logoConfigs[referrer];
  }
  
  // Default fallback to HeizölDirekt style
  return logoConfigs['/1/home'];
};
