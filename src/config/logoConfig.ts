
export interface LogoConfig {
  name: string;
  className: string;
  textContent: string;
}

export const logoConfigs: Record<string, LogoConfig> = {
  '/1/home': {
    name: 'HeizölDirekt',
    className: 'w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center',
    textContent: 'H'
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
