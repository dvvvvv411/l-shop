import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield, Truck, CreditCard } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import { useOrders } from '@/hooks/useOrders';
import { useSuppliers, SupplierByPostcode } from '@/hooks/useSuppliers';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import OrderDetailsStep from '@/components/checkout/OrderDetailsStep';
import SummaryStep from '@/components/checkout/SummaryStep';
import ConfirmationStep from '@/components/checkout/ConfirmationStep';
import CheckoutSidebar from '@/components/checkout/CheckoutSidebar';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [supplier, setSupplier] = useState<SupplierByPostcode | null>(null);
  const [isLoadingSupplier, setIsLoadingSupplier] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  
  const { orderData, setOrderData, clearOrderData } = useOrder();
  const { createOrder } = useOrders();
  const { getSupplierByPostcode } = useSuppliers();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if no order data
  if (!orderData && currentStep < 3) {
    navigate('/');
    return null;
  }

  const steps = [
    { id: 1, title: 'Ihre Daten', description: 'Liefer- und Rechnungsadresse' },
    { id: 2, title: 'Übersicht', description: 'Prüfen Sie Ihre Bestellung' },
    { id: 3, title: 'Bestätigung', description: 'Bestellung erfolgreich' }
  ];

  // Fetch supplier when postcode changes
  const fetchSupplier = useCallback(async (postcode: string) => {
    if (!postcode) return;
    
    setIsLoadingSupplier(true);
    try {
      const supplierData = await getSupplierByPostcode(postcode);
      setSupplier(supplierData);
    } catch (error) {
      console.error('Error fetching supplier:', error);
    } finally {
      setIsLoadingSupplier(false);
    }
  }, [getSupplierByPostcode]);

  // Handle order submission
  const handleSubmitOrder = useCallback(async () => {
    if (!orderData || !acceptTerms) {
      toast({
        title: 'Fehler',
        description: 'Bitte akzeptieren Sie die AGB und Widerrufsbelehrung.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        customer_name: `${orderData.deliveryFirstName} ${orderData.deliveryLastName}`,
        customer_email: 'customer@example.com', // TODO: Collect email
        customer_phone: orderData.deliveryPhone,
        customer_address: `${orderData.deliveryStreet}, ${orderData.deliveryPostcode} ${orderData.deliveryCity}`,
        product: orderData.product,
        liters: orderData.amount,
        amount: orderData.amount,
        price_per_liter: orderData.pricePerLiter,
        base_price: orderData.basePrice,
        delivery_fee: orderData.deliveryFee,
        discount: orderData.discount,
        total_amount: orderData.total,
        delivery_date: orderData.deliveryDate,
        delivery_date_display: orderData.deliveryDate,
        delivery_first_name: orderData.deliveryFirstName,
        delivery_last_name: orderData.deliveryLastName,
        delivery_street: orderData.deliveryStreet,
        delivery_postcode: orderData.deliveryPostcode,
        delivery_city: orderData.deliveryCity,
        delivery_phone: orderData.deliveryPhone,
        billing_first_name: orderData.useSameAddress ? orderData.deliveryFirstName : orderData.billingFirstName,
        billing_last_name: orderData.useSameAddress ? orderData.deliveryLastName : orderData.billingLastName,
        billing_street: orderData.useSameAddress ? orderData.deliveryStreet : orderData.billingStreet,
        billing_postcode: orderData.useSameAddress ? orderData.deliveryPostcode : orderData.billingPostcode,
        billing_city: orderData.useSameAddress ? orderData.deliveryCity : orderData.billingCity,
        use_same_address: orderData.useSameAddress,
        payment_method: orderData.paymentMethod,
        status: 'pending',
      };

      const newOrder = await createOrder(orderPayload);
      if (newOrder) {
        setOrderNumber(newOrder.order_number);
        setCurrentStep(3);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Fehler',
        description: 'Bestellung konnte nicht erstellt werden.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [orderData, acceptTerms, createOrder, toast]);

  const handleNextStep = useCallback(() => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length]);

  const handlePrevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const canProceedToNext = useMemo(() => {
    if (currentStep === 1) {
      return orderData?.deliveryFirstName && 
             orderData?.deliveryLastName && 
             orderData?.deliveryStreet && 
             orderData?.deliveryPostcode && 
             orderData?.deliveryCity && 
             orderData?.deliveryPhone;
    }
    if (currentStep === 2) {
      return acceptTerms;
    }
    return false;
  }, [currentStep, orderData, acceptTerms]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <OrderDetailsStep 
            orderData={orderData}
            setOrderData={setOrderData}
            onPostcodeChange={fetchSupplier}
          />
        );
      case 2:
        return (
          <SummaryStep 
            orderData={orderData}
            supplier={supplier}
            isLoadingSupplier={isLoadingSupplier}
            acceptTerms={acceptTerms}
            setAcceptTerms={setAcceptTerms}
          />
        );
      case 3:
        return (
          <ConfirmationStep 
            orderNumber={orderNumber}
            orderData={orderData}
            supplier={supplier}
            onNewOrder={() => {
              clearOrderData();
              navigate('/');
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutHeader />
      
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <CheckoutSteps steps={steps} currentStep={currentStep} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {currentStep < 3 && (
                <div className="flex justify-between items-center mt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft size={16} />
                    <span>Zurück</span>
                  </Button>

                  {currentStep === 2 ? (
                    <Button
                      onClick={handleSubmitOrder}
                      disabled={!canProceedToNext || isSubmitting}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2"
                    >
                      <Shield size={16} />
                      <span>{isSubmitting ? 'Wird bestellt...' : 'Zahlungspflichtig bestellen'}</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextStep}
                      disabled={!canProceedToNext}
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2"
                    >
                      <span>Weiter</span>
                      <ArrowRight size={16} />
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <CheckoutSidebar 
                orderData={orderData}
                currentStep={currentStep}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Trust Elements */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="text-green-600" size={24} />
              <span className="text-gray-700 font-medium">Sichere Zahlung</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Truck className="text-blue-600" size={24} />
              <span className="text-gray-700 font-medium">Pünktliche Lieferung</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CreditCard className="text-red-600" size={24} />
              <span className="text-gray-700 font-medium">Transparente Preise</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
