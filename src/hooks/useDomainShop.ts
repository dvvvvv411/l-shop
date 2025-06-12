
import { useState, useEffect } from 'react';

export type ShopType = 'root' | 'stanton' | 'greenoil' | 'austria' | 'france' | 'italy';

export interface DomainShopConfig {
  shopType: ShopType;
  name: string;
  brand: string;
  phone: string;
  email: string;
  faviconColor: string;
  faviconIcon: 'flame' | 'drop' | 'leaf' | 'mountain' | 'sun';
}

const domainMappings: Record<string, DomainShopConfig> = {
  'stanton-energie.de': {
    shopType: 'stanton',
    name: 'Heizöl-Service',
    brand: 'Heizöl',
    phone: '',
    email: '',
    faviconColor: '#dc2626',
    faviconIcon: 'drop'
  },
  'greenoil-lieferung.de': {
    shopType: 'greenoil',
    name: 'Heizöl-Service',
    brand: 'Heizöl',
    phone: '',
    email: '',
    faviconColor: '#059669',
    faviconIcon: 'leaf'
  },
  'heizoel-austria.com': {
    shopType: 'austria',
    name: 'Heizöl Österreich',
    brand: 'Heizöl AT',
    phone: '+43 1 234 5678',
    email: 'info@heizoel-austria.com',
    faviconColor: '#7c3aed',
    faviconIcon: 'mountain'
  },
  'fioul-rapide.fr': {
    shopType: 'france',
    name: 'Fioul Rapide',
    brand: 'Fioul FR',
    phone: '',
    email: 'info@fioul-rapide.fr',
    faviconColor: '#dc2626',
    faviconIcon: 'flame'
  },
  'gasolio-express.it': {
    shopType: 'italy',
    name: 'Gasolio Express',
    brand: 'Gasolio IT',
    phone: '+39 02 1234 5678',
    email: 'info@gasolio-express.it',
    faviconColor: '#16a34a',
    faviconIcon: 'sun'
  }
};

const defaultConfig: DomainShopConfig = {
  shopType: 'root',
  name: 'Heizöl-Service',
  brand: 'Heizöl',
  phone: '',
  email: '',
  faviconColor: '#dc2626',
  faviconIcon: 'flame'
};

// Helper function to get the correct shop config synchronously
const getDomainShopConfig = (): DomainShopConfig => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return defaultConfig;
  }

  const hostname = window.location.hostname;
  const config = domainMappings[hostname] || defaultConfig;
  
  console.log('Domain shop detected synchronously:', { hostname, shopType: config.shopType });
  
  // Set appropriate order referrer for checkout branding
  if (config.shopType === 'austria') {
    localStorage.setItem('orderReferrer', '/3/home');
  } else if (config.shopType === 'greenoil') {
    localStorage.setItem('orderReferrer', '/2/home');
  } else if (config.shopType === 'stanton') {
    localStorage.setItem('orderReferrer', '/1/home');
  } else if (config.shopType === 'france') {
    localStorage.setItem('orderReferrer', '/4/home');
  } else if (config.shopType === 'italy') {
    localStorage.setItem('orderReferrer', '/5/home');
  }
  
  return config;
};

export const useDomainShop = () => {
  // Initialize with the correct config immediately - no flash!
  const [shopConfig] = useState<DomainShopConfig>(() => getDomainShopConfig());

  return shopConfig;
};
