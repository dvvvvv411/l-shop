
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, MapPin, ThermometerSun, Home, Truck, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface RegionData {
  id: string;
  name: string;
  deliveryTime: string;
  avgConsumption: string;
  popularSize: string;
  specialFeature: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const AustrianHeatingAtlas = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions: RegionData[] = [
    {
      id: 'wien',
      name: 'Wien',
      deliveryTime: '1-2 Tage',
      avgConsumption: '2.800L/Jahr',
      popularSize: '3.000L',
      specialFeature: 'Schnellste Lieferung',
      icon: Home,
      color: 'text-violet-600',
      bgColor: 'bg-violet-100'
    },
    {
      id: 'niederoesterreich',
      name: 'Niederösterreich',
      deliveryTime: '2-3 Tage',
      avgConsumption: '3.200L/Jahr',
      popularSize: '4.000L',
      specialFeature: 'Größter Verbrauch',
      icon: Mountain,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 'oberoesterreich',
      name: 'Oberösterreich',
      deliveryTime: '2-4 Tage',
      avgConsumption: '3.100L/Jahr',
      popularSize: '3.500L',
      specialFeature: 'Premium-Qualität beliebt',
      icon: ThermometerSun,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'salzburg',
      name: 'Salzburg',
      deliveryTime: '2-4 Tage',
      avgConsumption: '3.400L/Jahr',
      popularSize: '4.000L',
      specialFeature: 'Alpine Speziallieferung',
      icon: Mountain,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      id: 'tirol',
      name: 'Tirol',
      deliveryTime: '3-5 Tage',
      avgConsumption: '3.600L/Jahr',
      popularSize: '5.000L',
      specialFeature: 'Höchster Verbrauch',
      icon: Mountain,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 'vorarlberg',
      name: 'Vorarlberg',
      deliveryTime: '3-5 Tage',
      avgConsumption: '3.300L/Jahr',
      popularSize: '4.500L',
      specialFeature: 'Umweltbewusste Kunden',
      icon: Mountain,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      id: 'kaernten',
      name: 'Kärnten',
      deliveryTime: '3-4 Tage',
      avgConsumption: '3.000L/Jahr',
      popularSize: '3.500L',
      specialFeature: 'See-Region Spezial',
      icon: MapPin,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100'
    },
    {
      id: 'steiermark',
      name: 'Steiermark',
      deliveryTime: '2-4 Tage',
      avgConsumption: '2.900L/Jahr',
      popularSize: '3.500L',
      specialFeature: 'Grüne Technologie',
      icon: ThermometerSun,
      color: 'text-lime-600',
      bgColor: 'bg-lime-100'
    },
    {
      id: 'burgenland',
      name: 'Burgenland',
      deliveryTime: '2-3 Tage',
      avgConsumption: '2.700L/Jahr',
      popularSize: '3.000L',
      specialFeature: 'Weinregion Premium',
      icon: Home,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-violet-100 to-amber-100 px-6 py-3 rounded-full mb-6">
            <Mountain className="h-5 w-5 text-violet-600 mr-2" />
            <span className="text-violet-800 font-semibold">Österreich Heizöl-Atlas</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Heizöl in allen Bundesländern
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entdecken Sie regionale Besonderheiten und Lieferinfos für jedes österreichische Bundesland
          </p>
        </motion.div>

        {/* Interactive Map Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {regions.map((region, index) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
              className="cursor-pointer"
            >
              <Card className="relative overflow-hidden border-2 border-transparent hover:border-violet-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className={`absolute inset-0 ${region.bgColor} opacity-20`} />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${region.bgColor}`}>
                      <region.icon className={`h-6 w-6 ${region.color}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Lieferzeit</div>
                      <div className="font-semibold text-gray-800">{region.deliveryTime}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{region.name}</h3>
                  <p className={`text-sm font-medium ${region.color} mb-4`}>
                    {region.specialFeature}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Ø Verbrauch:</span>
                      <span className="font-medium">{region.avgConsumption}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Beliebte Größe:</span>
                      <span className="font-medium">{region.popularSize}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed Region Info */}
        <AnimatePresence>
          {selectedRegion && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {regions.filter(r => r.id === selectedRegion).map(region => (
                <Card key={region.id} className="bg-gradient-to-br from-white to-violet-50 border-violet-200 shadow-xl">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center mb-6">
                          <div className={`p-4 rounded-full ${region.bgColor} mr-4`}>
                            <region.icon className={`h-8 w-8 ${region.color}`} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{region.name}</h3>
                            <p className={`${region.color} font-semibold`}>{region.specialFeature}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-violet-600 mr-3" />
                            <div>
                              <div className="font-semibold">Lieferzeit</div>
                              <div className="text-gray-600">{region.deliveryTime} nach Bestellung</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <ThermometerSun className="h-5 w-5 text-amber-600 mr-3" />
                            <div>
                              <div className="font-semibold">Durchschnittsverbrauch</div>
                              <div className="text-gray-600">{region.avgConsumption} pro Haushalt</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Truck className="h-5 w-5 text-green-600 mr-3" />
                            <div>
                              <div className="font-semibold">Beliebte Bestellgröße</div>
                              <div className="text-gray-600">{region.popularSize} pro Lieferung</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-6 shadow-inner">
                        <h4 className="font-bold text-gray-900 mb-4">Regionale Besonderheiten</h4>
                        <div className="space-y-3 text-sm text-gray-600">
                          <p>✓ Speziell angepasste Lieferrouten</p>
                          <p>✓ Lokale Kundenbetreuung</p>
                          <p>✓ Regionale Preisgarantie</p>
                          <p>✓ Angepasste Lieferzeiten</p>
                        </div>
                        
                        <div className="mt-6 p-4 bg-gradient-to-r from-violet-100 to-amber-100 rounded-lg">
                          <div className="text-sm font-semibold text-violet-800 mb-2">
                            Tipp für {region.name}:
                          </div>
                          <div className="text-sm text-violet-700">
                            Bestellen Sie mindestens {region.popularSize} für optimale Lieferkosten 
                            und profitieren Sie von unseren regionalen Rabatten.
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-violet-600 to-amber-500 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Bereit für Ihre regionale Heizöl-Bestellung?</h3>
            <p className="text-violet-100 mb-6 max-w-2xl mx-auto">
              Egal in welchem Bundesland Sie wohnen - wir liefern österreichweit 
              mit der gleichen hohen Qualität und fairen Preisen.
            </p>
            <button className="bg-white text-violet-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-violet-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
              Jetzt für Ihre Region bestellen
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AustrianHeatingAtlas;
