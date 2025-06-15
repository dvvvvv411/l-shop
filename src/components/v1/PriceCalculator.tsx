
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Truck, MapPin, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const PriceCalculator = () => {
  const [postcode, setPostcode] = useState('');
  const [liters, setLiters] = useState(3000);
  const [selectedProduct, setSelectedProduct] = useState('standard');
  const [isValidPostcode, setIsValidPostcode] = useState(false);
  const navigate = useNavigate();

  const products = {
    standard: {
      name: 'Standard Heizöl',
      price: 0.70,
      description: 'EN 590 Qualitätsstandard'
    },
    premium: {
      name: 'Premium Heizöl',
      price: 0.72,
      description: 'Schwefelarm mit hochwertigen Additiven'
    }
  };

  // German postcode validation (5 digits, starting with valid German ranges)
  const validateGermanPostcode = (code: string) => {
    if (!/^\d{5}$/.test(code)) return false;
    const num = parseInt(code);
    return num >= 1000 && num <= 99999;
  };

  useEffect(() => {
    setIsValidPostcode(validateGermanPostcode(postcode));
  }, [postcode]);

  const calculatePrice = () => {
    const product = products[selectedProduct as keyof typeof products];
    const basePrice = liters * product.price;
    const deliveryFee = liters >= 3000 ? 0 : 25;
    const total = basePrice + deliveryFee;

    return {
      basePrice,
      deliveryFee,
      total,
      pricePerLiter: product.price,
      productName: product.name
    };
  };

  const { basePrice, deliveryFee, total, pricePerLiter, productName } = calculatePrice();

  const handleOrderClick = () => {
    // Store order data in localStorage for the checkout process
    const orderData = {
      postcode,
      liters,
      product: selectedProduct,
      productName,
      pricePerLiter,
      basePrice,
      deliveryFee,
      total,
      shopType: 'stanton'
    };
    
    localStorage.setItem('orderData', JSON.stringify(orderData));
    navigate('/checkout');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-4 rounded-full">
                <Calculator className="text-red-600" size={32} />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              Heizöl-Preisrechner
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Berechnen Sie jetzt Ihren individuellen Heizöl-Preis
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Postcode Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="postcode" className="text-sm font-semibold text-gray-700 flex items-center">
                  <MapPin size={16} className="mr-2 text-red-600" />
                  Postleitzahl
                </Label>
                <Input
                  id="postcode"
                  type="text"
                  placeholder="z.B. 80798"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className={`text-lg h-12 ${isValidPostcode ? 'border-green-500' : postcode ? 'border-red-500' : ''}`}
                  maxLength={5}
                />
                {postcode && !isValidPostcode && (
                  <p className="text-red-500 text-sm">Bitte geben Sie eine gültige deutsche PLZ ein</p>
                )}
              </div>

              {/* Liters Input */}
              <div className="space-y-2">
                <Label htmlFor="liters" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Truck size={16} className="mr-2 text-red-600" />
                  Liter-Menge
                </Label>
                <Input
                  id="liters"
                  type="number"
                  min="1000"
                  max="10000"
                  step="500"
                  value={liters}
                  onChange={(e) => setLiters(Number(e.target.value))}
                  className="text-lg h-12"
                />
                {liters < 3000 && (
                  <p className="text-amber-600 text-sm">
                    Unter 3.000L: +25€ Anfahrtskosten
                  </p>
                )}
              </div>
            </div>

            {/* Product Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 flex items-center">
                <Euro size={16} className="mr-2 text-red-600" />
                Produktauswahl
              </Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="text-lg h-12">
                  <SelectValue placeholder="Wählen Sie Ihr Heizöl" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(products).map(([key, product]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description}</div>
                        </div>
                        <div className="ml-4 font-bold text-red-600">
                          {product.price.toFixed(2)}€/L
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Preisübersicht</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{productName}</span>
                  <span className="font-semibold">{basePrice.toFixed(2)}€</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {liters.toLocaleString('de-DE')} Liter × {pricePerLiter.toFixed(2)}€
                  </span>
                  <span className="text-sm text-gray-500">{basePrice.toFixed(2)}€</span>
                </div>

                {deliveryFee > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Anfahrtskosten</span>
                    <span className="font-semibold">{deliveryFee}€</span>
                  </div>
                )}

                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Gesamtpreis</span>
                    <span className="text-2xl font-bold text-red-600">{total.toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <Button 
              onClick={handleOrderClick}
              disabled={!isValidPostcode || liters < 1000}
              className="w-full h-14 text-lg font-semibold bg-red-600 hover:bg-red-700 disabled:bg-gray-300"
            >
              {!isValidPostcode ? 'PLZ eingeben für Bestellung' : `Jetzt für ${total.toFixed(2)}€ bestellen`}
            </Button>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-green-600 font-bold text-lg">4-7 Tage</div>
                <div className="text-sm text-gray-600">Lieferzeit</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-blue-600 font-bold text-lg">0€ Anfahrt</div>
                <div className="text-sm text-gray-600">ab 3.000L</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-purple-600 font-bold text-lg">EN 590</div>
                <div className="text-sm text-gray-600">Qualität</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PriceCalculator;
