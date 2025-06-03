
import React, { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNexiPayments } from '@/hooks/useNexiPayments';
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

interface NexiPaymentButtonProps {
  orderData: PriceCalculatorData;
  orderNumber: string;
  customerEmail: string;
  onPaymentInitiated: (paymentId: string, redirectUrl: string) => void;
  disabled?: boolean;
}

const NexiPaymentButton = ({ 
  orderData, 
  orderNumber, 
  customerEmail, 
  onPaymentInitiated,
  disabled = false
}: NexiPaymentButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { initiatePayment } = useNexiPayments();
  const { toast } = useToast();

  const handleNexiPayment = async () => {
    setIsProcessing(true);
    
    try {
      const currentUrl = window.location.origin;
      const returnUrl = `${currentUrl}/checkout/success?order=${orderNumber}`;
      const cancelUrl = `${currentUrl}/checkout/cancel?order=${orderNumber}`;

      const paymentRequest = {
        orderId: orderNumber,
        amount: Math.round(orderData.totalPrice * 100), // Convert to cents
        currency: 'EUR',
        description: `Heizöl-Bestellung ${orderNumber}`,
        customerEmail,
        returnUrl,
        cancelUrl
      };

      console.log('Initiating Nexi payment with request:', paymentRequest);

      const response = await initiatePayment(paymentRequest);
      
      if (response && response.redirectUrl) {
        console.log('Nexi payment initiated, redirecting to:', response.redirectUrl);
        onPaymentInitiated(response.paymentId, response.redirectUrl);
        
        // Redirect to Nexi payment page
        window.location.href = response.redirectUrl;
      } else {
        throw new Error('Invalid payment response from Nexi');
      }
    } catch (error) {
      console.error('Nexi payment initiation failed:', error);
      toast({
        title: 'Zahlungsfehler',
        description: 'Die Kreditkarten-Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es erneut.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={handleNexiPayment}
      disabled={disabled || isProcessing}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
    >
      {isProcessing ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <CreditCard size={20} />
      )}
      <span>
        {isProcessing ? 'Zahlung wird vorbereitet...' : 'Mit Kreditkarte bezahlen'}
      </span>
    </Button>
  );
};

export default NexiPaymentButton;
