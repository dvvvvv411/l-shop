
export const useCheckoutTranslations = () => {
  return {
    // System messages
    system: {
      loadingOrderData: 'Bestelldaten werden geladen...',
      testDataGenerated: 'Testdaten generiert',
      testDataDescription: 'Das Formular wurde mit zufälligen Testdaten ausgefüllt.'
    },

    // Toast messages
    toasts: {
      noOrderDataTitle: 'Keine Bestelldaten gefunden',
      noOrderDataDescription: 'Bitte führen Sie zuerst eine Preisberechnung durch.',
      invalidOrderDataTitle: 'Ungültige Bestelldaten',
      invalidOrderDataDescription: 'Bitte führen Sie eine neue Preisberechnung durch.',
      loadOrderDataErrorTitle: 'Fehler beim Laden der Bestelldaten',
      loadOrderDataErrorDescription: 'Bitte führen Sie eine neue Preisberechnung durch.',
      orderCreationError: 'Fehler bei der Bestellerstellung',
      orderCreationErrorDescription: 'Bei der Erstellung der Bestellung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'
    },

    // Navigation
    navigation: {
      back: 'Zurück',
      cart: 'Warenkorb',
      information: 'Informationen',
      shipping: 'Versand',
      payment: 'Zahlung',
      secureEncryption: 'Sichere SSL-Verschlüsselung'
    },

    // Validation messages
    validation: {
      emailRequired: 'Eine gültige E-Mail-Adresse ist erforderlich',
      firstNameRequired: 'Vorname ist erforderlich',
      lastNameRequired: 'Nachname ist erforderlich',
      streetRequired: 'Straße ist erforderlich',
      postcodeRequired: 'Postleitzahl ist erforderlich',
      cityRequired: 'Stadt ist erforderlich',
      phoneRequired: 'Telefonnummer ist erforderlich',
      termsRequired: 'Sie müssen den Allgemeinen Geschäftsbedingungen zustimmen'
    },

    // Email section
    emailSection: {
      title: 'E-Mail-Adresse',
      subtitle: 'Für Bestellbestätigung und Kommunikation',
      emailLabel: 'E-Mail-Adresse *',
      emailPlaceholder: 'max.mustermann@email.de'
    },

    // Delivery section
    deliverySection: {
      title: 'Lieferadresse',
      subtitle: 'Wohin soll das Heizöl geliefert werden?',
      firstNameLabel: 'Vorname *',
      firstNamePlaceholder: 'Max',
      lastNameLabel: 'Nachname *',
      lastNamePlaceholder: 'Mustermann',
      streetLabel: 'Straße und Hausnummer *',
      streetPlaceholder: 'Musterstraße 123',
      postcodeLabel: 'Postleitzahl *',
      postcodePlaceholder: '12345',
      cityLabel: 'Stadt *',
      cityPlaceholder: 'Musterstadt',
      phoneLabel: 'Telefonnummer *',
      phonePlaceholder: '+49 123 456789'
    },

    // Billing section
    billingSection: {
      title: 'Rechnungsadresse',
      subtitle: 'Wohin soll die Rechnung gesendet werden?',
      sameAddressLabel: 'Rechnungsadresse entspricht der Lieferadresse'
    },

    // Payment section
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

    // Terms section
    termsSection: {
      title: 'Allgemeine Geschäftsbedingungen',
      subtitle: 'Wichtige rechtliche Informationen',
      withdrawalTitle: 'Widerrufsrecht',
      withdrawalText: 'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.',
      acceptTermsText: 'Ich akzeptiere die Allgemeinen Geschäftsbedingungen, Datenschutzerklärung und bestätige, dass ich die Widerrufsbelehrung gelesen habe.',
      submitButton: 'Bestellung abschicken',
      submittingButton: 'Wird verarbeitet...'
    },

    // Summary section
    summary: {
      showOrder: 'Bestellung anzeigen',
      orderSummary: 'Bestellübersicht',
      confirmedOrder: 'Bestätigte Bestellung',
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
      ofWhichVat: 'davon MwSt. {amount}€',
      deliveryInfo: 'Lieferinformationen',
      workdays: '4-7 Werktage',
      afterPayment: 'nach Zahlungseingang',
      freeShippingNote: 'Kostenloser Versand ab 500L',
      sslEncrypted: 'SSL-verschlüsselt',
      securePayment: 'Sichere Zahlung',
      timelyDelivery: 'Pünktliche Lieferung',
      fairPrices: 'Faire Preise',
      discountPlaceholder: 'Rabattcode',
      applyButton: 'Anwenden',
      checkingButton: 'Prüfe...'
    },

    // Confirmation section
    confirmation: {
      title: 'Bestellung bestätigt!',
      subtitle: 'Vielen Dank für Ihre Bestellung',
      orderNumber: 'Bestellnummer',
      paymentInstructions: 'Zahlungsanweisungen',
      howToPay: 'So gehen Sie bei der Zahlung vor',
      nextSteps: 'Nächste Schritte:',
      phoneContact: 'Telefonischer Kontakt',
      phoneContactDesc: 'Wir werden Sie zur Bestätigung der Details kontaktieren',
      bankTransfer: 'Banküberweisung',
      bankTransferDesc: 'Überweisen Sie {amount}€ mit den bereitgestellten Bankdaten',
      delivery: 'Lieferung',
      deliveryDesc: 'Das Heizöl wird nach Zahlungsbestätigung geliefert',
      deliveryInformation: 'Lieferinformationen',
      deliveryDetails: 'Details zur Lieferung Ihrer Bestellung',
      deliveryTerm: 'Lieferzeit',
      deliveryAddress: 'Lieferadresse',
      importantNote: 'Wichtiger Hinweis',
      importantNoteDesc: 'Wir werden Sie unter {phone} vor der Lieferung kontaktieren, um die Zeit zu vereinbaren.',
      basePrice: 'Grundpreis',
      deliveryLabel: 'Lieferung'
    }
  };
};
