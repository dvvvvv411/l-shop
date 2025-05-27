
import React, { useState } from 'react';
import { Calculator, TrendingDown, Clock } from 'lucide-react';

const PriceCalculator = () => {
  const [amount, setAmount] = useState(1000);
  const [postcode, setPostcode] = useState('');
  
  const pricePerLiter = 0.89;
  const totalPrice = (amount * pricePerLiter).toFixed(2);
  const savings = (amount * 0.15).toFixed(2);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Calculator className="text-red-600" size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Heizöl-Preisrechner
        </h2>
        <p className="text-gray-600">
          Berechnen Sie jetzt Ihren Preis und sparen Sie bis zu 15%
        </p>
      </div>

      <div className="space-y-6">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gewünschte Menge (Liter)
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg font-semibold"
              min="500"
              max="10000"
              step="100"
            />
            <span className="absolute right-3 top-3 text-gray-500 font-medium">L</span>
          </div>
          <div className="mt-2">
            <input
              type="range"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="500"
              max="5000"
              step="100"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Postcode Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Postleitzahl
          </label>
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="z.B. 12345"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            maxLength={5}
          />
        </div>

        {/* Price Display */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {pricePerLiter}€
              </div>
              <div className="text-sm text-gray-600">pro Liter</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {totalPrice}€
              </div>
              <div className="text-sm text-gray-600">Gesamtpreis</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
            <TrendingDown size={20} />
            <span className="font-semibold">Sie sparen: {savings}€</span>
          </div>

          <button className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors transform hover:scale-105">
            Jetzt zum Bestpreis bestellen
          </button>
        </div>

        {/* Quick Info */}
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>Lieferung in 24-48h</span>
          </div>
          <span>•</span>
          <span>Keine Mindestbestellmenge</span>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
