
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Truck, Clock, Crown, Gem } from 'lucide-react';
import Header from '@/components/v2/Header';
import Footer from '@/components/Footer';

const Service = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 text-yellow-400 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Crown size={18} className="mr-2" />
              VIP-Service & Premium-Qualität
            </div>
            <h1 className="text-4xl font-bold text-white mb-8">
              Exklusiver <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Premium-Service</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all"
            >
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-yellow-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">Premium-Exzellenz</h2>
              </div>
              <p className="text-gray-300">
                Unser VIP-Heizöl übertrifft alle Standards und wird von internationalen 
                Premium-Instituten zertifiziert. Exklusiv nach höchsten Qualitätsrichtlinien.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all"
            >
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-yellow-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">VIP-Zertifizierung</h2>
              </div>
              <p className="text-gray-300">
                Alle unsere Premium-Produkte sind exklusiv VIP-zertifiziert und entsprechen den 
                strengsten internationalen Luxus- und Qualitätsrichtlinien.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all"
            >
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-yellow-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">Luxus-Lieferservice</h2>
              </div>
              <p className="text-gray-300">
                Express-Lieferung durch speziell geschulte VIP-Fahrer mit 
                modernsten Premium-Tankfahrzeugen der Luxusklasse.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all"
            >
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-yellow-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">24/7 VIP-Betreuung</h2>
              </div>
              <p className="text-gray-300">
                Ihr persönlicher Premium-Kundenberater steht Ihnen rund um die Uhr 
                zur Verfügung. Exklusiver VIP-Service auch außerhalb der Geschäftszeiten.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Unsere Premium-Zertifikate</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 p-4 rounded-2xl mb-3 inline-block">
                  <Shield className="h-12 w-12 text-yellow-400" />
                </div>
                <h3 className="font-semibold text-white">VIP-Premium</h3>
                <p className="text-sm text-gray-300">Exklusive Qualitätsnorm</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 p-4 rounded-2xl mb-3 inline-block">
                  <Award className="h-12 w-12 text-yellow-400" />
                </div>
                <h3 className="font-semibold text-white">Luxus-Gütezeichen</h3>
                <p className="text-sm text-gray-300">Premium-gesicherte Qualität</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 p-4 rounded-2xl mb-3 inline-block">
                  <Gem className="h-12 w-12 text-yellow-400" />
                </div>
                <h3 className="font-semibold text-white">VIP Excellence</h3>
                <p className="text-sm text-gray-300">Exklusives Qualitätsmanagement</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Service;
