
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

// German configuration for all German shops
const germanShopConfig: ShopMetaConfig = {
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
    },
    checkout: {
      title: "Bestellung abschließen - Heizöl-Service",
      description: "Schließen Sie Ihre Heizöl-Bestellung ab. Sichere Bezahlung und schnelle Lieferung garantiert."
    }
  }
};

// French configuration for the French shop
const frenchShopConfig: ShopMetaConfig = {
  name: "Fioul Rapide",
  brand: "Fioul FR",
  phone: "",
  email: "info@fioul-rapide.fr",
  baseUrl: window.location.origin,
  pages: {
    home: {
      title: "Fioul au meilleur prix - Livraison rapide de fioul domestique en France",
      description: "Commandez votre fioul domestique en ligne au meilleur prix. Livraison rapide, qualité premium, prix équitables. Comparez les prix du fioul et économisez.",
      keywords: "fioul, domestique, pas cher, livraison, prix, en ligne",
      ogTitle: "Fioul au meilleur prix - Livraison rapide de fioul",
      ogDescription: "Commandez votre fioul domestique en ligne avec livraison rapide",
      twitterTitle: "Fioul au meilleur prix - Livraison rapide de fioul",
      twitterDescription: "Commandez votre fioul domestique en ligne avec livraison rapide"
    },
    impressum: {
      title: "Mentions légales - Fioul Rapide",
      description: "Mentions légales et informations juridiques."
    },
    agb: {
      title: "CGV - Fioul Rapide",
      description: "Conditions générales de vente."
    },
    widerrufsrecht: {
      title: "Droit de rétractation - Fioul Rapide",
      description: "Droit de rétractation et informations de rétractation."
    },
    datenschutz: {
      title: "Confidentialité - Fioul Rapide",
      description: "Politique de confidentialité et informations sur la protection des données."
    },
    kontakt: {
      title: "Contact - Fioul Rapide | Conseil personnalisé",
      description: "Contactez-nous pour un conseil personnalisé. Expertise professionnelle autour du fioul et de la livraison.",
      keywords: "contact, conseil, fioul, support"
    },
    service: {
      title: "Service - Fioul Rapide | Service fioul premium",
      description: "Service fioul de première classe : livraison rapide, partenaires certifiés, qualité premium pour vos besoins de chauffage.",
      keywords: "service, fioul, livraison, premium, qualité"
    },
    liefergebiet: {
      title: "Zones de livraison - Fioul Rapide | Couverture France entière",
      description: "Livraison de fioul dans toute la France. Découvrez nos zones de livraison et points partenaires partout en France.",
      keywords: "zone livraison, France, national, partenaires, points"
    },
    produkte: {
      title: "Produits fioul - Fioul Premium & Additifs",
      description: "Produits fioul de haute qualité : fioul premium, combustibles à faible teneur en soufre, fioul additivé pour un chauffage optimal.",
      keywords: "fioul, premium, faible soufre, additifs, qualité"
    },
    checkout: {
      title: "Finaliser votre commande - Fioul Rapide",
      description: "Finalisez votre commande de fioul. Paiement sécurisé et livraison rapide garantie."
    }
  }
};

export const shopConfigs = {
  root: germanShopConfig,
  stanton: germanShopConfig,
  greenoil: germanShopConfig,
  austria: germanShopConfig, // Austrian shop uses German for now
  france: frenchShopConfig
};

export function getShopConfig(pathname: string): ShopMetaConfig {
  // Check if this is a French route
  if (pathname.startsWith('/4/')) {
    return frenchShopConfig;
  }
  
  return germanShopConfig;
}

export function getPageMeta(pathname: string, pageName: string): MetaData {
  const shopConfig = getShopConfig(pathname);
  return shopConfig.pages[pageName] || shopConfig.pages.home;
}
