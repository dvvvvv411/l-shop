
import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Users, Award, Truck } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Mountain,
      number: "1,8 Mio.",
      label: "Liter jährlich",
      description: "Heizöl in ganz Österreich geliefert",
      gradient: "from-violet-600 to-purple-700"
    },
    {
      icon: Users,
      number: "85.000+",
      label: "Österreichische Kunden",
      description: "Vertrauen auf unseren Service",
      gradient: "from-amber-500 to-yellow-600"
    },
    {
      icon: Award,
      number: "25+",
      label: "Jahre Erfahrung",
      description: "Verlässlicher Partner seit 1998",
      gradient: "from-violet-600 to-purple-700"
    },
    {
      icon: Truck,
      number: "2-5",
      label: "Werktage Lieferzeit",
      description: "Schnell in alle Bundesländer",
      gradient: "from-amber-500 to-yellow-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-violet-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-violet-100 to-amber-100 px-6 py-3 rounded-full mb-6">
            <Mountain className="h-5 w-5 text-violet-600 mr-2" />
            <span className="text-violet-800 font-semibold">Österreichs Heizöl-Experte</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Zahlen & Fakten
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Von den Alpen bis zum Burgenland - Österreichs führender Heizöl-Lieferant mit bewährter Qualität
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Background gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className={`bg-gradient-to-r ${stat.gradient} p-4 rounded-full shadow-lg`}>
                    <stat.icon className="text-white" size={32} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Austrian flag accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex space-x-1">
              <div className="w-8 h-6 bg-red-600 rounded-sm"></div>
              <div className="w-8 h-6 bg-white border border-gray-200 rounded-sm"></div>
              <div className="w-8 h-6 bg-red-600 rounded-sm"></div>
            </div>
            <span className="text-gray-700 font-semibold">100% österreichische Qualität</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
