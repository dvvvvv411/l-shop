
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { calculateVATFromGross, formatCurrency } from '@/utils/vatCalculations';

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
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Calculate VAT breakdown
  const vatBreakdown = calculateVATFromGross(orderData.totalPrice);
  const finalPrice = orderData.totalPrice;

  return (
    <div className="space-y-6">
      {/* Mobile Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <Package className="text-blue-600" size={20} />
            <span className="font-semibold text-gray-900">
              Bestellung anzeigen
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-blue-600">{formatCurrency(finalPrice)}</span>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>
      </div>

      {/* Order Summary */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded || window.innerWidth >= 1024 ? 'auto' : 0 }}
        className="overflow-hidden lg:overflow-visible"
      >
        <div className="space-y-6">
          {/* Product Item */}
          <div className="bg-white lg:bg-transparent border border-gray-200 lg:border-0 rounded-lg lg:rounded-none p-4 lg:p-0">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <Package className="text-white" size={24} />
                </div>
                <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  1
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {orderData.product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {orderData.amount.toLocaleString('de-DE')} Liter
                </p>
                <p className="text-sm text-gray-500">
                  {formatCurrency(orderData.product.price)} pro Liter
                </p>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {formatCurrency(orderData.totalPrice)}
                </p>
                <p className="text-xs text-gray-500">inkl. MwSt.</p>
              </div>
            </div>
          </div>

          {/* Discount Code Input */}
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Rabattcode eingeben"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                Anwenden
              </button>
            </div>
          </div>

          {/* Price Breakdown with VAT */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Nettobetrag</span>
              <span className="text-gray-900">{formatCurrency(vatBreakdown.netPrice)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">MwSt. (19%)</span>
              <span className="text-gray-900">{formatCurrency(vatBreakdown.vatAmount)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Versand</span>
              <span className="text-green-600 font-medium">
                {orderData.deliveryFee === 0 ? 'Kostenlos' : formatCurrency(orderData.deliveryFee)}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-lg font-semibold text-gray-900">Gesamt (inkl. MwSt.)</span>
            <span className="text-lg font-bold text-gray-900">{formatCurrency(finalPrice)}</span>
          </div>

          {/* Delivery Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                <Truck className="text-blue-600" size={16} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 text-sm">Lieferinformation</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="text-blue-600" size={14} />
                  <p className="text-blue-800 text-sm">
                    <strong>4-7 Werktage</strong> nach Zahlungseingang
                  </p>
                </div>
                <p className="text-blue-700 text-xs mt-1">
                  Kostenlose Lieferung ab 1.000 Liter
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>SSL verschlüsselt</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Sichere Zahlung</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Pünktliche Lieferung</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Faire Preise</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutSummary;
