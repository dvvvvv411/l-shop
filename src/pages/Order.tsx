
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressIndicator from '@/components/ProgressIndicator';
import OrderForm from '@/components/OrderForm';

const Order = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProgressIndicator currentStep={2} />
            <OrderForm />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Order;
