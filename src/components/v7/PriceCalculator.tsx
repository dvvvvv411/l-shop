
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Fuel, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useBelgianTranslations } from '@/hooks/useBelgianTranslations';

const PriceCalculator = () => {
  const [postcode, setPostcode] = useState('');
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('standard');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();
  const t = useBelgianTranslations();

  const calculatePrice = async () => {
    if (!postcode || !amount) return;

    setIsCalculating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const liters = parseInt(amount);
    const basePrice = product === 'premium' ? 0.52 : 0.50; // Belgian pricing
    const total = liters * basePrice;
    const deliveryFee = liters >= 2000 ? 0 : 50; // Free delivery over 2000L
    const finalTotal = total + deliveryFee;
    
    const calculationResult = {
      postcode,
      amount: liters,
      product: product === 'premium' ? 'Premium Mazout' : 'Standaard Mazout',
      pricePerLiter: basePrice,
      basePrice: total,
      deliveryFee,
      total: finalTotal,
      deliveryTime: '2-4 werkdagen'
    };
    
    setResult(calculationResult);
    setIsCalculating(false);
  };

  const handleOrder = () => {
    if (!result) return;
    
    // Store calculation data for checkout
    const calculationData = {
      product: result.product,
      amount: result.amount,
      pricePerLiter: result.pricePerLiter,
      basePrice: result.basePrice,
      deliveryFee: result.deliveryFee,
      total: result.total,
      deliveryPostcode: result.postcode,
      discount: 0
    };
    
    // Store in localStorage for checkout process
    localStorage.setItem('calculationData', JSON.stringify(calculationData));
    localStorage.setItem('orderReferrer', '/7/home');
    
    navigate('/bestellen');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{t.calculator.title}</h2>
            <p className="text-gray-600 mt-2">{t.calculator.subtitle}</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {/* Postcode Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            {t.calculator.postcode}
          </label>
          <Input
            type="text"
            placeholder={t.calculator.postcodeplaceholder}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="text-lg py-3 border-blue-200 focus:border-blue-500"
          />
        </motion.div>

        {/* Amount Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Fuel className="inline h-4 w-4 mr-1" />
            {t.calculator.amount}
          </label>
          <Input
            type="number"
            placeholder={t.calculator.amountPlaceholder}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="500"
            max="5000"
            className="text-lg py-3 border-blue-200 focus:border-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">{t.calculator.minOrder} - {t.calculator.maxOrder}</p>
        </motion.div>

        {/* Product Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Zap className="inline h-4 w-4 mr-1" />
            {t.calculator.product}
          </label>
          <Select value={product} onValueChange={setProduct}>
            <SelectTrigger className="text-lg py-3 border-blue-200 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">{t.calculator.standard} - €0.50/L</SelectItem>
              <SelectItem value="premium">{t.calculator.premium} - €0.52/L</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Calculate Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            onClick={calculatePrice}
            disabled={!postcode || !amount || isCalculating}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all border border-yellow-300/50"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {t.calculator.calculating}
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-5 w-5" />
                {t.calculator.calculate}
              </>
            )}
          </Button>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-4 text-center">Uw Offerte</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.calculator.pricePerLiter}:</span>
                    <span className="font-semibold">€{result.pricePerLiter.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.calculator.basePrice}:</span>
                    <span className="font-semibold">€{result.basePrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.calculator.delivery}:</span>
                    <span className="font-semibold">
                      {result.deliveryFee === 0 ? t.calculator.free : `€${result.deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="border-t border-blue-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">{t.calculator.total}:</span>
                      <span className="text-2xl font-bold text-blue-600">€{result.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600 mt-4">
                    {t.calculator.deliveryTime}: {result.deliveryTime} {t.calculator.afterPayment}
                  </div>
                </div>

                <Button
                  onClick={handleOrder}
                  className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Fuel className="mr-2 h-5 w-5" />
                  {t.calculator.orderNow}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PriceCalculator;
