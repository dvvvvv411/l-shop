
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Truck, Euro, ChevronRight, CheckCircle } from 'lucide-react';

const DeliveryZoneExplorer = () => {
  const [selectedZone, setSelectedZone] = useState(0);

  const deliveryZones = [
    {
      zone: "Express Zone Nord",
      states: ["Hamburg", "Bremen", "Schleswig-Holstein", "Niedersachsen (Nord)"],
      deliveryTime: "24-48h",
      minOrder: "1.000 Liter",
      deliveryCost: "Kostenlos ab 2.500L",
      coverage: "Metropolregion Hamburg",
      features: ["Same-Day möglich", "Wochenend-Service", "Express-Hotline"]
    },
    {
      zone: "Express Zone West", 
      states: ["Nordrhein-Westfalen", "Hessen", "Rheinland-Pfalz"],
      deliveryTime: "24-48h",
      minOrder: "1.000 Liter",
      deliveryCost: "Kostenlos ab 2.500L",
      coverage: "Rhein-Ruhr-Gebiet",
      features: ["Industrie-Service", "Großkunden-Betreuung", "Flexible Termine"]
    },
    {
      zone: "Express Zone Süd",
      states: ["Bayern", "Baden-Württemberg", "Saarland"],
      deliveryTime: "48-72h",
      minOrder: "1.500 Liter",
      deliveryCost: "Kostenlos ab 3.000L",
      coverage: "München & Stuttgart",
      features: ["Alpen-Service", "Premium-Qualität", "Eco-Friendly"]
    },
    {
      zone: "Standard Zone Ost",
      states: ["Berlin", "Brandenburg", "Sachsen", "Sachsen-Anhalt", "Thüringen", "Mecklenburg-VP"],
      deliveryTime: "72-96h",
      minOrder: "2.000 Liter",
      deliveryCost: "Kostenlos ab 4.000L",
      coverage: "Ostdeutschland",
      features: ["Regionale Partner", "Flexible Mengen", "Persönliche Beratung"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light text-slate-800 mb-4">
            Lieferzonen & Konditionen
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Entdecken Sie unsere optimierten Lieferzonen mit spezialisierten Services 
            für jede Region Deutschlands
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Zone Selection */}
            <div className="lg:col-span-1">
              <div className="space-y-3">
                {deliveryZones.map((zone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedZone(index)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedZone === index
                        ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                        : 'bg-white hover:shadow-md border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{zone.zone}</h3>
                        <p className={`text-sm ${selectedZone === index ? 'text-blue-100' : 'text-slate-600'}`}>
                          {zone.coverage}
                        </p>
                      </div>
                      <ChevronRight size={20} className={selectedZone === index ? 'text-white' : 'text-slate-400'} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Zone Details */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedZone}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl p-8 shadow-lg"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                      {deliveryZones[selectedZone].zone}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {deliveryZones[selectedZone].states.map((state, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {state}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Clock className="text-blue-600" size={20} />
                        <div>
                          <div className="font-semibold text-slate-800">Lieferzeit</div>
                          <div className="text-slate-600">{deliveryZones[selectedZone].deliveryTime}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Truck className="text-blue-600" size={20} />
                        <div>
                          <div className="font-semibold text-slate-800">Mindestbestellung</div>
                          <div className="text-slate-600">{deliveryZones[selectedZone].minOrder}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Euro className="text-blue-600" size={20} />
                        <div>
                          <div className="font-semibold text-slate-800">Lieferkosten</div>
                          <div className="text-slate-600">{deliveryZones[selectedZone].deliveryCost}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <MapPin className="text-blue-600" size={20} />
                        <div>
                          <div className="font-semibold text-slate-800">Schwerpunkt</div>
                          <div className="text-slate-600">{deliveryZones[selectedZone].coverage}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Service-Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {deliveryZones[selectedZone].features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="text-emerald-600" size={16} />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryZoneExplorer;
