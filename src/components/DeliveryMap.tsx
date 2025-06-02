
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Check, Clock, Truck, ArrowRight } from 'lucide-react';

const DeliveryMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = [
    {
      name: "Baden-Württemberg",
      available: true,
      cities: ["Stuttgart", "Mannheim", "Karlsruhe", "Freiburg"],
      deliveryTime: "4-5 Werktage",
      coverage: "Vollständige Abdeckung"
    },
    {
      name: "Bayern",
      available: true,
      cities: ["München", "Nürnberg", "Augsburg", "Würzburg"],
      deliveryTime: "4-6 Werktage",
      coverage: "Vollständige Abdeckung"
    },
    {
      name: "Berlin",
      available: true,
      cities: ["Berlin"],
      deliveryTime: "5-7 Werktage",
      coverage: "Stadtgebiet & Umland"
    },
    {
      name: "Brandenburg",
      available: true,
      cities: ["Potsdam", "Cottbus", "Brandenburg"],
      deliveryTime: "5-7 Werktage",
      coverage: "Regionale Abdeckung"
    },
    {
      name: "Bremen",
      available: true,
      cities: ["Bremen", "Bremerhaven"],
      deliveryTime: "4-6 Werktage",
      coverage: "Vollständige Abdeckung"
    },
    {
      name: "Hamburg",
      available: true,
      cities: ["Hamburg"],
      deliveryTime: "4-5 Werktage",
      coverage: "Stadtgebiet & Umland"
    },
    {
      name: "Hessen",
      available: true,
      cities: ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt"],
      deliveryTime: "4-5 Werktage",
      coverage: "Vollständige Abdeckung"
    },
    {
      name: "Mecklenburg-Vorpommern",
      available: true,
      cities: ["Schwerin", "Rostock", "Stralsund"],
      deliveryTime: "6-7 Werktage",
      coverage: "Regionale Abdeckung"
    },
    {
      name: "Niedersachsen",
      available: true,
      cities: ["Hannover", "Braunschweig", "Osnabrück", "Oldenburg"],
      deliveryTime: "4-6 Werktage",
      coverage: "Vollständige Abdeckung"
    },
    {
      name: "Nordrhein-Westfalen",
      available: true,
      cities: ["Köln", "Düsseldorf", "Dortmund", "Essen"],
      deliveryTime: "4-5 Werktage",
      coverage: "Vollständige Abdeckung"
    },
    {
      name: "Rheinland-Pfalz",
      available: true,
      cities: ["Mainz", "Ludwigshafen", "Koblenz", "Trier"],
      deliveryTime: "4-6 Werktage",
      coverage: "Vollständige Abdeckung"
    },
    {
      name: "Saarland",
      available: true,
      cities: ["Saarbrücken", "Neunkirchen"],
      deliveryTime: "5-6 Werktage",
      coverage: "Vollständige Abdeckung"
    },
    {
      name: "Sachsen",
      available: true,
      cities: ["Dresden", "Leipzig", "Chemnitz"],
      deliveryTime: "5-7 Werktage",
      coverage: "Vollständige Abdeckung"
    },
    {
      name: "Sachsen-Anhalt",
      available: true,
      cities: ["Magdeburg", "Halle", "Dessau"],
      deliveryTime: "5-7 Werktage",
      coverage: "Regionale Abdeckung"
    },
    {
      name: "Schleswig-Holstein",
      available: true,
      cities: ["Kiel", "Lübeck", "Flensburg"],
      deliveryTime: "4-6 Werktage",
      coverage: "Vollständige Abdeckung"
    },
    {
      name: "Thüringen",
      available: true,
      cities: ["Erfurt", "Jena", "Gera", "Weimar"],
      deliveryTime: "5-7 Werktage",
      coverage: "Regionale Abdeckung"
    }
  ];

  const selectedRegionData = regions.find(r => r.name === selectedRegion);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
            Deutschlandweite <span className="font-semibold text-blue-600">Lieferung</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Wir liefern zuverlässig in alle deutschen Bundesländer. 
            Klicken Sie auf ein Bundesland für detaillierte Informationen.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Region List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <MapPin className="text-blue-600 mr-2" size={20} />
                  Bundesländer
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {regions.map((region, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.02 }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                        selectedRegion === region.name
                          ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-md'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Check 
                          className={selectedRegion === region.name ? 'text-white' : 'text-emerald-600'} 
                          size={16} 
                        />
                        <span className="text-sm font-medium">{region.name}</span>
                      </div>
                      <ArrowRight 
                        size={14} 
                        className={`transition-transform ${selectedRegion === region.name ? 'rotate-90' : ''}`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Region Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 min-h-[400px]">
                <AnimatePresence mode="wait">
                  {selectedRegionData ? (
                    <motion.div
                      key={selectedRegionData.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
                        <MapPin className="text-blue-600 mr-3" size={24} />
                        {selectedRegionData.name}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Clock className="text-blue-600" size={20} />
                            <div>
                              <div className="font-semibold text-slate-800">Lieferzeit</div>
                              <div className="text-slate-600">{selectedRegionData.deliveryTime}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Truck className="text-emerald-600" size={20} />
                            <div>
                              <div className="font-semibold text-slate-800">Abdeckung</div>
                              <div className="text-slate-600">{selectedRegionData.coverage}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="font-semibold text-slate-800 mb-3">Wichtige Städte</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedRegionData.cities.map((city, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                              >
                                {city}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-200/50">
                        <div className="flex items-center space-x-3 mb-3">
                          <Check className="text-emerald-600" size={20} />
                          <span className="font-semibold text-slate-800">Verfügbar in dieser Region</span>
                        </div>
                        <p className="text-slate-600 text-sm">
                          Wir liefern zuverlässig Premium-Heizöl in {selectedRegionData.name}. 
                          Geben Sie Ihre Postleitzahl ein, um eine genaue Lieferzeit zu erhalten.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full text-center"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                        <MapPin className="text-blue-600" size={32} />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">
                        Bundesland auswählen
                      </h3>
                      <p className="text-slate-600 max-w-md">
                        Klicken Sie auf ein Bundesland in der Liste, um detaillierte 
                        Lieferinformationen für Ihre Region zu erhalten.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-emerald-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium">
              <Truck size={18} className="mr-2 text-blue-600" />
              Deutschlandweite Lieferung in 4-7 Werktagen
              <Check size={16} className="ml-2 text-emerald-600" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryMap;
