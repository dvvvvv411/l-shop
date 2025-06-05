
import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Shield, Euro, Clock, Award, Truck } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Euro,
      title: "Österreichs beste Preise",
      description: "Garantiert faire Preise für Premium-Heizöl in allen 9 Bundesländern. Von Wien bis Vorarlberg zum gleichen fairen Preis.",
      gradient: "from-violet-600 to-purple-700"
    },
    {
      icon: Mountain,
      title: "Alpine Qualität",
      description: "Höchste österreichische Qualitätsstandards. Unser Heizöl wird in heimischen Raffinerien nach strengsten Normen produziert.",
      gradient: "from-amber-500 to-yellow-600"
    },
    {
      icon: Truck,
      title: "Österreichweite Lieferung",
      description: "Von Innsbruck bis Wien, von Salzburg bis Graz - wir liefern in alle österreichischen Bundesländer innerhalb von 2-5 Werktagen.",
      gradient: "from-violet-600 to-purple-700"
    },
    {
      icon: Shield,
      title: "Österreichische Sicherheit",
      description: "Alle Lieferungen entsprechen österreichischen Sicherheitsstandards. Versichert und zertifiziert nach ÖNORM.",
      gradient: "from-amber-500 to-yellow-600"
    },
    {
      icon: Award,
      title: "25 Jahre Österreich-Erfahrung",
      description: "Seit 1998 beliefern wir österreichische Haushalte zuverlässig mit Premium-Heizöl. Generationenvertrauen.",
      gradient: "from-violet-600 to-purple-700"
    },
    {
      icon: Clock,
      title: "Flexible Termine",
      description: "Wählen Sie Ihren Wunschtermin für die Lieferung. Auch kurzfristige Termine in ganz Österreich möglich.",
      gradient: "from-amber-500 to-yellow-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-violet-100 to-amber-100 px-6 py-3 rounded-full mb-6">
            <Mountain className="h-5 w-5 text-violet-600 mr-2" />
            <span className="text-violet-800 font-semibold">Warum Heizöl Österreich?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ihr verlässlicher Partner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entdecken Sie die Vorteile, die uns zu Österreichs führendem Heizöl-Anbieter machen
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
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
            >
              {/* Background gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className={`bg-gradient-to-r ${reason.gradient} p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <reason.icon className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-violet-700 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-violet-600 to-amber-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Bereit für Ihre Heizöl-Bestellung?</h3>
            <p className="text-violet-100 mb-6">Erhalten Sie jetzt Ihr persönliches Angebot für ganz Österreich</p>
            <button className="bg-white text-violet-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-violet-50 transition-colors shadow-lg hover:shadow-xl">
              Jetzt Angebot anfordern
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
