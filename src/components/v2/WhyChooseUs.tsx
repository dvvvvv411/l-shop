
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, Euro, Phone, Award, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Euro,
      title: "Bestpreisgarantie",
      description: "Wir bieten Ihnen garantiert die besten Preise am Markt. Sollten Sie anderswo günstiger finden, passen wir unseren Preis an."
    },
    {
      icon: Truck,
      title: "Schnelle Lieferung",
      description: "Lieferung innerhalb von 4-7 Werktagen direkt zu Ihnen nach Hause. Kostenlos ab 3.000 Litern Bestellmenge."
    },
    {
      icon: Shield,
      title: "Höchste Qualität",
      description: "Alle unsere Heizölsorten entsprechen der DIN 51603-1 Norm und werden regelmäßig von unabhängigen Laboren geprüft."
    },
    {
      icon: Phone,
      title: "Persönlicher Service",
      description: "Unser erfahrenes Kundenservice-Team steht Ihnen Mo-Fr von 8-18 Uhr für alle Fragen zur Verfügung."
    },
    {
      icon: Award,
      title: "25+ Jahre Erfahrung",
      description: "Seit über 25 Jahren sind wir Ihr verlässlicher Partner für Heizöllieferungen in ganz Deutschland."
    },
    {
      icon: Clock,
      title: "Flexible Termine",
      description: "Wählen Sie Ihren Wunschtermin für die Lieferung. Auch kurzfristige Termine sind meist möglich."
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
            Warum HeizölDirekt?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entdecken Sie die Vorteile, die uns zu Deutschlands führendem Heizöl-Anbieter machen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full">
                  <reason.icon className="text-blue-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            Jetzt Angebot anfordern
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
