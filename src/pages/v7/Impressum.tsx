
import React from 'react';
import V7Header from '@/components/v7/Header';
import V7Footer from '@/components/v7/Footer';

const V7Impressum = () => {
  return (
    <div className="min-h-screen bg-white">
      <V7Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2>Bedrijfsinformatie</h2>
            <p>
              <strong>MazoutVandaag BVBA</strong><br />
              Grote Markt 1<br />
              1000 Brussel<br />
              België
            </p>
            
            <h2>Contact</h2>
            <p>
              Telefoon: +32 2 123 4567<br />
              E-mail: info@mazoutvandaag.com
            </p>
            
            <h2>Bedrijfsregistratie</h2>
            <p>
              BTW-nummer: BE 0123.456.789<br />
              Ondernemingsnummer: 0123.456.789<br />
              Rechtbank: Brussel
            </p>
            
            <h2>Vergunningen</h2>
            <p>
              Wij beschikken over alle benodigde vergunningen voor de handel in mazout 
              en petroleumproducten conform de Belgische wetgeving.
            </p>
          </div>
        </div>
      </main>
      <V7Footer />
    </div>
  );
};

export default V7Impressum;
