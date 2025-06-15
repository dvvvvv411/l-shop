
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Truck, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const PriceCalculator = () => {
  const [liters, setLiters] = useState(3000);
  const [product, setProduct] = useState('standard');
  const [postcode, setPostcode] = useState('');
  const navigate = useNavigate();

  // German pricing
  const pricing = {
    standard: 0.70,
    premium: 0.72
  };

  const calculatePrice = () => {
    const pricePerLiter = pricing[product as keyof typeof pricing];
    const basePrice = liters * pricePerLiter;
    const deliveryFee = liters >= 3000 ? 0 : 89;
    const total = basePrice + deliveryFee;
    
    return {
      basePrice,
      deliveryFee,
      total,
      pricePerLiter
    };
  };

  const { basePrice, deliveryFee, total, pricePerLiter } = calculatePrice();

  const handleOrder = () => {
    // Store order data in localStorage for the order page
    localStorage.setItem('orderData', JSON.stringify({
      liters,
      product,
      postcode,
      pricePerLiter,
      basePrice,
      deliveryFee,
      total
    }));
    navigate('/bestellen');
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <Calculator className="text-red-600" size={32} />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Preis berechnen & bestellen
        </h2>
        <p className="text-lg text-gray-600">
          Erhalten Sie sofort Ihren individuellen Heizöl-Preis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Menge (Liter)
            </label>
            <Input
              type="number"
              value={liters}
              onChange={(e) => setLiters(Number(e.target.value))}
              min="500"
              max="10000"
              step="100"
              className="text-lg py-6"
            />
            <p className="text-sm text-gray-500 mt-2">
              Mindestmenge: 500 Liter
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Heizöl-Qualität
            </label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger className="text-lg py-6">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">
                  <div className="flex flex-col">
                    <span className="font-medium">Standard Heizöl</span>
                    <span className="text-sm text-gray-500">€{pricing.standard}/Liter</span>
                  </div>
                </SelectItem>
                <SelectItem value="premium">
                  <div className="flex flex-col">
                    <span className="font-medium">Premium Heizöl</span>
                    <span className="text-sm text-gray-500">€{pricing.premium}/Liter</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Postleitzahl
            </label>
            <Input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="z.B. 80331"
              className="text-lg py-6"
            />
          </div>
        </div>

        {/* Price Summary */}
        <div className="space-y-6">
          <Card className="border-2 border-red-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-gray-900">Ihre Bestellung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">
                  {liters.toLocaleString()} Liter {product === 'premium' ? 'Premium' : 'Standard'}
                </span>
                <span className="font-semibold">€{basePrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 flex items-center">
                  <Truck size={16} className="mr-2" />
                  Anfahrtskosten
                </span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? 'Kostenlos' : `€${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 text-xl font-bold text-red-600 border-t-2 border-red-100">
                <span>Gesamtpreis</span>
                <span>€{total.toFixed(2)}</span>
              </div>

              <div className="text-sm text-gray-500 text-center mt-4">
                Preis pro Liter: €{pricePerLiter.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleOrder}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold rounded-xl"
            disabled={!postcode || liters < 500}
          >
            Jetzt bestellen
          </Button>

          <div className="flex items-center justify-center text-sm text-gray-500">
            <Phone size={16} className="mr-2" />
            Kostenlose Beratung: 089 41435467
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
        <div className="text-center p-4">
          <div className="text-2xl font-bold text-red-600 mb-1">4-7</div>
          <div className="text-sm text-gray-600">Werktage Lieferzeit</div>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl font-bold text-red-600 mb-1">0€</div>
          <div className="text-sm text-gray-600">Anfahrt ab 3.000L</div>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl font-bold text-red-600 mb-1">150.000+</div>
          <div className="text-sm text-gray-600">Zufriedene Kunden</div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
