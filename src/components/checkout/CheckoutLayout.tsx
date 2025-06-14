import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';
import CheckoutConfirmation from './CheckoutConfirmation';
import CheckoutHeader from './CheckoutHeader';
import { useToast } from '@/hooks/use-toast';
import { useCheckoutTranslations } from '@/hooks/useCheckoutTranslations';
import { useItalianCheckoutTranslations } from '@/hooks/useItalianCheckoutTranslations';
import { useDomainShop } from '@/hooks/useDomainShop';
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
  const shopConfig = useDomainShop();
  
  // Wähle die richtigen Übersetzungen basierend auf dem Shop-Typ
  const germanFrenchTranslations = useCheckoutTranslations();
  const italianTranslations = useItalianCheckoutTranslations();
  const t = shopConfig.shopType === 'italy' ? italianTranslations : germanFrenchTranslations;

  // Function to get legal link paths based on order referrer
  const getLegalLinkPaths = () => {
    const referrer = localStorage.getItem('orderReferrer');
    let basePath = '/1';
    
    if (referrer === '/4/home') {
      basePath = '/4';
    } else if (referrer === '/5/home') {
      basePath = '/5';
    }
    
    return {
      datenschutz: `${basePath}/privacy`,
      agb: `${basePath}/termini`, 
      impressum: `${basePath}/note-legali`
    };
  };

  // Load order data from localStorage on component mount
  useEffect(() => {
    const storedOrderData = localStorage.getItem('orderData');
    console.log('Stored order data:', storedOrderData);
    
    if (!storedOrderData) {
      console.log('No order data found in localStorage, redirecting to calculator');
      toast({
        title: t.toasts.noOrderDataTitle,
        description: t.toasts.noOrderDataDescription,
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
          title: t.toasts.invalidOrderDataTitle,
          description: t.toasts.invalidOrderDataDescription,
          variant: 'destructive'
        });
        navigate('/');
        return;
      }
      
      setOrderData(parsedData);
    } catch (error) {
      console.error('Error parsing order data:', error);
      toast({
        title: t.toasts.loadOrderDataErrorTitle,
        description: t.toasts.loadOrderDataErrorDescription,
        variant: 'destructive'
      });
      navigate('/');
    }
  }, [navigate, toast, t.toasts]);

  const handleBack = () => {
    // Try to go back in history, fallback to homepage if no history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Navigate based on shop type
      if (shopConfig.shopType === 'italy') {
        navigate('/5/home');
      } else {
        navigate('/1/home');
      }
    }
  };

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
        <div className="text-lg text-gray-600">{t.system.loadingOrderData}</div>
      </div>
    );
  }

  const legalLinks = getLegalLinkPaths();

  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50">
        <CheckoutHeader />
        
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Confirmation Header */}
              <div className="border-b border-gray-200 pb-8 mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{t.confirmation.title}</h1>
                    <p className="text-gray-600">{t.confirmation.subtitle}</p>
                  </div>
                </div>
              </div>

              <CheckoutConfirmation 
                orderData={orderData} 
                orderNumber={orderNumber}
                onNewOrder={handleNewOrder}
              />
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutHeader />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 min-h-screen">
              {/* Left Column - Form (Shopify style) */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="bg-white lg:bg-transparent">
                  {/* Back Button */}
                  <div className="mb-6">
                    <Button
                      variant="ghost"
                      onClick={handleBack}
                      className="text-gray-600 hover:text-gray-900 p-0 h-auto font-normal"
                    >
                      <ArrowLeft size={18} className="mr-2" />
                      {t.navigation.back}
                    </Button>
                  </div>

                  {/* Breadcrumb using shadcn/ui component */}
                  <div className="hidden lg:block mb-8">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink 
                            href="/"
                            className="hover:text-gray-700 transition-colors"
                          >
                            {t.navigation.cart}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage className="text-gray-900 font-medium">
                            {t.navigation.information}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <span className="text-gray-400">{t.navigation.shipping}</span>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <span className="text-gray-400">{t.navigation.payment}</span>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>

                  {/* Express Checkout (Optional) */}
                  <div className="mb-8 p-6 lg:p-0">
                    <div className="flex items-center justify-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <ShieldCheck className="text-green-600 mr-2" size={20} />
                      <span className="text-sm text-gray-700">
                        {t.navigation.secureEncryption}
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
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutLayout;
