
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/v4/Header';
import Footer from '@/components/v4/Footer';
import PriceCalculator from '@/components/v4/PriceCalculator';
import StatsSection from '@/components/v4/StatsSection';
import WhyChooseUs from '@/components/v4/WhyChooseUs';
import TrustElements from '@/components/v4/TrustElements';
import CustomerReviews from '@/components/v4/CustomerReviews';
import FrenchRegionsMap from '@/components/v4/FrenchRegionsMap';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex space-x-1">
                    <div className="w-4 h-3 bg-blue-600 rounded-sm"></div>
                    <div className="w-4 h-3 bg-white rounded-sm"></div>
                    <div className="w-4 h-3 bg-red-600 rounded-sm"></div>
                  </div>
                  <span className="text-xl font-semibold">Fuel Express France</span>
                </motion.div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Fioul de chauffage au
                  <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                    meilleur prix
                  </span>
                  en France
                </h1>
                
                <p className="text-xl lg:text-2xl text-red-100 leading-relaxed">
                  Qualité française premium depuis 1995. Livraison express dans toute la France métropolitaine.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex items-center space-x-3 text-red-100"
                >
                  <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-lg">Livraison en 24-48h</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex items-center space-x-3 text-red-100"
                >
                  <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-lg">Prix garantis compétitifs</span>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              id="calculator"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <PriceCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />
      
      {/* Why Choose Us */}
      <WhyChooseUs />
      
      {/* French Regions Map */}
      <FrenchRegionsMap />
      
      {/* Trust Elements */}
      <TrustElements />
      
      {/* Customer Reviews */}
      <CustomerReviews />
      
      <Footer />
    </div>
  );
};

export default Home;
