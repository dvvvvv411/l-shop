
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, ShoppingCart, Truck, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Calculator,
      title: "Preis berechnen",
      description: "Geben Sie Ihre Postleitzahl ein und berechnen Sie Ihren individuellen Heizöl-Preis online.",
      step: "1"
    },
    {
      icon: ShoppingCart,
      title: "Online bestellen",
      description: "Wählen Sie Ihre gewünschte Menge und Qualität. Bestellen Sie bequem mit wenigen Klicks.",
      step: "2"
    },
    {
      icon: Truck,
      title: "Lieferung erhalten",
      description: "Wir liefern Ihr Heizöl innerhalb von 4-7 Werktagen direkt zu Ihnen nach Hause.",
      step: "3"
    },
    {
      icon: CheckCircle,
      title: "Fertig!",
      description: "Ihr Tank ist gefüllt und Sie können beruhigt durch die kalte Jahreszeit.",
      step: "4"
    }
  ];

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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            So einfach geht's
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In nur 4 einfachen Schritten zu Ihrem günstigen Heizöl
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              {/* Step number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg z-10">
                {step.step}
              </div>

              {/* Connector line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-0 left-1/2 w-full h-0.5 bg-red-200 transform translate-x-4 translate-y-4"></div>
              )}

              <div className="bg-gray-50 rounded-2xl p-8 mt-4 h-full">
                <div className="flex justify-center mb-6">
                  <div className="bg-red-100 p-4 rounded-full">
                    <step.icon className="text-red-600" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
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
          className="text-center mt-12"
        >
          <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl">
            Jetzt starten
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
