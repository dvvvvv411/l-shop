
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v2/Header';
import Footer from '../../components/Footer';
import ProductComparison from '../../components/ProductComparison';
import { Droplets, Shield, Award, Zap, Leaf, CheckCircle } from 'lucide-react';

const Produkte = () => {
  const productFeatures = [
    {
      icon: Droplets,
      title: "Premium Qualität",
      description: "Hochwertige Heizöl-Produkte für optimale Heizleistung",
      highlight: "DIN zertifiziert"
    },
    {
      icon: Shield,
      title: "Geprüfte Sicherheit",
      description: "Strenge Qualitätskontrollen für Ihre Sicherheit",
      highlight: "TÜV geprüft"
    },
    {
      icon: Leaf,
      title: "Umweltschonend",
      description: "Schwefelarme Formulierung für reduzierten Schadstoffausstoß",
      highlight: "Eco-friendly"
    },
    {
      icon: Zap,
      title: "Effiziente Verbrennung",
      description: "Optimierte Additive für bessere Brenneigenschaften",
      highlight: "Hocheffizient"
    },
    {
      icon: Award,
      title: "Langzeitstabilität",
      description: "Verbesserte Lagerfähigkeit durch spezielle Additive",
      highlight: "Langzeittauglich"
    },
    {
      icon: CheckCircle,
      title: "Garantierte Reinheit",
      description: "Filterung und Aufbereitung nach höchsten Standards",
      highlight: "99,9% rein"
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
              <Droplets size={16} className="mr-2" />
              Premium Heizöl-Sortiment
              <Award size={14} className="ml-2" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
              Unser <span className="font-semibold text-blue-600">Sortiment</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Hochwertige Energielösungen für jeden Bedarf - von bewährter Standardqualität 
              bis hin zu Premium-Produkten mit modernsten Additiven.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Features Grid */}
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
              Produkteigenschaften
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Warum unsere Heizöl-Produkte die richtige Wahl für Ihr Zuhause sind
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {productFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg border border-gray-100 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-lg mb-4">
                    <feature.icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 mb-3 text-sm leading-relaxed">{feature.description}</p>
                  <div className="inline-block bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {feature.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Comparison Section */}
      <ProductComparison />

      {/* Technical Specifications */}
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
              Technische Spezifikationen
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Alle wichtigen technischen Daten unserer Heizöl-Produkte im Überblick
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-emerald-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Eigenschaft</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-slate-700">Standard</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-slate-700">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-600">Schwefelgehalt</td>
                    <td className="px-6 py-4 text-center text-sm text-slate-800">< 1000 mg/kg</td>
                    <td className="px-6 py-4 text-center text-sm text-emerald-600 font-medium">< 50 mg/kg</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-slate-600">Heizwert</td>
                    <td className="px-6 py-4 text-center text-sm text-slate-800">42,6 MJ/kg</td>
                    <td className="px-6 py-4 text-center text-sm text-emerald-600 font-medium">43,2 MJ/kg</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-600">Additivierung</td>
                    <td className="px-6 py-4 text-center text-sm text-slate-800">Standard</td>
                    <td className="px-6 py-4 text-center text-sm text-emerald-600 font-medium">Premium Plus</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-slate-600">Lagerstabilität</td>
                    <td className="px-6 py-4 text-center text-sm text-slate-800">12 Monate</td>
                    <td className="px-6 py-4 text-center text-sm text-emerald-600 font-medium">24+ Monate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Produkte;
