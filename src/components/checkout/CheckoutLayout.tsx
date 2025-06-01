
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';
import CheckoutConfirmation from './CheckoutConfirmation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

const CheckoutLayout = () => {
  const [currentStep, setCurrentStep] = useState<'checkout' | 'confirmation'>('checkout');
  const [orderData, setOrderData] = useState<PriceCalculatorData | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load order data from localStorage on component mount
  useEffect(() => {
    const storedOrderData = localStorage.getItem('orderData');
    console.log('Stored order data:', storedOrderData);
    
    if (!storedOrderData) {
      console.log('No order data found in localStorage, redirecting to calculator');
      toast({
        title: 'Keine Bestelldaten gefunden',
        description: 'Bitte führen Sie zuerst eine Preisberechnung durch.',
        variant: 'destructive'
      });
      navigate('/');
      return;
    }

    try {
      const parsedData = JSON.parse(storedOrderData) as PriceCalculatorData;
      console.log('Parsed order data:', parsedData);

      // Validate that required fields exist
      if (!parsedData.product || !parsedData.amount || !parsedData.basePrice) {
        console.log('Invalid order data structure, redirecting to calculator');
        toast({
          title: 'Ungültige Bestelldaten',
          description: 'Bitte führen Sie eine neue Preisberechnung durch.',
          variant: 'destructive'
        });
        navigate('/');
        return;
      }
      
      setOrderData(parsedData);
    } catch (error) {
      console.error('Error parsing order data:', error);
      toast({
        title: 'Fehler beim Laden der Bestelldaten',
        description: 'Bitte führen Sie eine neue Preisberechnung durch.',
        variant: 'destructive'
      });
      navigate('/');
    }
  }, [navigate, toast]);

  const handleOrderSuccess = (generatedOrderNumber: string) => {
    setOrderNumber(generatedOrderNumber);
    setCurrentStep('confirmation');
  };

  const handleBackToCheckout = () => {
    setCurrentStep('checkout');
  };

  const handleNewOrder = () => {
    // Clear localStorage and navigate to home
    localStorage.removeItem('orderData');
    navigate('/');
  };

  // Show loading state while order data is being loaded
  if (!orderData) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-lg text-gray-600">Bestelldaten werden geladen...</div>
      </div>
    );
  }

  if (currentStep === 'confirmation') {
    return (
      <div className="bg-white">
        {/* Confirmation Header */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={handleBackToCheckout}
              className="mr-4 p-2 hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Bestellung bestätigt!</h1>
              <p className="text-gray-600">Vielen Dank für Ihre Heizöl-Bestellung</p>
            </div>
          </div>
        </div>

        <CheckoutConfirmation 
          orderData={orderData} 
          orderNumber={orderNumber}
          onNewOrder={handleNewOrder}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 min-h-screen">
      {/* Left Column - Form (Shopify style) */}
      <div className="lg:col-span-7 order-2 lg:order-1">
        <div className="bg-white lg:bg-transparent">
          {/* Breadcrumb using shadcn/ui component */}
          <div className="hidden lg:block mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="/"
                    className="hover:text-gray-700 transition-colors"
                  >
                    Warenkorb
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 font-medium">
                    Informationen
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="text-gray-400">Versand</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="text-gray-400">Zahlung</span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Express Checkout (Optional) */}
          <div className="mb-8 p-6 lg:p-0">
            <div className="flex items-center justify-center p-4 border border-gray-200 rounded-lg bg-gray-50">
              <ShieldCheck className="text-green-600 mr-2" size={20} />
              <span className="text-sm text-gray-700">
                Sichere SSL-Verschlüsselung für Ihre Daten
              </span>
            </div>
          </div>

          <CheckoutForm orderData={orderData} onOrderSuccess={handleOrderSuccess} />
        </div>
      </div>

      {/* Right Column - Order Summary (Shopify style) */}
      <div className="lg:col-span-5 order-1 lg:order-2 bg-gray-50 lg:bg-gray-50 border-b lg:border-b-0 border-gray-200">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="p-6 lg:p-8">
            <CheckoutSummary orderData={orderData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
