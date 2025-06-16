
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, CreditCard, Truck, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Calculator,
      title: 'Bereken uw prijs',
      description: 'Voer uw postcode en gewenste hoeveelheid in om direct uw persoonlijke prijs te zien.',
      step: '01'
    },
    {
      icon: CreditCard,
      title: 'Plaats uw bestelling',
      description: 'Bevestig uw bestelling online met veilige betaling. Geen verrassingen.',
      step: '02'
    },
    {
      icon: Truck,
      title: 'Wij leveren',
      description: 'Binnen 2-4 werkdagen leveren wij uw mazout rechtstreeks bij u thuis.',
      step: '03'
    },
    {
      icon: CheckCircle,
      title: 'Klaar voor de winter',
      description: 'Geniet van een warme woning met onze premium mazout en uitstekende service.',
      step: '04'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Hoe werkt het?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In 4 eenvoudige stappen naar uw mazoutlevering
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                  {step.step}
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-red-200 z-0"></div>
                )}

                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full pt-12">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-red-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-red-600 text-white rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Begin nu met besparen!
            </h3>
            <p className="text-lg text-red-100 mb-6">
              Bereken uw prijs en plaats uw bestelling in minder dan 5 minuten
            </p>
            <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg">
              Start nu
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
