
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Users, Calendar, Award } from 'lucide-react';

const StatsSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const stats = [
    {
      icon: MapPin,
      value: '95',
      label: 'Départements',
      description: 'Toute la France métropolitaine couverte',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Users,
      value: '45.000+',
      label: 'Clients fidèles',
      description: 'Particuliers et professionnels satisfaits',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Calendar,
      value: '28',
      label: 'Années',
      description: 'Leader français du fioul domestique',
      color: 'from-red-600 to-red-700'
    },
    {
      icon: Award,
      value: '4.8/5',
      label: 'Satisfaction',
      description: 'Note moyenne de nos clients',
      color: 'from-red-700 to-orange-600'
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100 overflow-hidden">
      {/* Large Background Numbers */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-5 pointer-events-none"
      >
        <div className="text-[40rem] font-black text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          28
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-red-400 to-orange-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-20 blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 min-h-screen flex flex-col justify-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-2 h-12 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>
            <span className="text-2xl font-light text-red-700">Excellence française</span>
            <div className="w-2 h-12 bg-gradient-to-b from-orange-600 to-red-600 rounded-full"></div>
          </div>
          <h2 className="text-5xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight">
            Notre <span className="font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">impact</span>
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Depuis 1995, nous redéfinissons l'excellence dans la livraison de fioul domestique
          </p>
        </motion.div>

        {/* Horizontal Timeline Stats */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 transform -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, y: 100 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    bounce: 0.4
                  }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-red-600 rounded-full z-10 hidden lg:block group-hover:scale-150 transition-transform duration-300"></div>
                  
                  {/* Content Card */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-4">
                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    
                    {/* Value */}
                    <motion.div 
                      className="mb-4"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.6, type: "spring" }}
                    >
                      <span className={`text-6xl lg:text-7xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </span>
                    </motion.div>
                    
                    {/* Label */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {stat.label}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm border border-red-200 rounded-full px-8 py-4">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-red-700 font-semibold text-lg">
              Rejoignez nos 45.000+ clients satisfaits
            </span>
            <div className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
