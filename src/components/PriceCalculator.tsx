
import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, Clock, AlertCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const products: Product[] = [
  {
    id: 'standard',
    name: 'Standard Heating Oil',
    price: 0.85,
    description: 'Quality heating oil according to EN 590'
  },
  {
    id: 'premium',
    name: 'Premium Heating Oil',
    price: 0.90,
    description: 'Low-sulfur premium heating oil with additives'
  }
];

const PriceCalculator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState(3000);
  const [postcode, setPostcode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('standard');
  const [isValidPostcode, setIsValidPostcode] = useState(true);
  const [isValidAmount, setIsValidAmount] = useState(true);

  // Save referrer information when component mounts
  useEffect(() => {
    localStorage.setItem('orderReferrer', location.pathname);
  }, [location.pathname]);

  // Get selected product
  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];
  
  // Calculate prices
  const basePrice = amount * currentProduct.price;
  const deliveryFee = amount >= 3000 ? 0 : 25;
  const totalPrice = basePrice + deliveryFee;

  // Validation functions
  const validatePostcode = (value: string) => {
    const isValid = /^[A-Z]{3}\s?\d{4}$/.test(value.toUpperCase());
    setIsValidPostcode(isValid);
    return isValid;
  };

  const validateAmount = (value: number) => {
    const isValid = value >= 1500 && value <= 32000;
    setIsValidAmount(isValid);
    return isValid;
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    let formatted = value;
    if (value.length > 3) {
      formatted = value.slice(0, 3) + ' ' + value.slice(3, 7);
    }
    setPostcode(formatted);
    if (formatted.replace(/\s/g, '').length === 7) {
      validatePostcode(formatted);
    } else {
      setIsValidPostcode(true); // Don't show error while typing
    }
  };

  const handleAmountChange = (value: number) => {
    setAmount(value);
    validateAmount(value);
  };

  const handleOrderClick = () => {
    if (isFormValid) {
      // Store order data without postcode
      const orderData = {
        product: {
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          description: currentProduct.description
        },
        amount,
        basePrice,
        deliveryFee,
        totalPrice,
        savings: 0
      };
      localStorage.setItem('orderData', JSON.stringify(orderData));
      // Referrer is already saved in useEffect, so we can navigate directly
      navigate('/checkout');
    }
  };

  const isFormValid = postcode.replace(/\s/g, '').length === 7 && isValidPostcode && isValidAmount;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-amber-100 p-3 rounded-full">
            <Calculator className="text-amber-600" size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Heating Oil Price Calculator
        </h2>
        <p className="text-gray-600">
          Calculate your price now and order at the best price
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          {/* Postcode Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Postal Code *
            </label>
            <div className="relative">
              <input
                type="text"
                value={postcode}
                onChange={handlePostcodeChange}
                placeholder="e.g. VLT 1234"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 text-lg font-semibold transition-colors ${
                  !isValidPostcode && postcode.replace(/\s/g, '').length === 7
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-amber-500'
                }`}
                maxLength={8}
              />
              {!isValidPostcode && postcode.replace(/\s/g, '').length === 7 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-3 top-3"
                >
                  <AlertCircle className="text-red-500" size={20} />
                </motion.div>
              )}
            </div>
            {!isValidPostcode && postcode.replace(/\s/g, '').length === 7 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                Please enter a valid Malta postal code (e.g. VLT 1234)
              </motion.p>
            )}
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Desired quantity: {amount.toLocaleString('en-US')} Litres
            </label>
            <div className="relative mb-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 text-lg font-semibold transition-colors ${
                  !isValidAmount
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-amber-500'
                }`}
                min="1500"
                max="32000"
                step="500"
              />
              <span className="absolute right-3 top-3 text-gray-500 font-medium">L</span>
            </div>
            <div className="mb-2">
              <input
                type="range"
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                min="1500"
                max="32000"
                step="500"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>1,500L</span>
              <span>32,000L</span>
            </div>
            {!isValidAmount && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                Quantity must be between 1,500L and 32,000L
              </motion.p>
            )}
          </div>

          {/* Product Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Product Selection
            </label>
            <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct}>
              <div className="space-y-3">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedProduct === product.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedProduct(product.id)}
                  >
                    <RadioGroupItem value={product.id} id={product.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={product.id} className="cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-600">{product.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-amber-600">€{product.price.toFixed(2)}</div>
                            <div className="text-sm text-gray-500">per litre</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </motion.div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Right Column - Price Display */}
        <div className="space-y-6">
          <motion.div
            key={`${amount}-${selectedProduct}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Price Overview</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Base price ({amount.toLocaleString('en-US')}L × €{currentProduct.price.toFixed(2)})</span>
                <span className="font-semibold">€{basePrice.toFixed(2)}</span>
              </div>
              
              {deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold">€{deliveryFee.toFixed(2)}</span>
                </div>
              )}
              
              {deliveryFee === 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Free delivery</span>
                  <span className="font-semibold">€0.00</span>
                </div>
              )}
              
              <hr className="border-gray-300" />
              
              <div className="flex justify-between text-xl font-bold">
                <span>Total price</span>
                <span className="text-amber-600">€{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: isFormValid ? 1.02 : 1 }}
              whileTap={{ scale: isFormValid ? 0.98 : 1 }}
              disabled={!isFormValid}
              onClick={handleOrderClick}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                isFormValid
                  ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isFormValid ? 'Order now at best price' : 'Please fill all fields'}
            </motion.button>
          </motion.div>

          {/* Additional Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Clock className="text-blue-600 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-blue-900">Fast Delivery</h4>
                <p className="text-sm text-blue-700">
                  Delivery in 4-7 working days • Free from 3,000L • Fair prices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceCalculator;
