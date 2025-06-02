
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Smartphone, MapPin, Clock, Wifi, Database, Shield, CheckCircle, Zap, Globe, Monitor } from 'lucide-react';

const LogisticsTechnology = () => {
  const technologies = [
    {
      icon: Truck,
      title: "Smart Fleet Management",
      description: "Moderne Fahrzeugflotte mit intelligenter Routenoptimierung",
      features: ["GPS-Tracking in Echtzeit", "Automatische Routenplanung", "Kraftstoff-Effizienz"],
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Smartphone,
      title: "Mobile App Integration",
      description: "Vollständige Kontrolle über Ihre Smartphone-App",
      features: ["Live-Tracking", "Push-Benachrichtigungen", "Lieferbestätigung"],
      color: "emerald",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: Database,
      title: "Intelligente Logistik",
      description: "KI-gestützte Planung für optimale Liefereffizienz",
      features: ["Predictive Analytics", "Bestandsoptimierung", "Demand Forecasting"],
      color: "purple",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: Shield,
      title: "Sicherheitstechnologie",
      description: "Modernste Sicherheitssysteme für maximalen Schutz",
      features: ["Überwachungssysteme", "Notfall-Protokolle", "Versicherungsschutz"],
      color: "orange",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Bestellungseingang",
      description: "Automatische Verarbeitung und Bestätigung",
      icon: CheckCircle,
      color: "blue"
    },
    {
      step: "02", 
      title: "Routenoptimierung",
      description: "KI-basierte Planung der effizientesten Route",
      icon: MapPin,
      color: "emerald"
    },
    {
      step: "03",
      title: "Live-Tracking",
      description: "Echtzeit-Verfolgung während der Anfahrt",
      icon: Wifi,
      color: "purple"
    },
    {
      step: "04",
      title: "Zuverlässige Lieferung",
      description: "Termingerechte Zustellung in 4-7 Werktagen",
      icon: Clock,
      color: "orange"
    }
  ];

  const techStats = [
    { icon: Globe, number: "500+", label: "Städte vernetzt", color: "blue" },
    { icon: Zap, number: "99.7%", label: "Uptime-Rate", color: "emerald" },
    { icon: Monitor, number: "24/7", label: "System-Monitoring", color: "purple" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-200/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-emerald-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Zap size={16} className="mr-2 text-blue-600" />
            Modernste Technologie
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
            Intelligente <span className="font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Logistik-Lösungen</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Erleben Sie die Zukunft der Heizöl-Logistik mit unseren innovativen 
            Technologien für maximale Effizienz, Transparenz und Kundenzufriedenheit
          </p>
        </motion.div>

        {/* Technology Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {techStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-2xl mb-4 shadow-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">{stat.number}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
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
              className="group bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${tech.gradient} rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <tech.icon className="text-white" size={24} />
              </div>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-3">{tech.title}</h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{tech.description}</p>
              
              <ul className="space-y-2">
                {tech.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className={`text-${tech.color}-500 flex-shrink-0`} size={12} />
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
          className="max-w-6xl mx-auto bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-200/50 shadow-xl"
        >
          <h3 className="text-3xl font-light text-center text-slate-800 mb-12">
            Ihr Lieferprozess im <span className="font-semibold text-blue-600">Detail</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent z-10">
                    <div className={`h-full w-3/4 bg-gradient-to-r from-${step.color}-400 to-${step.color}-300`}></div>
                  </div>
                )}
                
                <div className="text-center relative z-20">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl mb-4 shadow-lg`}>
                    <step.icon className="text-white" size={24} />
                  </div>
                  
                  <div className={`text-xs font-bold text-${step.color}-600 mb-2 tracking-wider`}>SCHRITT {step.step}</div>
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

export default LogisticsTechnology;
