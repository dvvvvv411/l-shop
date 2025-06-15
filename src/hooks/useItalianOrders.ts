
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useInvoiceGeneration } from '@/hooks/useInvoiceGeneration';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Order = Tables<'orders'> & {
  latest_status_change?: string;
};

export type OrderInsert = TablesInsert<'orders'>;

export const useItalianOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { generateInvoice } = useInvoiceGeneration();
  const { bankAccounts } = useBankAccounts();

  // Get the "GasolioCasa" bank account ID
  const getGasolioCasaBankAccountId = () => {
    const gasolioCasaAccount = bankAccounts.find(
      account => account.system_name === 'GasolioCasa'
    );
    return gasolioCasaAccount?.id || null;
  };

  // Get shop ID for GasolioCasa
  const getGasolioCasaShopId = async () => {
    try {
      const { data: shops, error } = await supabase
        .from('shops')
        .select('id')
        .eq('name', 'GasolioCasa')
        .limit(1);

      if (error) throw error;
      return shops?.[0]?.id || null;
    } catch (error) {
      console.error('Error fetching GasolioCasa shop:', error);
      return null;
    }
  };

  // Create new order with request deduplication for Italian shops
  const createOrder = async (orderData: Omit<OrderInsert, 'order_number' | 'request_id'>) => {
    try {
      console.log('Creating Italian order with data:', orderData);
      
      // Generate a unique request ID for deduplication
      const requestId = crypto.randomUUID();
      
      // For Italian shop orders, automatically assign GasolioCasa bank account and shop
      const gasolioCasaBankAccountId = getGasolioCasaBankAccountId();
      const gasolioCasaShopId = await getGasolioCasaShopId();
      
      let finalOrderData = { ...orderData };
      
      if (gasolioCasaBankAccountId) {
        finalOrderData.bank_account_id = gasolioCasaBankAccountId;
        console.log('Automatically assigned GasolioCasa bank account for Italian shop order');
      }
      
      if (gasolioCasaShopId) {
        finalOrderData.shop_id = gasolioCasaShopId;
        console.log('Automatically assigned GasolioCasa shop ID');
      }
      
      // Add order data with request_id and temporary order_number
      const orderWithMetadata: OrderInsert = {
        ...finalOrderData,
        request_id: requestId,
        order_number: 'TEMP', // This will be overwritten by the database trigger
      };

      console.log('Inserting Italian order with request_id:', requestId);

      const { data, error } = await supabase
        .from('orders')
        .insert(orderWithMetadata)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        
        // Check if it's a duplicate request error
        if (error.code === '23505' && error.message.includes('orders_request_id_unique')) {
          console.log('Duplicate request detected, ignoring...');
          toast({
            title: 'Informazione',
            description: 'Ordine già processato.',
          });
          return null;
        }
        
        throw error;
      }

      console.log('Italian order created successfully:', data);

      // For Italian shop orders, automatically generate and send invoice instead of order confirmation
      if (data.bank_account_id && data.shop_id) {
        try {
          console.log('Automatically generating invoice for Italian shop order (skipping order confirmation)...');
          await generateInvoice(data.id, data.shop_id, data.bank_account_id, 'Fattura automatica per ordine italiano');
          console.log('Invoice automatically generated and sent for Italian shop order');
          
          toast({
            title: 'Successo',
            description: 'Ordine creato con successo. La fattura è stata inviata via email.',
          });
        } catch (invoiceError) {
          console.error('Error automatically generating invoice for Italian order:', invoiceError);
          toast({
            title: 'Nota',
            description: 'Ordine creato con successo. La fattura verrà inviata successivamente.',
          });
        }
      } else {
        toast({
          title: 'Successo',
          description: 'Ordine creato con successo.',
        });
      }

      return data;
    } catch (error) {
      console.error('Error creating Italian order:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile creare l\'ordine. Riprova.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    orders,
    isLoading,
    createOrder,
  };
};
