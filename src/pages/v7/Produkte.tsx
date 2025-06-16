
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import Footer from '../../components/Footer';
import { Droplet, Award, Zap, Shield } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';

const Produkte = () => {
  usePageMeta('produkte');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Onze mazoutproducten</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hoogwaardige brandstof voor optimale verwarming van uw woning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Mazout */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Droplet className="h-8 w-8 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Standaard mazout</h2>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-red-600 mb-2">€0,50</div>
                <div className="text-gray-600">per liter</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span>Hoge verbrandingswaarde</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span>Betrouwbare kwaliteit</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span>Geschikt voor alle ketels</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span>Belgische kwaliteitsnormen</span>
                </li>
              </ul>

              <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Nu bestellen
              </button>
            </div>

            {/* Premium Mazout */}
            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Aanbevolen
                </span>
              </div>
              
              <div className="flex items-center mb-6">
                <Award className="h-8 w-8 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Premium mazout</h2>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-red-600 mb-2">€0,52</div>
                <div className="text-gray-600">per liter</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span>Extra additieven voor betere prestaties</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span>Verminderde uitstoot</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span>Beschermt uw ketel</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span>Langere houdbaarheid</span>
                </li>
              </ul>

              <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Nu bestellen
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Waarom onze mazout?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Zap className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Hoge kwaliteit</h3>
                <p className="text-gray-600">
                  Gecontroleerd volgens strenge Belgische normen voor optimale verbranding.
                </p>
              </div>

              <div className="text-center">
                <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Betrouwbaar</h3>
                <p className="text-gray-600">
                  Constante kwaliteit en samenstelling voor betrouwbare verwarming.
                </p>
              </div>

              <div className="text-center">
                <Award className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Milieuvriendelijk</h3>
                <p className="text-gray-600">
                  Lage emissies en additieven voor een schonere verbranding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Produkte;
