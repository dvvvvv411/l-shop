
import { useMemo } from 'react';
import { useDomainShop } from '@/hooks/useDomainShop';

export interface BelgianCheckoutTranslations {
  // Form sections
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
    bankAccountTitle: string;
    bankAccountSubtitle: string;
    accountHolder: string;
    bankName: string;
    transferAmount: string;
    reference: string;
    questionsAboutOrder: string;
    phone: string;
    email: string;
    newOrder: string;
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

const belgianTranslations: BelgianCheckoutTranslations = {
  emailSection: {
    title: 'E-mailadres',
    subtitle: 'Voor bestellingsbevestiging en communicatie',
    emailLabel: 'E-mailadres *',
    emailPlaceholder: 'uw.email@voorbeeld.be'
  },
  deliverySection: {
    title: 'Leveringsadres',
    subtitle: 'Waar moet de mazout geleverd worden?',
    firstNameLabel: 'Voornaam *',
    lastNameLabel: 'Achternaam *',
    streetLabel: 'Straat en huisnummer *',
    postcodeLabel: 'Postcode *',
    cityLabel: 'Stad *',
    phoneLabel: 'Telefoonnummer *',
    firstNamePlaceholder: 'Voornaam',
    lastNamePlaceholder: 'Achternaam',
    streetPlaceholder: 'Straat en huisnummer',
    postcodePlaceholder: 'Postcode',
    cityPlaceholder: 'Stad',
    phonePlaceholder: 'Telefoonnummer'
  },
  billingSection: {
    title: 'Factuuradres',
    subtitle: 'Waar moet de factuur naartoe gestuurd worden?',
    sameAddressLabel: 'Factuuradres is identiek aan leveringsadres'
  },
  paymentSection: {
    title: 'Betaalwijze',
    subtitle: 'Veilige en gemakkelijke betaling',
    vorkasse: {
      title: 'Vooruitbetaling',
      description: 'Bankoverschrijving voor levering',
      recommended: 'Aanbevolen'
    }
  },
  termsSection: {
    title: 'Algemene voorwaarden en herroepingsrecht',
    subtitle: 'Bevestig de algemene voorwaarden',
    withdrawalTitle: 'Herroepingsrecht',
    withdrawalText: 'U hebt het recht om binnen veertien dagen zonder opgave van redenen deze overeenkomst te herroepen. De herroepingstermijn bedraagt veertien dagen vanaf de dag van contractsluiting.',
    acceptTermsText: 'Ik accepteer de algemene voorwaarden en het herroepingsrecht. Ik ben ervan bewust dat ik bij een bestelling van mazout mijn herroepingsrecht verlies zodra de levering is begonnen. *',
    submitButton: 'Betalingsplichtig bestellen',
    submittingButton: 'Bestelling wordt aangemaakt...'
  },
  summary: {
    orderSummary: 'Bestellingsoverzicht',
    showOrder: 'Bestelling tonen',
    product: 'Product',
    quantity: 'Hoeveelheid',
    pricePerLiter: 'Prijs per liter',
    subtotal: 'Subtotaal',
    shipping: 'Verzending',
    free: 'Gratis',
    net: 'Netto',
    vat: 'BTW (21%)',
    total: 'Totaal',
    inclVat: 'incl. BTW',
    ofWhichVat: 'waarvan {amount}€ BTW',
    discountPlaceholder: 'Kortingscode invoeren',
    applyButton: 'Toepassen',
    checkingButton: 'Controleren...',
    deliveryInfo: 'Leveringsinformatie',
    workdays: '3-5 werkdagen',
    afterPayment: 'na betalingsbevestiging',
    freeShippingNote: 'Gratis levering vanaf 3.000 liter',
    sslEncrypted: 'SSL versleuteld',
    securePayment: 'Veilige betaling',
    timelyDelivery: 'Tijdige levering',
    fairPrices: 'Eerlijke prijzen',
    confirmedOrder: 'Uw bevestigde bestelling'
  },
  confirmation: {
    title: 'Bestelling bevestigd!',
    subtitle: 'Dank u voor uw mazout bestelling',
    orderNumber: 'Uw bestelnummer',
    orderSuccess: 'Uw bestelling is succesvol geregistreerd!',
    paymentInstructions: 'Betaalinstructies',
    howToPay: 'Zo betaalt u uw bestelling',
    nextSteps: 'Volgende stappen',
    phoneContact: '1. Bestellingsbevestiging',
    phoneContactDesc: 'Uw bestelling wordt bevestigd en u ontvangt binnenkort de bankinformatie.',
    bankTransfer: '2. Bankoverschrijving',
    bankTransferDesc: 'Na ontvangst van de bankinformatie, maakt u het bedrag van {amount}€ over.',
    delivery: '3. Levering',
    deliveryDesc: 'Na ontvangst van de betaling volgt levering binnen 3-5 werkdagen.',
    deliveryInformation: 'Leveringsinformatie',
    deliveryDetails: 'Belangrijke details betreffende uw levering',
    deliveryTerm: 'Leveringsdatum',
    deliveryAddress: 'Leveringsadres',
    importantNote: '📞 Belangrijke opmerking over levering',
    importantNoteDesc: 'Onze chauffeur zal u op de leveringsdag telefonisch contacteren. Zorg ervoor dat u bereikbaar bent op {phone}.',
    basePrice: 'Basisprijs',
    deliveryLabel: 'Levering',
    bankAccountTitle: 'Bankgegevens voor betaling',
    bankAccountSubtitle: 'Maak de overschrijving met deze gegevens',
    accountHolder: 'Rekeninghouder',
    bankName: 'Bank',
    transferAmount: 'Over te maken bedrag',
    reference: 'Mededeling',
    questionsAboutOrder: 'Vragen over uw bestelling?',
    phone: 'Telefoon',
    email: 'E-mail',
    newOrder: 'Nieuwe bestelling'
  },
  navigation: {
    back: 'Terug',
    cart: 'Winkelwagen',
    information: 'Informatie',
    shipping: 'Verzending',
    payment: 'Betaling',
    secureEncryption: 'Veilige SSL-versleuteling voor uw gegevens'
  },
  header: {
    securePayment: 'Veilige betaling',
    sslEncrypted: 'SSL versleuteld'
  },
  system: {
    loadingOrderData: 'Bestellingsgegevens worden geladen...',
    testDataGenerated: 'Testgegevens gegenereerd',
    testDataDescription: 'Het formulier is ingevuld met willekeurige testgegevens.',
    emailSendTitle: 'E-mail verzending',
    emailSendDescription: 'De bestellingsbevestiging kon niet verzonden worden. U ontvangt deze binnenkort.',
    errorTitle: 'Fout',
    errorDescription: 'Er is een fout opgetreden. Probeer opnieuw.',
    orderProcessedTitle: 'Informatie',
    orderProcessedDescription: 'Deze bestelling is al verwerkt.'
  },
  toasts: {
    noOrderDataTitle: 'Geen bestellingsgegevens gevonden',
    noOrderDataDescription: 'Voer eerst een prijsberekening uit.',
    invalidOrderDataTitle: 'Ongeldige bestellingsgegevens',
    invalidOrderDataDescription: 'Voer een nieuwe prijsberekening uit.',
    loadOrderDataErrorTitle: 'Fout bij laden bestellingsgegevens',
    loadOrderDataErrorDescription: 'Voer een nieuwe prijsberekening uit.'
  },
  validation: {
    emailRequired: 'Geldig e-mailadres vereist',
    firstNameRequired: 'Voornaam is vereist',
    lastNameRequired: 'Achternaam is vereist',
    streetRequired: 'Straat is vereist',
    postcodeRequired: 'Postcode is vereist',
    cityRequired: 'Stad is vereist',
    phoneRequired: 'Telefoonnummer is vereist',
    termsRequired: 'U moet de algemene voorwaarden accepteren'
  }
};

export const useBelgianCheckoutTranslations = (): BelgianCheckoutTranslations => {
  const shopConfig = useDomainShop();
  
  return useMemo(() => {
    // Only return Belgian translations for Belgian shop
    if (shopConfig.shopType === 'belgium') {
      return belgianTranslations;
    }
    
    // Fallback to default (this shouldn't happen for Belgian checkout)
    return belgianTranslations;
  }, [shopConfig.shopType]);
};
