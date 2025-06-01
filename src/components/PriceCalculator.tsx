
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calculator, MapPin, Truck, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    },
    {
      id: 'bio',
      name: 'Bio Heizöl',
      price: 0.80,
      description: 'Umweltfreundliches Heizöl mit 10% Bioanteil'
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Heizöl-Preis berechnen
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ermitteln Sie schnell und einfach den aktuellen Preis für Ihr Heizöl.
            Transparente Preise ohne versteckte Kosten.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="text-red-600" size={24} />
                  <span>Preisrechner</span>
                </CardTitle>
                <CardDescription>
                  Geben Sie Ihre Daten ein für eine präzise Preisberechnung
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heizöl-Typ
                  </label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount */}
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
                    className="text-lg"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Mindestbestellmenge: 500 Liter
                  </div>
                </div>

                {/* Postcode */}
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
                    className="text-lg"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Zur Ermittlung der Lieferkosten
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Price Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-red-600">Ihre Bestellung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Produkt</span>
                  <span className="font-semibold">{currentProduct.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Menge</span>
                  <span className="font-semibold">{amount.toLocaleString('de-DE')} Liter</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Preis pro Liter</span>
                  <span className="font-semibold">{currentProduct.price.toFixed(2)}€</span>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Grundpreis</span>
                  <span className="font-semibold">{priceCalculation.basePrice.toFixed(2)}€</span>
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
                  <span>Gesamtpreis</span>
                  <span className="text-red-600">{priceCalculation.total.toFixed(2)}€</span>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Truck className="text-blue-600" size={20} />
                  <span className="font-semibold text-blue-900">Lieferung</span>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Voraussichtlich: {deliveryDate}</span>
                  </div>
                  <div>• Kostenlose Lieferung ab 3.000 Liter</div>
                  <div>• Lieferung nach Zahlungseingang</div>
                  <div>• Pünktlich und zuverlässig</div>
                </div>
              </CardContent>
            </Card>

            {/* Order Button */}
            <Button
              onClick={handleOrderClick}
              disabled={!postcode || postcode.length !== 5}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold rounded-lg"
            >
              Jetzt bestellen
            </Button>

            <div className="text-center text-sm text-gray-500">
              * Alle Preise inkl. MwSt. · Preise können sich ändern
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
