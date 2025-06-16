
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Calendar, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const V7PriceCalculator = () => {
  const [amount, setAmount] = useState(3000);
  const [postcode, setPostcode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('standard');
  const navigate = useNavigate();

  // Belgian-specific pricing
  const products = {
    standard: { name: 'Standaard Mazout', price: 0.50 },
    premium: { name: 'Premium Mazout', price: 0.52 }
  };

  const currentProduct = products[selectedProduct as keyof typeof products];

  const calculateTotal = () => {
    const deliveryFee = amount >= 3000 ? 0 : 45;
    const baseTotal = amount * currentProduct.price;
    const vatAmount = baseTotal * 0.21;
    const total = baseTotal + vatAmount + deliveryFee;
    
    return {
      baseTotal: baseTotal.toFixed(2),
      vatAmount: vatAmount.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const pricing = calculateTotal();

  const handleOrder = () => {
    // Store order data in sessionStorage for checkout
    const orderData = {
      amount,
      postcode,
      product: currentProduct.name,
      pricePerLiter: currentProduct.price,
      basePrice: parseFloat(pricing.baseTotal),
      deliveryFee: parseFloat(pricing.deliveryFee),
      total: parseFloat(pricing.total),
      shopType: 'belgium'
    };
    
    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    navigate('/7/bestellen');
  };

  const isValidBelgianPostcode = (pc: string) => {
    return /^[1-9]\d{3}$/.test(pc);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium"
              >
                <TrendingDown className="w-4 h-4 mr-2" />
                Beste mazout prijzen van België
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Goedkope
                <span className="text-red-600 block">Mazout</span>
                Online Bestellen
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Vergelijk direct de actuele mazout prijzen en bestel eenvoudig online. 
                Levering binnen 3-5 werkdagen rechtstreeks bij u thuis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Transparante prijzen</div>
                  <div className="text-sm text-gray-600">Geen verborgen kosten</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Heel België</div>
                  <div className="text-sm text-gray-600">Levering mogelijk</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Snelle levering</div>
                  <div className="text-sm text-gray-600">3-5 werkdagen</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Price Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white shadow-xl border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Bereken uw mazout prijs
                  </h2>
                  <p className="text-gray-600">
                    Actuele prijzen - direct bestellen mogelijk
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Hoeveel liter mazout heeft u nodig?
                    </Label>
                    <div className="relative">
                      <input
                        type="range"
                        min="500"
                        max="5000"
                        step="100"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>500L</span>
                        <span className="font-semibold text-red-600">{amount.toLocaleString()}L</span>
                        <span>5.000L</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Product keuze
                    </Label>
                    <div className="space-y-3">
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedProduct === 'standard' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedProduct('standard')}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-gray-900">Standaard Mazout</div>
                            <div className="text-sm text-gray-600">Kwaliteitsmazout volgens norm</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-red-600">€0.50</div>
                            <div className="text-sm text-gray-500">per liter</div>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedProduct === 'premium' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedProduct('premium')}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-gray-900">Premium Mazout</div>
                            <div className="text-sm text-gray-600">Zwavelarme premium mazout</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-red-600">€0.52</div>
                            <div className="text-sm text-gray-500">per liter</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="postcode" className="text-base font-semibold mb-3 block">
                      Uw postcode
                    </Label>
                    <Input
                      id="postcode"
                      type="text"
                      placeholder="bijv. 1000"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      className="text-lg py-3"
                      maxLength={4}
                    />
                    {postcode && !isValidBelgianPostcode(postcode) && (
                      <p className="text-red-500 text-sm mt-1">
                        Voer een geldige Belgische postcode in (4 cijfers)
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mazout ({amount.toLocaleString()}L à €{currentProduct.price})</span>
                      <span className="font-semibold">€{pricing.baseTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">BTW (21%)</span>
                      <span className="font-semibold">€{pricing.vatAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Leveringskosten {amount >= 3000 && <span className="text-green-600">(gratis!)</span>}
                      </span>
                      <span className="font-semibold">€{pricing.deliveryFee}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg">
                        <span className="font-bold text-gray-900">Totaal (incl. BTW)</span>
                        <span className="font-bold text-red-600 text-xl">€{pricing.total}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleOrder}
                    disabled={!postcode || !isValidBelgianPostcode(postcode)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold"
                  >
                    Nu bestellen
                  </Button>

                  <p className="text-center text-sm text-gray-500">
                    ✓ Gratis levering vanaf 3.000L &nbsp;&nbsp;
                    ✓ Vooruitbetaling via bankoverschrijving
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default V7PriceCalculator;
