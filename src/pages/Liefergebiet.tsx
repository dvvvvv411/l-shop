
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DeliveryMap from '../components/DeliveryMap';
import { MapPin, Clock, Truck, Euro } from 'lucide-react';

const Liefergebiet = () => {
  const deliveryZones = [
    {
      zone: "Zone 1",
      states: ["Nordrhein-Westfalen", "Hessen", "Rheinland-Pfalz"],
      deliveryTime: "24-48h",
      minOrder: "1.000 Liter",
      deliveryCost: "Kostenlos ab 3.000L"
    },
    {
      zone: "Zone 2", 
      states: ["Bayern", "Baden-Württemberg", "Saarland"],
      deliveryTime: "48-72h",
      minOrder: "1.500 Liter",
      deliveryCost: "Kostenlos ab 3.000L"
    },
    {
      zone: "Zone 3",
      states: ["Niedersachsen", "Bremen", "Hamburg", "Schleswig-Holstein"],
      deliveryTime: "48-72h", 
      minOrder: "2.000 Liter",
      deliveryCost: "Kostenlos ab 4.000L"
    },
    {
      zone: "Zone 4",
      states: ["Berlin", "Brandenburg", "Sachsen", "Sachsen-Anhalt", "Thüringen", "Mecklenburg-Vorpommern"],
      deliveryTime: "72-96h",
      minOrder: "2.500 Liter",
      deliveryCost: "Kostenlos ab 5.000L"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-red-100 text-red-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <MapPin size={18} className="mr-2" />
              Deutschland-weite Lieferung
              <Truck size={16} className="ml-2" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Unser <span className="text-red-600">Liefergebiet</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Zuverlässige Heizöl-Lieferung in ganz Deutschland - 
              schnell, sicher und zu fairen Konditionen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Liefergebiete in Deutschland
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Klicken Sie auf die Karte, um detaillierte Informationen zu Ihrem Liefergebiet zu erhalten
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <DeliveryMap />
          </motion.div>
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Lieferzonen & Konditionen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Übersicht über unsere Liefergebiete und die jeweiligen Konditionen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {deliveryZones.map((zone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{zone.zone}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {zone.states.map((state, stateIndex) => (
                      <span key={stateIndex} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                        {state}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="text-red-600 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-semibold">Lieferzeit</div>
                      <div className="text-gray-600">{zone.deliveryTime}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Truck className="text-red-600 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-semibold">Mindestbestellung</div>
                      <div className="text-gray-600">{zone.minOrder}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Euro className="text-red-600 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-semibold">Lieferkosten</div>
                      <div className="text-gray-600">{zone.deliveryCost}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Prüfen Sie Ihr Liefergebiet
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Geben Sie Ihre Postleitzahl ein und erfahren Sie sofort, 
              wann wir zu Ihnen liefern können.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Ihre Postleitzahl eingeben..."
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 font-medium"
              />
              <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Prüfen
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Liefergebiet;
