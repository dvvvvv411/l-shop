
import React from 'react';
import { Shield, Truck, Award, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const trustFeatures = [{
  icon: Shield,
  title: "Premium Qualität",
  description: "DIN-zertifiziertes Heizöl nach höchsten Standards",
  color: "bg-blue-100 text-blue-600"
}, {
  icon: Truck,
  title: "Schnelle Lieferung",
  description: "Zuverlässige Lieferung binnen 4-7 Werktagen",
  color: "bg-green-100 text-green-600"
}, {
  icon: Award,
  title: "Beste Preise",
  description: "Garantiert günstige Preise durch direkten Einkauf",
  color: "bg-yellow-100 text-yellow-600"
}, {
  icon: Headphones,
  title: "Top Service",
  description: "Persönliche Beratung und 24/7 Kundenservice",
  color: "bg-red-100 text-red-600"
}];

const TrustSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Vertrauen Sie auf Qualität
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ihre Zufriedenheit ist unser Erfolg - darauf können Sie sich verlassen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full ${feature.color}`}>
                  <feature.icon size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
