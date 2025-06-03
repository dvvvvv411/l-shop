
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { OrderInsert } from '@/hooks/useOrders';

export const useOrderCreation = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const createOrderWithEmail = async (orderData: Omit<OrderInsert, 'order_number' | 'request_id'>) => {
    setIsCreating(true);
    
    try {
      console.log('Creating order with email functionality:', orderData);
      
      // Generate a unique request ID for deduplication
      const requestId = crypto.randomUUID();
      
      // Add order data with request_id and temporary order_number
      const orderWithMetadata: OrderInsert = {
        ...orderData,
        request_id: requestId,
        order_number: 'TEMP', // This will be overwritten by the database trigger
      };

      console.log('Inserting order with request_id:', requestId);

      const { data: createdOrder, error: orderError } = await supabase
        .from('orders')
        .insert(orderWithMetadata)
        .select()
        .single();

      if (orderError) {
        console.error('Supabase error:', orderError);
        
        // Check if it's a duplicate request error
        if (orderError.code === '23505' && orderError.message.includes('orders_request_id_unique')) {
          console.log('Duplicate request detected, ignoring...');
          toast({
            title: 'Information',
            description: 'Diese Bestellung wurde bereits verarbeitet.',
          });
          return null;
        }
        
        throw orderError;
      }

      console.log('Order created successfully:', createdOrder);

      // Send order confirmation email
      try {
        console.log('Sending order confirmation email...');
        
        const emailData = {
          orderId: createdOrder.id,
          customerEmail: createdOrder.customer_email,
          orderNumber: createdOrder.order_number,
          customerName: createdOrder.customer_name,
          product: createdOrder.product || 'Standard Heizöl',
          liters: createdOrder.liters,
          totalAmount: createdOrder.total_amount,
          deliveryDate: createdOrder.delivery_date_display,
          originDomain: window.location.host
        };

        const { data: emailResult, error: emailError } = await supabase.functions.invoke(
          'send-order-confirmation',
          { body: emailData }
        );

        if (emailError) {
          console.error('Error sending confirmation email:', emailError);
          // Don't fail the order creation if email fails
          toast({
            title: 'Bestellung erstellt',
            description: 'Bestellung wurde erstellt, aber die Bestätigungs-E-Mail konnte nicht gesendet werden.',
            variant: 'destructive',
          });
        } else {
          console.log('Confirmation email sent successfully:', emailResult);
          toast({
            title: 'Erfolg',
            description: 'Bestellung wurde erfolgreich erstellt und Bestätigungs-E-Mail gesendet.',
          });
        }
      } catch (emailError) {
        console.error('Error in email sending process:', emailError);
        // Don't fail the order creation if email fails
        toast({
          title: 'Bestellung erstellt',
          description: 'Bestellung wurde erstellt, aber die Bestätigungs-E-Mail konnte nicht gesendet werden.',
          variant: 'destructive',
        });
      }

      return createdOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Fehler',
        description: 'Bestellung konnte nicht erstellt werden.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createOrderWithEmail,
    isCreating
  };
};
