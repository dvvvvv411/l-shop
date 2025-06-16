
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import PriceCalculator from '../../components/v7/PriceCalculator';
import Footer from '../../components/Footer';
import { Droplet, Star, Shield } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';

const Home = () => {
  usePageMeta('home');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-gray-50 py-24 overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center bg-red-100 text-red-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <Droplet size={18} className="mr-2" />
                Belgies goedkoopste mazout service
                <Star size={16} className="ml-2 fill-current" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Mazout tegen de
                <span className="text-red-600 gradient-text"> beste prijs</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Bespaar tot <strong className="text-red-600">15% op uw mazoutaankoop</strong> door onze 
                rechtstreekse inkoop. Snelle levering binnen 2-4 werkdagen, beste kwaliteit, eerlijke prijzen.
              </p>
            </motion.div>
          </div>

          {/* Price Calculator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <PriceCalculator />
          </motion.div>

          {/* Enhanced Benefits Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-red-600 mb-2">2-4</div>
              <div className="text-gray-600 font-medium">Werkdagen levertijd</div>
              <div className="text-sm text-gray-500 mt-1">Heel België</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-red-600 mb-2">0€</div>
              <div className="text-gray-600 font-medium">Leveringskosten</div>
              <div className="text-sm text-gray-500 mt-1">Vanaf 3.000 liter</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-red-600 mb-2">25+</div>
              <div className="text-gray-600 font-medium">Jaar ervaring</div>
              <div className="text-sm text-gray-500 mt-1">Vertrouwt ons</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Waarom kiezen voor Mazout Vandaag?
            </h2>
            <p className="text-xl text-gray-600">
              Betrouwbare mazoutlevering door heel België
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplet className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium kwaliteit</h3>
              <p className="text-gray-600">
                Alleen de beste mazout voor optimale verwarming van uw woning.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Veilige betaling</h3>
              <p className="text-gray-600">
                SSL-versleutelde betalingen en transparante prijsstelling.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Uitstekende service</h3>
              <p className="text-gray-600">
                Persoonlijke begeleiding van bestelling tot levering.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
