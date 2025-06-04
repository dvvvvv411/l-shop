
import { useState, useEffect } from 'react';

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
    phone: '0800 987 654 321',
    email: 'info@stanton-heizoel.de',
    faviconColor: '#dc2626',
    faviconIcon: 'drop'
  },
  'greenoil-lieferung.de': {
    shopType: 'greenoil',
    name: 'GreenOil Eco-Heizöl',
    brand: 'GreenOil',
    phone: '0800 456 789 123',
    email: 'info@greenoil-eco.de',
    faviconColor: '#059669',
    faviconIcon: 'leaf'
  }
};

const defaultConfig: DomainShopConfig = {
  shopType: 'root',
  name: 'HeizölNetz Deutschland',
  brand: 'HeizölNetz',
  phone: '0800 123 456 789',
  email: 'info@heizoel-netz.de',
  faviconColor: '#dc2626',
  faviconIcon: 'flame'
};

export const useDomainShop = () => {
  const [shopConfig, setShopConfig] = useState<DomainShopConfig>(defaultConfig);

  useEffect(() => {
    const hostname = window.location.hostname;
    const config = domainMappings[hostname] || defaultConfig;
    setShopConfig(config);
    
    console.log('Domain shop detected:', { hostname, shopType: config.shopType });
  }, []);

  return shopConfig;
};
