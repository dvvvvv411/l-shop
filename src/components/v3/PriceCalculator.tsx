
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Euro, Truck, Shield, Lock, CreditCard, AlertCircle, Info, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductInfo from './ProductInfo';

const PriceCalculator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState<number>(3000);
  const [postcode, setPostcode] = useState<string>('');
  const [quality, setQuality] = useState<string>('premium');
  const [isValidPostcode, setIsValidPostcode] = useState(true);
  const [isValidAmount, setIsValidAmount] = useState(true);

  // Save referrer information when component mounts
  useEffect(() => {
    localStorage.setItem('orderReferrer', location.pathname);
  }, [location.pathname]);

  const products = {
    standard: {
      name: 'Standard EL',
      price: 0.82,
      description: 'Bewährte Qualität nach ÖNORM'
    },
    premium: {
      name: 'Premium EL',
      price: 0.89,
      description: 'Schwefelarm mit Additiven'
    }
  };

  // Validation functions
  const validatePostcode = (value: string) => {
    // Austrian postcodes are 4 digits
    const isValid = /^\d{4}$/.test(value);
    setIsValidPostcode(isValid);
    return isValid;
  };

  const validateAmount = (value: number) => {
    const isValid = value >= 1000 && value <= 32000;
    setIsValidAmount(isValid);
    return isValid;
  };

  const calculatePrice = () => {
    const basePrice = products[quality as keyof typeof products].price;
    return (amount * basePrice).toFixed(2);
  };

  const getDeliveryFee = () => {
    return amount >= 3000 ? 0 : 35;
  };

  const getTotalPrice = () => {
    const basePrice = parseFloat(calculatePrice());
    const deliveryFee = getDeliveryFee();
    return (basePrice + deliveryFee).toFixed(2);
  };

  const handleAmountChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, '')) || 0;
    setAmount(numValue);
    validateAmount(numValue);
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPostcode(value);
    if (value.length === 4) {
      validatePostcode(value);
    } else {
      setIsValidPostcode(true); // Don't show error while typing
    }
  };

  const handleOrderClick = () => {
    if (isFormValid) {
      const currentProduct = products[quality as keyof typeof products];
      const basePrice = parseFloat(calculatePrice());
      const deliveryFee = getDeliveryFee();
      const totalPrice = parseFloat(getTotalPrice());

      // Store order data in localStorage (without sensitive postcode info)
      const orderData = {
        product: {
          id: quality,
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
      
      // Navigate to checkout
      navigate('/checkout');
    }
  };

  const getVisualizationWidth = () => {
    // Ensure amount is within valid range for calculation
    const clampedAmount = Math.max(1000, Math.min(32000, amount));
    const percentage = ((clampedAmount - 1000) / (32000 - 1000)) * 100;
    return Math.max(5, Math.min(100, percentage));
  };

  // Form validation
  const isFormValid = postcode.length === 4 && isValidPostcode && isValidAmount && amount >= 1000 && amount <= 32000;

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Compact Glassmorphism Container */}
        <div className="relative backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-2xl shadow-violet-500/10">
          {/* Simplified Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative flex items-center mb-6"
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-violet-600 to-purple-700 p-3 rounded-xl shadow-lg">
                <Calculator className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-900 to-purple-800 bg-clip-text text-transparent">
                Heizöl-Preisrechner
              </h3>
            </div>
          </motion.div>

          <div className="space-y-6">
            {/* Compact Amount Input */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <Label className="text-gray-800 font-semibold text-sm mb-3 block">
                Menge (1.000L - 32.000L)
              </Label>
              
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type="text"
                    value={amount.toLocaleString()}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className={`text-xl font-bold py-4 pr-16 border-2 backdrop-blur-sm bg-white/80 rounded-xl transition-all duration-300 ${
                      !isValidAmount
                        ? 'border-red-400 bg-red-50/80'
                        : 'border-violet-200 hover:border-violet-400 focus:border-violet-500'
                    } shadow-lg`}
                    placeholder="3.000"
                  />
                  <div className="absolute right-4 top-4 flex items-center space-x-2">
                    <span className="text-lg font-bold text-violet-600">L</span>
                    {!isValidAmount && (
                      <AlertCircle className="text-red-500" size={16} />
                    )}
                  </div>
                </div>
                
                {!isValidAmount && (
                  <div className="flex items-center space-x-2 text-red-500 text-xs bg-red-50/80 p-2 rounded-lg">
                    <AlertCircle size={14} />
                    <span>Menge muss zwischen 1.000L und 32.000L liegen</span>
                  </div>
                )}
                
                {/* Compact Visualization */}
                <div className="relative bg-white/50 backdrop-blur-sm rounded-xl p-3">
                  <div className="w-full bg-gray-200/80 rounded-full h-3">
                    <motion.div
                      className="h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                      style={{ width: `${getVisualizationWidth()}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${getVisualizationWidth()}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>1.000L</span>
                    <span>32.000L</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Compact Postcode Input */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative"
            >
              <Label htmlFor="postcode" className="text-gray-800 font-semibold text-sm mb-3 block">
                Österreichische PLZ *
              </Label>
              
              <div className="relative">
                <Input
                  id="postcode"
                  type="text"
                  value={postcode}
                  onChange={handlePostcodeChange}
                  placeholder="z.B. 1010"
                  className={`py-4 text-lg backdrop-blur-sm bg-white/80 border-2 rounded-xl pr-12 transition-all duration-300 ${
                    !isValidPostcode && postcode.length === 4
                      ? 'border-red-400 bg-red-50/80'
                      : 'border-violet-200 hover:border-violet-400 focus:border-violet-500'
                  } shadow-lg`}
                  maxLength={4}
                />
                <div className="absolute right-4 top-4">
                  {!isValidPostcode && postcode.length === 4 ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <Mountain className="h-5 w-5 text-violet-600" />
                  )}
                </div>
              </div>
              
              {!isValidPostcode && postcode.length === 4 && (
                <div className="mt-2 flex items-center space-x-2 text-red-500 text-xs bg-red-50/80 p-2 rounded-lg">
                  <AlertCircle size={14} />
                  <span>Bitte gültige 4-stellige österreichische PLZ eingeben</span>
                </div>
              )}
            </motion.div>

            {/* Compact Quality Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Label className="text-gray-800 font-semibold text-sm mb-3 block">
                Heizöl-Qualität
              </Label>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(products).map(([key, product]) => (
                  <button
                    key={key}
                    onClick={() => setQuality(key)}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 backdrop-blur-sm ${
                      quality === key
                        ? 'border-violet-400 bg-violet-50/80'
                        : 'border-violet-200/50 bg-white/60 hover:border-violet-300'
                    }`}
                  >
                    {/* Info Icon */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute top-3 right-3 p-1 rounded-full bg-violet-100/80">
                          <Info className="h-3 w-3 text-violet-600" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-sm p-4 bg-white/95 backdrop-blur-sm border shadow-2xl">
                        <ProductInfo productKey={key} />
                      </TooltipContent>
                    </Tooltip>

                    <div className="pr-8">
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h4>
                      <div className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-700 bg-clip-text text-transparent mb-1">
                        €{product.price.toFixed(2)}
                      </div>
                      <p className="text-gray-600 text-xs">{product.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Compact Price Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="relative p-5 bg-gradient-to-br from-violet-50/80 to-purple-50/80 backdrop-blur-sm rounded-xl border border-violet-200/50 shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-gray-900">Gesamtpreis</span>
                  <div className="flex items-center">
                    <Euro className="h-6 w-6 text-violet-600 mr-2" />
                    <span className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-700 bg-clip-text text-transparent">
                      {getTotalPrice()}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">Lieferung</span>
                  <span className={`font-semibold ${
                    getDeliveryFee() === 0 
                      ? 'text-green-600' 
                      : 'text-gray-700'
                  }`}>
                    {getDeliveryFee() === 0 ? (
                      <>
                        <Shield className="h-4 w-4 inline mr-1" />
                        Kostenlos
                      </>
                    ) : (
                      `€${getDeliveryFee()}`
                    )}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Compact CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button 
                onClick={handleOrderClick}
                disabled={!isFormValid}
                className={`w-full font-bold py-5 px-6 rounded-xl text-lg shadow-xl transition-all duration-300 ${
                  isFormValid
                    ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white hover:scale-[1.02]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center">
                  <Truck className="h-5 w-5 mr-2" />
                  {isFormValid ? 'Jetzt bestellen' : 'Bitte alle Felder ausfüllen'}
                </div>
              </Button>
              
              {/* Compact Security Notice */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-center">
                  <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center space-x-3 text-sm">
                    <Shield className="h-4 w-4" />
                    <span className="font-semibold">Sichere Zahlung</span>
                    <Lock className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-700 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white border border-gray-300 rounded-sm"></div>
                    <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
                  </div>
                  <span className="font-medium">100% österreichische Qualität</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
};

export default PriceCalculator;
