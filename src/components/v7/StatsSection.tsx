
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MapPin, Clock } from 'lucide-react';

const V7StatsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      number: "15+",
      label: "Jaar ervaring",
      description: "Betrouwbare mazout leverancier"
    },
    {
      icon: Users,
      number: "25.000+",
      label: "Tevreden klanten",
      description: "Vertrouwen ons jaar na jaar"
    },
    {
      icon: MapPin,
      number: "100%",
      label: "België dekkend",
      description: "Levering in heel het land"
    },
    {
      icon: Clock,
      number: "3-5",
      label: "Werkdagen levering",
      description: "Snel en betrouwbaar"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Waarom kiezen voor MazoutVandaag?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Al meer dan 15 jaar uw betrouwbare partner voor mazout leveringen in België
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <stat.icon className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {stat.label}
              </div>
              <div className="text-gray-600">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default V7StatsSection;
