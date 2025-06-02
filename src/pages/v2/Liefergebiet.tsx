
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/v2/Header';
import Footer from '../../components/v2/Footer';
import DeliveryMap from '../../components/DeliveryMap';
import LogisticsTechnology from '../../components/v2/LogisticsTechnology';
import { MapPin, Clock, Truck, Shield, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';

const Liefergebiet = () => {
  const navigate = useNavigate();
  const [postcode, setPostcode] = useState('');

  const handlePostcodeCheck = () => {
    navigate('/2/');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const heroFeatures = [
    { icon: Clock, text: "Lieferung 4-7 Werktage", color: "blue" },
    { icon: Shield, text: "100% Qualitätsgarantie", color: "emerald" },
    { icon: Truck, text: "Deutschlandweit verfügbar", color: "slate" }
  ];

  const quickStats = [
    { number: "500+", label: "Städte erreicht", icon: MapPin },
    { number: "4-7", label: "Werktage Lieferzeit", icon: Clock },
    { number: "99.7%", label: "Pünktlichkeitsrate", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-emerald-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <MapPin size={18} className="mr-2" />
              Deutschlandweiter Premium-Service
              <Truck size={16} className="ml-2" />
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-slate-800 mb-6">
              Unser <span className="font-semibold text-blue-600">Liefernetzwerk</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
              Professionelle Heizöl-Lieferung in ganz Deutschland mit zuverlässiger Logistik 
              und persönlicher Betreuung für höchste Kundenzufriedenheit.
            </p>

            {/* Hero Features */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {heroFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-${feature.color}-200 hover:shadow-md transition-all`}
                >
                  <feature.icon size={16} className={`text-${feature.color}-600`} />
                  <span className="text-sm font-medium text-slate-700">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-lg mb-2">
                    <stat.icon className="text-blue-600" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">{stat.number}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-slate-800 mb-4">
              Deutschlandweites Liefernetzwerk
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Entdecken Sie unser umfassendes Liefernetzwerk mit interaktiver Karte - 
              klicken Sie auf Ihre Region für detaillierte Informationen
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mb-16"
          >
            <DeliveryMap />
          </motion.div>
        </div>
      </section>

      {/* Logistics Technology */}
      <LogisticsTechnology />

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light mb-4">
              Jetzt Verfügbarkeit prüfen
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Geben Sie Ihre Postleitzahl ein und erfahren Sie sofort, 
              ob wir Premium-Heizöl zu Ihnen liefern können.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-12">
              <input
                type="text"
                placeholder="PLZ eingeben..."
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg text-slate-800 font-medium border-0 focus:ring-2 focus:ring-white/50 text-lg"
              />
              <motion.button 
                onClick={handlePostcodeCheck}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2 text-lg"
              >
                <span>Verfügbarkeit prüfen</span>
                <ArrowRight size={20} />
              </motion.button>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm opacity-90">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>Persönliche Beratung: 0800 987 654 3</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>kontakt@oilexpress.de</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Liefergebiet;
