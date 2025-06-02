
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Truck, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [{
    step: 1,
    icon: Calculator,
    title: "Preis berechnen",
    description: "Geben Sie Ihre PLZ und gewünschte Menge ein. Unser Rechner zeigt Ihnen sofort den aktuellen Bestpreis."
  }, {
    step: 2,
    icon: MapPin,
    title: "Bestellung tätigen",
    description: "Wählen Sie Ihren Wunschtermin aus den verfügbaren Lieferterminen in Ihrer Region."
  }, {
    step: 3,
    icon: CheckCircle,
    title: "Rechnung erhalten",
    description: "Sie erhalten Ihre Rechnung per E-Mail und können bequem per Überweisung oder Lastschrift bezahlen."
  }, {
    step: 4,
    icon: Truck,
    title: "Lieferung erhalten",
    description: "Unser Lieferfahrzeug kommt zum vereinbarten Termin und befüllt Ihren Tank professionell und sauber."
  }];

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
          <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle size={16} className="mr-2" />
            So einfach geht's
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            In <span className="text-emerald-600">4 einfachen Schritten</span> zum Heizöl
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Von der Preisberechnung bis zur Lieferung - wir machen es Ihnen so einfach wie möglich.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-emerald-600" size={24} />
                </div>
                <div className="absolute -top-2 -right-2 bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl">
            Jetzt Preis berechnen
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
