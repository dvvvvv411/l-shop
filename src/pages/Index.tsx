
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import PriceCalculator from '../components/PriceCalculator';
import TrustSection from '../components/TrustSection';
import Footer from '../components/Footer';
import { Flame, TrendingDown, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-gray-50 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Flame size={16} className="mr-2" />
                Deutschlands günstigster Heizöl-Service
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Heizöl zum
                <span className="text-red-600"> Bestpreis</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Sparen Sie bis zu <strong className="text-red-600">15% beim Heizöl-Kauf</strong> durch unseren 
                direkten Einkauf. Schnelle Lieferung, beste Qualität, faire Preise.
              </p>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center items-center space-x-8 mb-12 text-sm text-gray-600"
            >
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-green-600" />
                <span>DIN-zertifiziert</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingDown size={16} className="text-red-600" />
                <span>Bis zu 15% sparen</span>
              </div>
              <div className="flex items-center space-x-2">
                <Flame size={16} className="text-orange-600" />
                <span>Premium Qualität</span>
              </div>
            </motion.div>
          </div>

          {/* Price Calculator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PriceCalculator />
          </motion.div>

          {/* Benefits Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center p-4 bg-white rounded-lg shadow-md">
              <div className="text-2xl font-bold text-red-600 mb-1">24-48h</div>
              <div className="text-gray-600">Lieferzeit</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md">
              <div className="text-2xl font-bold text-red-600 mb-1">0€</div>
              <div className="text-gray-600">Anfahrtskosten</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md">
              <div className="text-2xl font-bold text-red-600 mb-1">25+</div>
              <div className="text-gray-600">Jahre Erfahrung</div>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustSection />
      <Footer />
    </div>
  );
};

export default Index;
