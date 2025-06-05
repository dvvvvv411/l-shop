
import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Shield, Truck, Award } from 'lucide-react';

const trustElements = [
  {
    icon: Truck,
    title: "Österreichweite Lieferung",
    description: "Zuverlässige Lieferung in alle 9 Bundesländer binnen 2-5 Werktagen",
    color: "bg-violet-100 text-violet-600",
    delay: 0.1
  },
  {
    icon: Shield,
    title: "Österreichische Qualität",
    description: "ÖNORM-zertifiziertes Premium-Heizöl nach höchsten österreichischen Standards",
    color: "bg-amber-100 text-amber-600",
    delay: 0.2
  },
  {
    icon: Award,
    title: "25 Jahre Vertrauen",
    description: "Seit 1998 der verlässliche Heizöl-Partner für österreichische Haushalte",
    color: "bg-violet-100 text-violet-600",
    delay: 0.3
  },
  {
    icon: Mountain,
    title: "Alpine Herkunft",
    description: "Regionale Qualität aus österreichischen Quellen für österreichische Haushalte",
    color: "bg-amber-100 text-amber-600",
    delay: 0.4
  }
];

const TrustElements = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-violet-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-violet-100 to-amber-100 px-6 py-3 rounded-full mb-6">
            <Mountain className="h-5 w-5 text-violet-600 mr-2" />
            <span className="text-violet-800 font-semibold">Österreichisches Vertrauen</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Verlassen Sie sich auf unsere Expertise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Über 25 Jahre Erfahrung im österreichischen Heizölhandel - Ihre Zufriedenheit ist unser Erfolg
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustElements.map((element, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6,
                delay: element.delay,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-violet-100"
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-full mb-4 ${element.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <element.icon size={28} />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors duration-300">
                  {element.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {element.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Austrian trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600"
        >
          <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md border border-violet-100">
            <div className="flex space-x-1">
              <div className="w-3 h-2 bg-red-600 rounded-sm"></div>
              <div className="w-3 h-2 bg-white border border-gray-300 rounded-sm"></div>
              <div className="w-3 h-2 bg-red-600 rounded-sm"></div>
            </div>
            <span className="font-semibold text-violet-700">100% Österreich</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md border border-amber-100">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-amber-700">ÖNORM-zertifiziert</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md border border-violet-100">
            <div className="w-3 h-3 bg-violet-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-violet-700">Seit 1998 vertraut</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustElements;
