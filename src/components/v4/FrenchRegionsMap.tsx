
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Truck, CheckCircle } from 'lucide-react';

const FrenchRegionsMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = [
    {
      id: 'ile-de-france',
      name: 'Île-de-France',
      departments: ['75', '77', '78', '91', '92', '93', '94', '95'],
      deliveryTime: '24h',
      coverage: '100%',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'auvergne-rhone-alpes',
      name: 'Auvergne-Rhône-Alpes',
      departments: ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'],
      deliveryTime: '24-48h',
      coverage: '98%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'nouvelle-aquitaine',
      name: 'Nouvelle-Aquitaine',
      departments: ['16', '17', '19', '23', '24', '33', '40', '47', '64', '79', '86', '87'],
      deliveryTime: '24-48h',
      coverage: '95%',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'occitanie',
      name: 'Occitanie',
      departments: ['09', '11', '12', '30', '31', '32', '34', '46', '48', '65', '66', '81', '82'],
      deliveryTime: '24-48h',
      coverage: '97%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'hauts-de-france',
      name: 'Hauts-de-France',
      departments: ['02', '59', '60', '62', '80'],
      deliveryTime: '24h',
      coverage: '100%',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'grand-est',
      name: 'Grand Est',
      departments: ['08', '10', '51', '52', '54', '55', '57', '67', '68', '88'],
      deliveryTime: '24-48h',
      coverage: '96%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'pays-de-la-loire',
      name: 'Pays de la Loire',
      departments: ['44', '49', '53', '72', '85'],
      deliveryTime: '24h',
      coverage: '99%',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'bretagne',
      name: 'Bretagne',
      departments: ['22', '29', '35', '56'],
      deliveryTime: '24-48h',
      coverage: '94%',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const deliveryFeatures = [
    {
      icon: Truck,
      title: 'Livraison express',
      description: '24-48h dans toute la France'
    },
    {
      icon: MapPin,
      title: '95 départements',
      description: 'Couverture nationale étendue'
    },
    {
      icon: Clock,
      title: 'Horaires flexibles',
      description: 'Créneaux adaptés à vos besoins'
    },
    {
      icon: CheckCircle,
      title: 'Livraison garantie',
      description: 'Service fiable et ponctuel'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-red-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-40 h-40 bg-red-100 rounded-full opacity-40 blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-40 blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="flex space-x-1">
              <div className="w-3 h-2 bg-blue-600 rounded-sm"></div>
              <div className="w-3 h-2 bg-white border border-gray-300 rounded-sm"></div>
              <div className="w-3 h-2 bg-red-600 rounded-sm"></div>
            </div>
            <span className="text-red-600 font-semibold">Zones de livraison</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Livraison dans toute la France
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre couverture nationale et nos délais de livraison 
            optimisés pour chaque région française.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interactive Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Sélectionnez votre région
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {regions.map((region, index) => (
                <motion.button
                  key={region.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    selectedRegion === region.id
                      ? 'border-red-400 bg-red-50/80'
                      : 'border-gray-200 bg-white/80 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">{region.name}</h4>
                      <p className="text-sm text-gray-600">
                        {region.departments.length} départements • Couverture {region.coverage}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${region.color} text-white`}>
                        {region.deliveryTime}
                      </div>
                    </div>
                  </div>
                  
                  {selectedRegion === region.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Départements couverts :</strong>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {region.departments.map((dept) => (
                          <span
                            key={dept}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                          >
                            {dept}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Delivery Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Avantages de notre service de livraison
            </h3>
            
            <div className="space-y-4">
              {deliveryFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-xl flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Coverage Stats */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-6 shadow-lg">
              <h4 className="text-xl font-bold mb-4">Couverture nationale</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">95</div>
                  <div className="text-red-200 text-sm">Départements</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">97%</div>
                  <div className="text-red-200 text-sm">Territoire couvert</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FrenchRegionsMap;
