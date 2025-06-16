
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, Star } from 'lucide-react';

const ProductComparison = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Waarom onze mazout kiezen?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vergelijk onze premium mazout met de concurrentie
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Competitor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Andere leveranciers</h3>
                <div className="text-3xl font-bold text-gray-700">€0,55+</div>
                <div className="text-gray-500">per liter</div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center">
                  <X className="h-5 w-5 text-red-500 mr-3" />
                  <span className="text-gray-600">Hogere prijzen</span>
                </li>
                <li className="flex items-center">
                  <X className="h-5 w-5 text-red-500 mr-3" />
                  <span className="text-gray-600">Langere levertijden</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Standaard kwaliteit</span>
                </li>
                <li className="flex items-center">
                  <X className="h-5 w-5 text-red-500 mr-3" />
                  <span className="text-gray-600">Beperkte service</span>
                </li>
              </ul>
            </motion.div>

            {/* Our Product */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 shadow-xl relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  BESTE KEUZE
                </div>
              </div>

              <div className="text-center mb-6 text-white pt-4">
                <h3 className="text-xl font-semibold mb-2">Mazout Vandaag</h3>
                <div className="text-3xl font-bold">€0,50</div>
                <div className="text-red-100">per liter</div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-300 mr-3" />
                  <span>Laagste prijzen</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-300 mr-3" />
                  <span>2-4 werkdagen levering</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-300 mr-3" />
                  <span>Premium kwaliteit</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-300 mr-3" />
                  <span>Uitstekende service</span>
                </li>
              </ul>

              <button className="w-full mt-6 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Nu kiezen
              </button>
            </motion.div>

            {/* Premium Option */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Mazout</h3>
                <div className="text-3xl font-bold text-red-600">€0,52</div>
                <div className="text-gray-500">per liter</div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Extra additieven</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Langere houdbaarheid</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Beschermt uw ketel</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Milieuvriendelijker</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;
