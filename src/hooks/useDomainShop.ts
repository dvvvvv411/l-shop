
import { useState } from 'react';

export type ShopType = 'root' | 'stanton' | 'greenoil';

export interface DomainShopConfig {
  shopType: ShopType;
  name: string;
  brand: string;
  phone: string;
  email: string;
  faviconColor: string;
  faviconIcon: 'flame' | 'drop' | 'leaf';
}

const domainMappings: Record<string, DomainShopConfig> = {
  'stanton-energie.de': {
    shopType: 'stanton',
    name: 'STANTON Heizöl',
    brand: 'STANTON',
    phone: '',
    email: '',
    faviconColor: '#dc2626',
    faviconIcon: 'drop'
  },
  'greenoil-lieferung.de': {
    shopType: 'greenoil',
    name: 'GreenOil Eco-Heizöl',
    brand: 'GreenOil',
    phone: '',
    email: '',
    faviconColor: '#059669',
    faviconIcon: 'leaf'
  }
};

const defaultConfig: DomainShopConfig = {
  shopType: 'root',
  name: 'HeizölNetz Deutschland',
  brand: 'HeizölNetz',
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
