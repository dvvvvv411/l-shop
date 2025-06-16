
import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Truck, Shield, Clock, Euro, Users } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Droplet,
      title: 'Premium Kwaliteit',
      description: 'Alleen de beste mazout volgens Belgische normen voor optimale verwarming van uw woning.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Truck,
      title: 'Snelle Levering',
      description: 'Levering binnen 2-4 werkdagen door heel België. Gratis levering vanaf 3.000 liter.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Euro,
      title: 'Beste Prijzen',
      description: 'Bespaar tot 15% door onze directe inkoop en efficiënte logistiek.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Betrouwbaar',
      description: '25+ jaar ervaring en duizenden tevreden klanten vertrouwen op onze service.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Clock,
      title: '24/7 Beschikbaar',
      description: 'Onze klantenservice staat altijd voor u klaar voor vragen en ondersteuning.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Users,
      title: 'Persoonlijke Service',
      description: 'Persoonlijke begeleiding van bestelling tot en met levering aan huis.',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Waarom Mazout Vandaag?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek de voordelen die ons onderscheiden van andere mazoutleveranciers
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mb-6`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Klaar om te besparen op uw mazout?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Bereken uw prijs en ontdek hoeveel u kunt besparen
            </p>
            <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg">
              Bereken nu uw prijs
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
