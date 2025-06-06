
import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Users, Award } from 'lucide-react';

const TrustElements = () => {
  const trustStats = [
    {
      icon: Star,
      value: '4.8/5',
      label: 'Note moyenne',
      sublabel: 'sur plus de 2.500 avis'
    },
    {
      icon: CheckCircle,
      value: '99.2%',
      label: 'Clients satisfaits',
      sublabel: 'qui nous recommandent'
    },
    {
      icon: Users,
      value: '45.000+',
      label: 'Clients fidèles',
      sublabel: 'nous font confiance'
    },
    {
      icon: Award,
      value: '28 ans',
      label: 'D\'expérience',
      sublabel: 'dans le fioul domestique'
    }
  ];

  const certifications = [
    {
      name: 'ISO 9001',
      description: 'Qualité certifiée',
      icon: '🏆'
    },
    {
      name: 'Normes françaises',
      description: 'Conformité garantie',
      icon: '🇫🇷'
    },
    {
      name: 'Service client',
      description: 'Support français',
      icon: '📞'
    },
    {
      name: 'Paiement sécurisé',
      description: 'SSL & 3D Secure',
      icon: '🔒'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-red-100 rounded-full opacity-60 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-100 rounded-full opacity-60 blur-2xl"></div>
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
            <span className="text-red-600 font-semibold">Confiance</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Approuvé par les clients français
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rejoignez des milliers de clients satisfaits qui nous font confiance 
            pour leur approvisionnement en fioul domestique.
          </p>
        </motion.div>

        {/* Trust Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {trustStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.sublabel}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Certifications and Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Conformité et certifications
            </h3>
            <p className="text-gray-600">
              Nous respectons les plus hauts standards de qualité et de sécurité français.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-xl p-6 border border-red-100 hover:border-red-200 transition-all duration-300 group-hover:scale-105">
                  <div className="text-3xl mb-3">{cert.icon}</div>
                  <div className="font-bold text-gray-900 mb-2">{cert.name}</div>
                  <div className="text-sm text-gray-600">{cert.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Customer Testimonial Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-8 shadow-2xl">
            <div className="text-6xl text-red-300 mb-4">"</div>
            <blockquote className="text-xl lg:text-2xl font-medium mb-6 leading-relaxed">
              Fuel Express France nous livre depuis 5 ans. Service impeccable, 
              livraison toujours à l'heure et prix très compétitifs. Je recommande !
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">MC</span>
              </div>
              <div className="text-left">
                <div className="font-semibold">Marie Claire Dubois</div>
                <div className="text-red-200">Cliente depuis 2018 • Toulouse</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustElements;
