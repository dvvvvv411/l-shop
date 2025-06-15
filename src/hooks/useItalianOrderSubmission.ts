
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useDomainShop } from '@/hooks/useDomainShop';

interface SubmitOrderData {
  customerEmail: string;
  deliveryFirstName: string;
  deliveryLastName: string;
  deliveryStreet: string;
  deliveryPostcode: string;
  deliveryCity: string;
  deliveryPhone: string;
  billingFirstName?: string;
  billingLastName?: string;
  billingStreet?: string;
  billingPostcode?: string;
  billingCity?: string;
  useSameAddress: boolean;
  product: string;
  amount: number;
  pricePerLiter: number;
  basePrice: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export const useItalianOrderSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const shopConfig = useDomainShop();

  const submitItalianOrder = async (orderData: SubmitOrderData, bankAccountDetails: any) => {
    if (shopConfig.shopType !== 'italy') {
      throw new Error('This function is only for Italian orders');
    }

    setIsSubmitting(true);

    try {
      // Generate order number
      const orderNumber = 'HÖ' + Math.floor(100000 + Math.random() * 900000);

      console.log('Submitting Italian order:', {
        orderNumber,
        customerEmail: orderData.customerEmail,
        total: orderData.total,
        bankAccount: bankAccountDetails?.system_name
      });

      // Call the Italian invoice edge function
      const { data, error } = await supabase.functions.invoke('send-italian-invoice', {
        body: {
          orderData,
          orderNumber,
          bankAccountDetails
        }
      });

      if (error) {
        console.error('Error submitting Italian order:', error);
        throw error;
      }

      console.log('Italian order submitted successfully:', data);

      toast({
        title: "Ordine confermato!",
        description: `Il tuo ordine ${orderNumber} è stato registrato con successo. Riceverai una fattura via email.`,
        duration: 5000,
      });

      return {
        success: true,
        orderId: data.orderId,
        orderNumber: orderNumber,
        emailSent: data.emailSent
      };

    } catch (error: any) {
      console.error('Error in Italian order submission:', error);
      
      toast({
        title: "Errore nell'invio dell'ordine",
        description: "Si è verificato un errore durante l'elaborazione del tuo ordine. Riprova o contattaci.",
        variant: "destructive",
        duration: 5000,
      });

      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitItalianOrder,
    isSubmitting
  };
};
