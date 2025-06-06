
import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, Clock, AlertCircle, CheckCircle, Zap, Shield, ArrowRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: 'standard',
    name: 'Fioul Standard',
    price: 0.72,
    description: 'Fioul domestique certifié normes françaises',
    badge: 'Populaire'
  },
  {
    id: 'premium',
    name: 'Fioul Premium',
    price: 0.77,
    description: 'Fioul domestique haute qualité avec additifs',
    badge: 'Recommandé'
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
  const deliveryFee = amount >= 3000 ? 0 : 39;
  const totalPrice = basePrice + deliveryFee;
  const savings = deliveryFee === 0 ? 39 : 0;

  // Validation functions
  const validatePostcode = (value: string) => {
    const isValid = /^\d{5}$/.test(value);
    setIsValidPostcode(isValid);
    return isValid;
  };

  const validateAmount = (value: number) => {
    const isValid = value >= 1000 && value <= 32000;
    setIsValidAmount(isValid);
    return isValid;
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setPostcode(value);
    if (value.length === 5) {
      validatePostcode(value);
    } else {
      setIsValidPostcode(true);
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
        savings
      };
      localStorage.setItem('orderData', JSON.stringify(orderData));
      // Referrer is already saved in useEffect, so we can navigate directly
      navigate('/checkout');
    }
  };

  const isFormValid = postcode.length === 5 && isValidPostcode && isValidAmount;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Compact Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Zap size={16} className="mr-2" />
          Calcul instantané • Prix garantis compétitifs
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Votre prix fioul en <span className="text-red-600">60 secondes</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Transparent • Rapide • Fiable
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form Inputs */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Code Postal Input */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xs">1</span>
                  </div>
                  <label className="text-sm font-semibold text-gray-700">Code postal</label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={postcode}
                    onChange={handlePostcodeChange}
                    placeholder="ex. 75001"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 text-lg font-semibold transition-all ${
                      !isValidPostcode && postcode.length === 5
                        ? 'border-red-400 bg-red-50'
                        : isValidPostcode && postcode.length === 5
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-200 focus:border-red-500'
                    }`}
                    maxLength={5}
                  />
                  {postcode.length === 5 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-4 top-3"
                    >
                      {isValidPostcode ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <AlertCircle className="text-red-500" size={20} />
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
                    Code postal valide requis
                  </motion.p>
                )}
              </div>

              {/* Amount Input */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-xs">2</span>
                  </div>
                  <label className="text-sm font-semibold text-gray-700">
                    Quantité: {amount.toLocaleString('fr-FR')}L
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 text-lg font-semibold transition-all ${
                      !isValidAmount
                        ? 'border-red-400 bg-red-50'
                        : 'border-gray-200 focus:border-orange-500'
                    }`}
                    min="1000"
                    max="32000"
                    step="500"
                  />
                  <span className="absolute right-4 top-3 text-gray-500 font-medium">L</span>
                </div>
                <input
                  type="range"
                  value={amount}
                  onChange={(e) => handleAmountChange(Number(e.target.value))}
                  min="1000"
                  max="32000"
                  step="500"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ea580c 0%, #ea580c ${
                      ((amount - 1000) / (32000 - 1000)) * 100
                    }%, #e5e7eb ${((amount - 1000) / (32000 - 1000)) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1.000L</span>
                  <span>32.000L</span>
                </div>
                {!isValidAmount && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    1.000L - 32.000L autorisé
                  </motion.p>
                )}
              </div>
            </div>

            {/* Product Selection */}
            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-xs">3</span>
                </div>
                <label className="text-sm font-semibold text-gray-700">Choisir le produit</label>
              </div>
              <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative flex items-start space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedProduct === product.id
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedProduct(product.id)}
                    >
                      {product.badge && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          {product.badge}
                        </div>
                      )}
                      <RadioGroupItem value={product.id} id={product.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={product.id} className="cursor-pointer">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">{product.name}</div>
                              <div className="text-xs text-gray-600">{product.description}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-red-600">{product.price.toFixed(2)}€</div>
                              <div className="text-xs text-gray-500">par L</div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Sticky Price Display */}
        <div className="lg:sticky lg:top-6 lg:h-fit">
          <motion.div
            key={`${amount}-${selectedProduct}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-gray-50 to-red-50 rounded-2xl border border-red-100 overflow-hidden"
          >
            {/* Price Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calculator size={20} />
                  <span className="font-semibold">Votre prix</span>
                </div>
                {savings > 0 && (
                  <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
                    {savings}€ économisés !
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Prix de base ({amount.toLocaleString('fr-FR')}L)</span>
                  <span className="font-semibold">{basePrice.toFixed(2)}€</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  {deliveryFee > 0 ? (
                    <>
                      <span className="text-gray-600">Livraison</span>
                      <span className="font-semibold">{deliveryFee.toFixed(2)}€</span>
                    </>
                  ) : (
                    <>
                      <span className="text-green-600 font-medium">Livraison gratuite</span>
                      <span className="font-semibold text-green-600">
                        <span className="line-through text-gray-400">39,00€</span>
                      </span>
                    </>
                  )}
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Prix total</span>
                  <span className="text-2xl font-bold text-red-600">{totalPrice.toFixed(2)}€</span>
                </div>
              </div>

              {/* Trust Elements */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>Qualité certifiée française</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="text-red-500" size={16} />
                  <span>Livraison en 24-48h</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="text-green-500" size={16} />
                  <span>Prix garantis compétitifs</span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                disabled={!isFormValid}
                onClick={handleOrderClick}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
                  isFormValid
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>{isFormValid ? 'Commander maintenant' : 'Compléter les champs'}</span>
                {isFormValid && <ArrowRight size={20} />}
              </motion.button>

              {/* Urgency Element */}
              {isFormValid && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium">
                    <div className="flex items-center justify-center space-x-1">
                      <TrendingDown size={16} />
                      <span>Prix actuels du marché • Réservez maintenant</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Free Delivery Badge */}
              {deliveryFee === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-medium">
                    <CheckCircle size={16} />
                    <span>Livraison gratuite débloquée !</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
