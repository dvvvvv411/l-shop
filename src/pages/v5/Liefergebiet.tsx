
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Liefergebiet = () => {
  useDomainFavicon();
  useDomainPageMeta('liefergebiet');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Zone di consegna</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Consegniamo in tutta Italia</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Gasolio Veloce effettua consegne in tutte le regioni italiane. 
              I nostri tempi di consegna standard sono di 3-5 giorni lavorativi.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nord Italia</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Lombardia</li>
                  <li>• Piemonte</li>
                  <li>• Veneto</li>
                  <li>• Liguria</li>
                  <li>• Emilia-Romagna</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Centro e Sud Italia</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Toscana</li>
                  <li>• Lazio</li>
                  <li>• Campania</li>
                  <li>• Puglia</li>
                  <li>• E tutte le altre regioni</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 font-semibold">
                Consegna gratuita per ordini superiori a 3.000 litri!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Liefergebiet;
