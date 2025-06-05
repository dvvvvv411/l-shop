
import { useState } from 'react';

export type ShopType = 'root' | 'stanton' | 'greenoil' | 'austria';

export interface DomainShopConfig {
  shopType: ShopType;
  name: string;
  brand: string;
  phone: string;
  email: string;
  faviconColor: string;
  faviconIcon: 'flame' | 'drop' | 'leaf' | 'mountain';
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
  
  return config;
};

export const useDomainShop = () => {
  // Initialize with the correct config immediately - no flash!
  const [shopConfig] = useState<DomainShopConfig>(() => getDomainShopConfig());

  return shopConfig;
};
