
import React from 'react';
import { motion } from 'framer-motion';
import CheckoutLayout from '@/components/checkout/CheckoutLayout';

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shopify-style Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">HeizölDirekt</span>
          </div>
          
          <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600">
            <span>Sichere Zahlung</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>SSL verschlüsselt</span>
          </div>
        </div>
      </header>
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CheckoutLayout />
          </motion.div>
        </div>
      </main>
      
      {/* Minimal Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="/datenschutz" className="hover:text-gray-900 transition-colors">
                Datenschutz
              </a>
              <a href="/agb" className="hover:text-gray-900 transition-colors">
                AGB
              </a>
              <a href="/impressum" className="hover:text-gray-900 transition-colors">
                Impressum
              </a>
            </div>
            <div className="text-sm text-gray-500">
              © 2024 HeizölDirekt. Alle Rechte vorbehalten.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
