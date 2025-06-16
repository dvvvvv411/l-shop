
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import Footer from '../../components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const AGB = () => {
  usePageMeta('agb');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Algemene voorwaarden</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">§ 1 Toepassingsgebied</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Deze algemene voorwaarden zijn van toepassing op alle leveringen en diensten 
                    van Mazout Vandaag BVBA. Afwijkende voorwaarden van de klant worden alleen 
                    geaccepteerd als deze uitdrukkelijk schriftelijk zijn overeengekomen.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">§ 2 Aanbod en totstandkoming van het contract</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Onze aanbiedingen zijn vrijblijvend en onder voorbehoud van beschikbaarheid. 
                    Het contract komt tot stand door onze schriftelijke orderbevestiging of door 
                    de levering van de goederen.
                  </p>
                  <p>
                    Alle prijzen zijn inclusief BTW, tenzij anders vermeld. Prijswijzigingen 
                    blijven voorbehouden bij leveringen meer dan 4 weken na contractsluiting.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">§ 3 Prijzen en betaling</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    De vermelde prijzen zijn in euro en inclusief de wettelijke BTW. 
                    Betaling dient te geschieden vóór levering via bankoverschrijving.
                  </p>
                  <p>
                    Bij betalingsachterstand zijn wij gerechtigd om vertragingsrente 
                    van 1% per maand te berekenen.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">§ 4 Levering</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    De levering vindt plaats binnen 2-4 werkdagen na betalingsbevestiging. 
                    Leveringstermijnen zijn bij benadering en niet bindend, tenzij uitdrukkelijk 
                    anders overeengekomen.
                  </p>
                  <p>
                    Het leveringsrisico gaat over op de klant zodra de goederen aan 
                    de vervoerder zijn overgedragen.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibeld text-gray-900 mb-4">§ 5 Eigendomsvoorbehoud</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    De geleverde goederen blijven ons eigendom tot volledige betaling 
                    van alle vorderingen uit de leveringsovereenkomst.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">§ 6 Aansprakelijkheid</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Onze aansprakelijkheid is beperkt tot opzet en grove nalatigheid. 
                    Bij lichte nalatigheid zijn wij alleen aansprakelijk voor schade 
                    uit de schending van wezenlijke contractuele verplichtingen.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">§ 7 Toepasselijk recht</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Op alle contractuele betrekkingen is uitsluitend Belgisch recht van toepassing. 
                    Gerichtsstand is Brussel.
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AGB;
