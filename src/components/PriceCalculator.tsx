
import React, { useState } from 'react';
import { Calculator, TrendingDown, Clock, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [currentStep, setCurrentStep] = useState(1);
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
  const savings = amount >= 5000 ? (amount * 0.02) : 0; // 2% discount for orders >= 5000L

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

  const handleNextStep = () => {
    if (isStep1Valid) {
      setCurrentStep(2);
    }
  };

  const handleBackStep = () => {
    setCurrentStep(1);
  };

  const handleOrderClick = () => {
    if (isFormValid) {
      // Store order data in the format that OrderForm expects
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
        savings
      };
      localStorage.setItem('orderData', JSON.stringify(orderData));
      navigate('/order');
    }
  };

  const isStep1Valid = postcode.length === 5 && isValidPostcode && isValidAmount;
  const isFormValid = isStep1Valid && currentStep === 2;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto"
    >
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
          {currentStep === 1 
            ? "Geben Sie Ihre Daten ein für ein individuelles Angebot"
            : "Wählen Sie Ihr Produkt und bestellen Sie zum Bestpreis"
          }
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
            currentStep >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-red-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
            currentStep >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Step 1: Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PLZ Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Postleitzahl *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={postcode}
                    onChange={handlePostcodeChange}
                    placeholder="z.B. 12345"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-lg font-semibold transition-colors ${
                      !isValidPostcode && postcode.length === 5
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-red-500'
                    }`}
                    maxLength={5}
                  />
                  {!isValidPostcode && postcode.length === 5 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-3"
                    >
                      <AlertCircle className="text-red-500" size={20} />
                    </motion.div>
                  )}
                </div>
                {!isValidPostcode && postcode.length === 5 && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    Bitte geben Sie eine gültige 5-stellige PLZ ein
                  </motion.p>
                )}
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gewünschte Menge: {amount.toLocaleString('de-DE')} Liter
                </label>
                <div className="relative mb-4">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-lg font-semibold transition-colors ${
                      !isValidAmount
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-red-500'
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
                  <span>1.500L</span>
                  <span>32.000L</span>
                </div>
                {!isValidAmount && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    Menge muss zwischen 1.500L und 32.000L liegen
                  </motion.p>
                )}
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-center pt-6">
              <motion.button
                whileHover={{ scale: isStep1Valid ? 1.02 : 1 }}
                whileTap={{ scale: isStep1Valid ? 0.98 : 1 }}
                disabled={!isStep1Valid}
                onClick={handleNextStep}
                className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                  isStep1Valid
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Weiter zur Produktauswahl</span>
                <ArrowRight size={20} />
              </motion.button>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <div className="flex items-start space-x-3">
                <Clock className="text-blue-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-blue-900">Schnelle Lieferung</h4>
                  <p className="text-sm text-blue-700">
                    Lieferung in 24-48 Stunden • Kostenlos ab 3.000L • Mengenrabatt ab 5.000L
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Product Selection */}
              <div className="space-y-6">
                {/* Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Ihre Angaben</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">PLZ:</span>
                      <span className="font-medium">{postcode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Menge:</span>
                      <span className="font-medium">{amount.toLocaleString('de-DE')} Liter</span>
                    </div>
                  </div>
                </div>

                {/* Product Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Produktauswahl
                  </label>
                  <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct}>
                    <div className="space-y-3">
                      {products.map((product) => (
                        <motion.div
                          key={product.id}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedProduct === product.id
                              ? 'border-red-500 bg-red-50'
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
                                  <div className="font-bold text-red-600">{product.price.toFixed(2)}€</div>
                                  <div className="text-sm text-gray-500">pro Liter</div>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Preisübersicht</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grundpreis ({amount.toLocaleString('de-DE')}L × {currentProduct.price.toFixed(2)}€)</span>
                      <span className="font-semibold">{basePrice.toFixed(2)}€</span>
                    </div>
                    
                    {deliveryFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lieferung</span>
                        <span className="font-semibold">{deliveryFee.toFixed(2)}€</span>
                      </div>
                    )}
                    
                    {deliveryFee === 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Kostenlose Lieferung</span>
                        <span className="font-semibold">0,00€</span>
                      </div>
                    )}
                    
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Mengenrabatt (2%)</span>
                        <span className="font-semibold">-{savings.toFixed(2)}€</span>
                      </div>
                    )}
                    
                    <hr className="border-gray-300" />
                    
                    <div className="flex justify-between text-xl font-bold">
                      <span>Gesamtpreis</span>
                      <span className="text-red-600">{(totalPrice - savings).toFixed(2)}€</span>
                    </div>
                  </div>

                  {savings > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center space-x-2 text-green-600 mb-4"
                    >
                      <TrendingDown size={20} />
                      <span className="font-semibold">Sie sparen: {savings.toFixed(2)}€</span>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOrderClick}
                    className="w-full py-4 rounded-lg font-bold text-lg bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    Jetzt zum Bestpreis bestellen
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBackStep}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Zurück</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PriceCalculator;
