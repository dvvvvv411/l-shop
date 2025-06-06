
import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Shield, Award, CheckCircle } from 'lucide-react';
import Header from '@/components/v4/Header';
import Footer from '@/components/v4/Footer';
import { Button } from '@/components/ui/button';

const Produkte = () => {
  const products = [
    {
      id: 'standard',
      name: 'Fioul Standard',
      price: '0,72',
      description: 'Fioul domestique de qualité certifiée aux normes françaises',
      icon: Flame,
      color: 'from-red-500 to-red-600',
      features: [
        'Conforme à la norme NF EN 14213',
        'Excellent pouvoir calorifique',
        'Stabilité thermique optimale',
        'Livraison dans toute la France',
        'Prix compétitif garanti'
      ],
      recommended: false
    },
    {
      id: 'premium',
      name: 'Fioul Premium',
      price: '0,77',
      description: 'Fioul domestique haute qualité avec additifs performants',
      icon: Award,
      color: 'from-blue-500 to-blue-600',
      features: [
        'Fioul domestique haute performance',
        'Additifs anti-corrosion inclus',
        'Protection optimale de vos installations',
        'Combustion plus propre',
        'Réduction des odeurs',
        'Longue conservation'
      ],
      recommended: true
    }
  ];

  const qualityFeatures = [
    {
      icon: Shield,
      title: 'Qualité garantie',
      description: 'Tous nos fioul respectent les normes françaises les plus strictes'
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Produits certifiés et régulièrement contrôlés par des laboratoires agréés'
    },
    {
      icon: CheckCircle,
      title: 'Traçabilité',
      description: 'Traçabilité complète de nos approvisionnements pour votre sécurité'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="flex space-x-1">
              <div className="w-3 h-2 bg-blue-600 rounded-sm"></div>
              <div className="w-3 h-2 bg-white border border-gray-300 rounded-sm"></div>
              <div className="w-3 h-2 bg-red-600 rounded-sm"></div>
            </div>
            <span className="text-red-600 font-semibold">Produits</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nos Produits Fioul
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme de fioul domestique française premium. 
            Qualité certifiée, prix compétitifs et livraison rapide garantie.
          </p>
        </motion.div>

        {/* Products Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative group"
                >
                  {product.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        ⭐ Recommandé
                      </div>
                    </div>
                  )}
                  
                  <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 transition-all duration-500 group-hover:scale-105 h-full ${
                    product.recommended ? 'border-blue-200 hover:border-blue-400' : 'border-gray-100 hover:border-red-300'
                  }`}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    
                    <div className={`text-3xl font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent mb-4`}>
                      €{product.price}/L
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${product.color}`}></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      asChild
                      className={`w-full ${
                        product.recommended 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                          : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                      } text-white py-4`}
                    >
                      <a href="/4/home#calculator">
                        Commander {product.name}
                      </a>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Quality Features */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Notre engagement qualité
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chez Fuel Express France, la qualité n'est pas négociable. 
              Nous vous garantissons des produits conformes aux plus hauts standards français.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {qualityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Technical Information */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Informations techniques
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Conformité et normes</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Norme française NF EN 14213</li>
                <li>• Réglementation européenne EN 590</li>
                <li>• Certification qualité ISO 9001</li>
                <li>• Contrôles réguliers par laboratoires agréés</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Caractéristiques techniques</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Densité : 0,82 à 0,95 kg/L à 15°C</li>
                <li>• Point d'éclair : ≥ 55°C</li>
                <li>• Teneur en soufre : ≤ 1000 mg/kg</li>
                <li>• Pouvoir calorifique : ~10 kWh/L</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-red-50/80 rounded-xl border border-red-200">
            <h3 className="font-bold text-red-800 mb-2">🇫🇷 100% Qualité française</h3>
            <p className="text-red-700">
              Tous nos produits sont raffinés en France et répondent aux exigences 
              les plus strictes de qualité et de sécurité pour votre tranquillité d'esprit.
            </p>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Produkte;
