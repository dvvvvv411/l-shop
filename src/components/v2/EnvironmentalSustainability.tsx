
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Zap, TreePine, Award, CheckCircle, TrendingDown, Globe } from 'lucide-react';

const EnvironmentalSustainability = () => {
  const sustainabilityFeatures = [
    {
      icon: Leaf,
      title: "CO₂-neutraler Versand",
      description: "Kompensation aller Transportemissionen",
      details: ["Certified Carbon Neutral", "Baumpflanzprojekte", "Grüne Logistik"],
      impact: "100% Kompensation"
    },
    {
      icon: Recycle,
      title: "Nachhaltige Produktion",
      description: "Umweltschonende Raffinerieprocesse",
      details: ["Moderne Anlagen", "Energieeffizienz", "Abfallreduktion"],
      impact: "-30% Emissionen"
    },
    {
      icon: Zap,
      title: "Erneuerbare Energien",
      description: "Ökostrom in allen Betriebsstätten",
      details: ["100% Grünstrom", "Solaranlagen", "Energiespeicher"],
      impact: "CO₂-freier Betrieb"
    },
    {
      icon: TreePine,
      title: "Aufforstungsprojekte",
      description: "Aktiver Beitrag zum Klimaschutz",
      details: ["Regionale Wälder", "Biodiversität", "Langzeitprojekte"],
      impact: "1.000+ Bäume/Jahr"
    }
  ];

  const certifications = [
    { name: "DIN EN ISO 14001", description: "Umweltmanagement" },
    { name: "EMAS", description: "Umwelt-Audit-Scheme" },
    { name: "Climate Neutral", description: "Klimaneutrale Lieferung" },
    { name: "Green Energy", description: "100% Ökostrom" }
  ];

  const environmentalStats = [
    { metric: "CO₂-Reduktion", value: "45%", description: "seit 2018" },
    { metric: "Recycling-Quote", value: "98%", description: "Verpackungsmaterial" },
    { metric: "Energieeffizienz", value: "+25%", description: "Flottenoptimierung" },
    { metric: "Wassereinsparung", value: "60%", description: "Produktionsprozess" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-6 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf size={16} className="mr-2" />
            Umwelt & Nachhaltigkeit
          </div>
          
          <h2 className="text-4xl font-light text-slate-800 mb-4">
            Verantwortung für die <span className="font-semibold text-emerald-600">Umwelt</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Nachhaltigkeit und Umweltschutz stehen im Mittelpunkt unserer Geschäftstätigkeit - 
            für eine lebenswerte Zukunft
          </p>
        </motion.div>

        {/* Environmental Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {environmentalStats.map((stat, index) => (
            <div key={index} className="text-center bg-white/70 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600">{stat.value}</div>
              <div className="text-sm font-medium text-slate-800">{stat.metric}</div>
              <div className="text-xs text-slate-600">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Sustainability Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {sustainabilityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <feature.icon className="text-emerald-600" size={24} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 mb-4">{feature.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-2">
                        <CheckCircle className="text-emerald-600 flex-shrink-0" size={14} />
                        <span className="text-sm text-slate-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    <TrendingDown size={14} className="mr-1" />
                    {feature.impact}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-8 mb-12"
        >
          <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center flex items-center justify-center">
            <Award className="mr-2 text-emerald-600" size={24} />
            Umwelt-Zertifizierungen
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 bg-emerald-50 rounded-lg"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="text-emerald-600" size={20} />
                </div>
                <div className="font-semibold text-slate-800 text-sm">{cert.name}</div>
                <div className="text-xs text-slate-600">{cert.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Globe className="text-white" size={32} />
          </div>
          
          <h3 className="text-2xl font-semibold mb-3">
            Gemeinsam für eine grünere Zukunft
          </h3>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Jede Bestellung bei uns trägt automatisch zum Umweltschutz bei. 
            Erfahren Sie mehr über unsere Nachhaltigkeitsinitiativen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
              Nachhaltigkeitsbericht
            </button>
            <div className="flex items-center space-x-2 text-emerald-100">
              <CheckCircle size={16} />
              <span className="text-sm">CO₂-neutraler Versand inklusive</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnvironmentalSustainability;
