
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, Phone, Award, Clock, Users } from 'lucide-react';
import Header from '@/components/v4/Header';
import Footer from '@/components/v4/Footer';

const Service = () => {
  const services = [
    {
      icon: Truck,
      title: 'Livraison Express',
      description: 'Livraison en 24-48h dans toute la France métropolitaine avec suivi en temps réel.',
      features: ['Livraison programmée', 'Suivi GPS', 'SMS de confirmation', 'Créneau flexible']
    },
    {
      icon: Shield,
      title: 'Qualité Garantie',
      description: 'Fioul domestique premium conforme aux normes françaises les plus strictes.',
      features: ['Norme NF EN 14213', 'Analyses qualité', 'Traçabilité complète', 'Certificats fournis']
    },
    {
      icon: Phone,
      title: 'Service Client Dédié',
      description: 'Équipe française disponible pour vous conseiller et vous accompagner.',
      features: ['Support 8h-18h', 'Conseils personnalisés', 'Suivi commande', 'Assistance technique']
    }
  ];

  const advantages = [
    {
      icon: Award,
      title: '28 ans d\'expertise',
      description: 'Leader français du fioul domestique depuis 1995'
    },
    {
      icon: Users,
      title: '150.000+ clients',
      description: 'Particuliers et professionnels nous font confiance'
    },
    {
      icon: Clock,
      title: 'Disponibilité 24h/24',
      description: 'Commande en ligne possible à tout moment'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="flex space-x-1">
              <div className="w-3 h-2 bg-blue-600 rounded-sm"></div>
              <div className="w-3 h-2 bg-white border border-gray-300 rounded-sm"></div>
              <div className="w-3 h-2 bg-red-600 rounded-sm"></div>
            </div>
            <span className="text-red-600 font-semibold">Services</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nos Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez l'excellence du service français avec Fuel Express France. 
            Nous vous accompagnons de la commande à la livraison avec un service premium.
          </p>
        </motion.div>

        {/* Main Services */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Un service complet et professionnel
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              De la prise de commande à la livraison, nous vous garantissons 
              un service de qualité adapté à vos besoins.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Company Advantages */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Fuel Express France ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Notre expérience et notre engagement font la différence 
              pour votre approvisionnement en fioul domestique.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{advantage.title}</h3>
                    <p className="text-gray-600 text-sm">{advantage.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* About Company */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-12 shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                À propos de Fuel Express France
              </h2>
              <p className="text-red-100 leading-relaxed mb-6">
                Fondée en 1995, Fuel Express France est devenue le leader français 
                de la livraison de fioul domestique. Notre mission est de fournir 
                à nos clients un service de qualité premium avec des prix compétitifs 
                et une livraison rapide dans toute la France.
              </p>
              <p className="text-red-100 leading-relaxed">
                Avec plus de 150.000 clients satisfaits et 28 ans d'expérience, 
                nous continuons d'innover pour vous offrir le meilleur service possible.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">28</div>
                <div className="text-red-200">Années d'expérience</div>
              </div>
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">150K+</div>
                <div className="text-red-200">Clients satisfaits</div>
              </div>
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">95</div>
                <div className="text-red-200">Départements couverts</div>
              </div>
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">4.8★</div>
                <div className="text-red-200">Note moyenne</div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Service;
