
import { useMemo } from 'react';

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
  };
  // Confirmation section
  confirmation: {
    title: string;
    subtitle: string;
    orderNumber: string;
    paymentInstructions: string;
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
      fairPrices: 'Faire Preise'
    },
    confirmation: {
      title: 'Bestellung bestätigt!',
      subtitle: 'Vielen Dank für Ihre Heizöl-Bestellung',
      orderNumber: 'Ihre Bestellnummer',
      paymentInstructions: 'Zahlungshinweise',
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
      importantNoteDesc: 'Unser Fahrer wird Sie am Liefertag telefonisch kontaktieren. Bitte stellen Sie sicher, dass Sie unter {phone} erreichbar sind.'
    },
    navigation: {
      back: 'Zurück',
      cart: 'Warenkorb',
      information: 'Informationen',
      shipping: 'Versand',
      payment: 'Zahlung',
      secureEncryption: 'Sichere SSL-Verschlüsselung für Ihre Daten'
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
      workdays: '4-7 jours ouvrés',
      afterPayment: 'après réception du paiement',
      freeShippingNote: 'Livraison gratuite à partir de 3 000 litres',
      sslEncrypted: 'Chiffrement SSL',
      securePayment: 'Paiement sécurisé',
      timelyDelivery: 'Livraison ponctuelle',
      fairPrices: 'Prix équitables'
    },
    confirmation: {
      title: 'Commande confirmée !',
      subtitle: 'Merci pour votre commande de fioul',
      orderNumber: 'Votre numéro de commande',
      paymentInstructions: 'Instructions de paiement',
      nextSteps: 'Prochaines étapes',
      phoneContact: '1. Contact téléphonique',
      phoneContactDesc: 'Nous vous appellerons dans les 24 heures pour confirmer votre commande.',
      bankTransfer: '2. Virement bancaire',
      bankTransferDesc: 'Après notre appel, vous virerez le montant de {amount}€ sur notre compte.',
      delivery: '3. Livraison',
      deliveryDesc: 'Après réception du paiement, la livraison s\'effectue en 4-7 jours ouvrés.',
      deliveryInformation: 'Informations de livraison',
      deliveryDetails: 'Détails importants concernant votre livraison',
      deliveryTerm: 'Date de livraison',
      deliveryAddress: 'Adresse de livraison',
      importantNote: '📞 Note importante concernant la livraison',
      importantNoteDesc: 'Notre chauffeur vous contactera par téléphone le jour de livraison. Veuillez vous assurer d\'être joignable au {phone}.'
    },
    navigation: {
      back: 'Retour',
      cart: 'Panier',
      information: 'Informations',
      shipping: 'Livraison',
      payment: 'Paiement',
      secureEncryption: 'Chiffrement SSL sécurisé pour vos données'
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
  }
} as const;

export const useCheckoutTranslations = (): CheckoutTranslations => {
  return useMemo(() => {
    // Check if user came from French version
    const orderReferrer = localStorage.getItem('orderReferrer');
    const isFrench = orderReferrer === '/4/home';
    
    return translations[isFrench ? 'fr' : 'de'];
  }, []);
};
