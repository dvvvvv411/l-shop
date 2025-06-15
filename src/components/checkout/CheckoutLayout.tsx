import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, CreditCard, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CheckoutHeader from './CheckoutHeader';
import CheckoutSummary from './CheckoutSummary';
import CheckoutForm from './CheckoutForm';
import CheckoutConfirmation from './CheckoutConfirmation';
import { useOrder } from '@/contexts/OrderContext';
import { useDomainShop } from '@/hooks/useDomainShop';

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
  const [currentStep, setCurrentStep] = useState<'form' | 'confirmation'>('form');
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [orderData, setOrderData] = useState<PriceCalculatorData | null>(null);
  const { orderData: contextOrderData } = useOrder();
  const navigate = useNavigate();
  const shopConfig = useDomainShop();

  useEffect(() => {
    // Get order data from URL params or context
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');
    const amountParam = urlParams.get('amount');
    const postcodeParam = urlParams.get('postcode');
    const basePriceParam = urlParams.get('basePrice');
    const deliveryFeeParam = urlParams.get('deliveryFee');
    const totalPriceParam = urlParams.get('totalPrice');
    const savingsParam = urlParams.get('savings');
    const pricePerLiterParam = urlParams.get('pricePerLiter');

    if (productParam && amountParam && postcodeParam && basePriceParam && deliveryFeeParam && totalPriceParam) {
      const calculatedOrderData: PriceCalculatorData = {
        product: {
          id: 'heating-oil',
          name: productParam,
          price: parseFloat(pricePerLiterParam || '0'),
          description: 'Premium heating oil'
        },
        amount: parseInt(amountParam),
        postcode: postcodeParam,
        basePrice: parseFloat(basePriceParam),
        deliveryFee: parseFloat(deliveryFeeParam),
        totalPrice: parseFloat(totalPriceParam),
        savings: parseFloat(savingsParam || '0')
      };
      setOrderData(calculatedOrderData);
    } else if (contextOrderData) {
      // Try to reconstruct from context data
      const calculatedOrderData: PriceCalculatorData = {
        product: {
          id: 'heating-oil',
          name: contextOrderData.product || 'Heizöl',
          price: contextOrderData.pricePerLiter || 0,
          description: 'Premium heating oil'
        },
        amount: contextOrderData.amount || 0,
        postcode: contextOrderData.deliveryPostcode || '',
        basePrice: contextOrderData.basePrice || 0,
        deliveryFee: contextOrderData.deliveryFee || 0,
        totalPrice: contextOrderData.total || 0,
        savings: contextOrderData.discount || 0
      };
      setOrderData(calculatedOrderData);
    }
  }, [contextOrderData]);

  const handleOrderComplete = (generatedOrderNumber: string) => {
    setOrderNumber(generatedOrderNumber);
    setCurrentStep('confirmation');
  };

  const handleNewOrder = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {shopConfig.shopType === 'italy' 
              ? 'Dati ordine mancanti'
              : shopConfig.shopType === 'france'
              ? 'Données de commande manquantes'
              : 'Bestelldaten fehlen'}
          </h2>
          <p className="text-gray-600 mb-6">
            {shopConfig.shopType === 'italy'
              ? 'Per favore, torna indietro e calcola il prezzo del tuo ordine.'
              : shopConfig.shopType === 'france'
              ? 'Veuillez revenir en arrière et calculer le prix de votre commande.'
              : 'Bitte gehen Sie zurück und berechnen Sie den Preis Ihrer Bestellung.'}
          </p>
          <Button onClick={handleGoBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {shopConfig.shopType === 'italy'
              ? 'Torna indietro'
              : shopConfig.shopType === 'france'
              ? 'Retour'
              : 'Zurück'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutHeader currentStep={currentStep} />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {currentStep === 'form' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm 
                orderData={orderData} 
                onOrderComplete={handleOrderComplete} 
              />
            </div>
            <div className="lg:col-span-1">
              <CheckoutSummary orderData={orderData} />
            </div>
          </div>
        )}

        {currentStep === 'confirmation' && (
          <CheckoutConfirmation
            orderData={orderData}
            orderNumber={orderNumber}
            onNewOrder={handleNewOrder}
          />
        )}
      </main>
    </div>
  );
};

export default CheckoutLayout;
