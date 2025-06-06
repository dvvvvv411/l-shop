
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, Phone, Euro, Clock, Award } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Truck,
      title: 'Livraison rapide dans toute la France',
      description: 'Livraison express en 24-48h dans tous les départements français. Service fiable et ponctuel.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Shield,
      title: 'Qualité française certifiée',
      description: 'Fioul domestique de haute qualité, conforme aux normes françaises les plus strictes.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Service client dédié',
      description: 'Équipe française disponible 8h-18h pour vous conseiller et vous accompagner.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Euro,
      title: 'Prix compétitifs garantis',
      description: 'Tarifs transparents et compétitifs. Aucun frais caché, prix tout inclus.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Clock,
      title: 'Commande en ligne 24h/24',
      description: 'Plateforme sécurisée disponible 24h/24. Commandez quand vous voulez.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Award,
      title: 'Partenaire de confiance depuis 1995',
      description: '28 ans d\'expertise au service des particuliers et professionnels français.',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-red-50/30 to-blue-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-40 h-40 bg-red-100 rounded-full opacity-40 blur-2xl"></div>
        <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-40 blur-2xl"></div>
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
            <span className="text-red-600 font-semibold">Avantages</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir Fuel Express France ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez tous les avantages qui font de nous le leader français 
            de la livraison de fioul domestique.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover effect decoration */}
                  <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à commander votre fioul ?
            </h3>
            <p className="text-red-100 mb-6 text-lg">
              Obtenez votre devis personnalisé en quelques clics et bénéficiez de notre expertise française.
            </p>
            <motion.a
              href="#calculator"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-red-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Calculer mon prix
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
