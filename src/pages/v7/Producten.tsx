
import React from 'react';
import V7Header from '@/components/v7/Header';
import V7Footer from '@/components/v7/Footer';
import { motion } from 'framer-motion';
import { CheckCircle, Droplets, Flame, Shield } from 'lucide-react';

const V7Producten = () => {
  const products = [
    {
      icon: Droplets,
      name: "Standaard Mazout",
      price: "€0.50",
      features: [
        "Kwaliteitsmazout volgens Belgische norm",
        "Betrouwbare verwarming",
        "Goede prijs-kwaliteitverhouding",
        "Geschikt voor alle cv-ketels"
      ],
      description: "Onze standaard mazout biedt uitstekende kwaliteit tegen een scherpe prijs. Perfect voor dagelijks gebruik."
    },
    {
      icon: Flame,
      name: "Premium Mazout",
      price: "€0.52",
      features: [
        "Zwavelarme premium kwaliteit",
        "Verbeterde verbrandingsefficiëntie",
        "Minder onderhoud aan uw ketel",
        "Milieuvriendelijker"
      ],
      description: "Premium mazout met additieven voor optimale prestaties en langere levensduur van uw verwarmingsinstallatie.",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <V7Header />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Onze Mazout Producten
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kies uit onze hoogwaardige mazout producten. Van standaard kwaliteit 
              tot premium mazout met additieven - wij hebben het juiste product voor uw behoeften.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                  product.popular ? 'ring-2 ring-red-500' : ''
                }`}
              >
                {product.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Meest gekozen
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <product.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="text-3xl font-bold text-red-600 mb-2">{product.price}</div>
                  <div className="text-gray-600">per liter</div>
                </div>

                <p className="text-gray-600 mb-6 text-center">{product.description}</p>

                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Nu bestellen
                </button>
              </motion.div>
            ))}
          </div>

          {/* Quality Information */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Kwaliteitsgarantie</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Al onze mazout producten voldoen aan de hoogste Belgische kwaliteitsnormen 
                en worden geleverd door gecertificeerde leveranciers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Gecertificeerde kwaliteit</h3>
                <p className="text-gray-600 text-sm">
                  Alle producten voldoen aan Belgische EN 590 norm
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Veilige opslag</h3>
                <p className="text-gray-600 text-sm">
                  Opgeslagen in moderne, veilige tankfaciliteiten
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Verse voorraad</h3>
                <p className="text-gray-600 text-sm">
                  Regelmatige aanvoer voor optimale brandstofeigenschappen
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <V7Footer />
    </div>
  );
};

export default V7Producten;
