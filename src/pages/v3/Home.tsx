
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/v3/Header';
import Footer from '@/components/v3/Footer';
import PriceCalculator from '@/components/v3/PriceCalculator';
import StatsSection from '@/components/v3/StatsSection';
import WhyChooseUs from '@/components/v3/WhyChooseUs';
import AustrianHeatingAtlas from '@/components/v3/AustrianHeatingAtlas';
import TrustElements from '@/components/v3/TrustElements';
import CustomerReviews from '@/components/v3/CustomerReviews';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';
import { Mountain, Shield, Clock, Award } from 'lucide-react';

const Home = () => {
  useDomainPageMeta('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section with Austrian Alpine Theme */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-800/10" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center bg-gradient-to-r from-violet-100 to-amber-100 px-4 py-2 rounded-full">
                <Mountain className="h-5 w-5 text-violet-600 mr-2" />
                <span className="text-violet-800 font-medium">Premium Heizöl für Österreich</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Heizöl zum 
                <span className="bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent"> Bestpreis</span>
                <br />
                in ganz Österreich
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Günstige Heizöl-Lieferung von den Alpen bis ins Burgenland. 
                Schnell, zuverlässig und mit österreichischer Qualität seit über 25 Jahren.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-violet-600" />
                  <span className="text-gray-700">100% österreichische Qualität</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <span className="text-gray-700">2-5 Tage Express-Lieferung</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-violet-600" />
                  <span className="text-gray-700">Seit 1998 vertraut</span>
                </div>
              </div>

              {/* Austrian flag accent */}
              <div className="flex items-center space-x-3 pt-4">
                <div className="flex space-x-1">
                  <div className="w-8 h-6 bg-red-600 rounded-sm shadow-sm"></div>
                  <div className="w-8 h-6 bg-white border border-gray-200 rounded-sm shadow-sm"></div>
                  <div className="w-8 h-6 bg-red-600 rounded-sm shadow-sm"></div>
                </div>
                <span className="text-gray-700 font-semibold">Österreichisches Traditionsunternehmen</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <PriceCalculator />
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-violet-200 to-purple-300 rounded-full opacity-60 blur-xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-tl from-amber-200 to-yellow-300 rounded-full opacity-40 blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Austrian Trust Section */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-purple-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Österreichs vertrauensvoller Heizöl-Partner
            </h2>
            <p className="text-xl text-violet-100 max-w-3xl mx-auto">
              Von Wien bis Innsbruck, von Salzburg bis Graz - wir beliefern alle Bundesländer 
              mit Premium-Heizöl zu fairen Preisen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      
      {/* Trust Elements */}
      <TrustElements />
      
      {/* Customer Reviews */}
      <CustomerReviews />
      
      {/* Austrian Heating Atlas Section - Replaces FAQ */}
      <AustrianHeatingAtlas />
      
      <Footer />
    </div>
  );
};

export default Home;
