
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Check } from 'lucide-react';

const DeliveryMap = () => {
  const regions = [{
    name: "Baden-Württemberg",
    available: true
  }, {
    name: "Bayern",
    available: true
  }, {
    name: "Berlin",
    available: true
  }, {
    name: "Brandenburg",
    available: true
  }, {
    name: "Bremen",
    available: true
  }, {
    name: "Hamburg",
    available: true
  }, {
    name: "Hessen",
    available: true
  }, {
    name: "Mecklenburg-Vorpommern",
    available: true
  }, {
    name: "Niedersachsen",
    available: true
  }, {
    name: "Nordrhein-Westfalen",
    available: true
  }, {
    name: "Rheinland-Pfalz",
    available: true
  }, {
    name: "Saarland",
    available: true
  }, {
    name: "Sachsen",
    available: true
  }, {
    name: "Sachsen-Anhalt",
    available: true
  }, {
    name: "Schleswig-Holstein",
    available: true
  }, {
    name: "Thüringen",
    available: true
  }];

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
            Deutschlandweite Lieferung
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wir liefern zuverlässig in alle deutschen Bundesländer
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regions.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg"
                >
                  <Check className="text-green-600 flex-shrink-0" size={16} />
                  <span className="text-sm font-medium text-gray-900">
                    {region.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center bg-red-100 text-red-700 px-6 py-3 rounded-full text-sm font-semibold">
              <MapPin size={18} className="mr-2" />
              Lieferung in 4-7 Werktagen
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryMap;
