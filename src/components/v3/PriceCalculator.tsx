
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mountain, Calculator, Euro, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  const handleCalculate = () => {
    if (postcode.length >= 4) {
      console.log('Calculating price for Austrian delivery', { amount, postcode, quality });
    }
  };

  return (
    <div className="bg-gradient-to-br from-violet-50 to-amber-50 rounded-2xl p-6 border border-violet-200">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-violet-600 to-amber-500 p-3 rounded-full mr-3">
          <Calculator className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Heizöl-Preis berechnen</h3>
          <p className="text-sm text-gray-600">Sofort-Angebot für ganz Österreich</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="amount" className="text-gray-700 font-medium">Menge (Liter)</Label>
          <div className="relative mt-1">
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="pl-4 pr-12 border-violet-200 focus:border-violet-400"
              min="500"
              max="10000"
              step="100"
            />
            <span className="absolute right-3 top-2.5 text-gray-500 text-sm">L</span>
          </div>
        </div>

        <div>
          <Label htmlFor="postcode" className="text-gray-700 font-medium">Postleitzahl</Label>
          <div className="relative mt-1">
            <Input
              id="postcode"
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="z.B. 1010"
              className="pl-4 border-violet-200 focus:border-violet-400"
              maxLength={4}
            />
            <Mountain className="absolute right-3 top-2.5 h-4 w-4 text-violet-500" />
          </div>
        </div>

        <div>
          <Label className="text-gray-700 font-medium">Heizöl-Qualität</Label>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger className="mt-1 border-violet-200 focus:border-violet-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="premium">Premium EL (€0,89/L)</SelectItem>
              <SelectItem value="standard">Standard EL (€0,82/L)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-lg p-4 border border-violet-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Geschätzter Preis:</span>
            <div className="flex items-center">
              <Euro className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-2xl font-bold text-violet-700">{calculatePrice()}</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Truck className="h-4 w-4 mr-1" />
            <span>Kostenlose Lieferung ab 3.000L</span>
          </div>
        </div>

        <Button 
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-violet-600 to-amber-500 hover:from-violet-700 hover:to-amber-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          disabled={!postcode || postcode.length < 4}
        >
          Jetzt bestellen
        </Button>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        * Preise inkl. 20% MwSt. | Lieferung österreichweit
      </div>
    </div>
  );
};

export default PriceCalculator;
