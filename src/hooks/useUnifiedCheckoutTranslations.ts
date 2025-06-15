
import { useDomainShop } from './useDomainShop';
import { useCheckoutTranslations } from './useCheckoutTranslations';
import { useItalianCheckoutTranslations } from './useItalianCheckoutTranslations';

export const useUnifiedCheckoutTranslations = () => {
  const shopConfig = useDomainShop();
  const standardTranslations = useCheckoutTranslations();
  const italianTranslations = useItalianCheckoutTranslations();

  if (shopConfig.shopType === 'italy') {
    // Create a unified structure for Italian translations
    return {
      form: {
        title: 'Compila il modulo d\'ordine',
        deliveryAddress: 'Indirizzo di consegna',
        firstName: 'Nome',
        lastName: 'Cognome',
        street: 'Indirizzo',
        postcode: 'CAP',
        city: 'Città',
        phone: 'Telefono',
        email: 'Email',
        sameAsBilling: 'Usa lo stesso indirizzo per la fatturazione',
        billingAddress: 'Indirizzo di fatturazione',
        acceptTerms: 'Accetto i termini e condizioni',
        submitting: 'Invio in corso...',
        submitOrder: 'Invia ordine'
      },
      emailSection: italianTranslations.emailSection || {
        title: 'Informazioni Email',
        subtitle: 'Inserisci la tua email per ricevere la conferma',
        emailLabel: 'Email',
        emailPlaceholder: 'mario.rossi@email.com'
      },
      deliverySection: italianTranslations.deliverySection || {
        title: 'Indirizzo di consegna',
        subtitle: 'Dove vuoi ricevere il tuo ordine',
        firstNameLabel: 'Nome',
        firstNamePlaceholder: 'Mario',
        lastNameLabel: 'Cognome',
        lastNamePlaceholder: 'Rossi',
        streetLabel: 'Indirizzo',
        streetPlaceholder: 'Via Roma 123',
        postcodeLabel: 'CAP',
        postcodePlaceholder: '00100',
        cityLabel: 'Città',
        cityPlaceholder: 'Roma',
        phoneLabel: 'Telefono',
        phonePlaceholder: '+39 333 123 4567'
      },
      billingSection: italianTranslations.billingSection || {
        title: 'Indirizzo di fatturazione',
        subtitle: 'Indirizzo per la fatturazione',
        sameAddressLabel: 'Usa lo stesso indirizzo per la fatturazione'
      },
      paymentSection: italianTranslations.paymentSection || {
        title: 'Metodo di pagamento',
        subtitle: 'Come vuoi pagare',
        vorkasse: {
          title: 'Bonifico bancario',
          description: 'Paga tramite bonifico bancario',
          recommended: 'Consigliato'
        },
        rechnung: {
          title: 'Fattura',
          description: 'Paga dopo aver ricevuto la fattura',
          existingCustomers: 'Solo per clienti esistenti'
        }
      },
      termsSection: italianTranslations.termsSection || {
        title: 'Termini e condizioni',
        subtitle: 'Accetta i termini per completare l\'ordine',
        withdrawalTitle: 'Diritto di recesso',
        withdrawalText: 'Hai 14 giorni per recedere dal contratto senza fornire alcuna motivazione.',
        acceptTermsText: 'Accetto i termini e condizioni e la politica sulla privacy.',
        submitButton: 'Invia ordine',
        submittingButton: 'Invio in corso...'
      },
      system: italianTranslations.system || {
        testDataGenerated: 'Dati di test generati',
        testDataDescription: 'I campi sono stati compilati con dati di test per il debug'
      }
    };
  }

  // Return standard translations with proper structure that includes the form property
  return {
    form: {
      title: 'Checkout',
      deliveryAddress: 'Lieferadresse',
      firstName: 'Vorname',
      lastName: 'Nachname',
      street: 'Straße',
      postcode: 'Postleitzahl',
      city: 'Stadt',
      phone: 'Telefon',
      email: 'E-Mail',
      sameAsBilling: 'Gleich wie Lieferadresse',
      billingAddress: 'Rechnungsadresse',
      acceptTerms: 'Ich akzeptiere die AGB',
      submitting: 'Wird übermittelt...',
      submitOrder: 'Bestellung aufgeben'
    },
    emailSection: standardTranslations.emailSection || {
      title: 'E-Mail-Adresse',
      subtitle: 'Für Bestellbestätigung und Kommunikation',
      emailLabel: 'E-Mail-Adresse',
      emailPlaceholder: 'max.mustermann@email.de'
    },
    deliverySection: standardTranslations.deliverySection || {
      title: 'Lieferadresse',
      subtitle: 'Wohin soll das Heizöl geliefert werden?',
      firstNameLabel: 'Vorname',
      firstNamePlaceholder: 'Max',
      lastNameLabel: 'Nachname',
      lastNamePlaceholder: 'Mustermann',
      streetLabel: 'Straße und Hausnummer',
      streetPlaceholder: 'Musterstraße 123',
      postcodeLabel: 'Postleitzahl',
      postcodePlaceholder: '12345',
      cityLabel: 'Stadt',
      cityPlaceholder: 'Musterstadt',
      phoneLabel: 'Telefonnummer',
      phonePlaceholder: '+49 123 456789'
    },
    billingSection: standardTranslations.billingSection || {
      title: 'Rechnungsadresse',
      subtitle: 'Wohin soll die Rechnung gesendet werden?',
      sameAddressLabel: 'Rechnungsadresse ist identisch mit Lieferadresse'
    },
    paymentSection: standardTranslations.paymentSection || {
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
    termsSection: standardTranslations.termsSection || {
      title: 'Allgemeine Geschäftsbedingungen',
      subtitle: 'Bitte bestätigen Sie die AGB',
      withdrawalTitle: 'Widerrufsrecht',
      withdrawalText: 'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.',
      acceptTermsText: 'Ich akzeptiere die AGB und Datenschutzerklärung.',
      submitButton: 'Bestellung aufgeben',
      submittingButton: 'Wird übermittelt...'
    },
    system: standardTranslations.system || {
      testDataGenerated: 'Testdaten generiert',
      testDataDescription: 'Das Formular wurde mit zufälligen Testdaten ausgefüllt'
    }
  };
};
