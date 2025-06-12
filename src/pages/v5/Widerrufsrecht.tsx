
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Widerrufsrecht = () => {
  useDomainFavicon();
  useDomainPageMeta('widerrufsrecht');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Diritto di Recesso</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Diritto di recesso per i consumatori</h2>
              <p className="text-gray-700 leading-relaxed">
                In conformità al Codice del Consumo italiano, i consumatori hanno il diritto di recedere 
                dal contratto entro 14 giorni dalla conclusione del contratto, senza dover fornire 
                alcuna motivazione.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Termine per il recesso</h2>
              <p className="text-gray-700 leading-relaxed">
                Il termine di recesso è di 14 giorni dalla data di conclusione del contratto. 
                Il recesso deve essere comunicato prima della consegna del gasolio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Come esercitare il diritto di recesso</h2>
              <p className="text-gray-700 leading-relaxed">
                Per esercitare il diritto di recesso, dovete inviarci una comunicazione scritta 
                all'indirizzo email: recesso@gasolio-veloce.it o per posta a:
                <br /><br />
                Gasolio Veloce S.r.l.<br />
                Via Roma 123<br />
                20121 Milano, Italia
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Widerrufsrecht;
