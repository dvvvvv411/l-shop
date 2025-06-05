
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
import { Mountain, Shield, Clock, Award, Sparkles, Star } from 'lucide-react';

const Home = () => {
  useDomainPageMeta('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Header />
      
      {/* Redesigned Hero Section with Integrated Price Calculator */}
      <section className="relative overflow-hidden py-16">
        {/* Enhanced Background with Austrian Alpine Theme */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/8 to-purple-800/8" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-amber-300/10 to-transparent" />
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-400/15 to-purple-600/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-violet-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-300/8 to-violet-500/8 rounded-full blur-3xl animate-pulse delay-500" />
          
          {/* Geometric Elements */}
          <motion.div
            animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/6 w-4 h-4 bg-gradient-to-br from-violet-400 to-purple-600 rounded transform rotate-45 opacity-20"
          />
          <motion.div
            animate={{ y: [30, -30, 30], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-3/4 right-1/4 w-6 h-6 bg-gradient-to-br from-amber-400 to-violet-600 rounded-full opacity-15"
          />
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
                className="inline-flex items-center bg-gradient-to-r from-violet-100 via-purple-50 to-amber-100 border border-violet-200/50 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm"
              >
                <Mountain className="h-5 w-5 text-violet-600 mr-3" />
                <span className="text-violet-800 font-semibold">Premium Heizöl für Österreich</span>
                <Sparkles className="h-4 w-4 text-amber-500 ml-3" />
              </motion.div>
              
              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Heizöl zum 
                  <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-amber-500 bg-clip-text text-transparent"> Bestpreis</span>
                  <br />
                  in ganz <span className="text-violet-700">Österreich</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Günstige Heizöl-Lieferung von den Alpen bis ins Burgenland. 
                  Schnell, zuverlässig und mit österreichischer Premium-Qualität seit über 25 Jahren.
                </p>
              </motion.div>
              
              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-violet-200/30 shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">100% österreichische Qualität</div>
                    <div className="text-sm text-gray-600">ÖNORM-zertifiziert</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-200/30 shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">2-5 Tage Express</div>
                    <div className="text-sm text-gray-600">Schnelle Lieferung</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-violet-200/30 shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Seit 1998 vertraut</div>
                    <div className="text-sm text-gray-600">25+ Jahre Erfahrung</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-200/30 shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-white fill-current" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">4.9/5 Sterne</div>
                    <div className="text-sm text-gray-600">Kundenbewertung</div>
                  </div>
                </div>
              </motion.div>

              {/* Austrian Heritage Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center space-x-4 pt-4"
              >
                <div className="flex space-x-1 shadow-lg rounded-md overflow-hidden">
                  <div className="w-8 h-6 bg-red-600"></div>
                  <div className="w-8 h-6 bg-white border-x border-gray-200"></div>
                  <div className="w-8 h-6 bg-red-600"></div>
                </div>
                <div>
                  <div className="text-gray-800 font-bold">Österreichisches Traditionsunternehmen</div>
                  <div className="text-sm text-gray-600">Qualität aus dem Herzen Europas</div>
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
              
              {/* Decorative elements around calculator */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-violet-200 to-purple-300 rounded-full opacity-40 blur-xl" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tl from-amber-200 to-yellow-300 rounded-full opacity-30 blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section with Austrian Theme */}
      <section className="py-12 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-700 relative overflow-hidden">
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
                Österreichs vertrauensvoller Heizöl-Partner
              </h2>
              <Mountain className="h-8 w-8 text-white ml-3" />
            </div>
            <p className="text-xl text-violet-100 max-w-4xl mx-auto leading-relaxed">
              Von Wien bis Innsbruck, von Salzburg bis Graz - wir beliefern alle Bundesländer 
              mit Premium-Heizöl zu fairen Preisen. Vertrauen Sie auf österreichische Qualität und Service.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">9</div>
                <div className="text-violet-200 font-medium">Bundesländer</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50k+</div>
                <div className="text-violet-200 font-medium">Zufriedene Kunden</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">25+</div>
                <div className="text-violet-200 font-medium">Jahre Erfahrung</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">99%</div>
                <div className="text-violet-200 font-medium">Pünktliche Lieferung</div>
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
      <AustrianHeatingAtlas />
      
      <Footer />
    </div>
  );
};

export default Home;
