
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '@/hooks/usePageMeta';

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  usePageMeta('payment-cancel');

  const orderNumber = searchParams.get('order');

  const handleRetryPayment = () => {
    // Go back to checkout with the order number
    navigate(`/checkout?retry=${orderNumber}`);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md mx-auto"
      >
        <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <XCircle className="text-red-600" size={40} />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Zahlung abgebrochen
        </h1>
        
        <p className="text-gray-600 mb-6">
          Ihre Zahlung wurde abgebrochen oder konnte nicht verarbeitet werden.
          {orderNumber && (
            <>
              <br />
              <span className="font-semibold">Bestellnummer: {orderNumber}</span>
            </>
          )}
        </p>
        
        <div className="space-y-3">
          <Button
            onClick={handleRetryPayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowLeft size={16} className="mr-2" />
            Zahlung erneut versuchen
          </Button>
          
          <Button
            onClick={handleGoHome}
            variant="outline"
            className="w-full"
          >
            Zur Startseite
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
