
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v6/Header';
import PriceCalculator from '../../components/PriceCalculator';
import TrustElements from '../../components/TrustElements';
import StatsSection from '../../components/StatsSection';
import ProductComparison from '../../components/ProductComparison';
import WhyChooseUs from '../../components/WhyChooseUs';
import HowItWorks from '../../components/HowItWorks';
import FAQ from '../../components/FAQ';
import Footer from '../../components/Footer';
import { Sun, Star } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';

const Home = () => {
  usePageMeta('home');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-50 py-24 overflow-hidden">
        {/* Enhanced Background Pattern with Malta-themed Animation */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full blur-3xl malta-sun-animation"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-400 rounded-full blur-3xl malta-sun-animation-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-300 rounded-full blur-3xl wave-animation"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-400 rounded-full opacity-30 malta-float-1"></div>
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-red-500 rounded-full opacity-20 malta-float-2"></div>
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-red-600 rounded-full opacity-25 malta-float-3"></div>
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
                <Sun size={18} className="mr-2" />
                Malta's Premium Heating Oil Service
                <Star size={16} className="ml-2 fill-current" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Heating Oil at
                <span className="text-red-600 gradient-text"> Best Prices</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Save up to <strong className="text-red-600">15% on heating oil purchases</strong> through our 
                direct sourcing. Fast delivery in 4-7 working days, best quality, fair prices across Malta.
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
              <div className="text-3xl font-bold text-red-600 mb-2">4-7</div>
              <div className="text-gray-600 font-medium">Working Days Delivery</div>
              <div className="text-sm text-gray-500 mt-1">Across Malta</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-red-600 mb-2">€0</div>
              <div className="text-gray-600 font-medium">Delivery Fees</div>
              <div className="text-sm text-gray-500 mt-1">From 3,000 Litres</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-red-600 mb-2">5,000+</div>
              <div className="text-gray-600 font-medium">Satisfied Customers</div>
              <div className="text-sm text-gray-500 mt-1">Trust Us in Malta</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Trust Elements Section */}
      <TrustElements />

      {/* All Other Sections */}
      <StatsSection />
      <ProductComparison />
      <WhyChooseUs />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
