
import React, { useState } from 'react';
import { CreditCard, Loader2, ExternalLink } from 'lucide-react';
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

      console.log('Initiating Nexi Pay by Link payment with request:', paymentRequest);

      const response = await initiatePayment(paymentRequest);
      
      if (response && response.redirectUrl) {
        console.log('Nexi Pay by Link initiated, redirecting to:', response.redirectUrl);
        onPaymentInitiated(response.paymentId, response.redirectUrl);
        
        toast({
          title: 'Zahlung wird geöffnet',
          description: 'Sie werden zur sicheren Nexi Zahlungsseite weitergeleitet.',
        });

        // Redirect directly to the payment page
        window.location.href = response.redirectUrl;
      } else {
        throw new Error('Invalid payment response from Nexi');
      }
    } catch (error) {
      console.error('Nexi Pay by Link initiation failed:', error);
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
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
    >
      {isProcessing ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>Zahlung wird vorbereitet...</span>
        </>
      ) : (
        <>
          <CreditCard size={20} />
          <span>Mit Kreditkarte bezahlen</span>
          <ExternalLink size={16} className="ml-1" />
        </>
      )}
    </Button>
  );
};

export default NexiPaymentButton;
