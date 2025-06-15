
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, CreditCard, Truck, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Calculator,
    title: "Preis berechnen",
    description: "Geben Sie Ihre Postleitzahl und gewünschte Menge ein. Erhalten Sie sofort Ihren individuellen Preis.",
    step: "1"
  },
  {
    icon: CreditCard,
    title: "Bestellung aufgeben",
    description: "Füllen Sie das Bestellformular aus und wählen Sie Ihren Wunsch-Liefertermin. Sichere Datenübertragung garantiert.",
    step: "2"
  },
  {
    icon: Truck,
    title: "Lieferung erhalten",
    description: "Ihr Heizöl wird innerhalb von 4-7 Werktagen direkt zu Ihnen geliefert. Kostenlose Anfahrt ab 3.000 Liter.",
    step: "3"
  },
  {
    icon: CheckCircle,
    title: "Rechnung erhalten",
    description: "Nach der Lieferung erhalten Sie Ihre Rechnung per E-Mail. Bequeme Zahlung per Überweisung.",
    step: "4"
  }
];

const HowItWorks = () => {
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
            So einfach funktioniert es
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In nur 4 Schritten zu Ihrem günstigen Heizöl
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {/* Step number */}
                <div className="absolute -top-4 -right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="bg-red-100 text-red-600 p-6 rounded-full">
                    <step.icon size={32} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 transform translate-x-4" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
