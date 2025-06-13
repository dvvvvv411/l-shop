
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Truck, MapPin, Clock } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "2,500+",
      label: "Happy Customers",
      description: "Across Malta & Gozo"
    },
    {
      icon: Truck,
      number: "50,000+",
      label: "Liters Delivered",
      description: "This year alone"
    },
    {
      icon: MapPin,
      number: "100%",
      label: "Malta Coverage",
      description: "Every locality served"
    },
    {
      icon: Clock,
      number: "24h",
      label: "Fast Delivery",
      description: "Next day guarantee"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Malta's <span className="text-blue-600">Trusted</span> Heating Oil Partner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading the heating oil industry in Malta with exceptional service and competitive prices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-br from-blue-100 to-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-blue-600" size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
