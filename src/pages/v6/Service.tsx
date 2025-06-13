
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Truck, Clock } from 'lucide-react';
import Header from '@/components/v6/Header';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const Service = () => {
  usePageMeta('service');

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
            Service & Quality
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-amber-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Highest Quality</h2>
              </div>
              <p className="text-gray-600">
                Our heating oil meets the highest quality standards and is regularly 
                tested by independent institutes. Certified according to EN 14214.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-amber-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Certified Quality</h2>
              </div>
              <p className="text-gray-600">
                All our products are quality assured and comply with the 
                strictest environmental and quality guidelines.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-amber-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Reliable Delivery</h2>
              </div>
              <p className="text-gray-600">
                Punctual and safe delivery by trained drivers with 
                modern tested tanker vehicles across Malta.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-amber-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">24/7 Service</h2>
              </div>
              <p className="text-gray-600">
                Our customer service is available around the clock. 
                In emergencies, we are also reachable outside business hours.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Service;
