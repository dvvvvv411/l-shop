
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import Footer from '../../components/Footer';
import { MapPin, Truck, Clock, Phone } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';

const Liefergebiet = () => {
  usePageMeta('liefergebiet');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Leveringsgebieden</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Betrouwbare mazoutlevering door heel België
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Waar leveren wij?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Heel België</h3>
                    <p className="text-gray-600">
                      Wij leveren mazout in alle Belgische provincies en gemeenten.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Truck className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Gratis levering</h3>
                    <p className="text-gray-600">
                      Vanaf 3.000 liter leveren wij gratis aan huis door heel België.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Snelle levering</h3>
                    <p className="text-gray-600">
                      2-4 werkdagen levertijd, afhankelijk van uw locatie.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Vooraf contact</h3>
                    <p className="text-gray-600">
                      Onze chauffeurs bellen u op de leveringsdag voor een afspraak.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Leveringsinformatie</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Minimum bestelling</h3>
                  <p className="text-gray-600">500 liter (leveringskosten €89 onder 3.000L)</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Maximum bestelling</h3>
                  <p className="text-gray-600">10.000 liter per levering</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Leveringsdagen</h3>
                  <p className="text-gray-600">Maandag t/m vrijdag (8:00 - 17:00)</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Betaling</h3>
                  <p className="text-gray-600">Vooruitbetaling via bankoverschrijving</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tank toegankelijkheid</h3>
                  <p className="text-gray-600">
                    Zorg ervoor dat uw mazou tank toegankelijk is voor onze tankwagen.
                    Maximum afstand: 30 meter vanaf de openbare weg.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg shadow-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Klaar om te bestellen?</h2>
            <p className="text-xl mb-6">
              Bereken uw prijs en plaats uw bestelling in enkele minuten
            </p>
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Naar prijscalculator
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Liefergebiet;
