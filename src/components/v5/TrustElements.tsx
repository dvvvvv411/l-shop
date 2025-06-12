
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, Award, Clock } from 'lucide-react';

const trustElements = [
  {
    icon: Shield,
    title: "Qualità certificata",
    description: "Gasolio conforme agli standard EN 590 europei",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Truck,
    title: "Consegna veloce",
    description: "Consegna affidabile in 3-5 giorni lavorativi",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Award,
    title: "Miglior prezzo",
    description: "Garanzia del prezzo più competitivo sul mercato",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Clock,
    title: "Servizio 24/7",
    description: "Assistenza clienti disponibile sempre",
    color: "bg-orange-100 text-orange-600"
  }
];

const TrustElements = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Perché scegliere Gasolio Veloce?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La vostra soddisfazione è il nostro successo - su questo potete contare
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustElements.map((element, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-full mb-4 ${element.color}`}>
                  <element.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {element.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {element.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustElements;
