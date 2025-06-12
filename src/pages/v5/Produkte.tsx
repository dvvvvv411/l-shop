
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Produkte = () => {
  useDomainFavicon();
  useDomainPageMeta('produkte');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">I nostri prodotti</h1>
          
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Gasolio Standard</h2>
              <p className="text-gray-700 leading-relaxed">
                Il nostro gasolio standard è conforme agli standard EN 590 e offre 
                un'eccellente rapporto qualità-prezzo per il riscaldamento domestico.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Gasolio Premium</h2>
              <p className="text-gray-700 leading-relaxed">
                Il gasolio premium contiene additivi speciali che migliorano le prestazioni 
                e riducono le emissioni, ideale per impianti di riscaldamento moderni.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Gasolio Eco</h2>
              <p className="text-gray-700 leading-relaxed">
                La nostra formula eco-friendly riduce l'impatto ambientale mantenendo 
                alte prestazioni energetiche.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Produkte;
