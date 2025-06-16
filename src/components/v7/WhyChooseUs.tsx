
import React from 'react';
import { motion } from 'framer-motion';
import { Euro, Clock, Shield, Phone } from 'lucide-react';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Euro,
      title: "Beste Prijzen",
      description: "Door directe inkoop bij raffinaderijen garanderen wij de beste prijzen voor onze klanten."
    },
    {
      icon: Clock,
      title: "Snelle Levering",
      description: "Levering binnen 2-4 werkdagen in heel België. Gratis levering vanaf 3.000 liter."
    },
    {
      icon: Shield,
      title: "Kwaliteitsgarantie",
      description: "Alle mazout voldoet aan de hoogste kwaliteitsnormen en wordt regelmatig gecontroleerd."
    },
    {
      icon: Phone,
      title: "Persoonlijke Service",
      description: "Ons ervaren team staat klaar voor persoonlijk advies en ondersteuning."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Waarom kiezen voor Mazout Vandaag?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Met meer dan 25 jaar ervaring zijn wij uw betrouwbare partner voor mazoutlevering in België
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="inline-flex p-4 rounded-full bg-red-100 text-red-600 mb-4">
                <benefit.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
