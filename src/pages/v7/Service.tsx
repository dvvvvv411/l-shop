
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import Footer from '../../components/Footer';
import { Shield, Truck, Award, Users } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';

const Service = () => {
  usePageMeta('service');

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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Service & Kwaliteit</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek waarom duizenden Belgen vertrouwen op Mazout Vandaag voor hun mazoutlevering
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium kwaliteit</h3>
              <p className="text-gray-600">Alleen de beste mazout volgens Belgische normen</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Snelle levering</h3>
              <p className="text-gray-600">2-4 werkdagen door heel België</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Beste prijzen</h3>
              <p className="text-gray-600">Directe inkoop = beste prijzen voor u</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Persoonlijke service</h3>
              <p className="text-gray-600">Van bestelling tot levering, wij begeleiden u</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Onze belofte aan u</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Kwaliteit gegarandeerd</h3>
                <p className="text-gray-600 leading-relaxed">
                  Alle mazout wordt gecontroleerd volgens strenge kwaliteitsnormen. 
                  Wij garanderen dat u alleen de beste brandstof ontvangt.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparante prijzen</h3>
                <p className="text-gray-600 leading-relaxed">
                  Geen verborgen kosten, geen verrassingen. Wat u ziet is wat u betaalt. 
                  Gratis levering vanaf 3.000 liter.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Betrouwbare levering</h3>
                <p className="text-gray-600 leading-relaxed">
                  Punctuele levering binnen 2-4 werkdagen. Onze chauffeurs nemen vooraf 
                  contact op voor een afspraak.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibeld text-gray-900 mb-4">Uitstekende service</h3>
                <p className="text-gray-600 leading-relaxed">
                  Persoonlijke begeleiding van ervaren professionals. 
                  Bereikbaar voor advies ma-vr 8-18u.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Service;
