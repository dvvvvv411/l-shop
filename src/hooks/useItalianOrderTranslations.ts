
import { useMemo } from 'react';
import { useDomainShop } from './useDomainShop';

export interface ItalianOrderTranslations {
  // Order form translations
  orderForm: {
    title: string;
    subtitle: string;
    productLabel: string;
    quantityLabel: string;
    postcodeLabel: string;
    calculateButton: string;
    calculatingButton: string;
    orderButton: string;
    priceLabel: string;
    deliveryLabel: string;
    totalLabel: string;
    productHeizoel: string;
    productPremium: string;
    unitLiters: string;
    freeDelivery: string;
    postccodePlaceholder: string;
  };
  
  // Summary page translations
  summary: {
    title: string;
    subtitle: string;
    orderDetails: string;
    product: string;
    quantity: string;
    pricePerLiter: string;
    subtotal: string;
    delivery: string;
    total: string;
    deliveryAddress: string;
    proceedToCheckout: string;
    backToOrder: string;
    free: string;
    editOrder: string;
  };
  
  // Confirmation page translations
  confirmation: {
    title: string;
    subtitle: string;
    orderNumber: string;
    thankYou: string;
    nextSteps: string;
    paymentInfo: string;
    deliveryInfo: string;
    contactInfo: string;
    backToHome: string;
    downloadInvoice: string;
  };
  
  // Common translations
  common: {
    loading: string;
    error: string;
    success: string;
    retry: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    confirm: string;
    close: string;
  };
}

const italianOrderTranslations: ItalianOrderTranslations = {
  orderForm: {
    title: 'Ordina Gasolio da Riscaldamento',
    subtitle: 'Consegna rapida e sicura in tutta Italia',
    productLabel: 'Prodotto',
    quantityLabel: 'Quantità (litri)',
    postcodeLabel: 'CAP per la consegna',
    calculateButton: 'Calcola prezzo',
    calculatingButton: 'Calcolo in corso...',
    orderButton: 'Ordina ora',
    priceLabel: 'Prezzo',
    deliveryLabel: 'Consegna',
    totalLabel: 'Totale',
    productHeizoel: 'Gasolio da Riscaldamento Standard',
    productPremium: 'Gasolio da Riscaldamento Premium',
    unitLiters: 'litri',
    freeDelivery: 'Consegna gratuita',
    postccodePlaceholder: 'Inserisci il tuo CAP'
  },
  
  summary: {
    title: 'Riepilogo Ordine',
    subtitle: 'Controlla i dettagli del tuo ordine',
    orderDetails: 'Dettagli Ordine',
    product: 'Prodotto',
    quantity: 'Quantità',
    pricePerLiter: 'Prezzo per litro',
    subtotal: 'Subtotale',
    delivery: 'Consegna',
    total: 'Totale',
    deliveryAddress: 'Indirizzo di consegna',
    proceedToCheckout: 'Procedi al pagamento',
    backToOrder: 'Torna all\'ordine',
    free: 'Gratuita',
    editOrder: 'Modifica ordine'
  },
  
  confirmation: {
    title: 'Ordine Confermato!',
    subtitle: 'Il tuo ordine è stato ricevuto con successo',
    orderNumber: 'Numero ordine',
    thankYou: 'Grazie per il tuo ordine!',
    nextSteps: 'Prossimi passi',
    paymentInfo: 'Informazioni di pagamento',
    deliveryInfo: 'Informazioni di consegna',
    contactInfo: 'Ti contatteremo presto',
    backToHome: 'Torna alla home',
    downloadInvoice: 'Scarica fattura'
  },
  
  common: {
    loading: 'Caricamento...',
    error: 'Errore',
    success: 'Successo',
    retry: 'Riprova',
    cancel: 'Annulla',
    save: 'Salva',
    edit: 'Modifica',
    delete: 'Elimina',
    confirm: 'Conferma',
    close: 'Chiudi'
  }
};

export const useItalianOrderTranslations = (): ItalianOrderTranslations => {
  const shopConfig = useDomainShop();
  
  return useMemo(() => {
    // Return Italian translations for Italian shop
    if (shopConfig.shopType === 'italy') {
      return italianOrderTranslations;
    }
    
    // Fallback (should not be used for non-Italian shops)
    return italianOrderTranslations;
  }, [shopConfig.shopType]);
};
