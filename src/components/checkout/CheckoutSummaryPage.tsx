
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, User, CreditCard, MapPin, Phone, Edit3, Shield } from 'lucide-react';
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

  const finalPrice = orderData.totalPrice;

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
        total_amount: finalPrice,
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
        total: finalPrice,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Bestellung überprüfen</h1>
            <p className="text-gray-600">Bitte überprüfen Sie Ihre Angaben vor der finalen Bestellung</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-2 rounded-lg mr-3">
                <Package className="text-orange-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Produktdetails</h3>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{orderData.product.name}</h4>
                  <p className="text-sm text-gray-600">{orderData.product.description}</p>
                </div>
                <span className="font-semibold text-gray-900">{orderData.basePrice.toFixed(2)}€</span>
              </div>
              <div className="text-sm text-gray-600">
                {orderData.amount.toLocaleString('de-DE')} Liter × {orderData.product.price.toFixed(2)}€/L
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <MapPin className="text-blue-600" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Lieferadresse</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={onBack} className="text-blue-600 hover:bg-blue-50">
                <Edit3 size={16} className="mr-1" />
                Bearbeiten
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-1">
                <div className="font-medium text-gray-900">
                  {formData.deliveryFirstName} {formData.deliveryLastName}
                </div>
                <div className="text-gray-700">{formData.deliveryStreet}</div>
                <div className="text-gray-700">
                  {formData.deliveryPostcode} {formData.deliveryCity}
                </div>
                <div className="flex items-center text-gray-600 mt-2">
                  <Phone size={14} className="mr-1" />
                  {formData.deliveryPhone}
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <User className="text-green-600" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Rechnungsadresse</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={onBack} className="text-blue-600 hover:bg-blue-50">
                <Edit3 size={16} className="mr-1" />
                Bearbeiten
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              {formData.useSameAddress ? (
                <div className="text-gray-600">Identisch mit Lieferadresse</div>
              ) : (
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">
                    {formData.billingFirstName} {formData.billingLastName}
                  </div>
                  <div className="text-gray-700">{formData.billingStreet}</div>
                  <div className="text-gray-700">
                    {formData.billingPostcode} {formData.billingCity}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <CreditCard className="text-purple-600" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Zahlungsart</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={onBack} className="text-blue-600 hover:bg-blue-50">
                <Edit3 size={16} className="mr-1" />
                Bearbeiten
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="font-medium text-gray-900">
                {formData.paymentMethod === 'vorkasse' ? 'Vorkasse' : 'Rechnung'}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {formData.paymentMethod === 'vorkasse' 
                  ? 'Überweisung vor Lieferung' 
                  : 'Zahlung nach Lieferung'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bestellübersicht</h3>
            
            <div className="space-y-3 mb-6">
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
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Gesamt</span>
                  <span className="text-xl font-bold text-gray-900">{finalPrice.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Shield className="text-green-600" size={16} />
                <span className="text-sm font-medium text-green-800">Sichere Bestellung</span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                Ihre Daten werden SSL-verschlüsselt übertragen
              </p>
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg disabled:bg-gray-400"
            >
              {isSubmitting ? 'Bestellung wird erstellt...' : 'Zahlungspflichtig bestellen'}
            </Button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Mit der Bestellung akzeptieren Sie unsere AGB und Widerrufsbelehrung
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutSummaryPage;
