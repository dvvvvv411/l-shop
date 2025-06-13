
import { useMemo } from 'react';
import { useDomainShop } from './useDomainShop';

export interface ItalianCheckoutTranslations {
  navigation: {
    back: string;
    cart: string;
    information: string;
    shipping: string;
    payment: string;
    secureEncryption: string;
  };
  summary: {
    showOrder: string;
    inclVat: string;
    pricePerLiter: string;
    quantity: string;
    discountPlaceholder: string;
    checkingButton: string;
    applyButton: string;
    subtotal: string;
    shipping: string;
    free: string;
    net: string;
    vat: string;
    total: string;
    ofWhichVat: string;
    deliveryInfo: string;
    workdays: string;
    afterPayment: string;
    freeShippingNote: string;
    sslEncrypted: string;
    securePayment: string;
    timelyDelivery: string;
    fairPrices: string;
  };
  form: {
    contactInformation: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    shippingAddress: string;
    street: string;
    postcode: string;
    city: string;
    billingAddress: string;
    useSameAddress: string;
    paymentMethod: string;
    bankTransfer: string;
    submitOrder: string;
  };
  confirmation: {
    title: string;
    subtitle: string;
    orderNumber: string;
    thankYou: string;
    nextSteps: string;
    transferInfo: string;
    bankDetails: string;
    invoiceGenerated: string;
    newOrder: string;
  };
  validation: {
    emailRequired: string;
    emailInvalid: string;
    firstNameRequired: string;
    lastNameRequired: string;
    phoneRequired: string;
    phoneInvalid: string;
    streetRequired: string;
    postcodeRequired: string;
    postcodeInvalid: string;
    cityRequired: string;
    termsRequired: string;
  };
  toasts: {
    noOrderDataTitle: string;
    noOrderDataDescription: string;
    invalidOrderDataTitle: string;
    invalidOrderDataDescription: string;
    loadOrderDataErrorTitle: string;
    loadOrderDataErrorDescription: string;
    orderSuccessTitle: string;
    orderSuccessDescription: string;
    orderErrorTitle: string;
    orderErrorDescription: string;
  };
  system: {
    loadingOrderData: string;
    processing: string;
  };
}

const italianTranslations: ItalianCheckoutTranslations = {
  navigation: {
    back: 'Indietro',
    cart: 'Carrello',
    information: 'Informazioni',
    shipping: 'Spedizione',
    payment: 'Pagamento',
    secureEncryption: 'Pagamento sicuro con crittografia SSL'
  },
  summary: {
    showOrder: 'Mostra ordine',
    inclVat: 'incl. IVA {amount}€',
    pricePerLiter: 'al litro',
    quantity: 'Quantità',
    discountPlaceholder: 'Codice sconto',
    checkingButton: 'Verifica...',
    applyButton: 'Applica',
    subtotal: 'Subtotale',
    shipping: 'Spedizione',
    free: 'Gratuita',
    net: 'Netto',
    vat: 'IVA (22%)',
    total: 'Totale',
    ofWhichVat: 'di cui IVA {amount}€',
    deliveryInfo: 'Informazioni sulla consegna',
    workdays: '3-5 giorni lavorativi',
    afterPayment: 'dopo il ricevimento del pagamento',
    freeShippingNote: 'Spedizione gratuita per ordini superiori a 3.000 litri',
    sslEncrypted: 'Crittografato SSL',
    securePayment: 'Pagamento sicuro',
    timelyDelivery: 'Consegna puntuale',
    fairPrices: 'Prezzi equi'
  },
  form: {
    contactInformation: 'Informazioni di contatto',
    email: 'Email',
    firstName: 'Nome',
    lastName: 'Cognome',
    phone: 'Telefono',
    shippingAddress: 'Indirizzo di consegna',
    street: 'Via e numero civico',
    postcode: 'CAP',
    city: 'Città',
    billingAddress: 'Indirizzo di fatturazione',
    useSameAddress: 'Usa lo stesso indirizzo per la fatturazione',
    paymentMethod: 'Metodo di pagamento',
    bankTransfer: 'Bonifico bancario',
    submitOrder: 'Conferma ordine'
  },
  confirmation: {
    title: 'Ordine confermato!',
    subtitle: 'Il tuo ordine è stato ricevuto con successo',
    orderNumber: 'Numero ordine',
    thankYou: 'Grazie per il tuo ordine!',
    nextSteps: 'Prossimi passi',
    transferInfo: 'Si prega di effettuare il bonifico bancario utilizzando i dati sottostanti',
    bankDetails: 'Dati bancari',
    invoiceGenerated: 'La fattura è stata generata automaticamente',
    newOrder: 'Nuovo ordine'
  },
  validation: {
    emailRequired: 'Email è obbligatoria',
    emailInvalid: 'Email non valida',
    firstNameRequired: 'Nome è obbligatorio',
    lastNameRequired: 'Cognome è obbligatorio',
    phoneRequired: 'Telefono è obbligatorio',
    phoneInvalid: 'Numero di telefono non valido',
    streetRequired: 'Via è obbligatoria',
    postcodeRequired: 'CAP è obbligatorio',
    postcodeInvalid: 'CAP non valido',
    cityRequired: 'Città è obbligatoria',
    termsRequired: 'Devi accettare i termini e condizioni'
  },
  toasts: {
    noOrderDataTitle: 'Nessun dato ordine',
    noOrderDataDescription: 'Non sono stati trovati dati dell\'ordine. Verrai reindirizzato al calcolatore prezzi.',
    invalidOrderDataTitle: 'Dati ordine non validi',
    invalidOrderDataDescription: 'I dati dell\'ordine non sono validi. Verrai reindirizzato al calcolatore prezzi.',
    loadOrderDataErrorTitle: 'Errore nel caricamento',
    loadOrderDataErrorDescription: 'Errore nel caricamento dei dati dell\'ordine.',
    orderSuccessTitle: 'Ordine inviato!',
    orderSuccessDescription: 'Il tuo ordine è stato elaborato con successo.',
    orderErrorTitle: 'Errore ordine',
    orderErrorDescription: 'Si è verificato un errore durante l\'elaborazione dell\'ordine.'
  },
  system: {
    loadingOrderData: 'Caricamento dati ordine...',
    processing: 'Elaborazione in corso...'
  }
};

export const useItalianCheckoutTranslations = (): ItalianCheckoutTranslations => {
  const shopConfig = useDomainShop();
  
  return useMemo(() => {
    // Nur für italienische Shops die italienischen Übersetzungen verwenden
    if (shopConfig.shopType === 'italy') {
      return italianTranslations;
    }
    
    // Fallback für andere Shops (sollte nicht verwendet werden)
    return italianTranslations;
  }, [shopConfig.shopType]);
};
