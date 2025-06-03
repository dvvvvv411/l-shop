
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NexiFormSubmissionPage from '@/components/checkout/NexiFormSubmissionPage';
import { useToast } from '@/hooks/use-toast';

const Payment = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formHtml, setFormHtml] = useState<string>('');
  const [environment, setEnvironment] = useState<string>('');

  useEffect(() => {
    // Get the payment data from localStorage
    const paymentData = localStorage.getItem(`payment_${orderNumber}`);
    
    if (!paymentData) {
      console.error('No payment data found for order:', orderNumber);
      toast({
        title: 'Zahlungsdaten nicht gefunden',
        description: 'Die Zahlungsdaten konnten nicht geladen werden. Bitte versuchen Sie es erneut.',
        variant: 'destructive'
      });
      navigate('/checkout');
      return;
    }

    try {
      const { formHtml: storedFormHtml, environment: storedEnvironment } = JSON.parse(paymentData);
      setFormHtml(storedFormHtml);
      setEnvironment(storedEnvironment || 'live');
      
      // Clean up the payment data from localStorage after loading
      localStorage.removeItem(`payment_${orderNumber}`);
    } catch (error) {
      console.error('Error parsing payment data:', error);
      toast({
        title: 'Fehler beim Laden der Zahlungsdaten',
        description: 'Die Zahlungsdaten sind beschädigt. Bitte versuchen Sie es erneut.',
        variant: 'destructive'
      });
      navigate('/checkout');
    }
  }, [orderNumber, navigate, toast]);

  const handleBack = () => {
    navigate('/checkout');
  };

  if (!formHtml || !orderNumber) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Zahlungsdaten werden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <NexiFormSubmissionPage
      formHtml={formHtml}
      onBack={handleBack}
      orderNumber={orderNumber}
      environment={environment}
    />
  );
};

export default Payment;
