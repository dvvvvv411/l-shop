
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

// Generic configuration for all domain shops
const genericShopMetaConfig: ShopMetaConfig = {
  name: "Heizöl-Service",
  brand: "Heizöl",
  phone: "",
  email: "",
  baseUrl: window.location.origin,
  pages: {
    home: {
      title: "Heizöl zum Bestpreis - Günstige Heizöl-Lieferung deutschlandweit",
      description: "Günstiges Heizöl online bestellen. Schnelle Lieferung, beste Qualität, faire Preise. Vergleichen Sie Heizölpreise und sparen Sie beim Heizöl-Kauf.",
      keywords: "Heizöl, günstig, bestellen, Lieferung, Preise, online"
    },
    impressum: {
      title: "Impressum - Heizöl-Service",
      description: "Impressum und rechtliche Informationen."
    },
    agb: {
      title: "AGB - Heizöl-Service",
      description: "Allgemeine Geschäftsbedingungen."
    },
    widerrufsrecht: {
      title: "Widerrufsrecht - Heizöl-Service",
      description: "Widerrufsrecht und Widerrufsbelehrung."
    },
    datenschutz: {
      title: "Datenschutz - Heizöl-Service",
      description: "Datenschutzerklärung und Informationen zum Datenschutz."
    },
    kontakt: {
      title: "Kontakt - Heizöl-Service | Persönliche Beratung",
      description: "Kontaktieren Sie uns für persönliche Beratung. Kompetente Fachberatung rund um Heizöl und Lieferung.",
      keywords: "Kontakt, Beratung, Heizöl, Support"
    },
    service: {
      title: "Service - Heizöl-Service | Premium Heizöl-Service",
      description: "Erstklassiger Heizöl-Service: Schnelle Lieferung, zertifizierte Partner, Premium-Qualität für Ihren Heizbedarf.",
      keywords: "Service, Heizöl, Lieferung, Premium, Qualität"
    },
    liefergebiet: {
      title: "Liefergebiete - Heizöl-Service | Deutschlandweite Abdeckung",
      description: "Heizöl-Lieferung deutschlandweit. Entdecken Sie unsere Liefergebiete und Partner-Standorte in ganz Deutschland.",
      keywords: "Liefergebiet, Deutschland, deutschlandweit, Partner, Standorte"
    },
    produkte: {
      title: "Heizöl-Produkte - Premium EL & Additive",
      description: "Hochwertige Heizöl-Produkte: Premium EL, schwefelarme Brennstoffe, additivierte Heizöle für optimale Heizleistung.",
      keywords: "Heizöl, Premium EL, schwefelarm, Additive, Qualität"
    }
  }
};

const shopMetaConfigs: Record<ShopType, ShopMetaConfig> = {
  root: genericShopMetaConfig,
  stanton: genericShopMetaConfig,
  greenoil: genericShopMetaConfig
};

export function getDomainShopConfig(shopType: ShopType): ShopMetaConfig {
  return genericShopMetaConfig;
}

export function getDomainPageMeta(shopType: ShopType, pageName: string): MetaData {
  const pageMeta = genericShopMetaConfig.pages[pageName] || genericShopMetaConfig.pages.home;
  return pageMeta;
}
