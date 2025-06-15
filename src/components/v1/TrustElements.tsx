
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Truck, Clock } from 'lucide-react';

const TrustElements = () => {
  const trustItems = [
    {
      icon: Shield,
      title: "TÜV geprüft",
      description: "Höchste Qualitätsstandards"
    },
    {
      icon: Award,
      title: "15+ Jahre Erfahrung",
      description: "Bewährter Heizöl-Spezialist"
    },
    {
      icon: Truck,
      title: "Deutschlandweite Lieferung",
      description: "Zuverlässig und pünktlich"
    },
    {
      icon: Clock,
      title: "Schnelle Abwicklung",
      description: "Online bestellen, schnell geliefert"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vertrauen Sie auf unsere Expertise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Über 150.000 zufriedene Kunden vertrauen bereits auf unseren Service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <item.icon className="text-red-600" size={24} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustElements;
