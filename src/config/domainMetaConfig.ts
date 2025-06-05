
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

// Austrian-specific configuration
const austrianShopMetaConfig: ShopMetaConfig = {
  name: "Heizöl Österreich",
  brand: "Heizöl AT",
  phone: "+43 1 234 5678",
  email: "info@heizoel-austria.com",
  baseUrl: window.location.origin,
  pages: {
    home: {
      title: "Heizöl Österreich - Premium Heizöl österreichweit zum Bestpreis",
      description: "Günstige Heizöl-Lieferung in ganz Österreich. Von Wien bis Innsbruck, von Salzburg bis Graz. Premium-Qualität, schnelle Lieferung, faire Preise seit 1998.",
      keywords: "Heizöl Österreich, günstig, bestellen, Lieferung, Wien, Salzburg, Innsbruck, Graz"
    },
    impressum: {
      title: "Impressum - Heizöl Österreich",
      description: "Impressum und rechtliche Informationen der Heizöl Österreich GmbH."
    },
    agb: {
      title: "AGB - Heizöl Österreich",
      description: "Allgemeine Geschäftsbedingungen der Heizöl Österreich GmbH."
    },
    widerrufsrecht: {
      title: "Widerrufsrecht - Heizöl Österreich",
      description: "Widerrufsrecht und Widerrufsbelehrung für Verbraucher in Österreich."
    },
    datenschutz: {
      title: "Datenschutz - Heizöl Österreich",
      description: "Datenschutzerklärung gemäß DSGVO der Heizöl Österreich GmbH."
    },
    kontakt: {
      title: "Kontakt - Heizöl Österreich | Persönliche Beratung",
      description: "Kontaktieren Sie uns für persönliche Beratung. Österreichweiter Service von Wien bis Vorarlberg.",
      keywords: "Kontakt, Beratung, Heizöl, Österreich, Wien, Support"
    },
    service: {
      title: "Über uns - Heizöl Österreich | Premium Heizöl-Service",
      description: "Seit 1998 Ihr verlässlicher Partner für Premium-Heizöl in Österreich. Österreichische Qualität, faire Preise, persönlicher Service.",
      keywords: "Service, Heizöl, Österreich, Premium, Qualität, seit 1998"
    },
    liefergebiet: {
      title: "Liefergebiete - Heizöl Österreich | Österreichweite Abdeckung",
      description: "Heizöl-Lieferung in alle 9 österreichischen Bundesländer. Von Wien bis Vorarlberg, schnelle Lieferung österreichweit.",
      keywords: "Liefergebiet, Österreich, bundesweit, Wien, Salzburg, Tirol, Steiermark"
    },
    produkte: {
      title: "Heizöl-Produkte - Premium EL & Additive für Österreich",
      description: "Hochwertige Heizöl-Produkte für österreichische Haushalte: Premium EL, schwefelarme Brennstoffe, additivierte Heizöle.",
      keywords: "Heizöl, Premium EL, schwefelarm, Additive, Österreich, Qualität"
    }
  }
};

// Generic configuration for other domain shops
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
  greenoil: genericShopMetaConfig,
  austria: austrianShopMetaConfig
};

export function getDomainShopConfig(shopType: ShopType): ShopMetaConfig {
  return shopMetaConfigs[shopType] || genericShopMetaConfig;
}

export function getDomainPageMeta(shopType: ShopType, pageName: string): MetaData {
  const shopConfig = shopMetaConfigs[shopType] || genericShopMetaConfig;
  const pageMeta = shopConfig.pages[pageName] || shopConfig.pages.home;
  return pageMeta;
}
