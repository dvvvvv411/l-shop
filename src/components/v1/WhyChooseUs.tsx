
import React from 'react';
import { motion } from 'framer-motion';
import { Euro, Truck, Shield, Headphones, Clock, MapPin } from 'lucide-react';

const benefits = [
  {
    icon: Euro,
    title: "Günstige Preise",
    description: "Durch direkten Einkauf sparen Sie bis zu 15% beim Heizöl-Kauf. Transparente Preisgestaltung ohne versteckte Kosten.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Truck,
    title: "Zuverlässige Lieferung",
    description: "Pünktliche Lieferung innerhalb von 4-7 Werktagen. Kostenlose Anfahrt ab 3.000 Liter deutschlandweit.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Shield,
    title: "Premium Qualität",
    description: "DIN-zertifiziertes Heizöl höchster Güte. Additiviert für optimale Heizleistung und längere Lagerfähigkeit.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Headphones,
    title: "Persönlicher Service",
    description: "Kompetente Beratung durch unsere Fachexperten. 24/7 Kundenservice für alle Ihre Fragen.",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Clock,
    title: "Schnelle Abwicklung",
    description: "Online bestellen in wenigen Minuten. Sofortige Auftragsbestätigung und transparente Lieferverfolgung.",
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    icon: MapPin,
    title: "Deutschlandweite Abdeckung",
    description: "Lieferung in alle Bundesländer durch unser bewährtes Partnernetzwerk. Über 150.000 zufriedene Kunden.",
    color: "bg-indigo-100 text-indigo-600"
  }
];

const WhyChooseUs = () => {
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
            Warum Heizöl-Service wählen?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deutschlands führender Heizöl-Lieferant mit über 20 Jahren Erfahrung
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 p-3 rounded-full ${benefit.color}`}>
                  <benefit.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
