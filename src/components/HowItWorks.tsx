import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Truck, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Calculator,
      title: "Preis berechnen",
      description: "Geben Sie Ihre PLZ und gewünschte Menge ein. Unser Rechner zeigt Ihnen sofort den aktuellen Bestpreis."
    },
    {
      step: 2,
      icon: MapPin,
      title: "Bestellung tätigen",
      description: "Wählen Sie Ihren Wunschtermin aus den verfügbaren Lieferterminen in Ihrer Region."
    },
    {
      step: 3,
      icon: CheckCircle,
      title: "Rechnung erhalten",
      description: "Sie erhalten Ihre Rechnung per E-Mail und können bequem per Überweisung oder Lastschrift bezahlen."
    },
    {
      step: 4,
      icon: Truck,
      title: "Lieferung erhalten",
      description: "Unser Lieferfahrzeug kommt zum vereinbarten Termin und befüllt Ihren Tank professionell und sauber."
    }
  ];

  const scrollToPriceCalculator = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
            In nur 4 einfachen Schritten zu Ihrem günstigen Heizöl - schnell, sicher und unkompliziert
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center mb-16 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 lg:px-8 mb-8 lg:mb-0">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="bg-red-100 p-8 rounded-full">
                  <step.icon className="text-red-600" size={64} />
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-px h-16 bg-gray-300 mt-32"></div>
              )}
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
          <button 
            onClick={scrollToPriceCalculator}
            className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Jetzt starten
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
