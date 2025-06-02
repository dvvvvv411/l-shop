
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award } from 'lucide-react';
import Header from '../../components/v2/Header';
import Footer from '../../components/v2/Footer';
import CustomerSupport from '../../components/v2/CustomerSupport';
import DigitalServices from '../../components/v2/DigitalServices';

const Service = () => {
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

      {/* Customer Support Section */}
      <CustomerSupport />

      {/* Digital Services Section */}
      <DigitalServices />

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
