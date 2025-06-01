
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calculator, MapPin, Truck, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrder } from '@/contexts/OrderContext';

const PriceCalculator = () => {
  const [amount, setAmount] = useState(3000);
  const [postcode, setPostcode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('standard');
  const navigate = useNavigate();
  const { setOrderData } = useOrder();

  const products = [
    {
      id: 'standard',
      name: 'Standard Heizöl',
      price: 0.70,
      description: 'Qualitäts-Heizöl nach DIN 51603-1'
    },
    {
      id: 'premium',
      name: 'Premium Heizöl',
      price: 0.75,
      description: 'Schwefelarmes Heizöl mit Additiven'
    }
  ];

  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];

  const priceCalculation = useMemo(() => {
    const basePrice = amount * currentProduct.price;
    const deliveryFee = amount >= 3000 ? 0 : 50;
    const discount = amount >= 5000 ? basePrice * 0.02 : 0;
    const total = basePrice + deliveryFee - discount;

    return {
      basePrice,
      deliveryFee,
      discount,
      total,
      pricePerLiter: currentProduct.price,
      savings: discount > 0 ? discount : 0
    };
  }, [amount, currentProduct]);

  const deliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  const handleOrderClick = () => {
    const orderData = {
      product: currentProduct.name,
      amount,
      pricePerLiter: currentProduct.price,
      basePrice: priceCalculation.basePrice,
      deliveryFee: priceCalculation.deliveryFee,
      discount: priceCalculation.discount,
      total: priceCalculation.total,
      deliveryDate,
      deliveryPostcode: postcode,
      
      // Initialize empty delivery address
      deliveryFirstName: '',
      deliveryLastName: '',
      deliveryStreet: '',
      deliveryCity: '',
      deliveryPhone: '',
      
      // Initialize billing settings
      useSameAddress: true,
      billingFirstName: '',
      billingLastName: '',
      billingStreet: '',
      billingPostcode: '',
      billingCity: '',
      
      // Initialize payment method
      paymentMethod: 'vorkasse'
    };

    setOrderData(orderData);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Main Calculator Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full"
      >
        <Card className="shadow-2xl border-red-100 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center space-x-2 text-gray-900 text-2xl">
              <Calculator className="text-red-600" size={28} />
              <span>Heizöl-Preisrechner</span>
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Berechnen Sie Ihren Heizöl-Preis schnell und einfach
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Product Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Wählen Sie Ihren Heizöl-Typ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedProduct === product.id
                        ? 'border-red-500 bg-red-50 shadow-md'
                        : 'border-gray-200 hover:border-red-300 bg-white'
                    }`}
                    onClick={() => setSelectedProduct(product.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{product.name}</h4>
                      {selectedProduct === product.id && (
                        <div className="flex items-center justify-center w-5 h-5 bg-red-600 rounded-full">
                          <Check className="text-white" size={14} />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="text-xl font-bold text-red-600">
                      {product.price.toFixed(2)}€
                      <span className="text-sm font-normal text-gray-500 ml-1">pro Liter</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculator Inputs and Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Menge (Liter)
                  </label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="500"
                    max="10000"
                    step="100"
                    className="text-lg border-gray-200 focus:border-red-300 focus:ring-red-200"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Mindestbestellmenge: 500 Liter
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline mr-1" size={16} />
                    Postleitzahl
                  </label>
                  <Input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="12345"
                    maxLength={5}
                    className="text-lg border-gray-200 focus:border-red-300 focus:ring-red-200"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Zur Ermittlung der Lieferkosten
                  </div>
                </div>
              </div>

              {/* Right Side - Price Display */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ihre Bestellung</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Produkt</span>
                      <span className="font-semibold text-gray-900">{currentProduct.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Menge</span>
                      <span className="font-semibold text-gray-900">{amount.toLocaleString('de-DE')} Liter</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preis pro Liter</span>
                      <span className="font-semibold text-gray-900">{currentProduct.price.toFixed(2)}€</span>
                    </div>
                    
                    <hr className="border-gray-200" />
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grundpreis</span>
                      <span className="font-semibold text-gray-900">{priceCalculation.basePrice.toFixed(2)}€</span>
                    </div>
                    
                    <div className="flex justify-between text-green-600">
                      <span>Lieferung</span>
                      <span className="font-semibold">
                        {priceCalculation.deliveryFee === 0 ? 'Kostenlos' : `${priceCalculation.deliveryFee.toFixed(2)}€`}
                      </span>
                    </div>
                    
                    {priceCalculation.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Mengenrabatt (2%)</span>
                        <span className="font-semibold">-{priceCalculation.discount.toFixed(2)}€</span>
                      </div>
                    )}
                    
                    <hr className="border-gray-200" />
                    
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-gray-900">Gesamtpreis</span>
                      <span className="text-red-600">{priceCalculation.total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Truck className="text-red-600" size={20} />
                    <span className="font-semibold text-red-900">Lieferung</span>
                  </div>
                  <div className="space-y-2 text-sm text-red-800">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>Voraussichtlich: {deliveryDate}</span>
                    </div>
                    <div>• Kostenlose Lieferung ab 3.000 Liter</div>
                    <div>• Lieferung nach Zahlungseingang</div>
                    <div>• Pünktlich und zuverlässig</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <div className="pt-4 border-t border-gray-200">
              <Button
                onClick={handleOrderClick}
                disabled={!postcode || postcode.length !== 5}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Jetzt bestellen
              </Button>

              <div className="text-center text-sm text-gray-500 mt-3">
                * Alle Preise inkl. MwSt. · Preise können sich ändern
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PriceCalculator;
