
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar, Award } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: MapPin,
      value: '20',
      label: 'Regioni',
      description: 'Tutta Italia coperta'
    },
    {
      icon: Users,
      value: '75.000+',
      label: 'Clienti fedeli',
      description: 'Privati soddisfatti'
    },
    {
      icon: Calendar,
      value: '15',
      label: 'Anni',
      description: 'Leader italiano del gasolio'
    },
    {
      icon: Award,
      value: '4.9/5',
      label: 'Soddisfazione',
      description: 'Valutazione media clienti'
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-green-50 via-orange-50 to-green-100 overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="text-[20rem] font-black text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          15
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Simplified Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight">
            Il nostro <span className="font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">impatto</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Eccellenza italiana da 15 anni
          </p>
        </motion.div>

        {/* Simplified Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1
                }}
                className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-orange-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Value */}
                <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                
                {/* Label */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {stat.label}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
