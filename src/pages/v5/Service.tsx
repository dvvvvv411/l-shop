
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Service = () => {
  useDomainFavicon();
  useDomainPageMeta('service');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">I nostri servizi</h1>
          
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Consegna di gasolio da riscaldamento</h2>
              <p className="text-gray-700 leading-relaxed">
                Forniamo gasolio da riscaldamento di alta qualità in tutta Italia. 
                Consegne rapide e affidabili direttamente al vostro domicilio.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Consulenza energetica</h2>
              <p className="text-gray-700 leading-relaxed">
                I nostri esperti vi consigliano sulla scelta del tipo di gasolio più adatto 
                alle vostre esigenze e vi aiutano a ottimizzare i consumi.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Servizio clienti</h2>
              <p className="text-gray-700 leading-relaxed">
                Il nostro team di assistenza clienti è disponibile dal lunedì al venerdì 
                dalle 8:00 alle 18:00 per rispondere alle vostre domande.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Service;
