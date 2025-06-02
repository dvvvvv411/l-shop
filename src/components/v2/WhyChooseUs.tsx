
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, Euro, Phone, Award, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [{
    icon: Euro,
    title: "Bestpreisgarantie",
    description: "Wir bieten Ihnen garantiert die besten Preise am Markt. Sollten Sie anderswo günstiger finden, passen wir unseren Preis an."
  }, {
    icon: Truck,
    title: "Schnelle Lieferung",
    description: "Lieferung innerhalb von 4-7 Werktagen direkt zu Ihnen nach Hause. Kostenlos ab 3.000 Litern Bestellmenge."
  }, {
    icon: Shield,
    title: "Höchste Qualität",
    description: "Alle unsere Heizölsorten entsprechen der DIN 51603-1 Norm und werden regelmäßig von unabhängigen Laboren geprüft."
  }, {
    icon: Phone,
    title: "Persönlicher Service",
    description: "Unser erfahrenes Kundenservice-Team steht Ihnen Mo-Fr von 8-18 Uhr für alle Fragen zur Verfügung."
  }, {
    icon: Award,
    title: "25+ Jahre Erfahrung",
    description: "Seit über 25 Jahren sind wir Ihr verlässlicher Partner für Heizöllieferungen in ganz Deutschland."
  }, {
    icon: Clock,
    title: "Flexible Termine",
    description: "Wählen Sie Ihren Wunschtermin für die Lieferung. Auch kurzfristige Termine sind meist möglich."
  }];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award size={16} className="mr-2" />
            Ihre Vorteile bei uns
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Warum <span className="text-blue-600">HeizölDirekt?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Über 25 Jahre Erfahrung, höchste Qualitätsstandards und ein Service, der keine Wünsche offen lässt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <reason.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{reason.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
