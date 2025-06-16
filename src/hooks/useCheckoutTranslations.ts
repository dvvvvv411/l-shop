import { useMemo } from 'react';
import { useDomainShop } from '@/hooks/useDomainShop';

export interface CheckoutTranslations {
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
    // Added missing keys for bank account details
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

const translations = {
  de: {
    emailSection: {
      title: 'E-Mail-Adresse',
      subtitle: 'Für Bestellbestätigung und Kommunikation',
      emailLabel: 'E-Mail-Adresse *',
      emailPlaceholder: 'ihre.email@beispiel.de'
    },
    deliverySection: {
      title: 'Lieferadresse',
      subtitle: 'Wohin soll das Heizöl geliefert werden?',
      firstNameLabel: 'Vorname *',
      lastNameLabel: 'Nachname *',
      streetLabel: 'Straße und Hausnummer *',
      postcodeLabel: 'Postleitzahl *',
      cityLabel: 'Stadt *',
      phoneLabel: 'Telefonnummer *',
      firstNamePlaceholder: 'Vorname',
      lastNamePlaceholder: 'Nachname',
      streetPlaceholder: 'Straße und Hausnummer',
      postcodePlaceholder: 'PLZ',
      cityPlaceholder: 'Stadt',
      phonePlaceholder: 'Telefonnummer'
    },
    billingSection: {
      title: 'Rechnungsadresse',
      subtitle: 'Wohin soll die Rechnung gesendet werden?',
      sameAddressLabel: 'Rechnungsadresse ist identisch mit Lieferadresse'
    },
    paymentSection: {
      title: 'Zahlungsart',
      subtitle: 'Sichere und bequeme Zahlung',
      vorkasse: {
        title: 'Vorkasse',
        description: 'Überweisung vor Lieferung',
        recommended: 'Empfohlen'
      },
      rechnung: {
        title: 'Rechnung',
        description: 'Zahlung nach Lieferung',
        existingCustomers: 'Nur für Bestandskunden'
      }
    },
    termsSection: {
      title: 'AGB und Widerrufsbelehrung',
      subtitle: 'Bitte bestätigen Sie die Geschäftsbedingungen',
      withdrawalTitle: 'Widerrufsbelehrung',
      withdrawalText: 'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.',
      acceptTermsText: 'Ich akzeptiere die Allgemeinen Geschäftsbedingungen und die Widerrufsbelehrung. Mir ist bekannt, dass ich bei einer Bestellung von Heizöl mein Widerrufsrecht verliere, sobald die Lieferung begonnen hat. *',
      submitButton: 'Zahlungspflichtig bestellen',
      submittingButton: 'Bestellung wird erstellt...'
    },
    summary: {
      orderSummary: 'Bestellübersicht',
      showOrder: 'Bestellung anzeigen',
      product: 'Produkt',
      quantity: 'Menge',
      pricePerLiter: 'Preis pro Liter',
      subtotal: 'Zwischensumme',
      shipping: 'Versand',
      free: 'Kostenlos',
      net: 'Netto',
      vat: 'MwSt. (19%)',
      total: 'Gesamt',
      inclVat: 'inkl. MwSt.',
      ofWhichVat: 'davon {amount}€ MwSt.',
      discountPlaceholder: 'Rabattcode eingeben',
      applyButton: 'Anwenden',
      checkingButton: 'Prüfe...',
      deliveryInfo: 'Lieferinformation',
      workdays: '4-7 Werktage',
      afterPayment: 'nach Zahlungseingang',
      freeShippingNote: 'Kostenlose Lieferung ab 3.000 Liter',
      sslEncrypted: 'SSL verschlüsselt',
      securePayment: 'Sichere Zahlung',
      timelyDelivery: 'Pünktliche Lieferung',
      fairPrices: 'Faire Preise',
      confirmedOrder: 'Ihre bestätigte Bestellung'
    },
    confirmation: {
      title: 'Bestellung bestätigt!',
      subtitle: 'Vielen Dank für Ihre Heizöl-Bestellung',
      orderNumber: 'Ihre Bestellnummer',
      orderSuccess: 'Ihre Bestellung wurde erfolgreich aufgenommen!',
      paymentInstructions: 'Zahlungshinweise',
      howToPay: 'So zahlen Sie Ihre Bestellung',
      nextSteps: 'Nächste Schritte',
      phoneContact: '1. Telefonischer Kontakt',
      phoneContactDesc: 'Wir rufen Sie in den nächsten 24 Stunden an, um Ihre Bestellung zu bestätigen.',
      bankTransfer: '2. Überweisung',
      bankTransferDesc: 'Nach unserem Anruf überweisen Sie den Betrag von {amount}€ auf unser Konto.',
      delivery: '3. Lieferung',
      deliveryDesc: 'Nach Zahlungseingang erfolgt die Lieferung in 4-7 Werktagen.',
      deliveryInformation: 'Lieferinformationen',
      deliveryDetails: 'Wichtige Details zu Ihrer Lieferung',
      deliveryTerm: 'Liefertermin',
      deliveryAddress: 'Lieferadresse',
      importantNote: '📞 Wichtiger Hinweis zur Lieferung',
      importantNoteDesc: 'Unser Fahrer wird Sie am Liefertag telefonisch kontaktieren. Bitte stellen Sie sicher, dass Sie unter {phone} erreichbar sind.',
      basePrice: 'Grundpreis',
      deliveryLabel: 'Lieferung',
      // Added missing bank account keys for German
      bankAccountTitle: 'Bankverbindung für Zahlung',
      bankAccountSubtitle: 'Überweisen Sie den Betrag mit diesen Daten',
      accountHolder: 'Kontoinhaber',
      bankName: 'Bank',
      transferAmount: 'Überweisungsbetrag',
      reference: 'Verwendungszweck',
      questionsAboutOrder: 'Fragen zu Ihrer Bestellung?',
      phone: 'Telefon',
      email: 'E-Mail',
      newOrder: 'Neue Bestellung'
    },
    navigation: {
      back: 'Zurück',
      cart: 'Warenkorb',
      information: 'Informationen',
      shipping: 'Versand',
      payment: 'Zahlung',
      secureEncryption: 'Sichere SSL-Verschlüsselung für Ihre Daten'
    },
    header: {
      securePayment: 'Sichere Zahlung',
      sslEncrypted: 'SSL verschlüsselt'
    },
    system: {
      loadingOrderData: 'Bestelldaten werden geladen...',
      testDataGenerated: 'Testdaten generiert',
      testDataDescription: 'Das Formular wurde mit zufälligen Testdaten ausgefüllt.',
      emailSendTitle: 'E-Mail-Versand',
      emailSendDescription: 'Die Bestellbestätigung konnte nicht versendet werden. Sie erhalten diese in Kürze.',
      errorTitle: 'Fehler',
      errorDescription: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      orderProcessedTitle: 'Information',
      orderProcessedDescription: 'Diese Bestellung wurde bereits verarbeitet.'
    },
    toasts: {
      noOrderDataTitle: 'Keine Bestelldaten gefunden',
      noOrderDataDescription: 'Bitte führen Sie zuerst eine Preisberechnung durch.',
      invalidOrderDataTitle: 'Ungültige Bestelldaten',
      invalidOrderDataDescription: 'Bitte führen Sie eine neue Preisberechnung durch.',
      loadOrderDataErrorTitle: 'Fehler beim Laden der Bestelldaten',
      loadOrderDataErrorDescription: 'Bitte führen Sie eine neue Preisberechnung durch.'
    },
    validation: {
      emailRequired: 'Gültige E-Mail-Adresse erforderlich',
      firstNameRequired: 'Vorname ist erforderlich',
      lastNameRequired: 'Nachname ist erforderlich',
      streetRequired: 'Straße ist erforderlich',
      postcodeRequired: 'PLZ ist erforderlich',
      cityRequired: 'Stadt ist erforderlich',
      phoneRequired: 'Telefonnummer ist erforderlich',
      termsRequired: 'Sie müssen die AGB akzeptieren'
    }
  },
  fr: {
    emailSection: {
      title: 'Adresse e-mail',
      subtitle: 'Pour la confirmation de commande et la communication',
      emailLabel: 'Adresse e-mail *',
      emailPlaceholder: 'votre.email@exemple.fr'
    },
    deliverySection: {
      title: 'Adresse de livraison',
      subtitle: 'Où le fioul doit-il être livré ?',
      firstNameLabel: 'Prénom *',
      lastNameLabel: 'Nom *',
      streetLabel: 'Rue et numéro *',
      postcodeLabel: 'Code postal *',
      cityLabel: 'Ville *',
      phoneLabel: 'Numéro de téléphone *',
      firstNamePlaceholder: 'Prénom',
      lastNamePlaceholder: 'Nom',
      streetPlaceholder: 'Rue et numéro',
      postcodePlaceholder: 'Code postal',
      cityPlaceholder: 'Ville',
      phonePlaceholder: 'Numéro de téléphone'
    },
    billingSection: {
      title: 'Adresse de facturation',
      subtitle: 'Où la facture doit-elle être envoyée ?',
      sameAddressLabel: 'L\'adresse de facturation est identique à l\'adresse de livraison'
    },
    paymentSection: {
      title: 'Mode de paiement',
      subtitle: 'Paiement sécurisé et pratique',
      vorkasse: {
        title: 'Virement bancaire',
        description: 'Virement avant livraison',
        recommended: 'Recommandé'
      },
      rechnung: {
        title: 'Sur facture',
        description: 'Paiement après livraison',
        existingCustomers: 'Clients existants uniquement'
      }
    },
    termsSection: {
      title: 'CGV et droit de rétractation',
      subtitle: 'Veuillez confirmer les conditions générales',
      withdrawalTitle: 'Droit de rétractation',
      withdrawalText: 'Vous avez le droit de vous rétracter de ce contrat dans un délai de quatorze jours sans donner de motif. Le délai de rétractation expire quatorze jours après le jour de la conclusion du contrat.',
      acceptTermsText: 'J\'accepte les conditions générales de vente et le droit de rétractation. Je suis conscient(e) que je perds mon droit de rétractation lors d\'une commande de fioul dès que la livraison a commencé. *',
      submitButton: 'Commander avec obligation de paiement',
      submittingButton: 'Création de la commande en cours...'
    },
    summary: {
      orderSummary: 'Récapitulatif de commande',
      showOrder: 'Afficher la commande',
      product: 'Produit',
      quantity: 'Quantité',
      pricePerLiter: 'Prix par litre',
      subtotal: 'Sous-total',
      shipping: 'Livraison',
      free: 'Gratuite',
      net: 'Net',
      vat: 'TVA (19%)',
      total: 'Total',
      inclVat: 'TVA comprise',
      ofWhichVat: 'dont {amount}€ de TVA',
      discountPlaceholder: 'Entrer le code de réduction',
      applyButton: 'Appliquer',
      checkingButton: 'Vérification...',
      deliveryInfo: 'Information de livraison',
      workdays: '2-4 jours ouvrés',
      afterPayment: 'après vérification de la commande',
      freeShippingNote: 'Livraison gratuite à partir de 3 000 litres',
      sslEncrypted: 'Chiffrement SSL',
      securePayment: 'Paiement sécurisé',
      timelyDelivery: 'Livraison ponctuelle',
      fairPrices: 'Prix équitables',
      confirmedOrder: 'Votre commande confirmée'
    },
    confirmation: {
      title: 'Commande confirmée !',
      subtitle: 'Merci pour votre commande de fioul',
      orderNumber: 'Votre numéro de commande',
      orderSuccess: 'Votre commande a été enregistrée avec succès !',
      paymentInstructions: 'Instructions de paiement',
      howToPay: 'Comment payer votre commande',
      nextSteps: 'Prochaines étapes',
      phoneContact: '1. Vérification de commande',
      phoneContactDesc: 'Votre commande sera vérifiée et vous recevrez bientôt les informations bancaires.',
      bankTransfer: '2. Virement bancaire',
      bankTransferDesc: 'Après réception des informations bancaires, vous virerez le montant de {amount}€.',
      delivery: '3. Livraison',
      deliveryDesc: 'Après réception du paiement, la livraison s\'effectue en 2-4 jours ouvrés.',
      deliveryInformation: 'Informations de livraison',
      deliveryDetails: 'Détails importants concernant votre livraison',
      deliveryTerm: 'Date de livraison',
      deliveryAddress: 'Adresse de livraison',
      importantNote: '📞 Note importante concernant la livraison',
      importantNoteDesc: 'Notre chauffeur vous contactera par téléphone le jour de livraison. Veuillez vous assurer d\'être joignable au {phone}.',
      basePrice: 'Prix de base',
      deliveryLabel: 'Livraison',
      // Added missing bank account keys for French
      bankAccountTitle: 'Coordonnées bancaires pour le paiement',
      bankAccountSubtitle: 'Effectuez le virement avec ces informations',
      accountHolder: 'Titulaire du compte',
      bankName: 'Banque',
      transferAmount: 'Montant à virer',
      reference: 'Référence obligatoire',
      questionsAboutOrder: 'Questions sur votre commande ?',
      phone: 'Téléphone',
      email: 'E-mail',
      newOrder: 'Nouvelle commande'
    },
    navigation: {
      back: 'Retour',
      cart: 'Panier',
      information: 'Informations',
      shipping: 'Livraison',
      payment: 'Paiement',
      secureEncryption: 'Chiffrement SSL sécurisé pour vos données'
    },
    header: {
      securePayment: 'Paiement sécurisé',
      sslEncrypted: 'Chiffrement SSL'
    },
    system: {
      loadingOrderData: 'Chargement des données de commande...',
      testDataGenerated: 'Données de test générées',
      testDataDescription: 'Le formulaire a été rempli avec des données de test aléatoires.',
      emailSendTitle: 'Envoi d\'e-mail',
      emailSendDescription: 'La confirmation de commande n\'a pas pu être envoyée. Vous la recevrez bientôt.',
      errorTitle: 'Erreur',
      errorDescription: 'Une erreur s\'est produite. Veuillez réessayer.',
      orderProcessedTitle: 'Information',
      orderProcessedDescription: 'Cette commande a déjà été traitée.'
    },
    toasts: {
      noOrderDataTitle: 'Aucune donnée de commande trouvée',
      noOrderDataDescription: 'Veuillez d\'abord effectuer un calcul de prix.',
      invalidOrderDataTitle: 'Données de commande non valides',
      invalidOrderDataDescription: 'Veuillez effectuer un nouveau calcul de prix.',
      loadOrderDataErrorTitle: 'Erreur lors du chargement des données de commande',
      loadOrderDataErrorDescription: 'Veuillez effectuer un nouveau calcul de prix.'
    },
    validation: {
      emailRequired: 'Adresse e-mail valide requise',
      firstNameRequired: 'Le prénom est requis',
      lastNameRequired: 'Le nom est requis',
      streetRequired: 'La rue est requise',
      postcodeRequired: 'Le code postal est requis',
      cityRequired: 'La ville est requise',
      phoneRequired: 'Le numéro de téléphone est requis',
      termsRequired: 'Vous devez accepter les CGV'
    }
  },
  nl: {
    emailSection: {
      title: 'E-mailadres',
      subtitle: 'Voor orderbevestiging en communicatie',
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
      cityLabel: 'Gemeente *',
      phoneLabel: 'Telefoonnummer *',
      firstNamePlaceholder: 'Voornaam',
      lastNamePlaceholder: 'Achternaam',
      streetPlaceholder: 'Straat en huisnummer',
      postcodePlaceholder: 'Postcode',
      cityPlaceholder: 'Gemeente',
      phonePlaceholder: 'Telefoonnummer'
    },
    billingSection: {
      title: 'Factuuradres',
      subtitle: 'Waar moet de factuur naartoe gestuurd worden?',
      sameAddressLabel: 'Factuuradres is hetzelfde als leveringsadres'
    },
    paymentSection: {
      title: 'Betaalwijze',
      subtitle: 'Veilige en gemakkelijke betaling',
      vorkasse: {
        title: 'Vooruitbetaling',
        description: 'Overschrijving voor levering',
        recommended: 'Aanbevolen'
      },
      rechnung: {
        title: 'Factuur',
        description: 'Betaling na levering',
        existingCustomers: 'Alleen voor bestaande klanten'
      }
    },
    termsSection: {
      title: 'Algemene voorwaarden en herroepingsrecht',
      subtitle: 'Bevestig de algemene voorwaarden',
      withdrawalTitle: 'Herroepingsrecht',
      withdrawalText: 'U heeft het recht om binnen veertien dagen zonder opgave van redenen dit contract te herroepen. De herroepingstermijn bedraagt veertien dagen vanaf de dag van contractsluiting.',
      acceptTermsText: 'Ik accepteer de algemene voorwaarden en het herroepingsrecht. Ik ben me ervan bewust dat ik bij een mazoutbestelling mijn herroepingsrecht verlies zodra de levering is begonnen. *',
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
      checkingButton: 'Controle...',
      deliveryInfo: 'Leveringsinformatie',
      workdays: '2-4 werkdagen',
      afterPayment: 'na betalingscontrole',
      freeShippingNote: 'Gratis levering vanaf 3.000 liter',
      sslEncrypted: 'SSL versleuteld',
      securePayment: 'Veilige betaling',
      timelyDelivery: 'Tijdige levering',
      fairPrices: 'Eerlijke prijzen',
      confirmedOrder: 'Uw bevestigde bestelling'
    },
    confirmation: {
      title: 'Bestelling bevestigd!',
      subtitle: 'Bedankt voor uw mazoutbestelling',
      orderNumber: 'Uw bestelnummer',
      orderSuccess: 'Uw bestelling is succesvol geregistreerd!',
      paymentInstructions: 'Betalingsinstructies',
      howToPay: 'Zo betaalt u uw bestelling',
      nextSteps: 'Volgende stappen',
      phoneContact: '1. Ordercontrole',
      phoneContactDesc: 'Uw bestelling wordt gecontroleerd en u ontvangt binnenkort de bankinformatie.',
      bankTransfer: '2. Bankoverschrijving',
      bankTransferDesc: 'Na ontvangst van de bankinformatie schrijft u het bedrag van {amount}€ over.',
      delivery: '3. Levering',
      deliveryDesc: 'Na ontvangst van de betaling gebeurt de levering binnen 2-4 werkdagen.',
      deliveryInformation: 'Leveringsinformatie',
      deliveryDetails: 'Belangrijke details betreffende uw levering',
      deliveryTerm: 'Leveringsdatum',
      deliveryAddress: 'Leveringsadres',
      importantNote: '📞 Belangrijke opmerking betreffende levering',
      importantNoteDesc: 'Onze chauffeur neemt op de leveringsdag telefonisch contact met u op. Zorg ervoor dat u bereikbaar bent op {phone}.',
      basePrice: 'Basisprijs',
      deliveryLabel: 'Levering',
      bankAccountTitle: 'Bankgegevens voor betaling',
      bankAccountSubtitle: 'Maak de overschrijving met deze gegevens',
      accountHolder: 'Rekeninghouder',
      bankName: 'Bank',
      transferAmount: 'Over te schrijven bedrag',
      reference: 'Verplichte mededeling',
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
      loadingOrderData: 'Bestellingsgegevens laden...',
      testDataGenerated: 'Testgegevens gegenereerd',
      testDataDescription: 'Het formulier is ingevuld met willekeurige testgegevens.',
      emailSendTitle: 'E-mail verzending',
      emailSendDescription: 'De orderbevestiging kon niet verstuurd worden. U ontvangt deze binnenkort.',
      errorTitle: 'Fout',
      errorDescription: 'Er is een fout opgetreden. Probeer het opnieuw.',
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
      cityRequired: 'Gemeente is vereist',
      phoneRequired: 'Telefoonnummer is vereist',
      termsRequired: 'U moet de algemene voorwaarden accepteren'
    }
  }
} as const;

export const useCheckoutTranslations = (): CheckoutTranslations => {
  const shopConfig = useDomainShop();
  
  return useMemo(() => {
    // Use domain-based detection
    const isFrench = shopConfig.shopType === 'france';
    const isBelgian = shopConfig.shopType === 'belgium';
    
    if (isBelgian) {
      return translations.nl;
    } else if (isFrench) {
      return translations.fr;
    }
    
    return translations.de;
  }, [shopConfig.shopType]);
};
