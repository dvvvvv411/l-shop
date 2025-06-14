
import { useMemo } from 'react';
import { useDomainShop } from './useDomainShop';

export interface ItalianCheckoutTranslations {
  // Form sections - matching CheckoutTranslations structure
  emailSection: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
  };
  deliverySection: {
    title: string;
    subtitle: string;
    firstNameLabel: string;
    lastNameLabel: string;
    streetLabel: string;
    postcodeLabel: string;
    cityLabel: string;
    phoneLabel: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    streetPlaceholder: string;
    postcodePlaceholder: string;
    cityPlaceholder: string;
    phonePlaceholder: string;
  };
  billingSection: {
    title: string;
    subtitle: string;
    sameAddressLabel: string;
  };
  paymentSection: {
    title: string;
    subtitle: string;
    vorkasse: {
      title: string;
      description: string;
      recommended: string;
    };
    rechnung: {
      title: string;
      description: string;
      existingCustomers: string;
    };
  };
  termsSection: {
    title: string;
    subtitle: string;
    withdrawalTitle: string;
    withdrawalText: string;
    acceptTermsText: string;
    submitButton: string;
    submittingButton: string;
  };
  // Summary section
  summary: {
    orderSummary: string;
    showOrder: string;
    product: string;
    quantity: string;
    pricePerLiter: string;
    subtotal: string;
    shipping: string;
    free: string;
    net: string;
    vat: string;
    total: string;
    inclVat: string;
    ofWhichVat: string;
    discountPlaceholder: string;
    applyButton: string;
    checkingButton: string;
    deliveryInfo: string;
    workdays: string;
    afterPayment: string;
    freeShippingNote: string;
    sslEncrypted: string;
    securePayment: string;
    timelyDelivery: string;
    fairPrices: string;
    confirmedOrder: string;
  };
  // Confirmation section
  confirmation: {
    title: string;
    subtitle: string;
    orderNumber: string;
    orderSuccess: string;
    paymentInstructions: string;
    howToPay: string;
    nextSteps: string;
    phoneContact: string;
    phoneContactDesc: string;
    bankTransfer: string;
    bankTransferDesc: string;
    delivery: string;
    deliveryDesc: string;
    deliveryInformation: string;
    deliveryDetails: string;
    deliveryTerm: string;
    deliveryAddress: string;
    importantNote: string;
    importantNoteDesc: string;
    basePrice: string;
    deliveryLabel: string;
  };
  // Navigation
  navigation: {
    back: string;
    cart: string;
    information: string;
    shipping: string;
    payment: string;
    secureEncryption: string;
  };
  // Header
  header: {
    securePayment: string;
    sslEncrypted: string;
  };
  // Loading and system messages
  system: {
    loadingOrderData: string;
    testDataGenerated: string;
    testDataDescription: string;
    emailSendTitle: string;
    emailSendDescription: string;
    errorTitle: string;
    errorDescription: string;
    orderProcessedTitle: string;
    orderProcessedDescription: string;
  };
  // Toast notifications
  toasts: {
    noOrderDataTitle: string;
    noOrderDataDescription: string;
    invalidOrderDataTitle: string;
    invalidOrderDataDescription: string;
    loadOrderDataErrorTitle: string;
    loadOrderDataErrorDescription: string;
  };
  // Validation messages
  validation: {
    emailRequired: string;
    firstNameRequired: string;
    lastNameRequired: string;
    streetRequired: string;
    postcodeRequired: string;
    cityRequired: string;
    phoneRequired: string;
    termsRequired: string;
  };
}

const italianTranslations: ItalianCheckoutTranslations = {
  emailSection: {
    title: 'Indirizzo e-mail',
    subtitle: 'Per la conferma dell\'ordine e la comunicazione',
    emailLabel: 'Indirizzo e-mail *',
    emailPlaceholder: 'la.tua.email@esempio.it'
  },
  deliverySection: {
    title: 'Indirizzo di consegna',
    subtitle: 'Dove deve essere consegnato il gasolio?',
    firstNameLabel: 'Nome *',
    lastNameLabel: 'Cognome *',
    streetLabel: 'Via e numero civico *',
    postcodeLabel: 'CAP *',
    cityLabel: 'Città *',
    phoneLabel: 'Numero di telefono *',
    firstNamePlaceholder: 'Nome',
    lastNamePlaceholder: 'Cognome',
    streetPlaceholder: 'Via e numero civico',
    postcodePlaceholder: 'CAP',
    cityPlaceholder: 'Città',
    phonePlaceholder: 'Numero di telefono'
  },
  billingSection: {
    title: 'Indirizzo di fatturazione',
    subtitle: 'Dove deve essere inviata la fattura?',
    sameAddressLabel: 'L\'indirizzo di fatturazione è identico all\'indirizzo di consegna'
  },
  paymentSection: {
    title: 'Metodo di pagamento',
    subtitle: 'Pagamento sicuro e conveniente',
    vorkasse: {
      title: 'Bonifico bancario',
      description: 'Bonifico prima della consegna',
      recommended: 'Consigliato'
    },
    rechnung: {
      title: 'Fattura',
      description: 'Pagamento dopo la consegna',
      existingCustomers: 'Solo per clienti esistenti'
    }
  },
  termsSection: {
    title: 'Termini e condizioni e diritto di recesso',
    subtitle: 'Si prega di confermare i termini e condizioni',
    withdrawalTitle: 'Diritto di recesso',
    withdrawalText: 'Hai il diritto di recedere da questo contratto entro quattordici giorni senza fornire alcuna motivazione. Il periodo di recesso è di quattordici giorni dalla data di conclusione del contratto.',
    acceptTermsText: 'Accetto i termini e condizioni generali e il diritto di recesso. So che perdo il mio diritto di recesso quando ordino gasolio non appena inizia la consegna. *',
    submitButton: 'Ordina con obbligo di pagamento',
    submittingButton: 'Creazione ordine in corso...'
  },
  summary: {
    orderSummary: 'Riepilogo ordine',
    showOrder: 'Mostra ordine',
    product: 'Prodotto',
    quantity: 'Quantità',
    pricePerLiter: 'Prezzo per litro',
    subtotal: 'Subtotale',
    shipping: 'Spedizione',
    free: 'Gratuita',
    net: 'Netto',
    vat: 'IVA (22%)',
    total: 'Totale',
    inclVat: 'IVA inclusa',
    ofWhichVat: 'di cui {amount}€ IVA',
    discountPlaceholder: 'Inserisci codice sconto',
    applyButton: 'Applica',
    checkingButton: 'Verifica...',
    deliveryInfo: 'Informazioni sulla consegna',
    workdays: '3-5 giorni lavorativi',
    afterPayment: 'dopo il ricevimento del pagamento',
    freeShippingNote: 'Spedizione gratuita per ordini superiori a 3.000 litri',
    sslEncrypted: 'Crittografato SSL',
    securePayment: 'Pagamento sicuro',
    timelyDelivery: 'Consegna puntuale',
    fairPrices: 'Prezzi equi',
    confirmedOrder: 'Il tuo ordine confermato'
  },
  confirmation: {
    title: 'Ordine confermato!',
    subtitle: 'Grazie per il tuo ordine di gasolio',
    orderNumber: 'Il tuo numero d\'ordine',
    orderSuccess: 'Il tuo ordine è stato registrato con successo!',
    paymentInstructions: 'Istruzioni di pagamento',
    howToPay: 'Come pagare il tuo ordine',
    nextSteps: 'Prossimi passi',
    phoneContact: '1. Contatto telefonico',
    phoneContactDesc: 'Ti chiameremo nelle prossime 24 ore per confermare il tuo ordine.',
    bankTransfer: '1. Bonifico bancario',
    bankTransferDesc: 'Effettua il bonifico dell\'importo di {amount}€ con il riferimento del tuo ordine.',
    delivery: '2. Consegna',
    deliveryDesc: 'Dopo il ricevimento del pagamento, la consegna avviene in 3-5 giorni lavorativi.',
    deliveryInformation: 'Informazioni sulla consegna',
    deliveryDetails: 'Dettagli importanti sulla tua consegna',
    deliveryTerm: 'Data di consegna',
    deliveryAddress: 'Indirizzo di consegna',
    importantNote: '📞 Nota importante sulla consegna',
    importantNoteDesc: 'Il nostro autista ti contatterà telefonicamente il giorno della consegna. Assicurati di essere raggiungibile al {phone}.',
    basePrice: 'Prezzo base',
    deliveryLabel: 'Consegna'
  },
  navigation: {
    back: 'Indietro',
    cart: 'Carrello',
    information: 'Informazioni',
    shipping: 'Spedizione',
    payment: 'Pagamento',
    secureEncryption: 'Crittografia SSL sicura per i tuoi dati'
  },
  header: {
    securePayment: 'Pagamento sicuro',
    sslEncrypted: 'Crittografato SSL'
  },
  system: {
    loadingOrderData: 'Caricamento dati ordine...',
    testDataGenerated: 'Dati di test generati',
    testDataDescription: 'Il modulo è stato compilato con dati di test casuali.',
    emailSendTitle: 'Invio e-mail',
    emailSendDescription: 'La conferma dell\'ordine non è stata inviata. La riceverai a breve.',
    errorTitle: 'Errore',
    errorDescription: 'Si è verificato un errore. Riprova.',
    orderProcessedTitle: 'Informazione',
    orderProcessedDescription: 'Questo ordine è già stato elaborato.'
  },
  toasts: {
    noOrderDataTitle: 'Nessun dato ordine trovato',
    noOrderDataDescription: 'Esegui prima un calcolo del prezzo.',
    invalidOrderDataTitle: 'Dati ordine non validi',
    invalidOrderDataDescription: 'Esegui un nuovo calcolo del prezzo.',
    loadOrderDataErrorTitle: 'Errore nel caricamento dei dati ordine',
    loadOrderDataErrorDescription: 'Esegui un nuovo calcolo del prezzo.'
  },
  validation: {
    emailRequired: 'Indirizzo e-mail valido richiesto',
    firstNameRequired: 'Nome richiesto',
    lastNameRequired: 'Cognome richiesto',
    streetRequired: 'Via richiesta',
    postcodeRequired: 'CAP richiesto',
    cityRequired: 'Città richiesta',
    phoneRequired: 'Numero di telefono richiesto',
    termsRequired: 'Devi accettare i termini e condizioni'
  }
};

export const useItalianCheckoutTranslations = (): ItalianCheckoutTranslations => {
  const shopConfig = useDomainShop();
  
  return useMemo(() => {
    // Solo per i negozi italiani utilizzare le traduzioni italiane
    if (shopConfig.shopType === 'italy') {
      return italianTranslations;
    }
    
    // Fallback per altri negozi (non dovrebbe essere utilizzato)
    return italianTranslations;
  }, [shopConfig.shopType]);
};
