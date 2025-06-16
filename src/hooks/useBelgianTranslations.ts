
import { useMemo } from 'react';
import { useDomainShop } from '@/hooks/useDomainShop';

export interface BelgianTranslations {
  // Common navigation
  nav: {
    home: string;
    products: string;
    delivery: string;
    about: string;
    contact: string;
    orderNow: string;
    calculate: string;
  };
  
  // Hero section
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaButton: string;
    badge: string;
    guarantees: {
      delivery: string;
      deliveryDesc: string;
      freeShipping: string;
      freeShippingDesc: string;
      customers: string;
      customersDesc: string;
    };
  };
  
  // Price calculator
  calculator: {
    title: string;
    subtitle: string;
    postcode: string;
    postcodeplaceholder: string;
    amount: string;
    amountPlaceholder: string;
    product: string;
    standard: string;
    premium: string;
    calculate: string;
    calculating: string;
    orderNow: string;
    pricePerLiter: string;
    basePrice: string;
    delivery: string;
    total: string;
    free: string;
    deliveryTime: string;
    workingDays: string;
    afterPayment: string;
    minOrder: string;
    maxOrder: string;
  };
  
  // Trust elements
  trust: {
    sslEncrypted: string;
    securePayment: string;
    fastDelivery: string;
    fairPrices: string;
    qualityGuarantee: string;
    customerService: string;
  };
  
  // Why choose us
  whyChooseUs: {
    title: string;
    subtitle: string;
    features: {
      directSourcing: {
        title: string;
        description: string;
      };
      fastDelivery: {
        title: string;
        description: string;
      };
      qualityGuarantee: {
        title: string;
        description: string;
      };
      customerService: {
        title: string;
        description: string;
      };
      transparentPricing: {
        title: string;
        description: string;
      };
      ecoFriendly: {
        title: string;
        description: string;
      };
    };
  };
  
  // Footer
  footer: {
    description: string;
    quickLinks: string;
    legal: string;
    contact: string;
    contactInfo: {
      email: string;
      emailDesc: string;
      coverage: string;
      coverageDesc: string;
      delivery: string;
      deliveryDesc: string;
    };
    copyright: string;
    badges: {
      sslSecured: string;
      belgianQuality: string;
      certified: string;
    };
  };
  
  // Order form
  order: {
    title: string;
    personalInfo: string;
    deliveryAddress: string;
    billingAddress: string;
    sameAddress: string;
    paymentMethod: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    
    fields: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      company: string;
      street: string;
      postcode: string;
      city: string;
      firstNamePlaceholder: string;
      lastNamePlaceholder: string;
      emailPlaceholder: string;
      phonePlaceholder: string;
      companyPlaceholder: string;
      streetPlaceholder: string;
      postcodePlaceholder: string;
      cityPlaceholder: string;
    };
    
    payment: {
      bankTransfer: string;
      bankTransferDesc: string;
      invoice: string;
      invoiceDesc: string;
      existingCustomers: string;
    };
    
    validation: {
      required: string;
      invalidEmail: string;
      invalidPostcode: string;
    };
  };
  
  // Confirmation
  confirmation: {
    title: string;
    subtitle: string;
    orderNumber: string;
    thankYou: string;
    nextSteps: string;
    
    steps: {
      verification: {
        title: string;
        description: string;
      };
      payment: {
        title: string;
        description: string;
      };
      delivery: {
        title: string;
        description: string;
      };
    };
    
    deliveryInfo: string;
    importantNote: string;
    importantNoteDesc: string;
    newOrder: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    retry: string;
    close: string;
    back: string;
    next: string;
    save: string;
    cancel: string;
  };
}

const belgianTranslations: BelgianTranslations = {
  nav: {
    home: 'Home',
    products: 'Mazout',
    delivery: 'Levering',
    about: 'Over Ons',
    contact: 'Contact',
    orderNow: 'Nu Bestellen',
    calculate: 'Prijs Berekenen'
  },
  
  hero: {
    title: 'Mazout aan de Beste Prijzen',
    subtitle: 'Bespaar tot',
    description: 'Bespaar tot 15% op mazoutaankopen door onze directe sourcing. Snelle levering in 2-4 werkdagen, beste kwaliteit, eerlijke prijzen in heel België.',
    ctaButton: 'Bereken Uw Prijs',
    badge: 'Belgiums Premium Mazoutservice',
    guarantees: {
      delivery: '2-4',
      deliveryDesc: 'Werkdagen Levering',
      freeShipping: '€0',
      freeShippingDesc: 'Leveringskosten',
      customers: '10.000+',
      customersDesc: 'Tevreden Klanten'
    }
  },
  
  calculator: {
    title: 'Bereken Uw Mazoutprijs',
    subtitle: 'Krijg direct een offerte op maat',
    postcode: 'Postcode',
    postcodeplaceholder: 'Bijv. 1000',
    amount: 'Hoeveelheid (liter)',
    amountPlaceholder: 'Bijv. 2000',
    product: 'Mazouttype',
    standard: 'Standaard Mazout',
    premium: 'Premium Mazout',
    calculate: 'Prijs Berekenen',
    calculating: 'Berekenen...',
    orderNow: 'Nu Bestellen',
    pricePerLiter: 'Prijs per liter',
    basePrice: 'Basisprijs',
    delivery: 'Levering',
    total: 'Totaal',
    free: 'Gratis',
    deliveryTime: 'Levertijd',
    workingDays: 'werkdagen',
    afterPayment: 'na betaling',
    minOrder: 'Minimale bestelling: 500 liter',
    maxOrder: 'Maximale bestelling: 5000 liter'
  },
  
  trust: {
    sslEncrypted: 'SSL Versleuteld',
    securePayment: 'Veilige Betaling',
    fastDelivery: 'Snelle Levering',
    fairPrices: 'Eerlijke Prijzen',
    qualityGuarantee: 'Kwaliteitsgarantie',
    customerService: 'Klantenservice'
  },
  
  whyChooseUs: {
    title: 'Waarom Mazout Vandaag?',
    subtitle: 'Uw betrouwbare partner voor mazoutlevering in België',
    features: {
      directSourcing: {
        title: 'Directe Inkoop',
        description: 'Door directe inkoop bij raffinaderijen bieden wij de beste prijzen zonder tussenpersonen.'
      },
      fastDelivery: {
        title: 'Snelle Levering',
        description: 'Levering binnen 2-4 werkdagen na betalingsbevestiging in heel België.'
      },
      qualityGuarantee: {
        title: 'Kwaliteitsgarantie',
        description: 'Hoogwaardige mazout volgens Belgische normen met volledige kwaliteitsgarantie.'
      },
      customerService: {
        title: 'Persoonlijke Service',
        description: '24/7 klantenservice in het Nederlands voor al uw vragen en ondersteuning.'
      },
      transparentPricing: {
        title: 'Transparante Prijzen',
        description: 'Geen verborgen kosten. Wat u ziet is wat u betaalt, inclusief alle leveringskosten.'
      },
      ecoFriendly: {
        title: 'Milieuvriendelijk',
        description: 'Duurzame mazout met lage emissies voor een schonere toekomst.'
      }
    }
  },
  
  footer: {
    description: 'Uw vertrouwensvolle partner voor premium mazout in heel België. Van Vlaanderen tot Wallonië - sinds meer dan 15 jaar.',
    quickLinks: 'Snelkoppelingen',
    legal: 'Juridisch',
    contact: 'Contact België',
    contactInfo: {
      email: 'info@mazoutvandaag.com',
      emailDesc: 'Snelle reactie gegarandeerd',
      coverage: 'Heel België',
      coverageDesc: 'Alle provincies',
      delivery: 'Express Levering',
      deliveryDesc: '2-4 werkdagen België-breed'
    },
    copyright: '© 2024 Mazout Vandaag BVBA. Alle rechten voorbehouden.',
    badges: {
      sslSecured: 'SSL-beveiligd',
      belgianQuality: 'Belgische Kwaliteit',
      certified: 'Gecertificeerd'
    }
  },
  
  order: {
    title: 'Bestelling Plaatsen',
    personalInfo: 'Persoonlijke Gegevens',
    deliveryAddress: 'Leveringsadres',
    billingAddress: 'Factuuradres',
    sameAddress: 'Factuuradres is hetzelfde als leveringsadres',
    paymentMethod: 'Betaalmethode',
    notes: 'Opmerkingen',
    notesPlaceholder: 'Eventuele bijzondere wensen...',
    submit: 'Bestelling Plaatsen',
    submitting: 'Bestelling wordt verwerkt...',
    
    fields: {
      firstName: 'Voornaam',
      lastName: 'Achternaam',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      company: 'Bedrijf (optioneel)',
      street: 'Straat en huisnummer',
      postcode: 'Postcode',
      city: 'Stad',
      firstNamePlaceholder: 'Voornaam',
      lastNamePlaceholder: 'Achternaam',
      emailPlaceholder: 'uw.email@voorbeeld.be',
      phonePlaceholder: '+32 2 123 45 67',
      companyPlaceholder: 'Bedrijfsnaam',
      streetPlaceholder: 'Straatnaam 123',
      postcodePlaceholder: '1000',
      cityPlaceholder: 'Brussel'
    },
    
    payment: {
      bankTransfer: 'Overschrijving',
      bankTransferDesc: 'Betaling voor levering',
      invoice: 'Op Factuur',
      invoiceDesc: 'Betaling na levering',
      existingCustomers: 'Alleen voor bestaande klanten'
    },
    
    validation: {
      required: 'Dit veld is verplicht',
      invalidEmail: 'Ongeldig e-mailadres',
      invalidPostcode: 'Ongeldige postcode'
    }
  },
  
  confirmation: {
    title: 'Bestelling Bevestigd!',
    subtitle: 'Bedankt voor uw mazoutbestelling',
    orderNumber: 'Uw bestelnummer',
    thankYou: 'Uw bestelling is succesvol geplaatst!',
    nextSteps: 'Volgende stappen',
    
    steps: {
      verification: {
        title: '1. Bestellingcontrole',
        description: 'Wij controleren uw bestelling en sturen u de betalingsgegevens.'
      },
      payment: {
        title: '2. Overschrijving',
        description: 'Na ontvangst van de betalingsgegevens maakt u het bedrag over.'
      },
      delivery: {
        title: '3. Levering',
        description: 'Na betalingsbevestiging volgt levering binnen 2-4 werkdagen.'
      }
    },
    
    deliveryInfo: 'Leveringsinformatie',
    importantNote: '📞 Belangrijke opmerking voor levering',
    importantNoteDesc: 'Onze chauffeur zal u op de leveringsdag telefonisch contacteren. Zorg ervoor dat u bereikbaar bent op {phone}.',
    newOrder: 'Nieuwe Bestelling'
  },
  
  common: {
    loading: 'Laden...',
    error: 'Fout',
    success: 'Gelukt',
    retry: 'Opnieuw proberen',
    close: 'Sluiten',
    back: 'Terug',
    next: 'Volgende',
    save: 'Opslaan',
    cancel: 'Annuleren'
  }
};

export const useBelgianTranslations = (): BelgianTranslations => {
  const shopConfig = useDomainShop();
  
  return useMemo(() => {
    // Return Belgian translations when shop type is Belgium
    if (shopConfig.shopType === 'belgium') {
      return belgianTranslations;
    }
    
    // Return default (could be extended for other languages)
    return belgianTranslations;
  }, [shopConfig.shopType]);
};
