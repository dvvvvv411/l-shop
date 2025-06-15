
import { useState, useEffect } from 'react';

export type ShopType = 'root' | 'stanton' | 'greenoil' | 'austria' | 'france' | 'italy' | 'malta';

export interface DomainShopConfig {
  shopType: ShopType;
  name: string;
  brand: string;
  phone: string;
  email: string;
  faviconColor: string;
  faviconIcon: 'flame' | 'drop' | 'leaf' | 'mountain' | 'flame-italia' | 'sun';
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
  'gasoliocasa.com': {
    shopType: 'italy',
    name: 'OIL & OIL',
    brand: 'Gasolio IT',
    phone: '',
    email: 'info@gasoliocasa.it',
    faviconColor: '#16a34a',
    faviconIcon: 'flame-italia'
  },
  'malta-heating-oil.com': {
    shopType: 'malta',
    name: 'Malta Heating Oil',
    brand: 'Malta Energy',
    phone: '+356 2123 4567',
    email: 'info@malta-heating-oil.com',
    faviconColor: '#f59e0b',
    faviconIcon: 'sun'
  },
  // Add localhost mapping for testing Italian shop
  'localhost': {
    shopType: 'italy',
    name: 'OIL & OIL',
    brand: 'Gasolio IT',
    phone: '',
    email: 'info@gasoliocasa.it',
    faviconColor: '#16a34a',
    faviconIcon: 'flame-italia'
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
  const pathname = window.location.pathname;
  
  // Check for legacy path-based routing first (e.g., /5/home for Italian)
  if (pathname.startsWith('/5/')) {
    const config = {
      shopType: 'italy' as ShopType,
      name: 'OIL & OIL',
      brand: 'Gasolio IT',
      phone: '',
      email: 'info@gasoliocasa.it',
      faviconColor: '#16a34a',
      faviconIcon: 'flame-italia' as const
    };
    console.log('Italian shop detected via path routing:', { pathname, shopType: config.shopType });
    localStorage.setItem('orderReferrer', '/5/home');
    return config;
  }
  
  // Then check domain mappings
  const config = domainMappings[hostname] || defaultConfig;
  
  console.log('Domain shop detected:', { hostname, pathname, shopType: config.shopType });
  
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
  } else if (config.shopType === 'malta') {
    localStorage.setItem('orderReferrer', '/6/home');
  }
  
  return config;
};

export const useDomainShop = () => {
  // Initialize with the correct config immediately - no flash!
  const [shopConfig] = useState<DomainShopConfig>(() => getDomainShopConfig());

  return shopConfig;
};
