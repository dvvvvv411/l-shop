
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Phone, CreditCard, Truck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Calculator,
      title: "1. Bereken uw prijs",
      description: "Gebruik onze prijscalculator om direct de beste prijs voor uw mazout te berekenen."
    },
    {
      icon: Phone,
      title: "2. Bevestig uw bestelling",
      description: "Bevestig uw bestelling online of neem contact op voor persoonlijk advies."
    },
    {
      icon: CreditCard,
      title: "3. Eenvoudige betaling",
      description: "Betaal veilig via bankoverschrijving met alle benodigde gegevens."
    },
    {
      icon: Truck,
      title: "4. Snelle levering",
      description: "Uw mazout wordt binnen 2-4 werkdagen geleverd op het gewenste adres."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Hoe het werkt
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            In slechts 4 eenvoudige stappen heeft u uw mazout besteld en wordt het snel geleverd
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative">
                <div className="inline-flex p-6 rounded-full bg-red-100 text-red-600 mb-6">
                  <step.icon size={32} />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2 w-full">
                    <div className="border-t-2 border-dashed border-red-300"></div>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
