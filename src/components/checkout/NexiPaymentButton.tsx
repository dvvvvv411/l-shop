
import React, { useState } from 'react';
import { CreditCard, Loader2, AlertCircle } from 'lucide-react';
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
      console.log('=== NEXI PAYMENT DEBUG START ===');
      console.log('Order Data:', orderData);
      console.log('Order Number:', orderNumber);
      console.log('Customer Email:', customerEmail);

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

      console.log('Payment Request:', paymentRequest);

      const response = await initiatePayment(paymentRequest);
      
      console.log('Payment Response:', response);
      
      if (response && response.redirectUrl) {
        console.log('Payment initiated successfully, redirecting to:', response.redirectUrl);
        onPaymentInitiated(response.paymentId, response.redirectUrl);
        
        toast({
          title: 'Zahlung gestartet',
          description: 'Sie werden zur sicheren Kreditkarten-Zahlung weitergeleitet.',
        });
        
        // Small delay to ensure toast is visible
        setTimeout(() => {
          window.location.href = response.redirectUrl;
        }, 1000);
      } else {
        console.error('Invalid payment response:', response);
        throw new Error('Invalid payment response from Nexi');
      }
    } catch (error) {
      console.error('=== NEXI PAYMENT ERROR ===');
      console.error('Error details:', error);
      console.error('=== END ERROR ===');
      
      toast({
        title: 'Zahlungsfehler',
        description: 'Die Kreditkarten-Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es erneut oder wählen Sie eine andere Zahlungsmethode.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
      console.log('=== NEXI PAYMENT DEBUG END ===');
    }
  };

  return (
    <div className="space-y-2">
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
      
      <div className="text-xs text-gray-500 text-center">
        <div>Sichere Zahlung über Nexi</div>
        <div>Betrag: {orderData.totalPrice.toFixed(2)}€</div>
      </div>
    </div>
  );
};

export default NexiPaymentButton;
