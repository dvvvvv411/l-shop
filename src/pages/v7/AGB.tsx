
import React from 'react';
import V7Header from '@/components/v7/Header';
import V7Footer from '@/components/v7/Footer';

const V7AGB = () => {
  return (
    <div className="min-h-screen bg-white">
      <V7Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Algemene Voorwaarden</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2>1. Toepassingsgebied</h2>
            <p>
              Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, 
              overeenkomsten en leveringen van MazoutVandaag BVBA.
            </p>
            
            <h2>2. Aanbiedingen en Prijzen</h2>
            <p>
              Alle prijzen zijn inclusief BTW en exclusief leveringskosten, 
              tenzij anders vermeld. Prijzen kunnen dagelijks wijzigen.
            </p>
            
            <h2>3. Bestelling en Bevestiging</h2>
            <p>
              Een overeenkomst komt tot stand na schriftelijke bevestiging van uw bestelling 
              door MazoutVandaag BVBA.
            </p>
            
            <h2>4. Levering</h2>
            <p>
              Levering geschiedt binnen 3-5 werkdagen na betalingsbevestiging. 
              Gratis levering vanaf 3.000 liter.
            </p>
            
            <h2>5. Betaling</h2>
            <p>
              Betaling geschiedt via vooruitbetaling door bankoverschrijving. 
              Levering vindt plaats na ontvangst van de betaling.
            </p>
            
            <h2>6. Herroepingsrecht</h2>
            <p>
              U heeft het recht om binnen 14 dagen na contractsluiting de overeenkomst 
              te herroepen. Dit recht vervalt zodra de levering is aangevangen.
            </p>
          </div>
        </div>
      </main>
      <V7Footer />
    </div>
  );
};

export default V7AGB;
