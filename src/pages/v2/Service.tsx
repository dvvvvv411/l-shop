import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Truck, Clock, Users, CheckCircle } from 'lucide-react';
import Header from '../../components/v2/Header';
import Footer from '../../components/v2/Footer';

const Service = () => {
  const qualityFeatures = [
    {
      icon: Shield,
      title: "Premium Standards",
      description: "Höchste Qualitätsanforderungen und regelmäßige Kontrollen durch unabhängige Institute",
      certification: "DIN 51603-1"
    },
    {
      icon: Award,
      title: "Zertifizierte Exzellenz",
      description: "Alle Produkte entsprechen strengsten nationalen und internationalen Qualitätsnormen",
      certification: "ISO 9001"
    },
    {
      icon: Truck,
      title: "Professionelle Logistik",
      description: "Modernste Fahrzeugflotte mit geschulten Fachkräften für sichere Lieferungen",
      certification: "TÜV geprüft"
    },
    {
      icon: Users,
      title: "Persönlicher Support",
      description: "Erfahrene Kundenberater stehen Ihnen täglich von 7-20 Uhr zur Verfügung",
      certification: "24/7 Service"
    }
  ];

  const certifications = [
    {
      icon: Shield,
      name: "DIN 51603-1",
      description: "Qualitätsstandard für Heizöl"
    },
    {
      icon: Award,
      name: "ISO 9001",
      description: "Qualitätsmanagementsystem"
    },
    {
      icon: CheckCircle,
      name: "RAL Gütezeichen",
      description: "Gütegesicherte Qualität"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-emerald-100 text-slate-700 px-5 py-2 rounded-full text-sm font-medium mb-8">
              <Shield size={16} className="mr-2" />
              Premium Service & Qualität
              <Award size={14} className="ml-2" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
              Premium <span className="font-semibold text-blue-600">Service</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              30 Jahre Erfahrung, höchste Qualitätsstandards und persönlicher Service - 
              das ist unser Versprechen für Ihre Energieversorgung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quality Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-slate-800 mb-4">
              Unsere Service-Standards
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Was uns zu Ihrem vertrauenswürdigen Partner für Energielösungen macht
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {qualityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg border border-gray-100 p-8 hover:shadow-lg transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-lg">
                      <feature.icon className="text-blue-600" size={24} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-800 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 mb-3 leading-relaxed">{feature.description}</p>
                    <div className="inline-block bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      {feature.certification}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-slate-800 mb-4">
              Unsere Zertifizierungen
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Offiziell anerkannte Qualitäts- und Sicherheitsstandards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-lg border border-gray-100 p-6 hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-lg mb-4 mx-auto">
                  <cert.icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">{cert.name}</h3>
                <p className="text-sm text-slate-600">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Promise */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-light mb-6">
              Unser Qualitätsversprechen
            </h2>
            <p className="text-lg mb-8 opacity-90 leading-relaxed">
              Seit 30 Jahren stehen wir für Premium-Qualität, zuverlässigen Service und 
              faire Preise. Unsere erfahrenen Experten sorgen dafür, dass Sie immer 
              die beste Energielösung für Ihre Bedürfnisse erhalten.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-light mb-1">30+</div>
                <div className="text-sm opacity-90">Jahre Erfahrung</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light mb-1">100.000+</div>
                <div className="text-sm opacity-90">Zufriedene Kunden</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light mb-1">99,8%</div>
                <div className="text-sm opacity-90">Termintreue</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Service;
