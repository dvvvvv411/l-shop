
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, Headphones, Zap } from 'lucide-react';

const CustomerSupport = () => {
  const supportFeatures = [
    {
      icon: Phone,
      title: "24/7 Hotline",
      description: "Rund um die Uhr erreichbare Telefon-Hotline für alle Ihre Anliegen",
      details: ["Sofortige Verbindung", "Deutschsprachiger Support", "Keine Warteschleife"],
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Mail,
      title: "E-Mail Support",
      description: "Professioneller E-Mail-Support für detaillierte Anfragen und Dokumentation",
      details: ["24h Antwortzeit", "Dateianhänge möglich", "Vollständige Nachverfolgung"],
      color: "emerald",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: Headphones,
      title: "Persönliche Beratung",
      description: "Individuelle Beratung durch erfahrene Energie-Experten",
      details: ["Maßgeschneiderte Lösungen", "Kostenoptimierung", "Langfristige Planung"],
      color: "purple",
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      method: "Telefon",
      contact: "0911 96643306",
      availability: "24/7 verfügbar",
      color: "blue"
    },
    {
      icon: Mail,
      method: "E-Mail",
      contact: "info@greenoil-lieferung.de",
      availability: "24h Antwortzeit",
      color: "emerald"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-emerald-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Clock size={16} className="mr-2 text-blue-600" />
            24/7 Kundensupport
            <Zap size={14} className="ml-2 text-emerald-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
            Immer für Sie <span className="font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">erreichbar</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Unser Kundenservice-Team steht Ihnen rund um die Uhr zur Verfügung - 
            für Beratung, Notfälle und alle Fragen rund um Ihre Heizöl-Versorgung
          </p>
        </motion.div>

        {/* Support Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {supportFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <feature.icon className="text-white" size={28} />
              </div>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">{feature.description}</p>
              
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                    <div className={`w-1.5 h-1.5 bg-${feature.color}-500 rounded-full`}></div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-200/50 shadow-xl max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-light text-center text-slate-800 mb-8">
            Kontaktieren Sie uns <span className="font-semibold text-blue-600">sofort</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-${method.color}-500 to-${method.color}-600 rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <method.icon className="text-white" size={24} />
                </div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2">{method.method}</h4>
                <div className="text-lg font-medium text-blue-600 mb-1">{method.contact}</div>
                <div className="text-sm text-slate-600">{method.availability}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerSupport;
