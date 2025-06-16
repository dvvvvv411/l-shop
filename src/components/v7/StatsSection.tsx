
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Truck, Award } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "75.000+",
      label: "Tevreden Klanten",
      description: "Vertrouwt ons al jaren"
    },
    {
      icon: Truck,
      number: "50.000+",
      label: "Leveringen",
      description: "Succesvol afgerond per jaar"
    },
    {
      icon: TrendingUp,
      number: "15%",
      label: "Gemiddelde Besparing",
      description: "Ten opzichte van de concurrentie"
    },
    {
      icon: Award,
      number: "25+",
      label: "Jaar Ervaring",
      description: "In de mazout sector"
    }
  ];

  return (
    <section className="py-20 bg-red-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Vertrouwd door duizenden
          </h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Onze cijfers spreken voor zich - wij zijn de betrouwbare keuze voor mazoutlevering in België
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <div className="inline-flex p-4 rounded-full bg-white/20 mb-6">
                <stat.icon size={32} />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <div className="text-red-100">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
