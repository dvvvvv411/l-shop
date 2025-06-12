
import React from 'react';
import { motion } from 'framer-motion';
import { Fuel, Clock, Shield, Euro } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const features = [
    {
      icon: Euro,
      title: "Prezzi migliori",
      description: "Garanzia del miglior prezzo sul mercato"
    },
    {
      icon: Clock,
      title: "Consegna rapida",
      description: "Consegna in 3-5 giorni lavorativi"
    },
    {
      icon: Shield,
      title: "Qualità premium",
      description: "Gasolio certificato secondo standard EN 590"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-50 via-white to-red-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/40 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Fuel size={16} />
              <span>Gasolio da riscaldamento premium in Italia</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                Gasolio
              </span>
              <br />
              <span className="text-gray-900">Veloce</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
            >
              Il vostro partner affidabile per la consegna di gasolio da riscaldamento in tutta Italia. 
              Qualità premium, prezzi competitivi e servizio clienti eccellente.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="bg-gradient-to-r from-green-600 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Calcola il prezzo ora
              </button>
              <Link
                to="/contatto"
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                Contattaci
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-green-500 to-red-500 p-3 rounded-xl">
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl">
            <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
            <div className="text-gray-600">Anni di esperienza</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl">
            <div className="text-3xl font-bold text-red-600 mb-2">50.000+</div>
            <div className="text-gray-600">Clienti soddisfatti</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl">
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">Servizio clienti</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
