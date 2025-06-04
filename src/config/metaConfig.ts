
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

// Root shop configuration (HeizölNetz Deutschland)
const rootShopConfig: ShopMetaConfig = {
  name: "HeizölNetz Deutschland",
  brand: "HeizölNetz",
  phone: "",
  email: "",
  baseUrl: "https://heizoel-netz.de",
  pages: {
    home: {
      title: "HeizölNetz Deutschland - Bundesweites Heizöl-Netzwerk | Günstig & Zuverlässig",
      description: "Deutschlands größtes Heizöl-Netzwerk mit 500+ Partnern. Günstige Preise, schnelle Lieferung, 99.8% Zuverlässigkeit. Jetzt Heizöl bestellen!",
      keywords: "Heizöl, Deutschland, günstig, Lieferung, Netzwerk, Partner",
      ogTitle: "HeizölNetz Deutschland - Bundesweites Heizöl-Netzwerk",
      ogDescription: "Über 500 Partner deutschlandweit für günstige Heizöl-Lieferung",
      twitterTitle: "HeizölNetz Deutschland - Bundesweites Heizöl-Netzwerk",
      twitterDescription: "Deutschlands größtes Heizöl-Netzwerk mit 500+ Partnern"
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
    },
    kontakt: {
      title: "Kontakt - HeizölNetz Deutschland | Persönliche Beratung",
      description: "Kontaktieren Sie HeizölNetz Deutschland für persönliche Beratung. Kostenlose Hotline, E-Mail-Support und kompetente Fachberatung.",
      keywords: "Kontakt, Beratung, Hotline, HeizölNetz, Support"
    },
    service: {
      title: "Service - HeizölNetz Deutschland | Premium Heizöl-Service",
      description: "Erstklassiger Heizöl-Service von HeizölNetz Deutschland: 24h Express-Lieferung, TÜV-zertifizierte Partner, Premium-Qualität.",
      keywords: "Service, Heizöl, Express-Lieferung, TÜV, Premium"
    },
    liefergebiet: {
      title: "Liefergebiete - HeizölNetz Deutschland | Bundesweite Abdeckung",
      description: "HeizölNetz Deutschland liefert bundesweit Heizöl. Entdecken Sie unsere 500+ Partner-Standorte und Liefergebiete in ganz Deutschland.",
      keywords: "Liefergebiet, Deutschland, bundesweit, Partner, Standorte"
    },
    produkte: {
      title: "Heizöl-Produkte - HeizölNetz Deutschland | Premium EL & Additive",
      description: "Hochwertige Heizöl-Produkte von HeizölNetz Deutschland: Premium EL, schwefelarme Brennstoffe, additivierte Heizöle für optimale Leistung.",
      keywords: "Heizöl, Premium EL, schwefelarm, Additive, Qualität"
    }
  }
};

// STANTON shop configuration
const stantonShopConfig: ShopMetaConfig = {
  name: "STANTON Heizöl",
  brand: "STANTON",
  phone: "",
  email: "",
  baseUrl: "https://stanton-heizoel.de",
  pages: {
    home: {
      title: "STANTON Heizöl - Premium Heizöl-Lieferung | Qualität seit 1985",
      description: "STANTON Heizöl - Ihr vertrauensvoller Partner für Premium Heizöl-Lieferung seit 1985. Höchste Qualität, zuverlässiger Service, faire Preise.",
      keywords: "STANTON, Heizöl, Premium, Qualität, seit 1985",
      ogTitle: "STANTON Heizöl - Premium Heizöl-Lieferung",
      ogDescription: "Vertrauensvoller Partner für Premium Heizöl seit 1985",
      twitterTitle: "STANTON Heizöl - Premium Heizöl-Lieferung",
      twitterDescription: "Premium Heizöl-Lieferung seit 1985"
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
    },
    kontakt: {
      title: "Kontakt - STANTON Heizöl | Persönliche Fachberatung",
      description: "Kontaktieren Sie STANTON Heizöl für persönliche Fachberatung. Erfahrene Experten beraten Sie gerne zu unseren Premium-Produkten.",
      keywords: "Kontakt, STANTON, Fachberatung, Experten, Premium"
    },
    service: {
      title: "Service - STANTON Heizöl | Exzellenter Kundenservice",
      description: "Exzellenter Service von STANTON Heizöl: Pünktliche Lieferung, Qualitätskontrolle, persönliche Betreuung und 30 Jahre Erfahrung.",
      keywords: "Service, STANTON, Kundenservice, Qualität, Erfahrung"
    },
    liefergebiet: {
      title: "Liefergebiete - STANTON Heizöl | Regionale Kompetenz",
      description: "STANTON Heizöl beliefert zuverlässig Ihre Region. Entdecken Sie unsere Liefergebiete und regionale Kompetenz für optimalen Service.",
      keywords: "Liefergebiet, STANTON, regional, Kompetenz, Service"
    },
    produkte: {
      title: "Heizöl-Produkte - STANTON | Premium EL & Spezialprodukte",
      description: "Premium Heizöl-Produkte von STANTON: Hochwertiges EL, Bio-Heizöl, additivierte Brennstoffe und Spezialprodukte für jeden Bedarf.",
      keywords: "STANTON, Heizöl, Premium EL, Bio-Heizöl, Additive"
    }
  }
};

// GreenOil shop configuration
const greenOilShopConfig: ShopMetaConfig = {
  name: "GreenOil Eco-Heizöl",
  brand: "GreenOil",
  phone: "",
  email: "",
  baseUrl: "https://greenoil-eco.de",
  pages: {
    home: {
      title: "GreenOil Eco-Heizöl - Nachhaltige Heizlösungen | CO2-reduziert",
      description: "GreenOil Eco-Heizöl - Nachhaltige und umweltfreundliche Heizlösungen. CO2-reduziert, bio-additiviert, für eine grünere Zukunft.",
      keywords: "GreenOil, Eco-Heizöl, nachhaltig, CO2-reduziert, Bio",
      ogTitle: "GreenOil Eco-Heizöl - Nachhaltige Heizlösungen",
      ogDescription: "Umweltfreundliche und CO2-reduzierte Heizlösungen",
      twitterTitle: "GreenOil Eco-Heizöl - Nachhaltige Heizlösungen",
      twitterDescription: "Nachhaltige und umweltfreundliche Heizlösungen"
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
    },
    kontakt: {
      title: "Kontakt - GreenOil Eco-Heizöl | Umweltberatung",
      description: "Kontaktieren Sie GreenOil für umweltbewusste Heizlösungen. Unsere Experten beraten Sie zu nachhaltigen und CO2-reduzierten Produkten.",
      keywords: "Kontakt, GreenOil, Umweltberatung, nachhaltig, CO2"
    },
    service: {
      title: "Service - GreenOil Eco-Heizöl | Nachhaltiger Service",
      description: "Nachhaltiger Service von GreenOil: Umweltschonende Lieferung, CO2-Kompensation, Beratung zu grünen Heizlösungen.",
      keywords: "Service, GreenOil, nachhaltig, CO2-Kompensation, grün"
    },
    liefergebiet: {
      title: "Liefergebiete - GreenOil Eco-Heizöl | Grüne Logistik",
      description: "GreenOil liefert mit grüner Logistik und CO2-optimierten Routen. Entdecken Sie unsere umweltschonenden Liefergebiete.",
      keywords: "Liefergebiet, GreenOil, grüne Logistik, CO2-optimiert"
    },
    produkte: {
      title: "Eco-Heizöl Produkte - GreenOil | Bio & CO2-reduziert",
      description: "Umweltfreundliche Heizöl-Produkte von GreenOil: Bio-Heizöl, CO2-reduzierte Brennstoffe, nachhaltige Additive für grünes Heizen.",
      keywords: "GreenOil, Bio-Heizöl, CO2-reduziert, nachhaltig, grün"
    }
  }
};

export const shopConfigs = {
  root: rootShopConfig,
  stanton: stantonShopConfig,
  greenoil: greenOilShopConfig
};

export function getShopConfig(pathname: string): ShopMetaConfig {
  if (pathname.startsWith('/1/')) {
    return shopConfigs.stanton;
  } else if (pathname.startsWith('/2/')) {
    return shopConfigs.greenoil;
  } else {
    return shopConfigs.root;
  }
}

export function getPageMeta(pathname: string, pageName: string): MetaData {
  const shopConfig = getShopConfig(pathname);
  return shopConfig.pages[pageName] || shopConfig.pages.home;
}
