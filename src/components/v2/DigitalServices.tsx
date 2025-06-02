
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, Bell, CreditCard, BarChart3, Calendar, QrCode, Wifi } from 'lucide-react';

const DigitalServices = () => {
  const digitalFeatures = [
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Vollständige Kontrolle über Ihre Heizöl-Versorgung unterwegs",
      features: ["Live-Tracking", "Push-Benachrichtigungen", "Bestellhistorie", "Rechnungsarchiv"],
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Monitor,
      title: "Online-Dashboard",
      description: "Übersichtliches Web-Portal für alle Ihre Heizöl-Services",
      features: ["Verbrauchsanalyse", "Kostenübersicht", "Lieferplanung", "Dokumentenverwaltung"],
      color: "emerald",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Intelligente Benachrichtigungen für optimales Bestelltiming",
      features: ["Füllstand-Warnung", "Preis-Alerts", "Liefertermin-Erinnerung", "Wartungshinweise"],
      color: "purple",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: CreditCard,
      title: "Digitale Zahlung",
      description: "Sichere und bequeme Online-Zahlungsabwicklung",
      features: ["PayPal & Kreditkarte", "SEPA-Lastschrift", "Rechnungskauf", "Sofort-Überweisung"],
      color: "orange",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const innovationStats = [
    {
      icon: BarChart3,
      number: "95%",
      label: "App-Zufriedenheit",
      description: "Kundenbewertung"
    },
    {
      icon: Calendar,
      number: "3 Min",
      label: "Bestellzeit",
      description: "Durchschnittlich"
    },
    {
      icon: Wifi,
      number: "99.9%",
      label: "Verfügbarkeit",
      description: "System-Uptime"
    }
  ];

  const digitalSteps = [
    {
      step: "01",
      title: "App Download",
      description: "Kostenlose App aus dem Store herunterladen",
      icon: Smartphone
    },
    {
      step: "02",
      title: "Account erstellen",
      description: "Schnelle Registrierung mit Ihren Daten",
      icon: Monitor
    },
    {
      step: "03",
      title: "Heizöl bestellen",
      description: "Mit wenigen Klicks zur optimalen Bestellung",
      icon: QrCode
    },
    {
      step: "04",
      title: "Live verfolgen",
      description: "Lieferung in Echtzeit verfolgen und verwalten",
      icon: Bell
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Smartphone size={16} className="mr-2 text-purple-600" />
            Digitale Innovation
            <Monitor size={14} className="ml-2 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
            Digitale <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Erleben Sie die Zukunft der Heizöl-Versorgung mit unseren innovativen 
            digitalen Lösungen für maximalen Komfort und Transparenz
          </p>
        </motion.div>

        {/* Innovation Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {innovationStats.map((stat, index) => (
            <div key={index} className="text-center bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl mb-4 shadow-lg">
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">{stat.number}</div>
              <div className="text-lg font-medium text-purple-600 mb-1">{stat.label}</div>
              <div className="text-sm text-slate-600">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Digital Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {digitalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <feature.icon className="text-white" size={28} />
              </div>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">{feature.description}</p>
              
              <div className="grid grid-cols-2 gap-2">
                {feature.features.map((featureItem, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                    <div className={`w-1.5 h-1.5 bg-${feature.color}-500 rounded-full`}></div>
                    <span>{featureItem}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Digital Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12 max-w-6xl mx-auto"
        >
          <h3 className="text-3xl font-light text-center text-slate-800 mb-12">
            In <span className="font-semibold text-purple-600">4 Schritten</span> digital bestellen
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {digitalSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                {/* Connection Line */}
                {index < digitalSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 z-10"></div>
                )}
                
                <div className="relative z-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
                    <step.icon className="text-white" size={24} />
                  </div>
                  
                  <div className="text-xs font-bold text-purple-600 mb-2 tracking-wider">SCHRITT {step.step}</div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">{step.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalServices;
