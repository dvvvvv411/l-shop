
import React from 'react';
import V7Header from '@/components/v7/Header';
import V7Footer from '@/components/v7/Footer';

const V7Widerrufsrecht = () => {
  return (
    <div className="min-h-screen bg-white">
      <V7Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Herroepingsrecht</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2>Herroepingsrecht</h2>
            <p>
              U heeft het recht om binnen veertien dagen zonder opgave van redenen 
              deze overeenkomst te herroepen.
            </p>
            
            <h2>Herroepingstermijn</h2>
            <p>
              De herroepingstermijn bedraagt veertien dagen vanaf de dag van 
              contractsluiting.
            </p>
            
            <h2>Uitoefening van het herroepingsrecht</h2>
            <p>
              Om uw herroepingsrecht uit te oefenen, moet u ons middels een 
              ondubbelzinnige verklaring (bijvoorbeeld per e-mail) op de hoogte 
              stellen van uw beslissing deze overeenkomst te herroepen.
            </p>
            
            <h2>Contactgegevens voor herroeping</h2>
            <p>
              MazoutVandaag BVBA<br />
              Grote Markt 1<br />
              1000 Brussel<br />
              E-mail: info@mazoutvandaag.com<br />
              Telefoon: +32 2 123 4567
            </p>
            
            <h2>Uitzondering herroepingsrecht</h2>
            <p>
              <strong>Let op:</strong> Het herroepingsrecht vervalt voor de levering 
              van mazout zodra de levering is aangevangen, conform artikel VI.53 
              van het Wetboek van Economisch Recht.
            </p>
          </div>
        </div>
      </main>
      <V7Footer />
    </div>
  );
};

export default V7Widerrufsrecht;
