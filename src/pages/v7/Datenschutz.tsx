
import React from 'react';
import V7Header from '@/components/v7/Header';
import V7Footer from '@/components/v7/Footer';

const V7Datenschutz = () => {
  return (
    <div className="min-h-screen bg-white">
      <V7Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacyverklaring</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2>1. Algemeen</h2>
            <p>
              MazoutVandaag BVBA respecteert uw privacy en behandelt uw persoonlijke 
              gegevens vertrouwelijk conform de GDPR wetgeving.
            </p>
            
            <h2>2. Welke gegevens verzamelen wij?</h2>
            <p>
              Wij verzamelen alleen gegevens die noodzakelijk zijn voor de uitvoering 
              van onze dienstverlening, zoals naam, adres, e-mail en telefoonnummer.
            </p>
            
            <h2>3. Waarvoor gebruiken wij uw gegevens?</h2>
            <ul>
              <li>Verwerking van uw bestelling</li>
              <li>Levering van mazout</li>
              <li>Communicatie over uw bestelling</li>
              <li>Facturatie</li>
            </ul>
            
            <h2>4. Beveiliging</h2>
            <p>
              Wij hebben passende technische en organisatorische maatregelen genomen 
              om uw persoonlijke gegevens te beschermen.
            </p>
            
            <h2>5. Uw rechten</h2>
            <p>
              U heeft het recht om uw gegevens in te zien, te corrigeren of te laten 
              verwijderen. Neem hiervoor contact met ons op.
            </p>
          </div>
        </div>
      </main>
      <V7Footer />
    </div>
  );
};

export default V7Datenschutz;
