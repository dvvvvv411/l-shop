
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Truck, Euro } from 'lucide-react';

const PriceCalculator = () => {
  const [postcode, setPostcode] = useState('');
  const [liters, setLiters] = useState(1000);
  const [showQuote, setShowQuote] = useState(false);

  const basePrice = 0.89; // EUR per liter
  const deliveryFee = 25; // EUR
  const totalPrice = (liters * basePrice) + deliveryFee;

  const handleCalculate = () => {
    if (postcode.trim()) {
      setShowQuote(true);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calculator size={16} className="mr-2" />
            Get Your Instant Quote
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Calculate Your <span className="text-blue-600">Heating Oil</span> Price
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant pricing for heating oil delivery in Malta. 
            Transparent pricing with no hidden fees.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Order</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-2" />
                    Postcode / Area
                  </label>
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="e.g. VLT, BKR, ATD..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Truck size={16} className="inline mr-2" />
                    Quantity (Liters)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="500"
                      max="5000"
                      step="100"
                      value={liters}
                      onChange={(e) => setLiters(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>500L</span>
                      <span className="font-bold text-blue-600">{liters}L</span>
                      <span>5000L</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Calculate Price
                </button>
              </div>

              {/* Price Display */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Euro size={24} className="mr-2 text-blue-600" />
                  Your Quote
                </h3>
                
                {showQuote ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Heating Oil ({liters}L)</span>
                      <span className="font-semibold">€{(liters * basePrice).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-semibold">€{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-blue-50 rounded-lg px-4">
                      <span className="text-lg font-bold text-gray-900">Total Price</span>
                      <span className="text-2xl font-bold text-blue-600">€{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="text-center mt-6">
                      <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full">
                        Order Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your details to see pricing</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
