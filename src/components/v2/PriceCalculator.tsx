
import React, { useState } from 'react';
import { Calculator, TrendingDown, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const products: Product[] = [
  {
    id: 'standard',
    name: 'Standard Heizöl',
    price: 0.70,
    description: 'Qualitäts-Heizöl nach DIN 51603-1'
  },
  {
    id: 'premium',
    name: 'Premium Heizöl',
    price: 0.75,
    description: 'Schwefelarmes Premium-Heizöl mit Additiven'
  }
];

const PriceCalculator = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(3000);
  const [postcode, setPostcode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('standard');
  const [isValidPostcode, setIsValidPostcode] = useState(true);
  const [isValidAmount, setIsValidAmount] = useState(true);

  // Get selected product
  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];
  
  // Calculate prices
  const basePrice = amount * currentProduct.price;
  const deliveryFee = amount >= 3000 ? 0 : 25;
  const totalPrice = basePrice + deliveryFee;

  // Validation functions
  const validatePostcode = (value: string) => {
    const isValid = /^\d{5}$/.test(value);
    setIsValidPostcode(isValid);
    return isValid;
  };

  const validateAmount = (value: number) => {
    const isValid = value >= 1500 && value <= 32000;
    setIsValidAmount(isValid);
    return isValid;
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setPostcode(value);
    if (value.length === 5) {
      validatePostcode(value);
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
      // Store order data in the format that CheckoutForm expects
      const orderData = {
        product: {
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          description: currentProduct.description
        },
        amount,
        postcode,
        basePrice,
        deliveryFee,
        totalPrice,
        savings: 0
      };
      localStorage.setItem('orderData', JSON.stringify(orderData));
      navigate('/kasse');
    }
  };

  const isFormValid = postcode.length === 5 && isValidPostcode && isValidAmount;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl shadow-2xl max-w-5xl mx-auto overflow-hidden"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
            <Calculator className="text-white" size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-light mb-2">
          Heizöl-Preisrechner
        </h2>
        <p className="text-blue-100 text-lg">
          Ihr persönlicher Preis in wenigen Schritten
        </p>
      </div>

      <div className="p-8">
        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* PLZ Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Postleitzahl</h3>
            </div>
            <div className="relative">
              <input
                type="text"
                value={postcode}
                onChange={handlePostcodeChange}
                placeholder="z.B. 12345"
                className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 text-lg font-semibold transition-all ${
                  !isValidPostcode && postcode.length === 5
                    ? 'border-red-400 bg-red-50'
                    : isValidPostcode && postcode.length === 5
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 focus:border-blue-500'
                }`}
                maxLength={5}
              />
              {postcode.length === 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-4 top-4"
                >
                  {isValidPostcode ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <AlertCircle className="text-red-500" size={24} />
                  )}
                </motion.div>
              )}
            </div>
            {!isValidPostcode && postcode.length === 5 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm"
              >
                Bitte geben Sie eine gültige PLZ ein
              </motion.p>
            )}
          </motion.div>

          {/* Amount Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-bold text-sm">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Menge wählen</h3>
            </div>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 text-lg font-semibold transition-all ${
                  !isValidAmount
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 focus:border-emerald-500'
                }`}
                min="1500"
                max="32000"
                step="500"
              />
              <span className="absolute right-4 top-4 text-gray-500 font-medium text-lg">L</span>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                min="1500"
                max="32000"
                step="500"
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${((amount - 1500) / (32000 - 1500)) * 100}%, #e5e7eb ${((amount - 1500) / (32000 - 1500)) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1.500L</span>
                <span className="font-semibold text-emerald-600">{amount.toLocaleString('de-DE')}L</span>
                <span>32.000L</span>
              </div>
            </div>
            {!isValidAmount && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm"
              >
                Menge muss zwischen 1.500L und 32.000L liegen
              </motion.p>
            )}
          </motion.div>

          {/* Product Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Produkt wählen</h3>
            </div>
            <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct}>
              <div className="space-y-3">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedProduct === product.id
                        ? 'border-blue-500 bg-blue-50'
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
                            <div className="font-bold text-blue-600 text-lg">{product.price.toFixed(2)}€</div>
                            <div className="text-sm text-gray-500">pro Liter</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </motion.div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>
        </div>

        {/* Price Display & Action Section */}
        <motion.div
          key={`${amount}-${selectedProduct}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Price Breakdown */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ihre Preisübersicht</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="text-gray-600">Grundpreis ({amount.toLocaleString('de-DE')}L × {currentProduct.price.toFixed(2)}€)</span>
                  <span className="font-semibold text-lg">{basePrice.toFixed(2)}€</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  {deliveryFee > 0 ? (
                    <>
                      <span className="text-gray-600">Lieferung</span>
                      <span className="font-semibold text-lg">{deliveryFee.toFixed(2)}€</span>
                    </>
                  ) : (
                    <>
                      <span className="text-emerald-600 font-medium">Kostenlose Lieferung</span>
                      <span className="font-semibold text-emerald-600 text-lg">0,00€</span>
                    </>
                  )}
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg">
                  <span className="text-xl font-semibold">Gesamtpreis</span>
                  <span className="text-2xl font-bold">{totalPrice.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="text-center lg:text-left space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 justify-center lg:justify-start">
                  <Clock className="text-emerald-600" size={20} />
                  <span className="text-gray-700 font-medium">Lieferung in 4-7 Werktagen</span>
                </div>
                <div className="flex items-center space-x-2 justify-center lg:justify-start">
                  <CheckCircle className="text-emerald-600" size={20} />
                  <span className="text-gray-700 font-medium">DIN-zertifizierte Qualität</span>
                </div>
                <div className="flex items-center space-x-2 justify-center lg:justify-start">
                  <TrendingDown className="text-blue-600" size={20} />
                  <span className="text-gray-700 font-medium">Bestpreisgarantie</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                disabled={!isFormValid}
                onClick={handleOrderClick}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  isFormValid
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isFormValid ? 'Jetzt zum Bestpreis bestellen' : 'Bitte alle Felder ausfüllen'}
              </motion.button>

              {deliveryFee === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                    <CheckCircle size={16} />
                    <span>Kostenlose Lieferung aktiviert!</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PriceCalculator;
