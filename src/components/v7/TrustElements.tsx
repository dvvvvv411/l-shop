
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Truck, Users } from 'lucide-react';

const TrustElements = () => {
  const trustFeatures = [
    {
      icon: Shield,
      title: "Kwaliteitsgarantie",
      description: "Alle onze mazout voldoet aan de NBN EN 590 norm voor de hoogste kwaliteitsnormen."
    },
    {
      icon: Award,
      title: "25+ Jaar Ervaring",
      description: "Meer dan 25 jaar betrouwbare service in heel België met duizenden tevreden klanten."
    },
    {
      icon: Truck,
      title: "Snelle Levering",
      description: "Levering binnen 2-4 werkdagen. Gratis levering vanaf 3.000 liter in heel België."
    },
    {
      icon: Users,
      title: "75.000+ Klanten",
      description: "Vertrouwd door meer dan 75.000 huishoudens en bedrijven in België."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Waarom klanten voor ons kiezen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Met meer dan 25 jaar ervaring en duizenden tevreden klanten zijn wij uw betrouwbare partner voor mazoutlevering
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="inline-flex p-4 rounded-full bg-red-100 text-red-600 mb-4">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustElements;
