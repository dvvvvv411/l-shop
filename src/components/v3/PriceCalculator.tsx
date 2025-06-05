
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mountain, Calculator, Euro, Truck, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const PriceCalculator = () => {
  const [amount, setAmount] = useState<number>(3000);
  const [postcode, setPostcode] = useState<string>('');
  const [quality, setQuality] = useState<string>('premium');

  const calculatePrice = () => {
    const basePrice = quality === 'premium' ? 0.89 : 0.82;
    const discount = amount >= 5000 ? 0.05 : amount >= 3000 ? 0.03 : 0;
    const finalPrice = basePrice * (1 - discount);
    return (amount * finalPrice).toFixed(2);
  };

  const calculateDiscount = () => {
    return amount >= 5000 ? 5 : amount >= 3000 ? 3 : 0;
  };

  const handleCalculate = () => {
    if (postcode.length >= 4) {
      console.log('Calculating price for Austrian delivery', { amount, postcode, quality });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="relative group"
    >
      {/* 3D Card Container */}
      <div className="relative bg-gradient-to-br from-white via-violet-50/50 to-amber-50/30 rounded-3xl p-8 shadow-2xl border border-violet-200/30 backdrop-blur-sm transform transition-all duration-500 hover:shadow-violet-500/20 hover:shadow-3xl hover:-translate-y-2 hover:scale-[1.02]">
        
        {/* Animated Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-amber-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -inset-4 bg-gradient-to-r from-violet-400/20 to-amber-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
        
        {/* Floating Particles */}
        <div className="absolute top-4 right-6 w-2 h-2 bg-violet-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-12 right-12 w-1 h-1 bg-amber-400 rounded-full animate-pulse opacity-40 delay-500" />
        <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-violet-300 rounded-full animate-pulse opacity-50 delay-1000" />

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center mb-8"
        >
          <div className="relative mr-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-violet-500 to-amber-500 p-4 rounded-2xl blur-md opacity-30"
            />
            <div className="relative bg-gradient-to-r from-violet-600 to-amber-500 p-4 rounded-2xl shadow-lg">
              <Calculator className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Premium Heizöl-Rechner</h3>
            <p className="text-gray-600">Ihr persönliches Angebot für ganz Österreich</p>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Amount Slider with Dynamic Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Label className="text-gray-800 font-semibold text-lg mb-3 block">
              Menge: {amount.toLocaleString()} Liter
            </Label>
            <div className="relative">
              <Slider
                value={[amount]}
                onValueChange={(value) => setAmount(value[0])}
                max={10000}
                min={500}
                step={100}
                className="w-full mb-4"
              />
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>500L</span>
                <span>5.000L</span>
                <span>10.000L</span>
              </div>
              
              {/* Discount Badge */}
              {calculateDiscount() > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {calculateDiscount()}% Rabatt
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Postcode Input */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Label htmlFor="postcode" className="text-gray-800 font-semibold text-lg mb-3 block">
              Österreichische Postleitzahl
            </Label>
            <div className="relative">
              <Input
                id="postcode"
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="z.B. 1010 (Wien)"
                className="pl-4 pr-12 py-3 text-lg border-2 border-violet-200 focus:border-violet-500 rounded-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
                maxLength={4}
              />
              <Mountain className="absolute right-4 top-3.5 h-5 w-5 text-violet-500" />
            </div>
          </motion.div>

          {/* Quality Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Label className="text-gray-800 font-semibold text-lg mb-3 block">
              Heizöl-Qualität
            </Label>
            <Select value={quality} onValueChange={setQuality}>
              <SelectTrigger className="py-3 text-lg border-2 border-violet-200 focus:border-violet-500 rounded-xl bg-white/80 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="premium">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-amber-500 mr-2" />
                    Premium EL (€0,89/L)
                  </div>
                </SelectItem>
                <SelectItem value="standard">
                  <div className="flex items-center">
                    Standard EL (€0,82/L)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Dynamic Price Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
              
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 border border-white/30 rounded-full" />
                <div className="absolute bottom-6 right-6 w-6 h-6 border border-white/20 rounded-full" />
                <div className="absolute top-1/2 right-8 w-4 h-4 bg-white/20 rounded-full" />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-violet-200 font-medium">Ihr Gesamtpreis:</span>
                  <div className="text-right">
                    <div className="text-xs text-violet-300 mb-1">inkl. 20% MwSt.</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center mb-4">
                  <Euro className="h-8 w-8 text-amber-400 mr-3" />
                  <motion.span
                    key={calculatePrice()}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-4xl md:text-5xl font-bold text-white"
                  >
                    {calculatePrice()}
                  </motion.span>
                </div>
                
                <div className="flex items-center justify-center text-violet-200">
                  <Truck className="h-5 w-5 mr-2" />
                  <span className="text-sm">
                    {amount >= 3000 ? 'Kostenlose Lieferung' : 'Lieferung: €35'}
                  </span>
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
              className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:via-amber-700 hover:to-yellow-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Calculator className="h-5 w-5 mr-3" />
              Jetzt bestellen - Österreichweit
            </Button>
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center space-x-4 text-xs text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
              <div className="w-2 h-2 bg-white border border-gray-300 rounded-sm"></div>
              <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
            </div>
            <span>100% österreichische Qualität | ÖNORM-zertifiziert</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PriceCalculator;
