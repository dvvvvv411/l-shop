
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mountain, Calculator, Euro, Truck, Shield, Lock, CreditCard, AlertCircle, Info, Sparkles, Award } from 'lucide-react';
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
      {/* Enhanced Background with Dynamic Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-400/15 to-violet-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-300/10 to-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Geometric Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/6 w-4 h-4 bg-gradient-to-br from-violet-400 to-purple-600 rounded transform rotate-45 opacity-30"
        />
        <motion.div
          animate={{ y: [30, -30, 30], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-3/4 right-1/4 w-6 h-6 bg-gradient-to-br from-indigo-400 to-violet-600 rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [-15, 25, -15], x: [-10, 10, -10] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/3 w-3 h-3 bg-gradient-to-br from-purple-500 to-violet-700 rounded opacity-25"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Main Glassmorphism Container */}
        <div className="relative backdrop-blur-xl bg-white/70 border border-white/20 rounded-3xl p-8 shadow-2xl shadow-violet-500/10">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/5 to-purple-600/5 pointer-events-none"></div>
          
          {/* Enhanced Header with Premium Styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative flex items-center mb-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-gradient-to-br from-violet-600 to-purple-700 p-4 rounded-2xl shadow-lg">
                <Calculator className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="ml-5">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-900 to-purple-800 bg-clip-text text-transparent">
                  Heizöl-Preisrechner
                </h3>
                <Sparkles className="h-6 w-6 text-violet-600 animate-pulse" />
              </div>
              <p className="text-gray-600 text-lg">Modernste Technologie für beste Preise</p>
            </div>
          </motion.div>

          <div className="space-y-10">
            {/* Enhanced Amount Input with Advanced Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <Label className="text-gray-800 font-bold text-xl mb-6 block flex items-center">
                Gewünschte Menge (1.000L - 32.000L)
                <Award className="h-5 w-5 ml-2 text-violet-600" />
              </Label>
              
              <div className="space-y-6">
                {/* Enhanced Input with Glassmorphism */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Input
                    type="text"
                    value={amount.toLocaleString()}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className={`relative text-3xl font-bold py-6 pr-20 border-2 backdrop-blur-sm bg-white/80 rounded-2xl transition-all duration-300 ${
                      !isValidAmount
                        ? 'border-red-400 bg-red-50/80 shadow-red-200/50'
                        : 'border-violet-200 hover:border-violet-400 focus:border-violet-500 shadow-violet-200/30'
                    } shadow-lg hover:shadow-xl`}
                    placeholder="3.000"
                  />
                  <div className="absolute right-6 top-6 flex items-center space-x-2">
                    <span className="text-2xl font-bold text-violet-600">L</span>
                    {!isValidAmount && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-1 bg-red-100 rounded-full"
                      >
                        <AlertCircle className="text-red-500" size={20} />
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {!isValidAmount && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-red-500 bg-red-50/80 backdrop-blur-sm p-3 rounded-xl border border-red-200"
                  >
                    <AlertCircle size={16} />
                    <span className="text-sm font-medium">Menge muss zwischen 1.000L und 32.000L liegen</span>
                  </motion.div>
                )}
                
                {/* Advanced Visualization with Gradient and Animation */}
                <div className="relative p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-violet-200/50">
                  <div className="relative">
                    <div className="w-full bg-gray-200/80 rounded-full h-4 shadow-inner">
                      <motion.div
                        className="relative h-4 rounded-full overflow-hidden"
                        style={{ width: `${getVisualizationWidth()}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${getVisualizationWidth()}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-600 to-indigo-600"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-400/50 to-purple-500/50 animate-pulse"></div>
                        <div className="absolute right-0 top-0 w-5 h-5 bg-white border-3 border-violet-500 rounded-full -mt-0.5 shadow-lg transform hover:scale-110 transition-transform"></div>
                      </motion.div>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-gray-600 mt-3">
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-violet-400 rounded-full mr-1"></div>
                        1.000L
                      </span>
                      <span className="text-violet-700 font-bold">16.000L</span>
                      <span className="flex items-center">
                        32.000L
                        <div className="w-2 h-2 bg-violet-400 rounded-full ml-1"></div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Postcode Input with Austrian Styling */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative"
            >
              <Label htmlFor="postcode" className="text-gray-800 font-bold text-xl mb-6 block flex items-center">
                Österreichische Postleitzahl *
                <Mountain className="h-5 w-5 ml-2 text-violet-600" />
              </Label>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Input
                  id="postcode"
                  type="text"
                  value={postcode}
                  onChange={handlePostcodeChange}
                  placeholder="z.B. 1010 (Wien)"
                  className={`relative py-6 text-xl backdrop-blur-sm bg-white/80 border-2 rounded-2xl pr-14 transition-all duration-300 ${
                    !isValidPostcode && postcode.length === 4
                      ? 'border-red-400 bg-red-50/80 shadow-red-200/50'
                      : 'border-violet-200 hover:border-violet-400 focus:border-violet-500 shadow-violet-200/30'
                  } shadow-lg hover:shadow-xl`}
                  maxLength={4}
                />
                <div className="absolute right-5 top-6">
                  {!isValidPostcode && postcode.length === 4 ? (
                    <div className="p-2 bg-red-100 rounded-full">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  ) : (
                    <div className="p-2 bg-violet-100 rounded-full">
                      <Mountain className="h-5 w-5 text-violet-600" />
                    </div>
                  )}
                </div>
              </div>
              
              {!isValidPostcode && postcode.length === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center space-x-2 text-red-500 bg-red-50/80 backdrop-blur-sm p-3 rounded-xl border border-red-200"
                >
                  <AlertCircle size={16} />
                  <span className="text-sm font-medium">Bitte geben Sie eine gültige 4-stellige österreichische PLZ ein</span>
                </motion.div>
              )}
            </motion.div>

            {/* Premium Quality Selection Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Label className="text-gray-800 font-bold text-xl mb-6 block flex items-center">
                Heizöl-Qualität wählen
                <Sparkles className="h-5 w-5 ml-2 text-violet-600" />
              </Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(products).map(([key, product]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setQuality(key)}
                    className={`relative p-8 rounded-2xl border-2 text-left transition-all duration-300 backdrop-blur-sm ${
                      quality === key
                        ? 'border-violet-400 bg-violet-50/80 shadow-xl shadow-violet-500/20'
                        : 'border-violet-200/50 bg-white/60 hover:border-violet-300 hover:bg-white/80 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {/* Premium Info Icon */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute top-6 right-6 p-2 rounded-full bg-violet-100/80 hover:bg-violet-200/80 transition-colors">
                          <Info className="h-4 w-4 text-violet-600" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-sm p-4 bg-white/95 backdrop-blur-sm border shadow-2xl">
                        <ProductInfo productKey={key} />
                      </TooltipContent>
                    </Tooltip>

                    <div className="flex justify-between items-start mb-4 pr-12">
                      <h4 className="font-bold text-2xl text-gray-900">{product.name}</h4>
                      <div className="text-right">
                        <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-700 bg-clip-text text-transparent">
                          €{product.price.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">pro Liter</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-base">{product.description}</p>
                    
                    {quality === key && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center text-violet-700 font-bold"
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full mr-3 animate-pulse"></div>
                        Ausgewählt
                        <Sparkles className="h-4 w-4 ml-2" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Price Display with Premium Styling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="relative p-8 bg-gradient-to-br from-violet-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl border border-violet-200/50 shadow-xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-600/5"></div>
                
                <div className="relative space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900 flex items-center">
                      Gesamtpreis
                      <Award className="h-6 w-6 ml-2 text-violet-600" />
                    </span>
                    <div className="flex items-center">
                      <Euro className="h-8 w-8 text-violet-600 mr-3" />
                      <span className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-700 bg-clip-text text-transparent">
                        {getTotalPrice()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-700 font-medium">Lieferung</span>
                    <span className={`font-bold text-xl ${
                      getDeliveryFee() === 0 
                        ? 'text-green-600 flex items-center' 
                        : 'text-gray-700'
                    }`}>
                      {getDeliveryFee() === 0 ? (
                        <>
                          <Shield className="h-5 w-5 mr-1" />
                          Kostenlos
                        </>
                      ) : (
                        `€${getDeliveryFee()}`
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium CTA Button with Enhanced Styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="relative">
                <Button 
                  onClick={handleOrderClick}
                  disabled={!isFormValid}
                  className={`relative w-full font-bold py-6 px-8 rounded-2xl text-xl shadow-2xl transition-all duration-300 ${
                    isFormValid
                      ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white hover:scale-[1.02] shadow-violet-500/30 hover:shadow-violet-500/50'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } overflow-hidden`}
                >
                  {isFormValid && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                  )}
                  <div className="relative flex items-center justify-center">
                    <Truck className="h-6 w-6 mr-3" />
                    {isFormValid ? 'Jetzt bestellen - Österreichweit' : 'Bitte alle Felder ausfüllen'}
                    {isFormValid && <Sparkles className="h-5 w-5 ml-3" />}
                  </div>
                </Button>
              </div>
              
              {/* Enhanced Security Notices with Premium Styling */}
              <div className="mt-6 space-y-4">
                {/* Premium Security Emblem */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center justify-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full blur opacity-30"></div>
                    <div className="relative bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-4">
                      <Shield className="h-6 w-6" />
                      <span className="font-bold text-lg">Sichere Zahlung</span>
                      <div className="flex space-x-2">
                        <Lock className="h-5 w-5" />
                        <CreditCard className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Austrian Quality Badge with Enhanced Styling */}
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-700 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-full border border-violet-200/50 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-600 rounded-sm shadow-sm"></div>
                    <div className="w-3 h-3 bg-white border border-gray-300 rounded-sm shadow-sm"></div>
                    <div className="w-3 h-3 bg-red-600 rounded-sm shadow-sm"></div>
                  </div>
                  <span className="font-medium">100% österreichische Qualität | ÖNORM-zertifiziert | Seit 1998</span>
                </div>
                
                {/* Privacy Notice with Modern Styling */}
                <div className="text-center text-sm text-gray-500 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full">
                  <Lock className="inline h-4 w-4 mr-2" />
                  Ihre Daten werden verschlüsselt übertragen und nicht an Dritte weitergegeben
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
