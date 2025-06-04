
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface NexiPaymentRequest {
  orderId: string;
  amount: number;
  currency?: string;
  description?: string;
  customerEmail?: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface NexiPaymentResponse {
  paymentId: string;
  formHtml: string;
  status: string;
  environment?: string;
  nexiBaseUrl?: string;
  integration?: string;
  debug?: any;
}

export const useNexiPayments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const initiatePayment = async (paymentRequest: NexiPaymentRequest): Promise<NexiPaymentResponse | null> => {
    setIsLoading(true);
    try {
      console.log('Initiating Nexi payment:', paymentRequest);

      const { data, error } = await supabase.functions.invoke('nexi-payment', {
        body: {
          action: 'initiate',
          ...paymentRequest
        }
      });

      if (error) {
        console.error('Error initiating Nexi payment:', error);
        throw error;
      }

      console.log('Nexi payment initiated successfully:', data);
      
      // Show appropriate message based on environment
      if (data?.environment === 'test') {
        toast({
          title: 'Test-Zahlung initialisiert',
          description: 'Dies ist eine Test-Zahlung. Verwenden Sie Testkreditkarten.',
        });
      }
      
      return data;
    } catch (error) {
      console.error('Failed to initiate Nexi payment:', error);
      toast({
        title: 'Zahlungsfehler',
        description: 'Die Zahlung konnte nicht initialisiert werden. Bitte versuchen Sie es erneut.',
        variant: 'destructive'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = async (paymentId: string) => {
    try {
      console.log('Checking Nexi payment status:', paymentId);

      const { data, error } = await supabase.functions.invoke('nexi-payment', {
        body: {
          action: 'status',
          paymentId
        }
      });

      if (error) {
        console.error('Error checking Nexi payment status:', error);
        throw error;
      }

      console.log('Nexi payment status:', data);
      return data;
    } catch (error) {
      console.error('Failed to check Nexi payment status:', error);
      return null;
    }
  };

  return {
    initiatePayment,
    checkPaymentStatus,
    isLoading
  };
};
