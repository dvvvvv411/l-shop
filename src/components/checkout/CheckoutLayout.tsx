
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';
import { useOrder } from '@/contexts/OrderContext';
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

const CheckoutLayout = () => {
  const [orderData, setOrderData] = useState<PriceCalculatorData | null>(null);
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

  // Show loading state while order data is being loaded
  if (!orderData) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-lg text-gray-600">Bestelldaten werden geladen...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Vervollständigen Sie Ihre Heizöl-Bestellung</p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div>
          <CheckoutForm orderData={orderData} />
        </div>

        {/* Right Column - Summary */}
        <div>
          <CheckoutSummary orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
