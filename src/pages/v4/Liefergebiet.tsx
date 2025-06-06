
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/v4/Header';
import Footer from '@/components/v4/Footer';
import FrenchRegionsMap from '@/components/v4/FrenchRegionsMap';

const Liefergebiet = () => {
  const deliveryZones = [
    {
      zone: 'Zone 1 - Express',
      regions: ['Île-de-France', 'Hauts-de-France', 'Pays de la Loire'],
      deliveryTime: '24h',
      coverage: '100%',
      color: 'from-red-500 to-red-600'
    },
    {
      zone: 'Zone 2 - Rapide',
      regions: ['Grand Est', 'Auvergne-Rhône-Alpes', 'Nouvelle-Aquitaine', 'Occitanie'],
      deliveryTime: '24-48h',
      coverage: '97%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      zone: 'Zone 3 - Standard',
      regions: ['Bretagne', 'Normandie', 'Centre-Val de Loire', 'Bourgogne-Franche-Comté'],
      deliveryTime: '48h',
      coverage: '95%',
      color: 'from-red-500 to-red-600'
    }
  ];

  const deliveryConditions = [
    {
      icon: Truck,
      title: 'Accès camion',
      description: 'Un accès pour camion de livraison doit être disponible (largeur min. 3m, hauteur min. 4m)'
    },
    {
      icon: MapPin,
      title: 'Distance de pompage',
      description: 'Distance maximale de 50 mètres entre le camion et votre cuve de stockage'
    },
    {
      icon: CheckCircle,
      title: 'Présence obligatoire',
      description: 'Présence du client ou de son représentant obligatoire lors de la livraison'
    },
    {
      icon: Clock,
      title: 'Créneaux flexibles',
      description: 'Livraison possible du lundi au vendredi de 7h à 17h, samedi sur demande'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Livraison dans toute la France
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fuel Express France assure la livraison de fioul domestique dans 95 départements français. 
            Découvrez notre couverture nationale et nos délais optimisés.
          </p>
        </motion.div>

        {/* Delivery Zones */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos zones de livraison
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous avons organisé notre réseau de livraison en zones pour vous garantir 
              les meilleurs délais selon votre localisation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {deliveryZones.map((zone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full">
                  <div className={`inline-block px-4 py-2 bg-gradient-to-r ${zone.color} text-white rounded-full text-sm font-bold mb-4`}>
                    {zone.deliveryTime}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {zone.zone}
                  </h3>
                  
                  <div className="mb-4">
                    <span className="text-sm text-gray-600 font-medium">Couverture : </span>
                    <span className={`font-bold bg-gradient-to-r ${zone.color} bg-clip-text text-transparent`}>
                      {zone.coverage}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {zone.regions.map((region, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${zone.color}`}></div>
                        <span className="text-gray-700">{region}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Interactive Map */}
        <FrenchRegionsMap />

        {/* Delivery Conditions */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Conditions de livraison
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pour garantir une livraison optimale, veuillez vous assurer 
              que ces conditions sont respectées.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryConditions.map((condition, index) => {
              const Icon = condition.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:scale-105 h-full">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{condition.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{condition.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Coverage Stats */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-12 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Couverture nationale exceptionnelle
            </h2>
            <p className="text-red-100 text-lg">
              Avec Fuel Express France, bénéficiez d'un réseau de livraison 
              étendu et optimisé pour vous servir partout en France.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95</div>
              <div className="text-red-200">Départements couverts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">97%</div>
              <div className="text-red-200">Territoire couvert</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-red-200">Délai minimum</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-red-200">Service client</div>
            </div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Liefergebiet;
