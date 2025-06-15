
export const useItalianCheckoutTranslations = () => {
  return {
    // System messages
    system: {
      loadingOrderData: 'Caricamento dati ordine...',
      testDataGenerated: 'Dati di test generati',
      testDataDescription: 'Il modulo è stato compilato con dati di test casuali.'
    },

    // Toast messages
    toasts: {
      noOrderDataTitle: 'Nessun dato ordine trovato',
      noOrderDataDescription: 'Si prega di effettuare prima un calcolo del prezzo.',
      invalidOrderDataTitle: 'Dati ordine non validi',
      invalidOrderDataDescription: 'Si prega di effettuare un nuovo calcolo del prezzo.',
      loadOrderDataErrorTitle: 'Errore nel caricamento dei dati ordine',
      loadOrderDataErrorDescription: 'Si prega di effettuare un nuovo calcolo del prezzo.',
      orderCreationError: 'Errore nella creazione dell\'ordine',
      orderCreationErrorDescription: 'Si è verificato un errore durante la creazione dell\'ordine. Riprova.'
    },

    // Header
    header: {
      securePayment: 'Pagamento sicuro',
      sslEncrypted: 'Crittografato SSL'
    },

    // Navigation
    navigation: {
      back: 'Indietro',
      cart: 'Carrello',
      information: 'Informazioni',
      shipping: 'Spedizione',
      payment: 'Pagamento',
      secureEncryption: 'Crittografia sicura SSL'
    },

    // Validation messages
    validation: {
      emailRequired: 'È richiesto un indirizzo email valido',
      firstNameRequired: 'Il nome è obbligatorio',
      lastNameRequired: 'Il cognome è obbligatorio',
      streetRequired: 'La via è obbligatoria',
      postcodeRequired: 'Il CAP è obbligatorio',
      cityRequired: 'La città è obbligatoria',
      phoneRequired: 'Il numero di telefono è obbligatorio',
      termsRequired: 'È necessario accettare i termini e le condizioni'
    },

    // Email section
    emailSection: {
      title: 'Indirizzo Email',
      subtitle: 'Per conferma ordine e comunicazioni',
      emailLabel: 'Indirizzo Email *',
      emailPlaceholder: 'mario.rossi@email.it'
    },

    // Delivery section
    deliverySection: {
      title: 'Indirizzo di Consegna',
      subtitle: 'Dove deve essere consegnato il gasolio?',
      firstNameLabel: 'Nome *',
      firstNamePlaceholder: 'Mario',
      lastNameLabel: 'Cognome *',
      lastNamePlaceholder: 'Rossi',
      streetLabel: 'Via e numero civico *',
      streetPlaceholder: 'Via Roma 123',
      postcodeLabel: 'Codice Postale *',
      postcodePlaceholder: '20121',
      cityLabel: 'Città *',
      cityPlaceholder: 'Milano',
      phoneLabel: 'Numero di Telefono *',
      phonePlaceholder: '+39 123 456789'
    },

    // Billing section
    billingSection: {
      title: 'Indirizzo di Fatturazione',
      subtitle: 'Dove deve essere inviata la fattura?',
      sameAddressLabel: 'L\'indirizzo di fatturazione è uguale a quello di consegna'
    },

    // Payment section
    paymentSection: {
      title: 'Metodo di Pagamento',
      subtitle: 'Pagamento sicuro e conveniente',
      vorkasse: {
        title: 'Bonifico Bancario',
        description: 'Bonifico prima della consegna',
        recommended: 'Raccomandato'
      },
      rechnung: {
        title: 'Fattura',
        description: 'Pagamento dopo la consegna',
        existingCustomers: 'Solo clienti esistenti'
      }
    },

    // Terms section
    termsSection: {
      title: 'Termini e Condizioni',
      subtitle: 'Informazioni legali importanti',
      withdrawalTitle: 'Diritto di Recesso',
      withdrawalText: 'Hai il diritto di recedere da questo contratto entro 14 giorni senza fornire alcuna motivazione.',
      acceptTermsText: 'Accetto i termini e le condizioni, la privacy policy e confermo di aver letto le informazioni sul diritto di recesso.',
      submitButton: 'Conferma Ordine',
      submittingButton: 'Elaborazione...'
    },

    // Summary section
    summary: {
      showOrder: 'Mostra Ordine',
      orderSummary: 'Riepilogo Ordine',
      confirmedOrder: 'Ordine confermato',
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
      ofWhichVat: 'di cui IVA {amount}€',
      deliveryInfo: 'Informazioni Consegna',
      workdays: '4-7 giorni lavorativi',
      afterPayment: 'dopo il pagamento',
      freeShippingNote: 'Spedizione gratuita per ordini superiori a 500L',
      sslEncrypted: 'Crittografato SSL',
      securePayment: 'Pagamento sicuro',
      timelyDelivery: 'Consegna puntuale',
      fairPrices: 'Prezzi equi',
      discountPlaceholder: 'Codice sconto',
      applyButton: 'Applica',
      checkingButton: 'Controllo...'
    },

    // Confirmation section
    confirmation: {
      title: 'Ordine Confermato!',
      subtitle: 'Grazie per il tuo ordine',
      orderNumber: 'Numero Ordine',
      paymentInstructions: 'Istruzioni di Pagamento',
      howToPay: 'Come procedere con il pagamento',
      nextSteps: 'Prossimi Passi:',
      phoneContact: 'Contatto Telefonico',
      phoneContactDesc: 'Ti contatteremo per confermare i dettagli',
      bankTransfer: 'Bonifico Bancario',
      bankTransferDesc: 'Effettua il bonifico di {amount}€ utilizzando i dati bancari forniti',
      delivery: 'Consegna',
      deliveryDesc: 'Il gasolio verrà consegnato dopo la conferma del pagamento',
      deliveryInformation: 'Informazioni Consegna',
      deliveryDetails: 'Dettagli sulla consegna del tuo ordine',
      deliveryTerm: 'Tempi di Consegna',
      deliveryAddress: 'Indirizzo di Consegna',
      importantNote: 'Nota Importante',
      importantNoteDesc: 'Ti contatteremo al numero {phone} prima della consegna per concordare l\'orario.',
      basePrice: 'Prezzo Base',
      deliveryLabel: 'Consegna'
    }
  };
};
