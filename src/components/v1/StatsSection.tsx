
import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    number: "150.000+",
    label: "Zufriedene Kunden",
    description: "Vertrauen unserem Service"
  },
  {
    number: "500.000+",
    label: "Liter geliefert",
    description: "Pro Monat deutschlandweit"
  },
  {
    number: "4-7",
    label: "Werktage",
    description: "Durchschnittliche Lieferzeit"
  },
  {
    number: "24/7",
    label: "Kundenservice",
    description: "Immer für Sie erreichbar"
  }
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-red-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Zahlen, die für sich sprechen
          </h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Unser Erfolg basiert auf Ihrer Zufriedenheit
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
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-red-100 mb-2">
                {stat.label}
              </div>
              <div className="text-red-200">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
