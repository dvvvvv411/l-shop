
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      number: "1.2 Mio.",
      label: "Litres annually",
      description: "Heating oil successfully delivered"
    },
    {
      icon: Users,
      number: "5,000+",
      label: "Satisfied customers",
      description: "Trust our service"
    },
    {
      icon: Award,
      number: "15+",
      label: "Years experience",
      description: "In the heating oil industry"
    },
    {
      icon: Clock,
      number: "4-7",
      label: "Working days delivery",
      description: "Fast and reliable"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Facts & Figures
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trust our proven expertise and become part of our growing customer family
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-red-100 p-4 rounded-full">
                  <stat.icon className="text-red-600" size={32} />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
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

export default StatsSection;
