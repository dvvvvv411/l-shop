
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Shield, Truck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-red-50 py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-200/20 rounded-full translate-x-48 translate-y-48"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin size={16} className="mr-2" />
              Island-wide Delivery in Malta
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Best <span className="text-blue-600">Heating Oil</span> Prices in Malta
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Premium quality heating oil delivered across Malta. 
              Get instant quotes, competitive prices, and reliable service 
              from Malta's trusted heating oil supplier.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="text-blue-600" size={20} />
                </div>
                <span className="text-gray-700 font-medium">Fast 24h Delivery</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Shield className="text-blue-600" size={20} />
                </div>
                <span className="text-gray-700 font-medium">Quality Guaranteed</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Truck className="text-blue-600" size={20} />
                </div>
                <span className="text-gray-700 font-medium">Island-wide Coverage</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MapPin className="text-blue-600" size={20} />
                </div>
                <span className="text-gray-700 font-medium">Local Malta Team</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Instant Quote
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300">
                View Delivery Areas
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Malta map illustration placeholder */}
              <div className="bg-gradient-to-br from-blue-100 to-red-100 rounded-2xl p-8 shadow-2xl">
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-200 to-red-200 rounded-xl flex items-center justify-center">
                    <div className="text-6xl">🇲🇹</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">
                    Serving All of Malta
                  </h3>
                  <p className="text-gray-600">
                    From Valletta to Gozo - We deliver premium heating oil 
                    across the entire Maltese archipelago.
                  </p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                <Truck size={24} />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-red-600 text-white p-3 rounded-full shadow-lg">
                <Shield size={24} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
