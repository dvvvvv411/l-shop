
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit3, Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/contexts/OrderContext';
import { useOrders } from '@/hooks/useOrders';
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

interface CheckoutFormData {
  deliveryFirstName: string;
  deliveryLastName: string;
  deliveryStreet: string;
  deliveryPostcode: string;
  deliveryCity: string;
  deliveryPhone: string;
  useSameAddress: boolean;
  billingFirstName?: string;
  billingLastName?: string;
  billingStreet?: string;
  billingPostcode?: string;
  billingCity?: string;
  paymentMethod: 'vorkasse' | 'rechnung';
}

interface CheckoutSummaryPageProps {
  orderData: PriceCalculatorData;
  formData: CheckoutFormData;
  onBack: () => void;
  onOrderSuccess: (orderNumber: string) => void;
}

const CheckoutSummaryPage = ({ orderData, formData, onBack, onOrderSuccess }: CheckoutSummaryPageProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setOrderData: setContextOrderData } = useOrder();
  const { createOrder } = useOrders();
  const { toast } = useToast();

  // VAT calculations (19% VAT rate for Germany)
  const VAT_RATE = 0.19;
  const grossTotal = orderData.totalPrice;
  const netPrice = grossTotal / (1 + VAT_RATE);
  const vatAmount = grossTotal - netPrice;

  const handleConfirmOrder = async () => {
    console.log('Confirming order with form data:', formData);
    console.log('Using order data:', orderData);
    
    setIsSubmitting(true);
    
    try {
      // Create order data for database
      const dbOrderData = {
        customer_name: `${formData.deliveryFirstName} ${formData.deliveryLastName}`,
        customer_email: 'kunde@email.de',
        customer_phone: formData.deliveryPhone,
        customer_address: `${formData.deliveryStreet}, ${formData.deliveryPostcode} ${formData.deliveryCity}`,
        delivery_first_name: formData.deliveryFirstName,
        delivery_last_name: formData.deliveryLastName,
        delivery_street: formData.deliveryStreet,
        delivery_postcode: formData.deliveryPostcode,
        delivery_city: formData.deliveryCity,
        delivery_phone: formData.deliveryPhone,
        use_same_address: formData.useSameAddress,
        billing_first_name: formData.useSameAddress ? formData.deliveryFirstName : formData.billingFirstName,
        billing_last_name: formData.useSameAddress ? formData.deliveryLastName : formData.billingLastName,
        billing_street: formData.useSameAddress ? formData.deliveryStreet : formData.billingStreet,
        billing_postcode: formData.useSameAddress ? formData.deliveryPostcode : formData.billingPostcode,
        billing_city: formData.useSameAddress ? formData.deliveryCity : formData.billingCity,
        payment_method: formData.paymentMethod,
        product: orderData.product.name,
        amount: orderData.amount,
        liters: orderData.amount,
        price_per_liter: orderData.product.price,
        base_price: orderData.basePrice,
        delivery_fee: orderData.deliveryFee,
        discount: 0,
        total_amount: grossTotal,
        delivery_date_display: '4-7 Werktage',
        status: 'pending'
      };

      console.log('Sending order data to database:', dbOrderData);

      // Create order in database
      const createdOrder = await createOrder(dbOrderData);

      if (!createdOrder) {
        console.log('Order was already processed');
        toast({
          title: 'Information',
          description: 'Diese Bestellung wurde bereits verarbeitet.',
        });
        return;
      }

      console.log('Order created with order number:', createdOrder.order_number);

      // Set order data for context
      const contextOrderData = {
        deliveryFirstName: formData.deliveryFirstName,
        deliveryLastName: formData.deliveryLastName,
        deliveryStreet: formData.deliveryStreet,
        deliveryPostcode: formData.deliveryPostcode,
        deliveryCity: formData.deliveryCity,
        deliveryPhone: formData.deliveryPhone,
        useSameAddress: formData.useSameAddress,
        billingFirstName: formData.billingFirstName,
        billingLastName: formData.billingLastName,
        billingStreet: formData.billingStreet,
        billingPostcode: formData.billingPostcode,
        billingCity: formData.billingCity,
        paymentMethod: formData.paymentMethod,
        product: orderData.product.name,
        amount: orderData.amount,
        pricePerLiter: orderData.product.price,
        basePrice: orderData.basePrice,
        deliveryFee: orderData.deliveryFee,
        discount: 0,
        total: grossTotal,
        deliveryDate: '4-7 Werktage',
        orderNumber: createdOrder.order_number
      };

      setContextOrderData(contextOrderData);

      // Call the success callback to move to confirmation step
      onOrderSuccess(createdOrder.order_number);

      // Clear localStorage
      localStorage.removeItem('orderData');

    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Fehler',
        description: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 min-h-screen">
      {/* Left Column - Order Review (Shopify style) */}
      <div className="lg:col-span-7 order-2 lg:order-1">
        <div className="bg-white lg:bg-transparent p-6 lg:p-0">
          {/* Breadcrumb */}
          <div className="hidden lg:block mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <button 
                onClick={() => window.location.href = '/'}
                className="hover:text-gray-700 transition-colors"
              >
                Warenkorb
              </button>
              <span>›</span>
              <button 
                onClick={onBack}
                className="hover:text-gray-700 transition-colors"
              >
                Informationen
              </button>
              <span>›</span>
              <span className="text-gray-900 font-medium">Bestellung überprüfen</span>
            </div>
          </div>

          {/* Mobile back button */}
          <div className="lg:hidden flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 -ml-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-medium text-gray-900">Bestellung überprüfen</h1>
          </div>

          <div className="space-y-6">
            {/* Contact */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Kontakt</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBack} 
                  className="text-blue-600 hover:bg-blue-50 text-sm h-auto p-1"
                >
                  <Edit3 size={14} className="mr-1" />
                  Ändern
                </Button>
              </div>
              <div className="text-sm text-gray-700">
                {formData.deliveryPhone}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Lieferadresse</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBack} 
                  className="text-blue-600 hover:bg-blue-50 text-sm h-auto p-1"
                >
                  <Edit3 size={14} className="mr-1" />
                  Ändern
                </Button>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>{formData.deliveryFirstName} {formData.deliveryLastName}</div>
                <div>{formData.deliveryStreet}</div>
                <div>{formData.deliveryPostcode} {formData.deliveryCity}</div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Rechnungsadresse</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBack} 
                  className="text-blue-600 hover:bg-blue-50 text-sm h-auto p-1"
                >
                  <Edit3 size={14} className="mr-1" />
                  Ändern
                </Button>
              </div>
              <div className="text-sm text-gray-700">
                {formData.useSameAddress ? (
                  <span>Identisch mit Lieferadresse</span>
                ) : (
                  <div className="space-y-1">
                    <div>{formData.billingFirstName} {formData.billingLastName}</div>
                    <div>{formData.billingStreet}</div>
                    <div>{formData.billingPostcode} {formData.billingCity}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Zahlungsart</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBack} 
                  className="text-blue-600 hover:bg-blue-50 text-sm h-auto p-1"
                >
                  <Edit3 size={14} className="mr-1" />
                  Ändern
                </Button>
              </div>
              <div className="text-sm text-gray-700">
                <div className="font-medium">
                  {formData.paymentMethod === 'vorkasse' ? 'Vorkasse' : 'Rechnung'}
                </div>
                <div className="text-gray-500 mt-1">
                  {formData.paymentMethod === 'vorkasse' 
                    ? 'Überweisung vor Lieferung' 
                    : 'Zahlung nach Lieferung'
                  }
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Lock className="text-gray-600 flex-shrink-0" size={16} />
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Sichere Bestellung</span>
                  <span className="text-gray-500 ml-2">SSL-verschlüsselt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Order Summary (Shopify style) */}
      <div className="lg:col-span-5 order-1 lg:order-2 bg-gray-50 border-b lg:border-b-0 border-gray-200">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="p-6 lg:p-8">
            {/* Product */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    H
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {orderData.product.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {orderData.amount.toLocaleString('de-DE')} Liter
                    </p>
                  </div>
                </div>
                <span className="font-medium text-gray-900 text-sm">
                  {netPrice.toFixed(2)}€
                </span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Zwischensumme (netto)</span>
                <span className="text-gray-900">{netPrice.toFixed(2)}€</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Versand</span>
                <span className="text-gray-900">
                  {orderData.deliveryFee === 0 ? 'Kostenlos' : `${(orderData.deliveryFee / (1 + VAT_RATE)).toFixed(2)}€`}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Mehrwertsteuer (19%)</span>
                <span className="text-gray-900">{vatAmount.toFixed(2)}€</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-6 py-2">
              <span className="text-lg font-semibold text-gray-900">Gesamt (inkl. MwSt.)</span>
              <span className="text-lg font-semibold text-gray-900">{grossTotal.toFixed(2)}€</span>
            </div>

            {/* Complete Order Button */}
            <Button
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium rounded-lg disabled:bg-gray-400 mb-4"
            >
              {isSubmitting ? 'Bestellung wird erstellt...' : 'Zahlungspflichtig bestellen'}
            </Button>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Mit der Bestellung akzeptieren Sie unsere{' '}
              <a href="/agb" className="underline hover:no-underline">AGB</a>
              {' '}und{' '}
              <a href="/widerrufsrecht" className="underline hover:no-underline">Widerrufsbelehrung</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummaryPage;
