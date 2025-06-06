
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, Phone, Euro, Clock, Award, ArrowRight, CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Truck,
      title: 'Livraison Express 24-48h',
      description: 'Service de livraison ultra-rapide dans toute la France métropolitaine avec suivi en temps réel.',
      highlight: 'Partout en France',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Shield,
      title: 'Qualité Premium Certifiée',
      description: 'Fioul domestique aux normes françaises les plus strictes, testé et certifié par nos laboratoires.',
      highlight: 'Normes FR',
      color: 'from-red-600 to-red-700'
    },
    {
      icon: Phone,
      title: 'Support Dédié 8h-18h',
      description: 'Équipe française experte disponible pour vous conseiller et vous accompagner personnellement.',
      highlight: 'Équipe FR',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Euro,
      title: 'Prix Transparents Garantis',
      description: 'Tarification claire sans frais cachés. Meilleurs prix du marché avec notre garantie prix.',
      highlight: 'Sans frais cachés',
      color: 'from-red-600 to-red-700'
    },
    {
      icon: Clock,
      title: 'Commande 24h/24 en ligne',
      description: 'Plateforme sécurisée disponible jour et nuit. Commandez quand vous voulez, où vous voulez.',
      highlight: 'Toujours ouvert',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Award,
      title: '28 ans d\'Excellence',
      description: 'Près de trois décennies au service des français. Leader reconnu du secteur énergétique.',
      highlight: 'Depuis 1995',
      color: 'from-red-600 to-red-700'
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-gray-100 overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-red-200 rounded-full opacity-30 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 180, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-red-200 to-blue-200 rounded-full opacity-30 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          
          {/* Left Side - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-1"
          >
            {/* Main Visual Card */}
            <div className="relative bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-8 shadow-2xl border border-white/50 backdrop-blur-sm">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-3 mb-4">
                  <div className="w-3 h-2 bg-blue-600 rounded-sm"></div>
                  <div className="w-3 h-2 bg-white border border-gray-300 rounded-sm"></div>
                  <div className="w-3 h-2 bg-red-600 rounded-sm"></div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Excellence française
                </h3>
                <p className="text-gray-600 text-lg">
                  Votre partenaire fioul de confiance
                </p>
              </div>

              {/* Interactive Feature Display */}
              <div className="bg-white/80 rounded-2xl p-6 border border-gray-100">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {React.createElement(features[activeFeature].icon, {
                    className: `w-16 h-16 mx-auto mb-4 text-white p-3 rounded-xl bg-gradient-to-br ${features[activeFeature].color}`
                  })}
                  <h4 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {features[activeFeature].title}
                  </h4>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {features[activeFeature].description}
                  </p>
                  <div className="mt-4 text-center">
                    <span className={`inline-block bg-gradient-to-r ${features[activeFeature].color} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                      {features[activeFeature].highlight}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Visual Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeFeature 
                        ? 'bg-red-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-4 shadow-xl"
            >
              <div className="text-2xl font-bold">4.8/5</div>
              <div className="text-sm">Satisfaction</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-4 shadow-xl"
            >
              <div className="text-2xl font-bold">45k+</div>
              <div className="text-sm">Clients</div>
            </motion.div>
          </motion.div>

          {/* Right Side - Features List */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2"
          >
            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center space-x-2 mb-4">
                <CheckCircle className="text-green-600" size={24} />
                <span className="text-green-700 font-semibold text-lg">Avantages exclusifs</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Pourquoi choisir{' '}
                <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  Fuel Express France
                </span>
                ?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Découvrez les avantages qui font de nous le leader français de la livraison de fioul domestique.
              </p>
            </div>

            {/* Features Stack */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onMouseEnter={() => setActiveFeature(index)}
                    className={`group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      activeFeature === index 
                        ? 'border-red-300 shadow-lg bg-gradient-to-r from-white to-red-50/50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br ${feature.color} group-hover:scale-110`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <ArrowRight 
                        className={`h-5 w-5 text-gray-400 transition-all duration-300 ${
                          activeFeature === index ? 'text-red-600 translate-x-1' : 'group-hover:text-gray-600'
                        }`} 
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12"
            >
              <motion.a
                href="#calculator"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span className="text-lg">Calculer mon prix</span>
                <ArrowRight size={24} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
