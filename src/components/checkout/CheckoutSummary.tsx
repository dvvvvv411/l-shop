
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Shield, Calculator, Clock, Phone } from 'lucide-react';

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

interface CheckoutSummaryProps {
  orderData: PriceCalculatorData;
}

const CheckoutSummary = ({ orderData }: CheckoutSummaryProps) => {
  const finalPrice = orderData.totalPrice;

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border sticky top-4"
      >
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Package className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Bestellübersicht</h3>
            <p className="text-sm text-gray-600">Ihre Auswahl im Überblick</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Produkt</span>
            <span className="font-semibold">{orderData.product.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Menge</span>
            <span className="font-semibold">{orderData.amount.toLocaleString('de-DE')} Liter</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Preis pro Liter</span>
            <span className="font-semibold">{orderData.product.price.toFixed(2)}€</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between">
            <span className="text-gray-600">Grundpreis</span>
            <span className="font-semibold">{orderData.basePrice.toFixed(2)}€</span>
          </div>
          
          <div className="flex justify-between text-green-600">
            <span>Lieferung</span>
            <span className="font-semibold">
              {orderData.deliveryFee === 0 ? 'Kostenlos' : `${orderData.deliveryFee.toFixed(2)}€`}
            </span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-xl font-bold">
            <span>Gesamtpreis</span>
            <span className="text-blue-600">{finalPrice.toFixed(2)}€</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-3">
            <Clock className="text-blue-600 mr-2" size={16} />
            <span className="font-semibold text-gray-900">Liefertermin</span>
          </div>
          <p className="text-gray-700 font-semibold">4-7 Werktage</p>
          <p className="text-sm text-gray-600">Nach Zahlungseingang</p>
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
            <Calculator className="text-purple-600" size={16} />
            <span className="text-gray-700">Transparente Preise</span>
          </div>
        </div>
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-blue-50 rounded-xl p-6 border border-blue-200"
      >
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <Phone className="text-blue-600" size={16} />
          </div>
          <h4 className="font-semibold text-blue-900">Fragen zur Bestellung?</h4>
        </div>
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

export default CheckoutSummary;
