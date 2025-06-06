
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/v4/Header';
import Footer from '@/components/v4/Footer';
import PriceCalculator from '@/components/v4/PriceCalculator';
import StatsSection from '@/components/v4/StatsSection';
import WhyChooseUs from '@/components/v4/WhyChooseUs';
import CustomerReviews from '@/components/v4/CustomerReviews';
import FrenchRegionsMap from '@/components/v4/FrenchRegionsMap';
import { Zap, Award } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';

const Home = () => {
  usePageMeta('home');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-slate-50 to-orange-50 py-20 overflow-hidden">
        {/* Minimalist Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-red-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center bg-gradient-to-r from-red-100 to-orange-100 text-slate-700 px-5 py-2 rounded-full text-sm font-medium mb-8">
                <Zap size={16} className="mr-2" />
                Solutions énergétiques premium depuis 1995
                <Award size={14} className="ml-2" />
              </div>
              <h1 className="text-4xl md:text-6xl font-light text-slate-800 mb-6 leading-tight">
                Énergie pour votre 
                <span className="font-semibold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"> foyer</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Livraison professionnelle de fioul avec <strong className="text-red-600">30 ans d'expérience</strong>. 
                Qualité excellente, prix transparents et service personnel pour votre confort.
              </p>
            </motion.div>
          </div>

          {/* Price Calculator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <PriceCalculator />
          </motion.div>

          {/* Enhanced Benefits Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="text-2xl font-light text-red-600 mb-1">Rapide</div>
              <div className="text-slate-600 font-medium">Livraison Express</div>
              <div className="text-xs text-slate-500 mt-1">En 24-48h</div>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="text-2xl font-light text-orange-600 mb-1">Premium</div>
              <div className="text-slate-600 font-medium">Qualité maximale</div>
              <div className="text-xs text-slate-500 mt-1">Certifié & testé</div>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="text-2xl font-light text-red-600 mb-1">Service</div>
              <div className="text-slate-600 font-medium">Accompagnement personnel</div>
              <div className="text-xs text-slate-500 mt-1">8h-18h quotidien</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Sections */}
      <StatsSection />
      <WhyChooseUs />
      <FrenchRegionsMap />
      <CustomerReviews />
      <Footer />
    </div>
  );
};

export default Home;
