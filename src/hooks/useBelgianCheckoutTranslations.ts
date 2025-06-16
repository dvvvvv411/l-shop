
export const useBelgianCheckoutTranslations = () => {
  return {
    emailSection: {
      title: 'E-mailadres',
      subtitle: 'Voor bestellingsbevestiging en communicatie',
      emailLabel: 'E-mailadres *',
      emailPlaceholder: 'jan.janssen@email.be'
    },
    deliverySection: {
      title: 'Leveringsadres',
      subtitle: 'Waar moet de mazout worden geleverd?',
      firstNameLabel: 'Voornaam *',
      firstNamePlaceholder: 'Jan',
      lastNameLabel: 'Achternaam *',
      lastNamePlaceholder: 'Janssen',
      streetLabel: 'Straat en huisnummer *',
      streetPlaceholder: 'Voorbeeldstraat 123',
      postcodeLabel: 'Postcode *',
      postcodePlaceholder: '1000',
      cityLabel: 'Stad *',
      cityPlaceholder: 'Brussel',
      phoneLabel: 'Telefoonnummer *',
      phonePlaceholder: '+32 2 123 4567'
    },
    billingSection: {
      title: 'Factuuradres',
      subtitle: 'Waar moet de factuur naartoe worden gestuurd?',
      sameAddressLabel: 'Factuuradres is hetzelfde als leveringsadres'
    },
    paymentSection: {
      title: 'Betaalmethode',
      subtitle: 'Veilige en gemakkelijke betaling',
      vorkasse: {
        title: 'Vooruitbetaling',
        description: 'Overschrijving voor levering',
        recommended: 'Aanbevolen'
      },
      rechnung: {
        title: 'Factuur',
        description: 'Betaling na levering (momenteel niet beschikbaar)',
        existingCustomers: 'Alleen voor bestaande klanten beschikbaar'
      }
    },
    termsSection: {
      title: 'Voorwaarden',
      subtitle: 'Bevestig uw akkoord',
      withdrawalTitle: '14 dagen herroepingsrecht',
      withdrawalText: 'U heeft het recht om binnen 14 dagen zonder opgave van redenen deze overeenkomst te herroepen.',
      acceptTermsText: 'Ik ga akkoord met de algemene voorwaarden en het privacybeleid *',
      submitButton: 'Bestelling plaatsen',
      submittingButton: 'Bestelling wordt geplaatst...'
    },
    confirmation: {
      title: 'Bestelling bevestigd!',
      subtitle: 'Bedankt voor uw bestelling. U ontvangt binnenkort een bevestiging.',
      orderNumber: 'Bestelnummer',
      bankAccountTitle: 'Bankoverschrijving',
      bankAccountSubtitle: 'Gelieve het bedrag over te maken naar onderstaande rekening',
      accountHolder: 'Rekeninghouder',
      bankName: 'Bank',
      reference: 'Mededeling',
      transferAmount: 'Over te maken bedrag',
      paymentInstructions: 'Betalingsinstructies',
      howToPay: 'Hoe te betalen en wat er daarna gebeurt',
      nextSteps: 'Volgende stappen',
      phoneContact: 'Telefonisch contact',
      phoneContactDesc: 'Wij nemen binnen 24 uur telefonisch contact met u op om uw bestelling te bevestigen.',
      bankTransferDesc: 'Maak het bedrag van {amount}€ over met het bestelnummer als mededeling.',
      deliveryDesc: 'Levering vindt plaats na ontvangst van de betaling.',
      deliveryInformation: 'Leveringsinformatie',
      deliveryDetails: 'Details over uw levering',
      deliveryTerm: 'Levertijd',
      deliveryAddress: 'Leveringsadres',
      importantNote: 'Belangrijk!',
      importantNoteDesc: 'Onze chauffeur zal u bellen op {phone} om de exacte levertijd af te spreken.',
      basePrice: 'Basisprijs',
      deliveryLabel: 'Levering'
    },
    summary: {
      orderSummary: 'Bestelsamenvatting',
      confirmedOrder: 'Bevestigde bestelling',
      product: 'Product',
      quantity: 'Hoeveelheid',
      pricePerLiter: 'Prijs per liter',
      net: 'Netto',
      vat: 'BTW (21%)',
      total: 'Totaal',
      free: 'Gratis',
      workdays: '4-7 werkdagen',
      afterPayment: 'na ontvangst betaling',
      ofWhichVat: 'waarvan {amount}€ BTW'
    },
    validation: {
      emailRequired: 'Geldig e-mailadres vereist',
      firstNameRequired: 'Voornaam is vereist',
      lastNameRequired: 'Achternaam is vereist',
      streetRequired: 'Straat is vereist',
      postcodeRequired: 'Postcode is vereist',
      cityRequired: 'Stad is vereist',
      phoneRequired: 'Telefoonnummer is vereist',
      termsRequired: 'U moet akkoord gaan met de voorwaarden'
    },
    system: {
      testDataGenerated: 'Testgegevens gegenereerd',
      testDataDescription: 'Het formulier is ingevuld met willekeurige testgegevens.',
      emailSendTitle: 'E-mail verzending',
      emailSendDescription: 'De bestellingsbevestiging kon niet worden verzonden. U ontvangt deze binnenkort.',
      orderProcessedTitle: 'Bestelling verwerkt',
      orderProcessedDescription: 'Uw bestelling werd al verwerkt.',
      errorTitle: 'Fout',
      errorDescription: 'Er kon geen bestelling worden aangemaakt. Probeer het opnieuw.'
    }
  };
};
