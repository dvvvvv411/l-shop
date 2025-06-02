
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Smartphone, MapPin, Clock, Wifi, Database, Shield, CheckCircle } from 'lucide-react';

const LogisticsTechnology = () => {
  const technologies = [
    {
      icon: Truck,
      title: "Smart Fleet Management",
      description: "Moderne Fahrzeugflotte mit intelligenter Routenoptimierung",
      features: ["GPS-Tracking in Echtzeit", "Automatische Routenplanung", "Kraftstoff-Effizienz"],
      color: "blue"
    },
    {
      icon: Smartphone,
      title: "Mobile App Integration",
      description: "Vollständige Kontrolle und Transparenz über Ihre Smartphone-App",
      features: ["Live-Tracking", "Push-Benachrichtigungen", "Lieferbestätigung"],
      color: "emerald"
    },
    {
      icon: Database,
      title: "Intelligente Logistik",
      description: "KI-gestützte Planung für optimale Liefereffizienz",
      features: ["Predictive Analytics", "Bestandsoptimierung", "Demand Forecasting"],
      color: "slate"
    },
    {
      icon: Shield,
      title: "Sicherheitstechnologie",
      description: "Modernste Sicherheitssysteme für maximalen Schutz",
      features: ["Überwachungssysteme", "Notfall-Protokolle", "Versicherungsschutz"],
      color: "blue"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Bestellungseingang",
      description: "Automatische Verarbeitung und Bestätigung",
      icon: CheckCircle
    },
    {
      step: "02", 
      title: "Routenoptimierung",
      description: "KI-basierte Planung der effizientesten Route",
      icon: MapPin
    },
    {
      step: "03",
      title: "Live-Tracking",
      description: "Echtzeit-Verfolgung während der Anfahrt",
      icon: Wifi
    },
    {
      step: "04",
      title: "Pünktliche Lieferung",
      description: "Termingerechte Zustellung mit Bestätigung",
      icon: Clock
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-emerald-900/20"></div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light text-white mb-4">
            Modernste <span className="font-semibold text-blue-400">Logistik-Technologie</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Erleben Sie die Zukunft der Heizöl-Logistik mit unseren innovativen 
            Technologien für maximale Effizienz und Transparenz
          </p>
        </motion.div>

        {/* Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-${tech.color}-600/20 rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                <tech.icon className={`text-${tech.color}-400`} size={24} />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{tech.title}</h3>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">{tech.description}</p>
              
              <ul className="space-y-1">
                {tech.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-xs text-slate-400">
                    <CheckCircle className="text-emerald-400 flex-shrink-0" size={12} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-light text-center text-white mb-12">
            Ihr Lieferprozess im Detail
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-blue-500 to-transparent z-10"></div>
                )}
                
                <div className="text-center relative z-20">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full mb-4">
                    <step.icon className="text-white" size={20} />
                  </div>
                  
                  <div className="text-xs font-bold text-blue-400 mb-2">SCHRITT {step.step}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LogisticsTechnology;
