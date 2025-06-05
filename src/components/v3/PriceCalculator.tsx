
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mountain, Calculator, Euro, Truck, Shield, Lock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PriceCalculator = () => {
  const [amount, setAmount] = useState<number>(3000);
  const [postcode, setPostcode] = useState<string>('');
  const [quality, setQuality] = useState<string>('premium');

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
    if (numValue >= 1000 && numValue <= 32000) {
      setAmount(numValue);
    }
  };

  const handleCalculate = () => {
    if (postcode.length >= 4) {
      console.log('Calculating price for Austrian delivery', { amount, postcode, quality });
    }
  };

  const getVisualizationWidth = () => {
    const percentage = ((amount - 1000) / (32000 - 1000)) * 100;
    return Math.max(5, Math.min(100, percentage));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center mb-8"
        >
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-3 rounded-xl shadow-lg mr-4">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Heizöl-Preisrechner</h3>
            <p className="text-gray-600">Schnell und einfach zum besten Preis</p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Amount Input with Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Label className="text-gray-800 font-semibold text-lg mb-4 block">
              Gewünschte Menge (1.000L - 32.000L)
            </Label>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  value={amount.toLocaleString()}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="text-2xl font-bold py-4 pr-16 border-2 border-gray-300 focus:border-violet-500 rounded-xl"
                  placeholder="3.000"
                />
                <span className="absolute right-4 top-4 text-xl font-semibold text-gray-500">L</span>
              </div>
              
              {/* Visualization Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-violet-500 to-purple-600 h-3 rounded-full relative"
                    style={{ width: `${getVisualizationWidth()}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${getVisualizationWidth()}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="absolute right-0 top-0 w-4 h-4 bg-white border-2 border-violet-500 rounded-full -mt-0.5 shadow-lg"></div>
                  </motion.div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>1.000L</span>
                  <span>16.000L</span>
                  <span>32.000L</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Postcode Input */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Label htmlFor="postcode" className="text-gray-800 font-semibold text-lg mb-4 block">
              Österreichische Postleitzahl
            </Label>
            <div className="relative">
              <Input
                id="postcode"
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="z.B. 1010 (Wien)"
                className="py-4 text-lg border-2 border-gray-300 focus:border-violet-500 rounded-xl pr-12"
                maxLength={4}
              />
              <Mountain className="absolute right-4 top-4 h-5 w-5 text-violet-500" />
            </div>
          </motion.div>

          {/* Quality Selection Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Label className="text-gray-800 font-semibold text-lg mb-4 block">
              Heizöl-Qualität wählen
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(products).map(([key, product]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setQuality(key)}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    quality === key
                      ? 'border-violet-500 bg-violet-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-gray-900">{product.name}</h4>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-violet-600">€{product.price.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">pro Liter</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                  {quality === key && (
                    <div className="mt-3 flex items-center text-violet-600 text-sm font-medium">
                      <div className="w-2 h-2 bg-violet-500 rounded-full mr-2"></div>
                      Ausgewählt
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Price Display - Less Prominent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Grundpreis ({amount.toLocaleString()}L × €{products[quality as keyof typeof products].price.toFixed(2)})</span>
                  <span className="font-semibold">€{calculatePrice()}</span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span>Lieferung</span>
                  <span className={`font-semibold ${getDeliveryFee() === 0 ? 'text-green-600' : ''}`}>
                    {getDeliveryFee() === 0 ? 'Kostenlos' : `€${getDeliveryFee()}`}
                  </span>
                </div>
                
                <hr className="border-gray-300" />
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Gesamtpreis</span>
                  <div className="flex items-center">
                    <Euro className="h-6 w-6 text-violet-600 mr-2" />
                    <span className="text-2xl font-bold text-violet-600">{getTotalPrice()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button 
              onClick={handleCalculate}
              disabled={!postcode || postcode.length < 4}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Truck className="h-5 w-5 mr-3" />
              Jetzt bestellen - Österreichweit
            </Button>
            
            {/* Security Notices */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-green-600 mr-2" />
                  <span>SSL-verschlüsselt</span>
                </div>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 text-green-600 mr-2" />
                  <span>Datenschutz garantiert</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 text-green-600 mr-2" />
                  <span>Sichere Bezahlung</span>
                </div>
              </div>
              <div className="text-center text-xs text-gray-500">
                Ihre Daten werden verschlüsselt übertragen und nicht an Dritte weitergegeben
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-4 text-xs text-gray-600 bg-gray-100 px-6 py-3 rounded-full">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
              <div className="w-2 h-2 bg-white border border-gray-300 rounded-sm"></div>
              <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
            </div>
            <span>100% österreichische Qualität | ÖNORM-zertifiziert | Seit 1998</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PriceCalculator;
