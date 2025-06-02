
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/v1/Header';
import Footer from '../../components/Footer';
import DeliveryMap from '../../components/DeliveryMap';
import { MapPin, Clock, Truck, Euro, Shield, Award, CheckCircle } from 'lucide-react';

const Liefergebiet = () => {
  const navigate = useNavigate();
  const [postcode, setPostcode] = useState('');

  const handlePostcodeCheck = () => {
    if (postcode.trim()) {
      navigate('/1/home');
    }
  };

  const serviceAdvantages = [
    {
      icon: Clock,
      title: "Schnelle Lieferung",
      description: "Zuverlässige Lieferung in nur 4-7 Werktagen deutschlandweit",
      highlight: "4-7 Werktage"
    },
    {
      icon: Euro,
      title: "Faire Preise",
      description: "Transparente Preisgestaltung ohne versteckte Kosten",
      highlight: "Keine Überraschungen"
    },
    {
      icon: Shield,
      title: "Höchste Qualität",
      description: "Geprüftes Heizöl nach DIN 51603-1 Standard",
      highlight: "Zertifiziert"
    },
    {
      icon: Truck,
      title: "Moderne Flotte",
      description: "TÜV-geprüfte Tankfahrzeuge mit geschulten Fahrern",
      highlight: "Sicher & Sauber"
    },
    {
      icon: Award,
      title: "Umweltfreundlich",
      description: "Schwefelarmes Heizöl für umweltbewusste Kunden",
      highlight: "Umweltschonend"
    },
    {
      icon: CheckCircle,
      title: "Kundenservice",
      description: "Persönliche Beratung und Support bei allen Fragen",
      highlight: "24/7 Erreichbar"
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
              <MapPin size={18} className="mr-2" />
              Deutschland-weite Lieferung in 4-7 Werktagen
              <Truck size={16} className="ml-2" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Unser <span className="text-red-600">Liefergebiet</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Zuverlässige Heizöl-Lieferung in ganz Deutschland - 
              schnell, sicher und zu fairen Konditionen in nur 4-7 Werktagen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map - Redesigned */}
      <section className="relative py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-lg oil-float-1"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-red-400/30 rounded-full blur-lg oil-float-2"></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-white/5 rounded-full blur-xl oil-float-3"></div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-white/20">
              <MapPin size={18} className="mr-2" />
              Deutschlandweite Präsenz
              <CheckCircle size={16} className="ml-2" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Liefergebiete in <span className="text-red-200">Deutschland</span>
            </h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
              Wir liefern deutschlandweit in nur 4-7 Werktagen - 
              entdecken Sie unsere umfassende Abdeckung und zuverlässigen Service
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            {/* Enhanced Map Container */}
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
              
              {/* Map Component with enhanced styling */}
              <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden">
                <DeliveryMap />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-200">16</div>
                  <div className="text-sm text-red-100">Bundesländer</div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-200">4-7</div>
                  <div className="text-sm text-red-100">Werktage</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Features Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <Truck className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Schnelle Lieferung</h3>
              <p className="text-red-100 text-sm">Deutschlandweit in 4-7 Werktagen</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Zuverlässig</h3>
              <p className="text-red-100 text-sm">TÜV-geprüfte Qualität</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Premium</h3>
              <p className="text-red-100 text-sm">Höchste Heizöl-Qualität</p>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300">
              <MapPin size={20} className="mr-3" />
              Verfügbar in ganz Deutschland
              <CheckCircle size={18} className="ml-3 text-red-200" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Advantages */}
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
              Unsere Service-Vorteile
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Warum Kunden deutschlandweit auf unseren zuverlässigen Heizöl-Service vertrauen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {serviceAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                    <advantage.icon className="text-red-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{advantage.description}</p>
                  <div className="inline-block bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {advantage.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Prüfen Sie Ihr Liefergebiet
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Geben Sie Ihre Postleitzahl ein und erfahren Sie sofort, 
              dass wir auch zu Ihnen in 4-7 Werktagen liefern können.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Ihre Postleitzahl eingeben..."
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 font-medium"
              />
              <button 
                onClick={handlePostcodeCheck}
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Prüfen
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Liefergebiet;
