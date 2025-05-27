
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Truck, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Service = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Service & Qualität
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-red-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Höchste Qualität</h2>
              </div>
              <p className="text-gray-600">
                Unser Heizöl entspricht höchsten Qualitätsstandards und wird regelmäßig 
                von unabhängigen Instituten geprüft. Zertifiziert nach DIN 51603-1.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-red-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Zertifizierte Qualität</h2>
              </div>
              <p className="text-gray-600">
                Alle unsere Produkte sind RAL-gütegesichert und entsprechen den 
                strengsten Umwelt- und Qualitätsrichtlinien.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-red-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Zuverlässige Lieferung</h2>
              </div>
              <p className="text-gray-600">
                Pünktliche und sichere Lieferung durch geschulte Fahrer mit 
                modernen TÜV-geprüften Tankfahrzeugen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-red-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">24/7 Service</h2>
              </div>
              <p className="text-gray-600">
                Unser Kundenservice steht Ihnen rund um die Uhr zur Verfügung. 
                Bei Notfällen sind wir auch außerhalb der Geschäftszeiten erreichbar.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Unsere Qualitätszertifikate</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-lg mb-3 inline-block">
                  <Shield className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">DIN 51603-1</h3>
                <p className="text-sm text-gray-600">Qualitätsnorm für Heizöl</p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-lg mb-3 inline-block">
                  <Award className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">RAL-Gütezeichen</h3>
                <p className="text-sm text-gray-600">Gütegesicherte Qualität</p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-lg mb-3 inline-block">
                  <Truck className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">ISO 9001</h3>
                <p className="text-sm text-gray-600">Qualitätsmanagement</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Service;
