import React from 'react';
import { motion } from 'framer-motion';
import { Phone, HeartHandshake, Zap, MapPin } from 'lucide-react';

const trustElements = [
  {
    icon: Phone,
    title: "Persönlicher Service",
    description: "Direkte Beratung durch erfahrene Experten - kein Callcenter",
    color: "bg-emerald-100 text-emerald-600",
    delay: 0.1
  },
  {
    icon: HeartHandshake,
    title: "Kundenversprechen",
    description: "Faire Preise, pünktliche Lieferung und transparente Abwicklung",
    color: "bg-blue-100 text-blue-600",
    delay: 0.2
  },
  {
    icon: Zap,
    title: "Express-Service",
    description: "Notfall-Lieferung innerhalb von 24h bei kritischem Bedarf",
    color: "bg-amber-100 text-amber-600",
    delay: 0.3
  },
  {
    icon: MapPin,
    title: "Regional verwurzelt",
    description: "Lokaler Partner mit deutschlandweitem Servicenetz",
    color: "bg-purple-100 text-purple-600",
    delay: 0.4
  }
];

const TrustElements = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HeartHandshake size={16} className="mr-2" />
            Vertrauen durch Qualität
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Warum unsere Kunden uns <span className="text-blue-600">vertrauen</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Persönlicher Service und höchste Qualität stehen bei uns im Mittelpunkt. 
            Erleben Sie den Unterschied echter Kundenbetreuung.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustElements.map((element, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6,
                delay: element.delay,
                type: "spring",
                stiffness: 120
              }}
              whileHover={{ 
                y: -8,
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-white/50"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative text-center">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className={`inline-flex p-4 rounded-2xl mb-4 ${element.color} group-hover:shadow-lg transition-all duration-300`}
                >
                  <element.icon size={32} strokeWidth={2} />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {element.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {element.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-6 text-sm"
        >
          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-white/50">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-slate-700">Sofortige Beratung verfügbar</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-white/50">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-slate-700">Persönlicher Ansprechpartner</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-white/50">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-slate-700">Regionale Nähe, nationale Reichweite</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustElements;
