
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v2/Header';
import PriceCalculator from '../../components/PriceCalculator';
import TrustElements from '../../components/TrustElements';
import StatsSection from '../../components/StatsSection';
import ProductComparison from '../../components/ProductComparison';
import WhyChooseUs from '../../components/WhyChooseUs';
import HowItWorks from '../../components/HowItWorks';
import FAQ from '../../components/FAQ';
import Footer from '../../components/Footer';
import { Crown, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 py-24 overflow-hidden">
        {/* Enhanced Background Pattern with Premium Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500 rounded-full blur-3xl premium-glow-animation"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-yellow-400 rounded-full blur-3xl premium-glow-animation-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300 rounded-full blur-3xl premium-wave-animation"></div>
        </div>

        {/* Floating premium elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-40 premium-float-1"></div>
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-yellow-500 rounded-full opacity-30 premium-float-2"></div>
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-yellow-600 rounded-full opacity-35 premium-float-3"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 text-yellow-400 px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <Crown size={18} className="mr-2" />
                Deutschlands exklusivster Premium-Service
                <Star size={16} className="ml-2 fill-current" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Premium Heizöl
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"> Exklusiv</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Erleben Sie <strong className="text-yellow-400">exklusiven Premium-Service</strong> mit unserem 
                VIP-Heizöl-Programm. Persönliche Betreuung, höchste Qualität, bevorzugte Lieferung.
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

          {/* Enhanced Premium Benefits Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center p-6 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all">
              <div className="text-3xl font-bold text-yellow-400 mb-2">24h</div>
              <div className="text-gray-300 font-medium">Express-Lieferung</div>
              <div className="text-sm text-gray-400 mt-1">VIP-Kunden</div>
            </div>
            <div className="text-center p-6 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all">
              <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-gray-300 font-medium">Premium Qualität</div>
              <div className="text-sm text-gray-400 mt-1">Garantiert</div>
            </div>
            <div className="text-center p-6 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all">
              <div className="text-3xl font-bold text-yellow-400 mb-2">VIP</div>
              <div className="text-gray-300 font-medium">Persönlicher Service</div>
              <div className="text-sm text-gray-400 mt-1">Exklusiv für Sie</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dark theme sections with premium styling */}
      <div className="bg-slate-900">
        <TrustElements />
        <StatsSection />
        <ProductComparison />
        <WhyChooseUs />
        <HowItWorks />
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
