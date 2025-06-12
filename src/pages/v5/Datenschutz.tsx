
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Datenschutz = () => {
  useDomainFavicon();
  useDomainPageMeta('datenschutz');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Informativa sulla Privacy</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">1. Protezione dei dati personali</h2>
              <p className="text-gray-700 leading-relaxed">
                Gasolio Veloce S.r.l. rispetta la vostra privacy e si impegna a proteggere i vostri dati personali 
                in conformità al Regolamento Generale sulla Protezione dei Dati (GDPR) e alle leggi italiane 
                sulla privacy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">2. Dati raccolti</h2>
              <p className="text-gray-700 leading-relaxed">
                Raccogliamo solo i dati necessari per fornire i nostri servizi, inclusi nome, indirizzo, 
                telefono, email e informazioni di pagamento. I dati vengono utilizzati esclusivamente 
                per l'elaborazione degli ordini e la comunicazione con i clienti.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">3. I vostri diritti</h2>
              <p className="text-gray-700 leading-relaxed">
                Avete il diritto di accedere, rettificare, cancellare i vostri dati e di opporvi al loro 
                trattamento. Potete esercitare questi diritti contattandoci all'indirizzo 
                privacy@gasolio-veloce.it.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
