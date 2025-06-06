
import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Truck, Package, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/contexts/OrderContext';
import { useCheckoutTranslations } from '@/hooks/useCheckoutTranslations';

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

interface CheckoutConfirmationProps {
  orderData: PriceCalculatorData;
  orderNumber: string;
  onNewOrder: () => void;
}

const CheckoutConfirmation = ({
  orderData,
  orderNumber,
  onNewOrder
}: CheckoutConfirmationProps) => {
  const {
    orderData: contextOrderData
  } = useOrder();
  const t = useCheckoutTranslations();

  if (!contextOrderData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Bestelldaten nicht verfügbar</p>
      </div>
    );
  }

  // VAT calculations (19% VAT)
  const vatRate = 0.19;
  const netPrice = orderData.totalPrice / (1 + vatRate);
  const vatAmount = orderData.totalPrice - netPrice;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Confirmation Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Order Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-8 shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t.confirmation.orderSuccess}
          </h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
            <div className="text-sm text-red-600 font-medium">{t.confirmation.orderNumber}</div>
            <div className="text-2xl font-bold text-red-700">{orderNumber}</div>
          </div>
        </motion.div>

        {/* Payment Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <CreditCard className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t.confirmation.paymentInstructions}</h3>
              <p className="text-gray-600">So zahlen Sie Ihre Bestellung</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">{t.confirmation.nextSteps}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-3">
                  <Phone className="text-blue-600 mt-1" size={16} />
                  <div>
                    <div className="font-semibold text-blue-900">{t.confirmation.phoneContact}</div>
                    <div className="text-blue-700">{t.confirmation.phoneContactDesc}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CreditCard className="text-blue-600 mt-1" size={16} />
                  <div>
                    <div className="font-semibold text-blue-900">{t.confirmation.bankTransfer}</div>
                    <div className="text-blue-700">{t.confirmation.bankTransferDesc.replace('{amount}', contextOrderData.total.toFixed(2))}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Truck className="text-blue-600 mt-1" size={16} />
                  <div>
                    <div className="font-semibold text-blue-900">{t.confirmation.delivery}</div>
                    <div className="text-blue-700">{t.confirmation.deliveryDesc}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delivery Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-6">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <Truck className="text-orange-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t.confirmation.deliveryInformation}</h3>
              <p className="text-gray-600">{t.confirmation.deliveryDetails}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Calendar className="text-orange-600 mr-2" size={18} />
                <span className="font-semibold text-orange-900">{t.confirmation.deliveryTerm}</span>
              </div>
              <div className="text-orange-800 font-bold">{t.summary.workdays}</div>
              <div className="text-orange-700 text-sm">{t.summary.afterPayment}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-2">{t.confirmation.deliveryAddress}</div>
              <div className="text-gray-700 text-sm space-y-1">
                <div>{contextOrderData.deliveryFirstName} {contextOrderData.deliveryLastName}</div>
                <div>{contextOrderData.deliveryStreet}</div>
                <div>{contextOrderData.deliveryPostcode} {contextOrderData.deliveryCity}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">{t.confirmation.importantNote}</h4>
            <p className="text-yellow-700 text-sm">
              {t.confirmation.importantNoteDesc.replace('{phone}', contextOrderData.deliveryPhone)}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
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
              <h3 className="text-lg font-semibold text-gray-900">{t.summary.orderSummary}</h3>
              <p className="text-sm text-gray-600">Ihre bestätigte Bestellung</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">{t.summary.product}</span>
              <span className="font-semibold">{orderData.product.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">{t.summary.quantity}</span>
              <span className="font-semibold">{orderData.amount.toLocaleString('de-DE')} Liter</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">{t.summary.pricePerLiter}</span>
              <span className="font-semibold">{orderData.product.price.toFixed(2)}€</span>
            </div>
            
            <hr className="border-gray-200" />
            
            <div className="flex justify-between">
              <span className="text-gray-600">{t.confirmation.basePrice}</span>
              <span className="font-semibold">{orderData.basePrice.toFixed(2)}€</span>
            </div>
            
            <div className="flex justify-between text-green-600">
              <span>{t.confirmation.deliveryLabel}</span>
              <span className="font-semibold">
                {orderData.deliveryFee === 0 ? t.summary.free : `${orderData.deliveryFee.toFixed(2)}€`}
              </span>
            </div>
            
            <hr className="border-gray-200" />
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t.summary.net}</span>
              <span className="font-semibold">{netPrice.toFixed(2)}€</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t.summary.vat}</span>
              <span className="font-semibold">{vatAmount.toFixed(2)}€</span>
            </div>
            
            <hr className="border-gray-200" />
            
            <div className="flex justify-between text-xl font-bold">
              <span>{t.summary.total}</span>
              <span className="text-blue-600">{orderData.totalPrice.toFixed(2)}€</span>
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              {t.summary.inclVat.replace('{amount}', vatAmount.toFixed(2))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
