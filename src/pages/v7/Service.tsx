
import React from 'react';
import V7Header from '@/components/v7/Header';
import V7Footer from '@/components/v7/Footer';
import { motion } from 'framer-motion';
import { Truck, Shield, Clock, Phone, Award, Users, Wrench, CheckCircle } from 'lucide-react';

const V7Service = () => {
  const services = [
    {
      icon: Truck,
      title: "Betrouwbare Levering",
      description: "Punctuele levering binnen 3-5 werkdagen met moderne tankwagens en ervaren chauffeurs.",
      features: ["GPS tracking", "Telefonische aankondiging", "Flexibele tijdsloten"]
    },
    {
      icon: Shield,
      title: "Kwaliteitsgarantie",
      description: "Gecertificeerde mazout van topkwaliteit die voldoet aan alle Belgische normen.",
      features: ["EN 590 certificering", "Regelmatige kwaliteitscontroles", "Verse voorraad garantie"]
    },
    {
      icon: Phone,
      title: "Persoonlijke Service",
      description: "Deskundige klantenservice die u helpt bij al uw vragen over mazout en levering.",
      features: ["Nederlandse ondersteuning", "Persoonlijk advies", "Snelle responstijd"]
    },
    {
      icon: Wrench,
      title: "Technische Ondersteuning",
      description: "Advies over tankonderhoud, mazout opslag en optimaal gebruik van uw verwarmingssysteem.",
      features: ["Tank inspectie tips", "Opslagadvies", "Verwarmingsoptimalisatie"]
    }
  ];

  const serviceSteps = [
    {
      step: "1",
      title: "Online Bestellen",
      description: "Bereken uw prijs en plaats uw bestelling eenvoudig online"
    },
    {
      step: "2", 
      title: "Betalingsbevestiging",
      description: "Ontvang factuur en betaal veilig via bankoverschrijving"
    },
    {
      step: "3",
      title: "Planning & Contact",
      description: "Wij plannen de levering en nemen contact op voor afspraak"
    },
    {
      step: "4",
      title: "Levering",
      description: "Professionele levering door ervaren chauffeur"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <V7Header />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Onze Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bij MazoutVandaag staat service centraal. Ontdek hoe wij u helpen 
              met betrouwbare mazout levering en uitstekende klantenservice.
            </p>
          </div>

          {/* Service Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Service Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Zo Werkt Het
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {serviceSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  {index < serviceSteps.length - 1 && (
                    <div className="hidden md:block w-8 h-0.5 bg-gray-300 mx-auto mt-8"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Waarom Kiezen Voor MazoutVandaag?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Award className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">15+ Jaar Ervaring</h3>
                <p className="text-gray-600 text-sm">
                  Jarenlange ervaring in de mazout sector met duizenden tevreden klanten
                </p>
              </div>
              
              <div className="text-center">
                <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">25.000+ Klanten</h3>
                <p className="text-gray-600 text-sm">
                  Meer dan 25.000 tevreden klanten vertrouwen op onze service
                </p>
              </div>
              
              <div className="text-center">
                <Clock className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Snelle Service</h3>
                <p className="text-gray-600 text-sm">
                  Levering binnen 3-5 werkdagen en snelle klantenservice
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Heeft u vragen over onze service?
            </h2>
            <p className="text-gray-600 mb-8">
              Onze klantenservice staat klaar om u te helpen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+3221234567"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Bel ons: +32 2 123 4567
              </a>
              <a 
                href="mailto:info@mazoutvandaag.com"
                className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                E-mail versturen
              </a>
            </div>
          </div>
        </motion.div>
      </main>
      <V7Footer />
    </div>
  );
};

export default V7Service;
