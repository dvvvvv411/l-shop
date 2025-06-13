
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductInfo from './ProductInfo';

const PriceCalculator = () => {
  const [liters, setLiters] = useState(3000);
  const [product, setProduct] = useState('standard');
  const [postcode, setPostcode] = useState('');
  const [isValidPostcode, setIsValidPostcode] = useState(true);

  // Malta postal codes validation
  const validateMaltaPostcode = (code: string) => {
    const maltaPostcodeRegex = /^[A-Z]{3}\s?\d{4}$/;
    return maltaPostcodeRegex.test(code.toUpperCase());
  };

  useEffect(() => {
    if (postcode) {
      setIsValidPostcode(validateMaltaPostcode(postcode));
    } else {
      setIsValidPostcode(true);
    }
  }, [postcode]);

  // Malta-specific pricing in EUR
  const basePricePerLiter = product === 'premium' ? 0.89 : 0.82;
  const totalPrice = liters * basePricePerLiter;
  const deliveryFee = liters >= 3000 ? 0 : 45;
  const finalPrice = totalPrice + deliveryFee;

  const savings = liters >= 5000 ? (liters * 0.08) : (liters * 0.05);

  const handleOrder = () => {
    if (!validateMaltaPostcode(postcode)) {
      alert('Please enter a valid Malta postal code (e.g., VLT 1234)');
      return;
    }
    
    const orderData = {
      liters,
      product,
      postcode,
      pricePerLiter: basePricePerLiter,
      totalPrice: finalPrice,
      deliveryFee
    };
    
    localStorage.setItem('orderData', JSON.stringify(orderData));
    window.location.href = '/order';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-white shadow-2xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Calculator size={32} />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold mb-2">
            Heating Oil Price Calculator
          </CardTitle>
          <p className="text-amber-50 text-lg">
            Get your instant quote for premium heating oil delivery across Malta
          </p>
        </CardHeader>

        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Malta Postal Code
                </label>
                <Input
                  type="text"
                  placeholder="e.g., VLT 1234"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  className={`text-lg ${!isValidPostcode ? 'border-red-500' : ''}`}
                />
                {!isValidPostcode && postcode && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid Malta postal code (e.g., VLT 1234)
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity (Liters)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    min="500"
                    max="10000"
                    step="100"
                    value={liters}
                    onChange={(e) => setLiters(Math.max(500, parseInt(e.target.value) || 500))}
                    className="text-lg pr-16"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    L
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[1000, 3000, 5000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setLiters(amount)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-amber-100 rounded-full transition-colors"
                    >
                      {amount}L
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Type
                </label>
                <Select value={product} onValueChange={setProduct}>
                  <SelectTrigger className="text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Heating Oil - €0.82/L</SelectItem>
                    <SelectItem value="premium">Premium Heating Oil - €0.89/L</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Product Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <ProductInfo productKey={product} />
              </motion.div>
            </div>

            {/* Price Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Your Price Quote
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{liters.toLocaleString()} Liters</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Price per Liter:</span>
                  <span className="font-semibold">€{basePricePerLiter.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">€{totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                    {deliveryFee === 0 ? 'FREE' : `€${deliveryFee}`}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total:</span>
                    <span className="text-3xl font-bold text-amber-600">
                      €{finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {savings > 0 && (
                  <div className="bg-green-100 rounded-lg p-3 mt-4">
                    <div className="flex items-center text-green-700">
                      <TrendingDown size={16} className="mr-2" />
                      <span className="text-sm font-medium">
                        You save €{savings.toFixed(2)} compared to retail prices!
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={handleOrder}
                disabled={!isValidPostcode || !postcode}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Order Now - 4-7 Days Delivery
              </Button>

              <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                <Clock size={14} className="mr-1" />
                <span>Free delivery for orders 3,000L+</span>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceCalculator;
