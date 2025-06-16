
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

export const useBelgianOrderSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const shopConfig = useDomainShop();

  const submitBelgianOrder = async (orderData: SubmitOrderData, bankAccountDetails: any) => {
    if (shopConfig.shopType !== 'belgium') {
      throw new Error('This function is only for Belgian orders');
    }

    setIsSubmitting(true);

    try {
      // Generate order number
      const orderNumber = 'H' + Math.floor(100000 + Math.random() * 900000);

      console.log('Submitting Belgian order:', {
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
          customer_language: 'nl',
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
          origin_domain: 'mazoutvandaag.com',
          delivery_date_display: '3-5 werkdagen'
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error saving order:', orderError);
        throw new Error(`Failed to save order: ${orderError.message}`);
      }

      console.log('Order saved successfully:', order.id);

      // Get Belgian shop configuration for invoice generation
      const { data: belgianShop, error: shopError } = await supabase
        .from('shops')
        .select('*')
        .eq('name', 'MazoutVandaag')
        .maybeSingle();

      if (shopError) {
        console.error('Error fetching Belgian shop:', shopError);
      }

      // Generate invoice using the standard flow with Dutch notes
      console.log('Generating invoice for Belgian order...');
      const { data: invoiceData, error: invoiceError } = await supabase.functions.invoke('generate-invoice', {
        body: { 
          orderId: order.id,
          shopId: belgianShop?.id,
          bankAccountId: bankAccountDetails?.id,
          additionalNotes: 'Factuur voor mazout bestelling - Levering binnen 3-5 werkdagen'
        }
      });

      if (invoiceError) {
        console.error('Error generating invoice:', invoiceError);
        throw new Error(`Failed to generate invoice: ${invoiceError.message}`);
      } else {
        console.log('Invoice generated successfully:', invoiceData?.invoiceNumber);
      }

      // NOTE: We intentionally DO NOT call send-order-confirmation for Belgian orders
      // The invoice generation already sends the invoice email, which is all we want

      toast({
        title: "Bestelling bevestigd!",
        description: `Uw bestelling ${orderNumber} is succesvol geregistreerd. U ontvangt een factuur via e-mail.`,
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
      console.error('Error in Belgian order submission:', error);
      
      toast({
        title: "Fout bij het verzenden van de bestelling",
        description: "Er is een fout opgetreden bij het verwerken van uw bestelling. Probeer opnieuw of neem contact met ons op.",
        variant: "destructive",
        duration: 5000,
      });

      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitBelgianOrder,
    isSubmitting
  };
};
