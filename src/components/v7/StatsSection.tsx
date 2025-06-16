
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MapPin, Clock } from 'lucide-react';

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Waarom kiezen voor ons?
            </h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Cijfers die onze betrouwbaarheid en kwaliteit bewijzen
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
          >
            <TrendingUp className="h-12 w-12 text-red-200 mx-auto mb-4" />
            <div className="text-4xl font-bold mb-2">15%</div>
            <div className="text-red-100 font-medium">Gemiddelde besparing</div>
            <div className="text-sm text-red-200 mt-1">t.o.v. concurrentie</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
          >
            <Users className="h-12 w-12 text-red-200 mx-auto mb-4" />
            <div className="text-4xl font-bold mb-2">75.000+</div>
            <div className="text-red-100 font-medium">Tevreden klanten</div>
            <div className="text-sm text-red-200 mt-1">doorheen België</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
          >
            <MapPin className="h-12 w-12 text-red-200 mx-auto mb-4" />
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-red-100 font-medium">Belgische steden</div>
            <div className="text-sm text-red-200 mt-1">bezorgd</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
          >
            <Clock className="h-12 w-12 text-red-200 mx-auto mb-4" />
            <div className="text-4xl font-bold mb-2">2-4</div>
            <div className="text-red-100 font-medium">Werkdagen levering</div>
            <div className="text-sm text-red-200 mt-1">gegarandeerd</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
