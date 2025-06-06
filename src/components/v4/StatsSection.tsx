
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar, Award } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: MapPin,
      value: '95',
      label: 'Départements couverts',
      description: 'Dans toute la France métropolitaine',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Users,
      value: '45.000+',
      label: 'Clients satisfaits',
      description: 'Particuliers et professionnels',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Calendar,
      value: '28',
      label: 'Années d\'expérience',
      description: 'Leader français du fioul',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Award,
      value: '4.8/5',
      label: 'Note moyenne',
      description: 'Basée sur les avis clients',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 bg-red-100 rounded-full opacity-60 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-60 blur-xl"></div>
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
            <span className="text-red-600 font-semibold">Excellence française</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Votre partenaire fioul de confiance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Depuis 1995, nous livrons du fioul de qualité premium dans toute la France, 
            avec un service client d'exception et des prix compétitifs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Value */}
                  <div className="mb-3">
                    <motion.span 
                      className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.span>
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {stat.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                  
                  {/* Hover effect decoration */}
                  <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${stat.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
