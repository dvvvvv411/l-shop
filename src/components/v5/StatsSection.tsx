
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      number: "1,5 Mio.",
      label: "Litri annui",
      description: "Gasolio consegnato con successo"
    },
    {
      icon: Users,
      number: "150.000+",
      label: "Clienti soddisfatti",
      description: "Si fidano del nostro servizio"
    },
    {
      icon: Award,
      number: "15+",
      label: "Anni di esperienza",
      description: "Nel settore del gasolio"
    },
    {
      icon: Clock,
      number: "3-5",
      label: "Giorni di consegna",
      description: "Veloce e affidabile"
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
            Numeri e fatti
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fidatevi della nostra comprovata esperienza e diventate parte della nostra crescente famiglia di clienti
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
                <div className="bg-green-100 p-4 rounded-full">
                  <stat.icon className="text-green-600" size={32} />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
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
