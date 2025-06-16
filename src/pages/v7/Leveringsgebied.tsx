
import React from 'react';
import V7Header from '@/components/v7/Header';
import V7Footer from '@/components/v7/Footer';
import { motion } from 'framer-motion';
import { MapPin, Truck, Clock, CheckCircle } from 'lucide-react';

const V7Leveringsgebied = () => {
  const provinces = [
    { name: "Antwerpen", coverage: "100%", cities: ["Antwerpen", "Mechelen", "Turnhout", "Mol"] },
    { name: "Oost-Vlaanderen", coverage: "100%", cities: ["Gent", "Aalst", "Sint-Niklaas", "Dendermonde"] },
    { name: "West-Vlaanderen", coverage: "100%", cities: ["Brugge", "Oostende", "Kortrijk", "Roeselare"] },
    { name: "Vlaams-Brabant", coverage: "100%", cities: ["Leuven", "Vilvoorde", "Halle", "Aarschot"] },
    { name: "Limburg", coverage: "100%", cities: ["Hasselt", "Genk", "Tongeren", "Maaseik"] },
    { name: "Brussels Hoofdstedelijk Gewest", coverage: "100%", cities: ["Brussel", "Schaarbeek", "Anderlecht", "Ixelles"] },
    { name: "Henegouwen", coverage: "95%", cities: ["Bergen", "Charleroi", "La Louvière", "Tournai"] },
    { name: "Luik", coverage: "95%", cities: ["Luik", "Seraing", "Verviers", "Herstal"] },
    { name: "Namen", coverage: "90%", cities: ["Namen", "Dinant", "Gembloux", "Ciney"] },
    { name: "Waals-Brabant", coverage: "95%", cities: ["Wavre", "Nivelles", "Braine-l'Alleud", "Ottignies"] },
    { name: "Luxemburg", coverage: "85%", cities: ["Aarlen", "Bastenaken", "Virton", "Marche-en-Famenne"] }
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
              Leveringsgebied
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MazoutVandaag levert in heel België. Ontdek of wij ook in uw regio leveren 
              en welke postcodes wij bedienen.
            </p>
          </div>

          {/* Coverage Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-red-50 rounded-xl p-6 text-center"
            >
              <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">11 Provincies</h3>
              <p className="text-gray-600">Dekking in alle Belgische provincies</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-green-50 rounded-xl p-6 text-center"
            >
              <Truck className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">95% Dekking</h3>
              <p className="text-gray-600">Gemiddelde dekkingsgraad in België</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-blue-50 rounded-xl p-6 text-center"
            >
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">3-5 Werkdagen</h3>
              <p className="text-gray-600">Standaard levertijd</p>
            </motion.div>
          </div>

          {/* Province Coverage */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Dekking per Provincie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {provinces.map((province, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{province.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      province.coverage === '100%' 
                        ? 'bg-green-100 text-green-800' 
                        : province.coverage === '95%'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {province.coverage}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {province.cities.map((city, cityIndex) => (
                      <div key={cityIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600 text-sm">{city}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Leveringsinformatie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Standaard Levering</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Levering binnen 3-5 werkdagen</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Gratis levering vanaf 3.000 liter</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Levering op werkdagen tussen 8:00-17:00</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Telefonische aankondiging voor levering</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Leveringsvoorwaarden</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Toegankelijkheid voor vrachtwagen</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Tank moet bereikbaar zijn</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Aanwezigheid tijdens levering vereist</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Geldige postcode bij bestelling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <V7Footer />
    </div>
  );
};

export default V7Leveringsgebied;
