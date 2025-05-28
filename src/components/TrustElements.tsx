
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Award, CreditCard, Map } from 'lucide-react';

const trustElements = [
  {
    icon: Truck,
    title: "Schnelle Lieferung",
    description: "Zuverlässige Lieferung in 4-7 Werktagen deutschlandweit",
    color: "bg-blue-100 text-blue-600",
    delay: 0.1
  },
  {
    icon: Award,
    title: "Geprüfte Qualität",
    description: "DIN-zertifiziertes Premium-Heizöl nach höchsten Standards",
    color: "bg-green-100 text-green-600",
    delay: 0.2
  },
  {
    icon: CreditCard,
    title: "Sichere Zahlung",
    description: "Flexible Zahlungsoptionen mit SSL-verschlüsselter Abwicklung",
    color: "bg-purple-100 text-purple-600",
    delay: 0.3
  },
  {
    icon: Map,
    title: "Deutschland-weit",
    description: "Flächendeckende Lieferung in alle deutschen Postleitzahlengebiete",
    color: "bg-orange-100 text-orange-600",
    delay: 0.4
  }
];

const TrustElements = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vertrauen Sie auf unsere Expertise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Über 25 Jahre Erfahrung im Heizölhandel - Ihre Zufriedenheit ist unser Erfolg
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
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-full mb-4 ${element.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <element.icon size={28} />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                  {element.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {element.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600"
        >
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold">24/7 Support</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="font-semibold">Kostenlose Beratung</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-semibold">Faire Preise garantiert</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustElements;
