
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Truck, Shield, Calculator } from 'lucide-react';

interface PriceCalculatorData {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
  amount: number;
  postcode: string;
  basePrice: number;
  deliveryFee: number;
  totalPrice: number;
  savings: number;
}

interface OrderSummaryProps {
  orderData?: PriceCalculatorData | null;
}

const OrderSummary = ({ orderData }: OrderSummaryProps) => {
  // Fallback to mock data if no orderData is provided (for backwards compatibility)
  const fallbackData = {
    product: { name: 'Standard Heizöl', price: 0.70 },
    amount: 3000,
    basePrice: 2100.00,
    deliveryFee: 0,
    savings: 0,
    totalPrice: 2100.00,
    postcode: '12345'
  };

  const data = orderData || fallbackData;
  const finalPrice = data.totalPrice - data.savings;

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-lg sticky top-4"
      >
        <div className="flex items-center mb-6">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <Calculator className="text-red-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Bestellübersicht</h3>
            <p className="text-gray-600">Ihre Auswahl im Überblick</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Produkt</span>
            <span className="font-semibold">{data.product.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Menge</span>
            <span className="font-semibold">{data.amount.toLocaleString('de-DE')} Liter</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Preis pro Liter</span>
            <span className="font-semibold">{data.product.price.toFixed(2)}€</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between">
            <span className="text-gray-600">Grundpreis</span>
            <span className="font-semibold">{data.basePrice.toFixed(2)}€</span>
          </div>
          
          <div className="flex justify-between text-green-600">
            <span>Lieferung</span>
            <span className="font-semibold">{data.deliveryFee === 0 ? 'Kostenlos' : `${data.deliveryFee.toFixed(2)}€`}</span>
          </div>
          
          {data.savings > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Mengenrabatt</span>
              <span className="font-semibold">-{data.savings.toFixed(2)}€</span>
            </div>
          )}
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-xl font-bold">
            <span>Gesamtpreis</span>
            <span className="text-red-600">{finalPrice.toFixed(2)}€</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-3">
            <Clock className="text-blue-600 mr-2" size={18} />
            <span className="font-semibold text-gray-900">Liefertermin</span>
          </div>
          <p className="text-gray-700 font-semibold">28.05.2025</p>
          <p className="text-sm text-gray-600">Zwischen 7:00 - 17:00 Uhr</p>
        </div>

        {/* Trust Badges */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <Shield className="text-green-600" size={16} />
            <span className="text-gray-700">Sichere Zahlung</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Truck className="text-blue-600" size={16} />
            <span className="text-gray-700">Pünktliche Lieferung</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Calculator className="text-red-600" size={16} />
            <span className="text-gray-700">Transparente Preise</span>
          </div>
        </div>
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-blue-50 rounded-xl p-6"
      >
        <h4 className="font-bold text-blue-900 mb-3">Fragen zur Bestellung?</h4>
        <p className="text-blue-800 text-sm mb-4">
          Unser Kundenservice hilft Ihnen gerne weiter.
        </p>
        <div className="space-y-2 text-sm">
          <div className="text-blue-800">
            <strong>Telefon:</strong> 0800 123 456 7
          </div>
          <div className="text-blue-800">
            <strong>E-Mail:</strong> service@heizoeldirekt.de
          </div>
          <div className="text-blue-700">
            Mo-Fr: 8:00-18:00 Uhr
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSummary;
