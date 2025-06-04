
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

// Generic configuration for all shops
const genericShopConfig: ShopMetaConfig = {
  name: "Heizöl-Service",
  brand: "Heizöl",
  phone: "",
  email: "",
  baseUrl: window.location.origin,
  pages: {
    home: {
      title: "Heizöl zum Bestpreis - Günstige Heizöl-Lieferung deutschlandweit",
      description: "Günstiges Heizöl online bestellen. Schnelle Lieferung, beste Qualität, faire Preise. Vergleichen Sie Heizölpreise und sparen Sie beim Heizöl-Kauf.",
      keywords: "Heizöl, günstig, bestellen, Lieferung, Preise, online",
      ogTitle: "Heizöl zum Bestpreis - Günstige Heizöl-Lieferung",
      ogDescription: "Günstiges Heizöl online bestellen mit schneller Lieferung",
      twitterTitle: "Heizöl zum Bestpreis - Günstige Heizöl-Lieferung",
      twitterDescription: "Günstiges Heizöl online bestellen mit schneller Lieferung"
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

export const shopConfigs = {
  root: genericShopConfig,
  stanton: genericShopConfig,
  greenoil: genericShopConfig
};

export function getShopConfig(pathname: string): ShopMetaConfig {
  return genericShopConfig;
}

export function getPageMeta(pathname: string, pageName: string): MetaData {
  return genericShopConfig.pages[pageName] || genericShopConfig.pages.home;
}
