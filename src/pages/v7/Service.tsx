
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import Footer from '../../components/v7/Footer';
import { Users, Award, Shield, Heart } from 'lucide-react';

const Service = () => {
  const teamValues = [
    {
      icon: Award,
      title: "25+ Jaar Ervaring",
      description: "Meer dan 25 jaar ervaring in de mazout sector maken ons tot een betrouwbare partner."
    },
    {
      icon: Users,
      title: "Persoonlijke Service",
      description: "Ons ervaren team staat altijd klaar voor persoonlijk advies en ondersteuning."
    },
    {
      icon: Shield,
      title: "Betrouwbaarheid",
      description: "Wij staan voor onze beloftes en zorgen altijd voor tijdige en correcte leveringen."
    },
    {
      icon: Heart,
      title: "Klanttevredenheid",
      description: "De tevredenheid van onze klanten staat altijd centraal in alles wat wij doen."
    }
  ];

  const milestones = [
    {
      year: "1998",
      title: "Oprichting",
      description: "Start als kleine familiebedrijf in België"
    },
    {
      year: "2005",
      title: "Uitbreiding",
      description: "Uitbreiding naar heel België met moderne tankwagens"
    },
    {
      year: "2015",
      title: "Digitalisering",
      description: "Lancering van online bestelsysteem en prijscalculator"
    },
    {
      year: "2025",
      title: "Marktleider",
      description: "75.000+ tevreden klanten in heel België"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-red-100 text-red-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Users size={18} className="mr-2" />
              Over Mazout Vandaag
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Uw <span className="text-red-600">Betrouwbare Partner</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Al meer dan 25 jaar zijn wij de betrouwbare partner voor mazoutlevering in België. 
              Met persoonlijke service en eerlijke prijzen hebben wij het vertrouwen van duizenden klanten gewonnen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
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
              Onze Waarden
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deze waarden vormen de basis van onze service en maken het verschil in onze samenwerking
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="inline-flex p-4 rounded-full bg-red-100 text-red-600 mb-4">
                  <value.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
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
              Ons Verhaal
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Van klein familiebedrijf tot marktleider - ontdek hoe wij zijn gegroeid
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-200"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="text-2xl font-bold text-red-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Klaar om uw mazout te bestellen?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Neem contact op met ons team voor persoonlijk advies of bereken direct uw prijs online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/7/kontakt"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Contact opnemen
              </motion.a>
              <motion.a
                href="/7/home"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-800 transition-colors"
              >
                Prijs berekenen
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Service;
