
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Truck, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PriceCalculator = () => {
  const [liters, setLiters] = useState(1000);
  const [postcode, setPostcode] = useState('');
  const [pricePerLiter, setPricePerLiter] = useState(0.75); // Belgian mazout price
  const [deliveryFee, setDeliveryFee] = useState(25); // Delivery fee in EUR
  const navigate = useNavigate();

  // Belgian mazout pricing tiers
  const pricingTiers = [
    { min: 0, max: 999, price: 0.78 },
    { min: 1000, max: 1999, price: 0.75 },
    { min: 2000, max: 2999, price: 0.73 },
    { min: 3000, max: Infinity, price: 0.71 }
  ];

  useEffect(() => {
    const tier = pricingTiers.find(tier => liters >= tier.min && liters <= tier.max);
    if (tier) {
      setPricePerLiter(tier.price);
    }
  }, [liters]);

  const totalPrice = (liters * pricePerLiter) + deliveryFee;
  const savingsVsSmallOrder = liters > 1000 ? (liters * (pricingTiers[0].price - pricePerLiter)) : 0;

  const handleOrder = () => {
    // Store order data in localStorage for the order page
    localStorage.setItem('calculatorData', JSON.stringify({
      liters,
      postcode,
      pricePerLiter,
      deliveryFee,
      totalPrice
    }));
    navigate('/bestellen');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Calculator size={16} className="mr-2" />
          Mazoutprijscalculator
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Bereken uw mazoutprijs
        </h2>
        <p className="text-gray-600">
          Voer uw gegevens in voor een directe prijsofferte
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aantal liter mazout
            </label>
            <div className="relative">
              <input
                type="number"
                value={liters}
                onChange={(e) => setLiters(Math.max(100, parseInt(e.target.value) || 100))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                min="100"
                step="100"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                liter
              </span>
            </div>
            <div className="mt-2 flex gap-2">
              {[500, 1000, 1500, 2000, 3000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setLiters(amount)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    liters === amount
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {amount}L
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postcode
            </label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="bijv. 1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={4}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOrder}
            disabled={!postcode || postcode.length < 4}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg"
          >
            Nu bestellen - €{totalPrice.toFixed(2)}
          </motion.button>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Uw prijsopgave</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Mazout ({liters} liter)</span>
              <span className="font-medium">€{(liters * pricePerLiter).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Leveringskosten</span>
              <span className="font-medium">€{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-blue-200 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Totaal</span>
                <span className="text-2xl font-bold text-blue-600">€{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 mb-4">
            <strong>€{pricePerLiter.toFixed(3)}</strong> per liter
          </div>

          {savingsVsSmallOrder > 0 && (
            <div className="bg-green-100 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center text-green-800 text-sm">
                <CheckCircle size={16} className="mr-2" />
                U bespaart €{savingsVsSmallOrder.toFixed(2)} t.o.v. kleine bestelling
              </div>
            </div>
          )}

          {/* Delivery Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Truck size={16} className="mr-2 text-blue-600" />
              Gratis levering vanaf 1000L
            </div>
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-2 text-blue-600" />
              4-7 werkdagen
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Alle prijzen zijn inclusief BTW. Leveringstijd is afhankelijk van uw locatie.
      </div>
    </motion.div>
  );
};

export default PriceCalculator;
