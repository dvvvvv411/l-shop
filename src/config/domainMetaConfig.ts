
import { useDomainShop, type ShopType } from '@/hooks/useDomainShop';

export interface MetaData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export interface ShopMetaConfig {
  name: string;
  brand: string;
  phone: string;
  email: string;
  baseUrl: string;
  pages: {
    [key: string]: MetaData;
  };
}

const shopMetaConfigs: Record<ShopType, ShopMetaConfig> = {
  root: {
    name: "HeizölNetz Deutschland",
    brand: "HeizölNetz",
    phone: "0800 123 456 789",
    email: "info@heizoel-netz.de",
    baseUrl: window.location.origin,
    pages: {
      home: {
        title: "HeizölNetz Deutschland - Bundesweites Heizöl-Netzwerk | Günstig & Zuverlässig",
        description: "Deutschlands größtes Heizöl-Netzwerk mit 500+ Partnern. Günstige Preise, schnelle Lieferung, 99.8% Zuverlässigkeit. Jetzt Heizöl bestellen!",
        keywords: "Heizöl, Deutschland, günstig, Lieferung, Netzwerk, Partner"
      },
      impressum: {
        title: "Impressum - HeizölNetz Deutschland",
        description: "Impressum und rechtliche Informationen von HeizölNetz Deutschland."
      },
      agb: {
        title: "AGB - HeizölNetz Deutschland",
        description: "Allgemeine Geschäftsbedingungen von HeizölNetz Deutschland."
      },
      widerrufsrecht: {
        title: "Widerrufsrecht - HeizölNetz Deutschland", 
        description: "Widerrufsrecht und Widerrufsbelehrung von HeizölNetz Deutschland."
      }
    }
  },
  stanton: {
    name: "STANTON Heizöl",
    brand: "STANTON",
    phone: "0800 987 654 321",
    email: "info@stanton-heizoel.de",
    baseUrl: window.location.origin,
    pages: {
      home: {
        title: "STANTON Heizöl - Premium Heizöl-Lieferung | Qualität seit 1985",
        description: "STANTON Heizöl - Ihr vertrauensvoller Partner für Premium Heizöl-Lieferung seit 1985. Höchste Qualität, zuverlässiger Service, faire Preise.",
        keywords: "STANTON, Heizöl, Premium, Qualität, seit 1985"
      },
      impressum: {
        title: "Impressum - STANTON Heizöl",
        description: "Impressum und rechtliche Informationen von STANTON Heizöl."
      },
      agb: {
        title: "AGB - STANTON Heizöl",
        description: "Allgemeine Geschäftsbedingungen von STANTON Heizöl."
      },
      widerrufsrecht: {
        title: "Widerrufsrecht - STANTON Heizöl",
        description: "Widerrufsrecht und Widerrufsbelehrung von STANTON Heizöl."
      }
    }
  },
  greenoil: {
    name: "GreenOil Eco-Heizöl",
    brand: "GreenOil",
    phone: "0800 456 789 123",
    email: "info@greenoil-eco.de",
    baseUrl: window.location.origin,
    pages: {
      home: {
        title: "GreenOil Eco-Heizöl - Nachhaltige Heizlösungen | CO2-reduziert",
        description: "GreenOil Eco-Heizöl - Nachhaltige und umweltfreundliche Heizlösungen. CO2-reduziert, bio-additiviert, für eine grünere Zukunft.",
        keywords: "GreenOil, Eco-Heizöl, nachhaltig, CO2-reduziert, Bio"
      },
      impressum: {
        title: "Impressum - GreenOil Eco-Heizöl",
        description: "Impressum und rechtliche Informationen von GreenOil Eco-Heizöl."
      },
      agb: {
        title: "AGB - GreenOil Eco-Heizöl", 
        description: "Allgemeine Geschäftsbedingungen von GreenOil Eco-Heizöl."
      },
      widerrufsrecht: {
        title: "Widerrufsrecht - GreenOil Eco-Heizöl",
        description: "Widerrufsrecht und Widerrufsbelehrung von GreenOil Eco-Heizöl."
      }
    }
  }
};

export function getDomainShopConfig(shopType: ShopType): ShopMetaConfig {
  return shopMetaConfigs[shopType];
}

export function getDomainPageMeta(shopType: ShopType, pageName: string): MetaData {
  const shopConfig = shopMetaConfigs[shopType];
  return shopConfig.pages[pageName] || shopConfig.pages.home;
}
