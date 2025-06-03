
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useNexiPayments } from '@/hooks/useNexiPayments';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '@/hooks/usePageMeta';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const { checkPaymentStatus } = useNexiPayments();
  
  usePageMeta('payment-success');

  const orderNumber = searchParams.get('order');
  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentId) {
        console.log('No payment ID found, redirecting to home');
        navigate('/');
        return;
      }

      try {
        console.log('Verifying payment:', paymentId);
        const result = await checkPaymentStatus(paymentId);
        
        if (result && (result.status === 'completed' || result.status === 'success')) {
          setPaymentVerified(true);
        } else {
          console.log('Payment not completed:', result);
          // Redirect to payment failure or pending page
          navigate(`/checkout/cancel?order=${orderNumber}&payment_id=${paymentId}`);
          return;
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        navigate(`/checkout/cancel?order=${orderNumber}&payment_id=${paymentId}`);
        return;
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [paymentId, orderNumber, checkPaymentStatus, navigate]);

  const handleContinue = () => {
    navigate('/');
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md mx-auto">
          <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Zahlung wird überprüft...
          </h2>
          <p className="text-gray-600">
            Bitte warten Sie, während wir Ihre Zahlung verifizieren.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md mx-auto"
      >
        <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Zahlung erfolgreich!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Ihre Kreditkarten-Zahlung wurde erfolgreich verarbeitet.
          {orderNumber && (
            <>
              <br />
              <span className="font-semibold">Bestellnummer: {orderNumber}</span>
            </>
          )}
        </p>
        
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Sie erhalten in Kürze eine Bestellbestätigung per E-Mail.
          </p>
          
          <Button
            onClick={handleContinue}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Zur Startseite
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
