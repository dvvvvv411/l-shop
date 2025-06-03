
import React, { useState } from 'react';
import { CreditCard, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
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
        console.log('Payment initiated successfully');
        console.log('Environment:', response.environment || 'unknown');
        console.log('Base URL:', response.nexiBaseUrl || 'unknown');
        
        onPaymentInitiated(response.paymentId, response.redirectUrl);
        
        toast({
          title: 'Zahlung wird gestartet',
          description: `Sie werden zur sicheren Nexi-Zahlung weitergeleitet (${response.environment || 'live'}).`,
        });
        
        // Small delay to ensure toast is visible, then redirect
        setTimeout(() => {
          console.log('Redirecting to Nexi payment gateway...');
          window.location.href = response.redirectUrl;
        }, 1500);
      } else {
        console.error('Invalid payment response:', response);
        throw new Error('Invalid payment response from Nexi gateway');
      }
    } catch (error) {
      console.error('=== NEXI PAYMENT ERROR ===');
      console.error('Error details:', error);
      console.error('=== END ERROR ===');
      
      let errorMessage = 'Die Kreditkarten-Zahlung konnte nicht gestartet werden.';
      
      if (error.message?.includes('configuration')) {
        errorMessage = 'Nexi-Konfiguration fehlt oder ist fehlerhaft. Bitte kontaktieren Sie den Support.';
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = 'Verbindung zum Zahlungsgateway fehlgeschlagen. Bitte versuchen Sie es erneut.';
      }
      
      toast({
        title: 'Zahlungsfehler',
        description: `${errorMessage} Bitte versuchen Sie es erneut oder wählen Sie eine andere Zahlungsmethode.`,
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
      console.log('=== NEXI PAYMENT DEBUG END ===');
    }
  };

  return (
    <div className="space-y-3">
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
        {!isProcessing && <ExternalLink size={16} className="ml-1" />}
      </Button>
      
      <div className="text-xs text-gray-500 text-center space-y-1">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Sichere Zahlung über Nexi</span>
        </div>
        <div className="font-medium">Betrag: {orderData.totalPrice.toFixed(2)}€</div>
        <div className="text-gray-400">
          Sie werden zu unserem sicheren Zahlungspartner weitergeleitet
        </div>
      </div>
    </div>
  );
};

export default NexiPaymentButton;
