
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export interface DomainConfig {
  domain: string;
  targetPath: string;
  shop: 'root' | 'stanton' | 'greenoil';
}

const domainConfigs: DomainConfig[] = [
  {
    domain: 'stanton-energie.de',
    targetPath: '/1/home',
    shop: 'stanton'
  },
  {
    domain: 'greenoil-lieferung.de',
    targetPath: '/2/home',
    shop: 'greenoil'
  }
];

declare global {
  interface Window {
    __DOMAIN_INFO__?: {
      hostname: string;
      shop: 'root' | 'stanton' | 'greenoil';
      shouldRedirect: boolean;
      targetPath?: string;
    };
  }
}

export const useDomainDetection = () => {
  const [currentDomain, setCurrentDomain] = useState<string>('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hostname = window.location.hostname;
    setCurrentDomain(hostname);

    console.log('Domain detection - Current hostname:', hostname);
    console.log('Domain detection - Current pathname:', location.pathname);

    // Check if early initialization detected a redirect need
    const domainInfo = window.__DOMAIN_INFO__;
    if (domainInfo?.shouldRedirect && domainInfo.targetPath) {
      console.log('Domain detection - Using early redirect to:', domainInfo.targetPath);
      setShouldRedirect(true);
      
      setTimeout(() => {
        navigate(domainInfo.targetPath!, { replace: true });
        setShouldRedirect(false);
        // Clear the redirect flag
        if (window.__DOMAIN_INFO__) {
          window.__DOMAIN_INFO__.shouldRedirect = false;
        }
      }, 100);
      return;
    }

    // Find matching domain configuration for runtime detection
    const domainConfig = domainConfigs.find(config => 
      hostname.includes(config.domain) || hostname === config.domain
    );

    if (domainConfig) {
      console.log('Domain detection - Found config:', domainConfig);
      
      // Check if we need to redirect
      const isOnCorrectPath = location.pathname.startsWith(domainConfig.targetPath.split('/').slice(0, 2).join('/'));
      
      if (!isOnCorrectPath) {
        console.log('Domain detection - Redirecting to:', domainConfig.targetPath);
        setShouldRedirect(true);
        
        setTimeout(() => {
          navigate(domainConfig.targetPath, { replace: true });
          setShouldRedirect(false);
        }, 100);
      }
    }
  }, [navigate, location.pathname]);

  const getDomainConfig = (hostname?: string): DomainConfig | null => {
    const targetHostname = hostname || currentDomain;
    return domainConfigs.find(config => 
      targetHostname.includes(config.domain) || targetHostname === config.domain
    ) || null;
  };

  const getShopFromDomain = (hostname?: string): 'root' | 'stanton' | 'greenoil' => {
    // Use early initialization data if available
    if (window.__DOMAIN_INFO__?.shop) {
      return window.__DOMAIN_INFO__.shop;
    }
    
    const config = getDomainConfig(hostname);
    return config?.shop || 'root';
  };

  return {
    currentDomain,
    shouldRedirect,
    getDomainConfig,
    getShopFromDomain,
    domainConfigs
  };
};
