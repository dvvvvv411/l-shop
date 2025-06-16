
import type { ShopType } from '@/hooks/useDomainShop';

export interface DomainShopMetaConfig {
  name: string;
  baseUrl: string;
  phone: string;
  email: string;
}

export interface PageMetaConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

const domainShopConfigs: Record<ShopType, DomainShopMetaConfig> = {
  root: {
    name: 'Heizöl-Service',
    baseUrl: 'https://heizoel-service.de',
    phone: '',
    email: ''
  },
  stanton: {
    name: 'STANTON Energie',
    baseUrl: 'https://stanton-energie.de',
    phone: '',
    email: ''
  },
  greenoil: {
    name: 'GreenOil - Nachhaltige Heizöllieferung',
    baseUrl: 'https://greenoil-lieferung.de',
    phone: '',
    email: ''
  },
  austria: {
    name: 'Heizöl Österreich',
    baseUrl: 'https://heizoel-austria.com',
    phone: '+43 1 234 5678',
    email: 'info@heizoel-austria.com'
  },
  france: {
    name: 'Fioul Rapide',
    baseUrl: 'https://fioul-rapide.fr',
    phone: '',
    email: 'info@fioul-rapide.fr'
  },
  italy: {
    name: 'OIL & OIL',
    baseUrl: 'https://gasoliocasa.com',
    phone: '',
    email: 'info@gasoliocasa.com'
  },
  malta: {
    name: 'Malta Heating Oil',
    baseUrl: 'https://malta-heating-oil.com',
    phone: '+356 2123 4567',
    email: 'info@malta-heating-oil.com'
  },
  belgium: {
    name: 'Mazout Vandaag',
    baseUrl: 'https://mazoutvandaag.com',
    phone: '+32 2 123 45 67',
    email: 'info@mazoutvandaag.com'
  }
};

const defaultPageMetas: Record<string, PageMetaConfig> = {
  home: {
    title: 'Heizöl günstig bestellen - Schnelle Lieferung',
    description: 'Heizöl günstig online bestellen. Schnelle Lieferung in 2-4 Werktagen. Faire Preise und erstklassiger Service.',
    keywords: 'heizöl, heizöl bestellen, heizöl günstig, heizöl lieferung'
  },
  products: {
    title: 'Heizöl Produkte - Premium Qualität',
    description: 'Unsere Heizöl Produkte in Premium Qualität. Standard und Premium Heizöl für Ihre Bedürfnisse.',
    keywords: 'heizöl produkte, premium heizöl, standard heizöl'
  },
  contact: {
    title: 'Kontakt - Heizöl Service',
    description: 'Kontaktieren Sie uns für Ihre Heizöl Bestellung. Persönliche Beratung und schneller Service.',
    keywords: 'heizöl kontakt, heizöl beratung, kundenservice'
  }
};

const shopSpecificMetas: Record<ShopType, Record<string, PageMetaConfig>> = {
  root: defaultPageMetas,
  stanton: {
    home: {
      title: 'STANTON Energie - Premium Heizöl Lieferung',
      description: 'STANTON Energie - Ihr Partner für Premium Heizöl. Schnelle Lieferung und faire Preise.',
      keywords: 'stanton energie, heizöl, premium heizöl'
    },
    products: defaultPageMetas.products,
    contact: defaultPageMetas.contact
  },
  greenoil: {
    home: {
      title: 'GreenOil - Nachhaltige Heizöl Lieferung',
      description: 'GreenOil - Nachhaltige Heizöl Lieferung mit Umweltfokus. Schnelle Lieferung und faire Preise.',
      keywords: 'greenoil, nachhaltiges heizöl, umweltfreundlich'
    },
    products: defaultPageMetas.products,
    contact: defaultPageMetas.contact
  },
  austria: {
    home: {
      title: 'Heizöl Österreich - Günstig bestellen',
      description: 'Heizöl günstig in Österreich bestellen. Schnelle Lieferung österreichweit. Faire Preise.',
      keywords: 'heizöl österreich, heizöl wien, heizöl salzburg'
    },
    products: defaultPageMetas.products,
    contact: defaultPageMetas.contact
  },
  france: {
    home: {
      title: 'Fioul Rapide - Livraison de Fioul en France',
      description: 'Fioul Rapide - Livraison rapide de fioul domestique en France. Prix compétitifs.',
      keywords: 'fioul, livraison fioul, fioul france'
    },
    products: defaultPageMetas.products,
    contact: defaultPageMetas.contact
  },
  italy: {
    home: {
      title: 'OIL & OIL - Consegna Gasolio in Italia',
      description: 'OIL & OIL - Consegna rapida di gasolio da riscaldamento in Italia. Prezzi competitivi.',
      keywords: 'gasolio, consegna gasolio, gasolio italia'
    },
    products: defaultPageMetas.products,
    contact: defaultPageMetas.contact
  },
  malta: {
    home: {
      title: 'Malta Heating Oil - Fast Delivery',
      description: 'Malta Heating Oil - Fast heating oil delivery across Malta. Competitive prices and reliable service.',
      keywords: 'heating oil malta, fuel delivery malta'
    },
    products: defaultPageMetas.products,
    contact: defaultPageMetas.contact
  },
  belgium: {
    home: {
      title: 'Mazout Vandaag - Mazout Levering België',
      description: 'Mazout Vandaag - Snelle mazout levering in heel België. Beste prijzen en betrouwbare service.',
      keywords: 'mazout belgië, mazout bestellen, mazout levering'
    },
    products: {
      title: 'Mazout Producten - Premium Kwaliteit',
      description: 'Onze mazout producten in premium kwaliteit. Standaard en premium mazout voor uw behoeften.',
      keywords: 'mazout producten, premium mazout, standaard mazout'
    },
    contact: {
      title: 'Contact - Mazout Service België',
      description: 'Contacteer ons voor uw mazout bestelling. Persoonlijke begeleiding en snelle service.',
      keywords: 'mazout contact, mazout advies, klantenservice'
    }
  }
};

export const getDomainShopConfig = (shopType: ShopType): DomainShopMetaConfig => {
  return domainShopConfigs[shopType] || domainShopConfigs.root;
};

export const getDomainPageMeta = (shopType: ShopType, pageName: string): PageMetaConfig => {
  const shopMetas = shopSpecificMetas[shopType] || shopSpecificMetas.root;
  return shopMetas[pageName] || defaultPageMetas[pageName] || defaultPageMetas.home;
};
