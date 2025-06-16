
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import Footer from '../../components/Footer';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';

const Kontakt = () => {
  usePageMeta('kontakt');

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
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contactgegevens</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Telefoon</h3>
                      <p className="text-gray-600">+32 2 123 4567</p>
                      <p className="text-sm text-gray-500">Gratis advies ma-vr 8-18u</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">E-mail</h3>
                      <p className="text-gray-600">info@mazoutvandaag.com</p>
                      <p className="text-sm text-gray-500">Antwoord binnen 24u</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Adres</h3>
                      <p className="text-gray-600">
                        Voorbeeldstraat 123<br />
                        1000 Brussel<br />
                        België
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Openingstijden</h3>
                      <p className="text-gray-600">
                        Maandag - Vrijdag: 8:00 - 18:00<br />
                        Zaterdag: 9:00 - 16:00<br />
                        Zondag: Gesloten
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Snel bestellen</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Bereken direct uw mazoutprijs en plaats uw bestelling online.
                  </p>
                  <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    Naar prijscalculator
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Waarom Mazout Vandaag?</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                      Beste prijzen in België
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                      Snelle levering 2-4 werkdagen
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                      Gratis levering vanaf 3.000L
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                      25+ jaar ervaring
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Kontakt;
