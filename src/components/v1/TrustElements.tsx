
import React from 'react';
import { Shield, Truck, Award, Clock, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const trustFeatures = [
  {
    icon: Shield,
    title: "DIN-Zertifiziert",
    description: "Premium Heizöl nach DIN 51603-1",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Truck,
    title: "Schnelle Lieferung",
    description: "4-7 Werktage deutschlandweit",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Award,
    title: "Beste Preise",
    description: "Bis zu 15% günstiger durch direkten Einkauf",
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Rund um die Uhr für Sie da",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Phone,
    title: "Persönliche Beratung",
    description: "Kompetente Fachberatung am Telefon",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: MapPin,
    title: "Deutschlandweit",
    description: "Lieferung in alle Bundesländer",
    color: "bg-indigo-100 text-indigo-600"
  }
];

const TrustElements = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Warum uns über 150.000 Kunden vertrauen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Zuverlässige Heizöl-Lieferung mit Service, der überzeugt
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

export default TrustElements;
