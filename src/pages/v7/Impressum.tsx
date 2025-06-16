
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import Footer from '../../components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const Impressum = () => {
  usePageMeta('impressum');

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
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Wettelijke informatie</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Bedrijfsgegevens</h2>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Bedrijfsnaam:</strong> Mazout Vandaag BVBA</p>
                  <p><strong>Adres:</strong> Voorbeeldstraat 123, 1000 Brussel, België</p>
                  <p><strong>BTW-nummer:</strong> BE 0123.456.789</p>
                  <p><strong>Ondernemingsnummer:</strong> 0123.456.789</p>
                  <p><strong>Telefoon:</strong> +32 2 123 4567</p>
                  <p><strong>E-mail:</strong> info@mazoutvandaag.com</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Geschäftsführung</h2>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Zaakvoerder:</strong> Jan Janssen</p>
                  <p><strong>Handelsregister:</strong> Brussel</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Verantwoordelijk voor de inhoud</h2>
                <div className="space-y-2 text-gray-700">
                  <p>Mazout Vandaag BVBA</p>
                  <p>Voorbeeldstraat 123</p>
                  <p>1000 Brussel, België</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Aufsichtsbehörde</h2>
                <div className="space-y-2 text-gray-700">
                  <p>FOD Economie, KMO, Middenstand en Energie</p>
                  <p>Dienst Mededinging en Handelspraktijken</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Haftungsausschluss</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    De informatie op deze website wordt met de grootste zorgvuldigheid samengesteld. 
                    Desondanks kunnen wij geen garantie geven voor de volledigheid, juistheid of actualiteit 
                    van de verstrekte informatie.
                  </p>
                  <p>
                    Onze website bevat links naar externe websites van derden. Wij hebben geen invloed 
                    op de inhoud van deze websites en zijn daarom niet verantwoordelijk voor hun inhoud.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Urheberrecht</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Alle inhoud op deze website, inclusief teksten, afbeeldingen, grafieken en lay-out, 
                    is beschermd door auteursrecht en eigendom van Mazout Vandaag BVBA of haar partners.
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

export default Impressum;
