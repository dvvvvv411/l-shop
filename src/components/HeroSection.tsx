
import React from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingDown, Shield, Star } from 'lucide-react';
import PriceCalculator from './PriceCalculator';
import HeroBackground from './HeroBackground';
import TrustBadges from './TrustBadges';
import BenefitsBar from './BenefitsBar';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-gray-50 py-24 overflow-hidden">
      <HeroBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-red-100 text-red-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Flame size={18} className="mr-2" />
              Deutschlands günstigster Heizöl-Service
              <Star size={16} className="ml-2 fill-current" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Heizöl zum
              <span className="text-red-600 gradient-text"> Bestpreis</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Sparen Sie bis zu <strong className="text-red-600">15% beim Heizöl-Kauf</strong> durch unseren 
              direkten Einkauf. Schnelle Lieferung in 24-48h, beste Qualität, faire Preise.
            </p>
          </motion.div>

          <TrustBadges />
        </div>

        {/* Price Calculator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <PriceCalculator />
        </motion.div>

        <BenefitsBar />
      </div>
    </section>
  );
};

export default HeroSection;
