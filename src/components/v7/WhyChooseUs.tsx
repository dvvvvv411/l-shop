
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, CreditCard, Clock, Phone, Award } from 'lucide-react';

const V7WhyChooseUs = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Betrouwbaar en veilig",
      description: "Gecertificeerde kwaliteit en veilige online betalingen. Uw gegevens zijn bij ons in goede handen."
    },
    {
      icon: Truck,
      title: "Snelle levering",
      description: "Levering binnen 3-5 werkdagen rechtstreeks bij u thuis. Gratis vanaf 3.000 liter."
    },
    {
      icon: CreditCard,
      title: "Transparante prijzen",
      description: "Geen verborgen kosten. Wat u ziet is wat u betaalt. Vooruitbetaling via bankoverschrijving."
    },
    {
      icon: Clock,
      title: "24/7 online bestellen",
      description: "Bestel wanneer het u uitkomt. Onze website staat dag en nacht voor u klaar."
    },
    {
      icon: Phone,
      title: "Persoonlijke service",
      description: "Vragen? Ons klantenservice team staat voor u klaar voor persoonlijk advies."
    },
    {
      icon: Award,
      title: "15+ jaar ervaring",
      description: "Als ervaren mazout leverancier weten we precies waar het op aankomt."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Voordelen van MazoutVandaag
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ontdek waarom duizenden Belgen ons vertrouwen voor hun mazout leveringen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                <benefit.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
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

export default V7WhyChooseUs;
