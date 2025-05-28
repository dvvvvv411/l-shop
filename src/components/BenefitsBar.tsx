
import React from 'react';
import { motion } from 'framer-motion';

const BenefitsBar = () => {
  const benefits = [
    {
      value: "24-48h",
      label: "Lieferzeit garantiert",
      sublabel: "Deutschlandweit"
    },
    {
      value: "0€",
      label: "Anfahrtskosten",
      sublabel: "Ab 3.000 Liter"
    },
    {
      value: "15.000+",
      label: "Zufriedene Kunden",
      sublabel: "Vertrauen uns"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
    >
      {benefits.map((benefit, index) => (
        <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-3xl font-bold text-red-600 mb-2">{benefit.value}</div>
          <div className="text-gray-600 font-medium">{benefit.label}</div>
          <div className="text-sm text-gray-500 mt-1">{benefit.sublabel}</div>
        </div>
      ))}
    </motion.div>
  );
};

export default BenefitsBar;
