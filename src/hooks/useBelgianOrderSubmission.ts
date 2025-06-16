
import { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { useInvoiceGeneration } from '@/hooks/useInvoiceGeneration';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BelgianOrderData {
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
  const { createOrder } = useOrders();
  const { generateInvoice } = useInvoiceGeneration();
  const { toast } = useToast();

  const submitBelgianOrder = async (orderData: BelgianOrderData, bankAccountDetails: any) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting Belgian order with data:', orderData);
      
      const originDomain = window.location.hostname;

      // Create order data for database
      const dbOrderData = {
        customer_name: `${orderData.deliveryFirstName} ${orderData.deliveryLastName}`,
        customer_email: orderData.customerEmail,
        customer_email_actual: orderData.customerEmail,
        customer_language: 'nl', // Dutch for Belgian customers
        customer_phone: orderData.deliveryPhone,
        customer_address: `${orderData.deliveryStreet}, ${orderData.deliveryPostcode} ${orderData.deliveryCity}`,
        delivery_first_name: orderData.deliveryFirstName,
        delivery_last_name: orderData.deliveryLastName,
        delivery_street: orderData.deliveryStreet,
        delivery_postcode: orderData.deliveryPostcode,
        delivery_city: orderData.deliveryCity,
        delivery_phone: orderData.deliveryPhone,
        use_same_address: orderData.useSameAddress,
        billing_first_name: orderData.useSameAddress ? orderData.deliveryFirstName : orderData.billingFirstName,
        billing_last_name: orderData.useSameAddress ? orderData.deliveryLastName : orderData.billingLastName,
        billing_street: orderData.useSameAddress ? orderData.deliveryStreet : orderData.billingStreet,
        billing_postcode: orderData.useSameAddress ? orderData.deliveryPostcode : orderData.billingPostcode,
        billing_city: orderData.useSameAddress ? orderData.deliveryCity : orderData.billingCity,
        payment_method: 'vorkasse', // Force bank transfer for Belgian orders
        product: orderData.product,
        amount: orderData.amount,
        liters: orderData.amount,
        price_per_liter: orderData.pricePerLiter,
        base_price: orderData.basePrice,
        delivery_fee: orderData.deliveryFee,
        discount: orderData.discount,
        total_amount: orderData.total,
        delivery_date_display: '4-7 werkdagen',
        status: 'pending',
        origin_domain: originDomain,
        bank_account_id: bankAccountDetails?.id, // Auto-assign MazoutVandaag bank account
        shop_id: '6524e430-426a-4d92-b2d2-83e15ac719fb' // MazoutVandaag shop ID
      };

      console.log('Creating Belgian order with bank account:', bankAccountDetails?.id);

      // Create order in database
      const createdOrder = await createOrder(dbOrderData);

      if (!createdOrder) {
        throw new Error('Failed to create order');
      }

      console.log('Belgian order created:', createdOrder.order_number);

      // Immediately generate and send invoice for Belgian orders
      try {
        console.log('Generating invoice for Belgian order...');
        await generateInvoice(
          createdOrder.id,
          '6524e430-426a-4d92-b2d2-83e15ac719fb', // MazoutVandaag shop ID
          bankAccountDetails?.id,
          'Automatisch gegenereerd voor Belgische bestelling' // Dutch note
        );
        console.log('Invoice generated and sent for Belgian order');
      } catch (invoiceError) {
        console.error('Failed to generate invoice for Belgian order:', invoiceError);
        // Don't fail the order if invoice generation fails
        toast({
          title: 'Bestelling geplaatst',
          description: 'Uw bestelling is geplaatst, maar de factuur kon niet automatisch worden verzonden.',
          variant: 'default'
        });
      }

      return {
        success: true,
        orderNumber: createdOrder.order_number,
        orderId: createdOrder.id
      };

    } catch (error) {
      console.error('Error in Belgian order submission:', error);
      toast({
        title: 'Fout',
        description: 'Er is een fout opgetreden bij het plaatsen van uw bestelling. Probeer het opnieuw.',
        variant: 'destructive'
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
