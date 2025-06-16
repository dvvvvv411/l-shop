
export interface MetaData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export interface DomainShopMetaConfig {
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
const germanShopMetaConfig: DomainShopMetaConfig = {
  name: "Heizöl-Service",
  brand: "Heizöl",
  phone: "",
  email: "",
  baseUrl: "https://heizoel-netz.de",
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
const frenchShopMetaConfig: DomainShopMetaConfig = {
  name: "Fioul Rapide",
  brand: "Fioul FR",
  phone: "",
  email: "info@fioul-rapide.fr",
  baseUrl: "https://fioul-rapide.fr",
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

// Italian configuration for the Italian shop
const italianShopMetaConfig: DomainShopMetaConfig = {
  name: "Gasolio Veloce",
  brand: "Gasolio IT",
  phone: "+39 02 1234 5678",
  email: "info@gasoliocasa.com",
  baseUrl: "https://gasoliocasa.com",
  pages: {
    home: {
      title: "Gasolio al miglior prezzo - Consegna rapida gasolio da riscaldamento in Italia",
      description: "Ordinate il vostro gasolio da riscaldamento online al miglior prezzo. Consegna rapida, qualità premium, prezzi equi. Confrontate i prezzi del gasolio e risparmiate.",
      keywords: "gasolio, riscaldamento, economico, consegna, prezzi, online",
      ogTitle: "Gasolio al miglior prezzo - Consegna rapida gasolio",
      ogDescription: "Ordinate il vostro gasolio da riscaldamento online con consegna rapida",
      twitterTitle: "Gasolio al miglior prezzo - Consegna rapida gasolio",
      twitterDescription: "Ordinate il vostro gasolio da riscaldamento online con consegna rapida"
    },
    impressum: {
      title: "Note legali - Gasolio Veloce",
      description: "Note legali e informazioni legali."
    },
    agb: {
      title: "Termini e condizioni - Gasolio Veloce",
      description: "Termini e condizioni generali."
    },
    widerrufsrecht: {
      title: "Diritto di recesso - Gasolio Veloce",
      description: "Diritto di recesso e informazioni sul recesso."
    },
    datenschutz: {
      title: "Privacy - Gasolio Veloce",
      description: "Informativa sulla privacy e protezione dei dati."
    },
    kontakt: {
      title: "Contatto - Gasolio Veloce | Consulenza personalizzata",
      description: "Contattateci per una consulenza personalizzata. Competenza professionale per gasolio e consegna.",
      keywords: "contatto, consulenza, gasolio, supporto"
    },
    service: {
      title: "Servizio - Gasolio Veloce | Servizio gasolio premium",
      description: "Servizio gasolio di prima classe: consegna rapida, partner certificati, qualità premium per le vostre esigenze di riscaldamento.",
      keywords: "servizio, gasolio, consegna, premium, qualità"
    },
    liefergebiet: {
      title: "Zone di consegna - Gasolio Veloce | Copertura Italia",
      description: "Consegna gasolio in tutta Italia. Scoprite le nostre zone di consegna e punti partner in tutta Italia.",
      keywords: "zona consegna, Italia, nazionale, partner, punti"
    },
    produkte: {
      title: "Prodotti gasolio - Gasolio Premium & Additivi",
      description: "Prodotti gasolio di alta qualità: gasolio premium, combustibili a basso contenuto di zolfo, gasolio additivato per riscaldamento ottimale.",
      keywords: "gasolio, premium, basso zolfo, additivi, qualità"
    },
    checkout: {
      title: "Finalizza il tuo ordine - Gasolio Veloce",
      description: "Finalizzate il vostro ordine di gasolio. Pagamento sicuro e consegna rapida garantita."
    }
  }
};

// Malta configuration for the Malta shop (English)
const maltaShopMetaConfig: DomainShopMetaConfig = {
  name: "Malta Heating Oil",
  brand: "Malta Energy",
  phone: "+356 2123 4567",
  email: "info@malta-heating-oil.com",
  baseUrl: "https://malta-heating-oil.com",
  pages: {
    home: {
      title: "Heating Oil at Best Prices - Fast Delivery Across Malta",
      description: "Order premium heating oil online at the best prices in Malta. Fast delivery, top quality, fair prices. Compare heating oil prices and save on your purchase.",
      keywords: "heating oil, Malta, delivery, prices, online, best price",
      ogTitle: "Heating Oil at Best Prices - Fast Delivery Malta",
      ogDescription: "Order premium heating oil online with fast delivery across Malta",
      twitterTitle: "Heating Oil at Best Prices - Fast Delivery Malta",
      twitterDescription: "Order premium heating oil online with fast delivery across Malta"
    },
    impressum: {
      title: "Legal Information - Malta Heating Oil",
      description: "Legal information and company details."
    },
    agb: {
      title: "Terms & Conditions - Malta Heating Oil",
      description: "Terms and conditions of service."
    },
    widerrufsrecht: {
      title: "Right of Withdrawal - Malta Heating Oil",
      description: "Right of withdrawal and cancellation policy."
    },
    datenschutz: {
      title: "Privacy Policy - Malta Heating Oil",
      description: "Privacy policy and data protection information."
    },
    kontakt: {
      title: "Contact - Malta Heating Oil | Personal Consultation",
      description: "Contact us for personal consultation. Expert advice on heating oil and delivery services.",
      keywords: "contact, consultation, heating oil, support, Malta"
    },
    service: {
      title: "Service - Malta Heating Oil | Premium Heating Oil Service",
      description: "First-class heating oil service: Fast delivery, certified partners, premium quality for your heating needs.",
      keywords: "service, heating oil, delivery, premium, quality, Malta"
    },
    liefergebiet: {
      title: "Delivery Areas - Malta Heating Oil | Malta-wide Coverage",
      description: "Heating oil delivery across Malta. Discover our delivery areas and partner locations throughout Malta.",
      keywords: "delivery areas, Malta, nationwide, partners, locations"
    },
    produkte: {
      title: "Heating Oil Products - Premium Grade & Additives",
      description: "High-quality heating oil products: Premium grade, low-sulfur fuels, additive heating oils for optimal heating performance.",
      keywords: "heating oil, premium grade, low sulfur, additives, quality"
    },
    checkout: {
      title: "Complete Your Order - Malta Heating Oil",
      description: "Complete your heating oil order. Secure payment and fast delivery guaranteed."
    }
  }
};

// Belgian configuration for the Belgian shop (Dutch)
const belgianShopMetaConfig: DomainShopMetaConfig = {
  name: "MazoutVandaag",
  brand: "MazoutVandaag",
  phone: "+32 2 123 4567",
  email: "info@mazoutvandaag.be",
  baseUrl: "https://mazoutvandaag.be",
  pages: {
    home: {
      title: "Mazout aan de beste prijs - Snelle mazoutlevering in België",
      description: "Bestel uw mazout online aan de beste prijs. Snelle levering, topkwaliteit, eerlijke prijzen. Vergelijk mazoutprijzen en bespaar op uw aankoop.",
      keywords: "mazout, België, levering, prijzen, online, beste prijs",
      ogTitle: "Mazout aan de beste prijs - Snelle mazoutlevering België",
      ogDescription: "Bestel premium mazout online met snelle levering door heel België",
      twitterTitle: "Mazout aan de beste prijs - Snelle mazoutlevering België",
      twitterDescription: "Bestel premium mazout online met snelle levering door heel België"
    },
    impressum: {
      title: "Juridische informatie - MazoutVandaag",
      description: "Juridische informatie en bedrijfsgegevens."
    },
    agb: {
      title: "Algemene voorwaarden - MazoutVandaag",
      description: "Algemene voorwaarden van de service."
    },
    widerrufsrecht: {
      title: "Herroepingsrecht - MazoutVandaag",
      description: "Herroepingsrecht en annuleringsbeleid."
    },
    datenschutz: {
      title: "Privacybeleid - MazoutVandaag",
      description: "Privacybeleid en informatie over gegevensbescherming."
    },
    kontakt: {
      title: "Contact - MazoutVandaag | Persoonlijk advies",
      description: "Neem contact met ons op voor persoonlijk advies. Deskundig advies over mazout en leveringsdiensten.",
      keywords: "contact, advies, mazout, ondersteuning, België"
    },
    service: {
      title: "Service - MazoutVandaag | Premium mazoutservice",
      description: "Eersteklas mazoutservice: Snelle levering, gecertificeerde partners, topkwaliteit voor uw verwarmingsbehoeften.",
      keywords: "service, mazout, levering, premium, kwaliteit, België"
    },
    liefergebiet: {
      title: "Leveringsgebieden - MazoutVandaag | België-brede dekking",
      description: "Mazoutlevering door heel België. Ontdek onze leveringsgebieden en partnerlocaties in België.",
      keywords: "leveringsgebieden, België, landelijk, partners, locaties"
    },
    produkte: {
      title: "Mazoutproducten - Premium kwaliteit & additieven",
      description: "Hoogwaardige mazoutproducten: Premium kwaliteit, lage-zwavel brandstoffen, additief mazout voor optimale verwarmingsprestaties.",
      keywords: "mazout, premium kwaliteit, lage zwavel, additieven, kwaliteit"
    },
    checkout: {
      title: "Voltooi uw bestelling - MazoutVandaag",
      description: "Voltooi uw mazoutbestelling. Veilige betaling en snelle levering gegarandeerd."
    }
  }
};

type ShopType = 'root' | 'stanton' | 'greenoil' | 'austria' | 'france' | 'italy' | 'malta' | 'belgium';

const domainShopConfigs: Record<ShopType, DomainShopMetaConfig> = {
  root: germanShopMetaConfig,
  stanton: germanShopMetaConfig,
  greenoil: germanShopMetaConfig,
  austria: germanShopMetaConfig, // Austrian shop uses German for now
  france: frenchShopMetaConfig,
  italy: italianShopMetaConfig,
  malta: maltaShopMetaConfig,
  belgium: belgianShopMetaConfig
};

export function getDomainShopConfig(shopType: ShopType): DomainShopMetaConfig {
  return domainShopConfigs[shopType] || germanShopMetaConfig;
}

export function getDomainPageMeta(shopType: ShopType, pageName: string): MetaData {
  const shopConfig = getDomainShopConfig(shopType);
  return shopConfig.pages[pageName] || shopConfig.pages.home;
}
