import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
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
const CheckoutSummary = ({
  orderData
}: CheckoutSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const {
    toast
  } = useToast();
  const finalPrice = orderData.totalPrice;

  // VAT calculations (19% VAT)
  const vatRate = 0.19;
  const netPrice = finalPrice / (1 + vatRate);
  const vatAmount = finalPrice - netPrice;
  const handleCouponSubmit = async () => {
    if (!couponCode.trim()) {
      setCouponError('Bitte geben Sie einen Rabattcode ein.');
      return;
    }
    setIsApplying(true);
    setCouponError('');

    // Simulate API call delay
    setTimeout(() => {
      // Always show invalid code error
      setCouponError('Ungültiger Rabattcode. Bitte überprüfen Sie Ihren Code.');

      // Show toast notification
      toast({
        title: 'Rabattcode ungültig',
        description: 'Der eingegebene Rabattcode ist nicht gültig oder abgelaufen.',
        variant: 'destructive'
      });
      setIsApplying(false);
    }, 1000);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCouponSubmit();
    }
  };
  return <div className="space-y-6">
      {/* Mobile Toggle */}
      <div className="lg:hidden">
        <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Package className="text-blue-600" size={20} />
            <span className="font-semibold text-gray-900">
              Bestellung anzeigen
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <span className="font-bold text-blue-600">{finalPrice.toFixed(2)}€</span>
              <div className="text-xs text-gray-500">
                inkl. {vatAmount.toFixed(2)}€ MwSt.
              </div>
            </div>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>
      </div>

      {/* Order Summary */}
      <motion.div initial={false} animate={{
      height: isExpanded || window.innerWidth >= 1024 ? 'auto' : 0
    }} className="overflow-hidden lg:overflow-visible">
        <div className="space-y-6">
          {/* Product Item - Without image */}
          <div className="bg-white lg:bg-transparent border border-gray-200 lg:border-0 rounded-lg lg:rounded-none p-4 lg:p-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">
                  {orderData.product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {orderData.amount.toLocaleString('de-DE')} Liter
                </p>
                <p className="text-sm text-gray-500">
                  {orderData.product.price.toFixed(2)}€ pro Liter
                </p>
              </div>
              
              <div className="text-right ml-4">
                <p className="font-semibold text-gray-900">
                  {orderData.basePrice.toFixed(2)}€
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  Menge: 1
                </div>
              </div>
            </div>
          </div>

          {/* Discount Code Input */}
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input type="text" placeholder="Rabattcode eingeben" value={couponCode} onChange={e => setCouponCode(e.target.value)} onKeyPress={handleKeyPress} className={`flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${couponError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'}`} />
              <button onClick={handleCouponSubmit} disabled={isApplying} className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isApplying ? 'Prüfe...' : 'Anwenden'}
              </button>
            </div>
            {couponError && <p className="text-red-600 text-sm">{couponError}</p>}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Zwischensumme</span>
              <span className="text-gray-900">{orderData.basePrice.toFixed(2)}€</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Versand</span>
              <span className="text-green-600 font-medium">
                {orderData.deliveryFee === 0 ? 'Kostenlos' : `${orderData.deliveryFee.toFixed(2)}€`}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Netto</span>
              <span className="text-gray-900">{netPrice.toFixed(2)}€</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">MwSt. (19%)</span>
              <span className="text-gray-900">{vatAmount.toFixed(2)}€</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div>
              <span className="text-lg font-semibold text-gray-900">Gesamt</span>
              <div className="text-xs text-gray-500">inkl. MwSt.</div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">{finalPrice.toFixed(2)}€</span>
              <div className="text-xs text-gray-500">
                davon {vatAmount.toFixed(2)}€ MwSt.
              </div>
            </div>
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
                <p className="text-blue-700 text-xs mt-1">Kostenlose Lieferung ab 3.000 Liter</p>
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
    </div>;
};
export default CheckoutSummary;