
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Euro, Truck, Shield, Lock, CreditCard, AlertCircle, Info, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductInfo from './ProductInfo';

const PriceCalculator = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState<number>(3000);
  const [postcode, setPostcode] = useState<string>('');
  const [quality, setQuality] = useState<string>('standard');
  const [isValidPostcode, setIsValidPostcode] = useState(true);
  const [isValidAmount, setIsValidAmount] = useState(true);

  // Save referrer information when component mounts
  useEffect(() => {
    localStorage.setItem('orderReferrer', location.pathname);
  }, [location.pathname]);

  const products = useMemo(() => ({
    standard: {
      name: 'Standard EL',
      price: 0.70,
      description: 'Bewährte Qualität nach ÖNORM'
    },
    premium: {
      name: 'Premium EL',
      price: 0.75,
      description: 'Schwefelarm mit Additiven'
    }
  }), []);

  // Validation functions
  const validatePostcode = useCallback((value: string) => {
    // Austrian postcodes are 4 digits
    const isValid = /^\d{4}$/.test(value);
    setIsValidPostcode(isValid);
    return isValid;
  }, []);

  const validateAmount = useCallback((value: number) => {
    const isValid = value >= 1000 && value <= 32000;
    setIsValidAmount(isValid);
    return isValid;
  }, []);

  // Memoized calculations for better performance
  const calculations = useMemo(() => {
    const basePrice = products[quality as keyof typeof products].price;
    const totalBasePrice = amount * basePrice;
    const deliveryFee = amount >= 3000 ? 0 : 35;
    const totalPrice = totalBasePrice + deliveryFee;
    
    return {
      basePrice: totalBasePrice.toFixed(2),
      deliveryFee,
      totalPrice: totalPrice.toFixed(2),
      progressPercentage: Math.max(5, Math.min(100, ((amount - 1000) / (32000 - 1000)) * 100))
    };
  }, [amount, quality, products]);

  const handleAmountChange = useCallback((value: string) => {
    const numValue = parseInt(value.replace(/\D/g, '')) || 0;
    setAmount(numValue);
    validateAmount(numValue);
  }, [validateAmount]);

  const handleSliderChange = useCallback((values: number[]) => {
    const newAmount = values[0];
    setAmount(newAmount);
    validateAmount(newAmount);
  }, [validateAmount]);

  const handlePostcodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPostcode(value);
    if (value.length === 4) {
      validatePostcode(value);
    } else {
      setIsValidPostcode(true); // Don't show error while typing
    }
  }, [validatePostcode]);

  const handleOrderClick = useCallback(() => {
    if (isFormValid) {
      const currentProduct = products[quality as keyof typeof products];
      const orderData = {
        product: {
          id: quality,
          name: currentProduct.name,
          price: currentProduct.price,
          description: currentProduct.description
        },
        amount,
        basePrice: parseFloat(calculations.basePrice),
        deliveryFee: calculations.deliveryFee,
        totalPrice: parseFloat(calculations.totalPrice),
        savings: 0
      };
      
      localStorage.setItem('orderData', JSON.stringify(orderData));
      navigate('/checkout');
    }
  }, [amount, quality, products, calculations, navigate]);

  // Form validation - now includes quality in dependencies
  const isFormValid = useMemo(() => 
    postcode.length === 4 && 
    isValidPostcode && 
    isValidAmount && 
    amount >= 1000 && 
    amount <= 32000 && 
    quality && 
    products[quality as keyof typeof products],
    [postcode, isValidPostcode, isValidAmount, amount, quality, products]
  );

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
            {/* Enhanced Amount Input with Slider */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <Label className="text-gray-800 font-semibold text-sm mb-3 block">
                Menge (1.000L - 32.000L)
              </Label>
              
              <div className="space-y-4">
                {/* Input Field with Fixed Icon */}
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
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <span className="text-lg font-bold text-violet-600">L</span>
                    {!isValidAmount && (
                      <AlertCircle className="text-red-500" size={16} />
                    )}
                  </div>
                </div>
                
                {/* Enhanced Slider with Updated Styling */}
                <div className="px-2">
                  <div className="relative">
                    <Slider
                      value={[amount]}
                      onValueChange={handleSliderChange}
                      min={1000}
                      max={32000}
                      step={100}
                      className="w-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-4 [&_[role=slider]]:border-violet-600 [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-xl [&_[role=slider]]:ring-4 [&_[role=slider]]:ring-violet-200/50 [&_[role=slider]]:transition-all [&_[role=slider]]:duration-300 hover:[&_[role=slider]]:scale-110 [&>span:first-child]:h-3 [&>span:first-child]:bg-gray-200 [&>span:first-child]:rounded-full [&>span:first-child]:shadow-lg [&>span:first-child]:border [&>span:first-child]:border-gray-300/50 [&>span>span]:bg-gradient-to-r [&>span>span]:from-violet-500 [&>span>span]:to-purple-600"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>1.000L</span>
                    <motion.span 
                      className="text-violet-600 font-semibold px-2 py-1 bg-violet-100/80 rounded-full"
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {amount.toLocaleString()}L
                    </motion.span>
                    <span>32.000L</span>
                  </div>
                </div>
                
                {!isValidAmount && (
                  <div className="flex items-center space-x-2 text-red-500 text-xs bg-red-50/80 p-2 rounded-lg">
                    <AlertCircle size={14} />
                    <span>Menge muss zwischen 1.000L und 32.000L liegen</span>
                  </div>
                )}
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
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
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

            {/* Enhanced Price Display */}
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
                    <motion.span 
                      className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-700 bg-clip-text text-transparent"
                      key={calculations.totalPrice}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {calculations.totalPrice}
                    </motion.span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">Lieferung</span>
                  <span className={`font-semibold ${
                    calculations.deliveryFee === 0 
                      ? 'text-green-600' 
                      : 'text-gray-700'
                  }`}>
                    {calculations.deliveryFee === 0 ? (
                      <>
                        <Shield className="h-4 w-4 inline mr-1" />
                        Kostenlos
                      </>
                    ) : (
                      `€${calculations.deliveryFee}`
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
                    : 'bg-gradient-to-r from-violet-300 to-purple-300 text-violet-600 cursor-not-allowed'
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
});

PriceCalculator.displayName = 'PriceCalculator';

export default PriceCalculator;
