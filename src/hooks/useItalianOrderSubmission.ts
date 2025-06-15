
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
      // Generate order number - FIXED: Use 'H' instead of 'HÖ'
      const orderNumber = 'H' + Math.floor(100000 + Math.random() * 900000);

      console.log('Submitting Italian order:', {
        orderNumber,
        customerEmail: orderData.customerEmail,
        total: orderData.total,
        bankAccount: bankAccountDetails?.system_name
      });

      // Save order to database first using standard order structure
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name: `${orderData.deliveryFirstName} ${orderData.deliveryLastName}`,
          customer_email: orderData.customerEmail,
          customer_phone: orderData.deliveryPhone,
          customer_address: `${orderData.deliveryStreet}, ${orderData.deliveryPostcode} ${orderData.deliveryCity}`,
          customer_language: 'it',
          delivery_first_name: orderData.deliveryFirstName,
          delivery_last_name: orderData.deliveryLastName,
          delivery_street: orderData.deliveryStreet,
          delivery_postcode: orderData.deliveryPostcode,
          delivery_city: orderData.deliveryCity,
          delivery_phone: orderData.deliveryPhone,
          billing_first_name: orderData.useSameAddress ? orderData.deliveryFirstName : orderData.billingFirstName,
          billing_last_name: orderData.useSameAddress ? orderData.deliveryLastName : orderData.billingLastName,
          billing_street: orderData.useSameAddress ? orderData.deliveryStreet : orderData.billingStreet,
          billing_postcode: orderData.useSameAddress ? orderData.deliveryPostcode : orderData.billingPostcode,
          billing_city: orderData.useSameAddress ? orderData.deliveryCity : orderData.billingCity,
          use_same_address: orderData.useSameAddress,
          product: orderData.product,
          liters: orderData.amount,
          price_per_liter: orderData.pricePerLiter,
          amount: orderData.amount,
          base_price: orderData.basePrice,
          delivery_fee: orderData.deliveryFee,
          discount: orderData.discount || 0,
          total_amount: orderData.total,
          payment_method: 'vorkasse',
          status: 'pending',
          bank_account_id: bankAccountDetails?.id,
          origin_domain: 'gasoliocasa.com',
          delivery_date_display: '3-5 giorni lavorativi'
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error saving order:', orderError);
        throw new Error(`Failed to save order: ${orderError.message}`);
      }

      console.log('Order saved successfully:', order.id);

      // Get Italian shop configuration for invoice generation
      const { data: italianShop, error: shopError } = await supabase
        .from('shops')
        .select('*')
        .eq('name', 'Gasolio IT')
        .maybeSingle();

      if (shopError) {
        console.error('Error fetching Italian shop:', shopError);
      }

      // Generate invoice using the standard flow - THIS IS THE ONLY EMAIL THAT SHOULD BE SENT
      console.log('Generating invoice for Italian order...');
      const { data: invoiceData, error: invoiceError } = await supabase.functions.invoke('generate-invoice', {
        body: { 
          orderId: order.id,
          shopId: italianShop?.id,
          bankAccountId: bankAccountDetails?.id,
          additionalNotes: 'Fattura per ordine gasolio - Consegna in 3-5 giorni lavorativi'
        }
      });

      if (invoiceError) {
        console.error('Error generating invoice:', invoiceError);
        throw new Error(`Failed to generate invoice: ${invoiceError.message}`);
      } else {
        console.log('Invoice generated successfully:', invoiceData?.invoiceNumber);
      }

      // NOTE: We intentionally DO NOT call send-order-confirmation for Italian orders
      // The invoice generation already sends the invoice email, which is all we want

      toast({
        title: "Ordine confermato!",
        description: `Il tuo ordine ${orderNumber} è stato registrato con successo. Riceverai una fattura via email.`,
        duration: 5000,
      });

      return {
        success: true,
        orderId: order.id,
        orderNumber: orderNumber,
        emailSent: true, // Invoice email was sent
        invoiceGenerated: !invoiceError
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
