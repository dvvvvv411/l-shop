
import React, { useState } from 'react';
import { CreditCard, Loader2, AlertCircle, ExternalLink, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNexiPayments } from '@/hooks/useNexiPayments';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [showDebug, setShowDebug] = useState(false);
  const { initiatePayment } = useNexiPayments();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNexiPayment = async () => {
    setIsProcessing(true);
    setDebugInfo(null);
    
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
      
      if (response && response.formHtml) {
        console.log('Payment initiated successfully with form submission');
        console.log('Environment:', response.environment || 'unknown');
        console.log('Base URL:', response.nexiBaseUrl || 'unknown');
        
        // Store debug information
        setDebugInfo({
          paymentId: response.paymentId,
          environment: response.environment,
          nexiBaseUrl: response.nexiBaseUrl,
          integration: response.integration,
          debug: response.debug,
          timestamp: new Date().toISOString()
        });
        
        // Store payment data in localStorage and navigate to payment page
        const paymentData = {
          formHtml: response.formHtml,
          environment: response.environment || 'live'
        };
        localStorage.setItem(`payment_${orderNumber}`, JSON.stringify(paymentData));
        
        onPaymentInitiated(response.paymentId, 'form_submission');
        
        toast({
          title: 'Zahlung wird vorbereitet',
          description: `Weiterleitung zur Nexi-Zahlung wird vorbereitet (${response.environment || 'live'}).`,
        });
        
        // Navigate to dedicated payment page
        navigate(`/payment/${orderNumber}`);
        
      } else {
        console.error('Invalid payment response:', response);
        setDebugInfo({
          error: 'Invalid payment response from Nexi gateway',
          response: response,
          timestamp: new Date().toISOString()
        });
        throw new Error('Invalid payment response from Nexi gateway');
      }
    } catch (error) {
      console.error('=== NEXI PAYMENT ERROR ===');
      console.error('Error details:', error);
      console.error('=== END ERROR ===');
      
      // Store debug information for errors
      setDebugInfo({
        error: error.message,
        stack: error.stack,
        orderNumber,
        paymentRequest: {
          orderId: orderNumber,
          amount: Math.round(orderData.totalPrice * 100),
          currency: 'EUR'
        },
        timestamp: new Date().toISOString()
      });
      
      let errorMessage = 'Die Kreditkarten-Zahlung konnte nicht gestartet werden.';
      
      if (error.message?.includes('configuration')) {
        errorMessage = 'Nexi-Konfiguration fehlt oder ist fehlerhaft. Bitte kontaktieren Sie den Support.';
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = 'Verbindung zum Zahlungsgateway fehlgeschlagen. Bitte versuchen Sie es erneut.';
      } else if (error.message?.includes('RLS') || error.message?.includes('policy')) {
        errorMessage = 'Datenbankfehler aufgetreten. Support wurde benachrichtigt.';
      }
      
      toast({
        title: 'Zahlungsfehler',
        description: `${errorMessage} Bitte versuchen Sie es erneut oder wählen Sie eine andere Zahlungsmethode.`,
        variant: 'destructive'
      });
      
      setShowDebug(true); // Show debug info on error
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

      {/* Debug Information */}
      {debugInfo && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Bug size={16} />
              Debug Information
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDebug(!showDebug)}
            >
              {showDebug ? 'Ausblenden' : 'Anzeigen'}
            </Button>
          </div>
          
          {showDebug && (
            <div className="text-xs text-gray-600 space-y-2">
              <div><strong>Zeitstempel:</strong> {debugInfo.timestamp}</div>
              {debugInfo.paymentId && (
                <div><strong>Payment ID:</strong> {debugInfo.paymentId}</div>
              )}
              {debugInfo.environment && (
                <div><strong>Umgebung:</strong> {debugInfo.environment}</div>
              )}
              {debugInfo.integration && (
                <div><strong>Integration:</strong> {debugInfo.integration}</div>
              )}
              {debugInfo.error && (
                <div className="text-red-600">
                  <strong>Fehler:</strong> {debugInfo.error}
                </div>
              )}
              {debugInfo.debug && (
                <div>
                  <strong>Debug Details:</strong>
                  <pre className="mt-1 p-2 bg-white rounded text-xs overflow-auto">
                    {JSON.stringify(debugInfo.debug, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NexiPaymentButton;
