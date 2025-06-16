
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Droplet, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PriceCalculator = () => {
  const [postcode, setPostcode] = useState('');
  const [liters, setLiters] = useState(3000);
  const [product, setProduct] = useState('standard');
  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();

  const productPrices = {
    standard: 0.50,
    premium: 0.52
  };

  const calculatePrice = () => {
    const basePrice = productPrices[product] * liters;
    const deliveryFee = liters >= 3000 ? 0 : 89;
    const total = basePrice + deliveryFee;
    return { basePrice, deliveryFee, total };
  };

  const handleCalculate = async () => {
    if (!postcode || postcode.length < 4) {
      alert('Voer een geldige postcode in');
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const prices = calculatePrice();
    
    // Store order data in localStorage
    const orderData = {
      postcode,
      liters,
      product,
      pricePerLiter: productPrices[product],
      basePrice: prices.basePrice,
      deliveryFee: prices.deliveryFee,
      totalAmount: prices.total,
      calculatedAt: new Date().toISOString(),
      origin: 'belgium'
    };
    
    localStorage.setItem('orderData', JSON.stringify(orderData));
    
    setIsCalculating(false);
    navigate('/bestellen');
  };

  const { basePrice, deliveryFee, total } = calculatePrice();

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center bg-red-100 text-red-700 px-6 py-3 rounded-full text-sm font-semibold mb-4">
          <Calculator size={18} className="mr-2" />
          Mazoutprijscalculator
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Bereken uw mazoutprijs
        </h2>
        <p className="text-gray-600 text-lg">
          Ontvang uw persoonlijke prijsofferte in enkele seconden
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Postcode Input */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <MapPin size={16} className="mr-2 text-red-600" />
            Postcode
          </label>
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="1000"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg font-medium"
          />
        </div>

        {/* Liters Input */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <Droplet size={16} className="mr-2 text-red-600" />
            Liters
          </label>
          <input
            type="number"
            value={liters}
            onChange={(e) => setLiters(Math.max(500, parseInt(e.target.value) || 500))}
            min="500"
            max="10000"
            step="100"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg font-medium"
          />
        </div>

        {/* Product Selection */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <Droplet size={16} className="mr-2 text-red-600" />
            Mazoutsoort
          </label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg font-medium bg-white"
          >
            <option value="standard">Standaard Mazout</option>
            <option value="premium">Premium Mazout</option>
          </select>
        </div>
      </div>

      {/* Price Display */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-600 mb-1">Basisprijs</div>
            <div className="text-2xl font-bold text-gray-900">€{basePrice.toFixed(2)}</div>
            <div className="text-xs text-gray-500">€{productPrices[product].toFixed(2)}/liter</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Levering</div>
            <div className="text-2xl font-bold text-gray-900">
              {deliveryFee === 0 ? 'GRATIS' : `€${deliveryFee.toFixed(2)}`}
            </div>
            <div className="text-xs text-gray-500">
              {deliveryFee === 0 ? 'Vanaf 3.000L' : 'Onder 3.000L'}
            </div>
          </div>
          <div className="md:border-l border-gray-200 md:pl-4">
            <div className="text-sm text-gray-600 mb-1">Totaalprijs</div>
            <div className="text-3xl font-bold text-red-600">€{total.toFixed(2)}</div>
            <div className="text-xs text-gray-500">incl. BTW</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleCalculate}
          disabled={isCalculating || !postcode}
          className="flex-1 bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isCalculating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Berekenen...
            </>
          ) : (
            <>
              <Calculator size={20} className="mr-3" />
              Nu bestellen
            </>
          )}
        </button>
        
        <button className="flex items-center justify-center px-6 py-4 border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors">
          <Phone size={20} className="mr-2" />
          +32 2 123 4567
        </button>
      </div>

      {/* Info Text */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          ✓ Gratis levering vanaf 3.000 liter ✓ 2-4 werkdagen levertijd ✓ Veilige betaling
        </p>
      </div>
    </div>
  );
};

export default PriceCalculator;
