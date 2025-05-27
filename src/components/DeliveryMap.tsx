
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Check } from 'lucide-react';

const DeliveryMap = () => {
  const regions = [
    { name: "Baden-Württemberg", available: true },
    { name: "Bayern", available: true },
    { name: "Berlin", available: true },
    { name: "Brandenburg", available: true },
    { name: "Bremen", available: true },
    { name: "Hamburg", available: true },
    { name: "Hessen", available: true },
    { name: "Mecklenburg-Vorpommern", available: true },
    { name: "Niedersachsen", available: true },
    { name: "Nordrhein-Westfalen", available: true },
    { name: "Rheinland-Pfalz", available: true },
    { name: "Saarland", available: true },
    { name: "Sachsen", available: true },
    { name: "Sachsen-Anhalt", available: true },
    { name: "Schleswig-Holstein", available: true },
    { name: "Thüringen", available: true }
  ];

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
            Unsere Liefergebiete
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wir liefern deutschlandweit in alle Bundesländer - schnell, zuverlässig und zum Bestpreis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-red-50 to-gray-100 rounded-2xl p-8 shadow-lg">
              <div className="flex justify-center items-center h-96">
                <div className="text-center">
                  <MapPin className="text-red-600 mx-auto mb-4" size={64} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Deutschlandweite Lieferung
                  </h3>
                  <p className="text-gray-600">
                    Von Nord bis Süd - wir beliefern ganz Deutschland
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Regions List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Alle Bundesländer im Überblick
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {regions.map((region, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Check className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-900 font-medium">{region.name}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">
                  Schnelle Lieferzeiten garantiert
                </h4>
                <p className="text-red-700 text-sm">
                  • 24-48h Lieferung in alle Regionen<br/>
                  • Kostenlose Anfahrt ab 3.000L<br/>
                  • Flexible Terminvereinbarung
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Prüfen Sie jetzt, ob wir auch in Ihrer Region liefern
          </p>
          <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl">
            PLZ prüfen
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default DeliveryMap;
