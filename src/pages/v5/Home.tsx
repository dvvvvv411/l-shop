
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import PriceCalculator from '@/components/v5/PriceCalculator';
import StatsSection from '@/components/v5/StatsSection';
import WhyChooseUs from '@/components/v5/WhyChooseUs';
import TrustElements from '@/components/v5/TrustElements';
import CustomerReviews from '@/components/v5/CustomerReviews';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';
import { Mountain, Shield, Clock, Award, Sparkles, Star } from 'lucide-react';

const Home = () => {
  useDomainFavicon();
  useDomainPageMeta('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      <Header />
      
      {/* Simplified Hero Section with Clean Background */}
      <section className="relative overflow-hidden py-16">
        {/* Clean Italian-themed Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Simple gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-white/90 to-red-500/5" />
          
          {/* Subtle geometric pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)`,
              backgroundSize: '800px 800px'
            }} />
          </div>
          
          {/* Minimal floating elements */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-green-400/40 rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-red-400/30 rounded-full animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-green-200/60 px-6 py-3 rounded-full shadow-md"
              >
                <Mountain className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-800 font-semibold">Gasolio Premium per l'Italia</span>
                <Sparkles className="h-4 w-4 text-red-500 ml-3" />
              </motion.div>
              
              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Gasolio al 
                  <span className="bg-gradient-to-r from-green-600 via-red-600 to-green-500 bg-clip-text text-transparent"> miglior prezzo</span>
                  <br />
                  in tutta <span className="text-green-700">Italia</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Consegna economica di gasolio da riscaldamento dalle Alpi alla Sicilia. 
                  Veloce, affidabile e con qualità premium italiana da oltre 15 anni.
                </p>
              </motion.div>
              
              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-3 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-green-200/40 shadow-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">100% qualità italiana</div>
                    <div className="text-sm text-gray-600">Conforme EN 590</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-red-200/40 shadow-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-green-500 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">3-5 giorni Express</div>
                    <div className="text-sm text-gray-600">Consegna rapida</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-green-200/40 shadow-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Dal 2008 affidabili</div>
                    <div className="text-sm text-gray-600">15+ anni esperienza</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-red-200/40 shadow-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-white fill-current" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">4.9/5 stelle</div>
                    <div className="text-sm text-gray-600">Valutazione clienti</div>
                  </div>
                </div>
              </motion.div>

              {/* Italian Heritage Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center space-x-4 pt-4"
              >
                <div className="flex space-x-1 shadow-md rounded-md overflow-hidden">
                  <div className="w-8 h-6 bg-green-600"></div>
                  <div className="w-8 h-6 bg-white border-x border-gray-200"></div>
                  <div className="w-8 h-6 bg-red-600"></div>
                </div>
                <div>
                  <div className="text-gray-800 font-bold">Azienda tradizionale italiana</div>
                  <div className="text-sm text-gray-600">Qualità dal cuore del Mediterraneo</div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right Column - Price Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <PriceCalculator />
              
              {/* Subtle decorative elements around calculator */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-green-200/30 rounded-full blur-lg" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-red-200/20 rounded-full blur-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section with Italian Theme */}
      <section className="py-12 bg-gradient-to-r from-green-600 via-red-600 to-green-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <div className="flex items-center justify-center mb-4">
              <Mountain className="h-8 w-8 text-white mr-3" />
              <h2 className="text-3xl lg:text-4xl font-bold">
                Partner affidabile per il gasolio in Italia
              </h2>
              <Mountain className="h-8 w-8 text-white ml-3" />
            </div>
            <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              Da Milano a Palermo, da Roma a Venezia - serviamo tutte le regioni 
              con gasolio premium a prezzi equi. Affidatevi alla qualità e al servizio italiano.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">20</div>
                <div className="text-green-200 font-medium">Regioni</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">35k+</div>
                <div className="text-green-200 font-medium">Clienti soddisfatti</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-green-200 font-medium">Anni esperienza</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-green-200 font-medium">Consegna puntuale</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Other Sections */}
      <StatsSection />
      <WhyChooseUs />
      <TrustElements />
      <CustomerReviews />
      
      <Footer />
    </div>
  );
};

export default Home;
