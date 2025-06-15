
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useInvoiceGeneration } from '@/hooks/useInvoiceGeneration';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import { useDomainShop } from '@/hooks/useDomainShop';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Order = Tables<'orders'> & {
  latest_status_change?: string;
};

export type OrderInsert = TablesInsert<'orders'>;

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { generateInvoice } = useInvoiceGeneration();
  const { bankAccounts } = useBankAccounts();
  const shopConfig = useDomainShop();

  // Get the appropriate bank account ID based on shop type
  const getBankAccountId = () => {
    if (shopConfig.shopType === 'italy') {
      const gasolioCasaAccount = bankAccounts.find(
        account => account.system_name === 'GasolioCasa'
      );
      console.log('Found GasolioCasa account for Italian order:', gasolioCasaAccount);
      return gasolioCasaAccount?.id || null;
    } else if (shopConfig.shopType === 'france') {
      const italienChampionAccount = bankAccounts.find(
        account => account.system_name === 'Italien Champion'
      );
      console.log('Found Italien Champion account for French order:', italienChampionAccount);
      return italienChampionAccount?.id || null;
    }
    return null;
  };

  // Get shop ID based on shop type
  const getShopId = async () => {
    try {
      let shopName = '';
      if (shopConfig.shopType === 'italy') {
        shopName = 'GasolioCasa';
      } else if (shopConfig.shopType === 'france') {
        shopName = 'Fioul Rapide';
      }
      
      if (!shopName) return null;

      const { data: shops, error } = await supabase
        .from('shops')
        .select('id')
        .eq('name', shopName)
        .limit(1);

      if (error) throw error;
      console.log(`Found ${shopName} shop:`, shops?.[0]);
      return shops?.[0]?.id || null;
    } catch (error) {
      console.error('Error fetching shop:', error);
      return null;
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_status_history(
            new_status,
            created_at,
            notes
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Process orders to get latest status change
      const processedOrders = data.map(order => ({
        ...order,
        latest_status_change: order.order_status_history?.[0]?.created_at || order.created_at
      }));

      setOrders(processedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch orders',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Create new order with request deduplication
  const createOrder = async (orderData: Omit<OrderInsert, 'order_number' | 'request_id'>) => {
    try {
      console.log('Creating order with data:', orderData);
      console.log('Shop type:', shopConfig.shopType);
      
      // Generate a unique request ID for deduplication
      const requestId = crypto.randomUUID();
      
      // Automatically assign bank account and shop based on shop type
      const bankAccountId = getBankAccountId();
      const shopId = await getShopId();
      
      let finalOrderData = { ...orderData };
      
      if (bankAccountId) {
        finalOrderData.bank_account_id = bankAccountId;
        console.log('Automatically assigned bank account for shop type:', shopConfig.shopType);
      }
      
      if (shopId) {
        finalOrderData.shop_id = shopId;
        console.log('Automatically assigned shop ID for shop type:', shopConfig.shopType);
      }

      // Set the appropriate customer language
      if (shopConfig.shopType === 'italy') {
        finalOrderData.customer_language = 'it';
        console.log('Set customer language to Italian (it)');
      } else if (shopConfig.shopType === 'france') {
        finalOrderData.customer_language = 'fr';
        console.log('Set customer language to French (fr)');
      } else {
        finalOrderData.customer_language = 'de';
        console.log('Set customer language to German (de)');
      }
      
      // Add order data with request_id and temporary order_number
      const orderWithMetadata: OrderInsert = {
        ...finalOrderData,
        request_id: requestId,
        order_number: 'TEMP', // This will be overwritten by the database trigger
      };

      console.log('Inserting order with request_id:', requestId);
      console.log('Final order data:', orderWithMetadata);

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
            title: 'Information',
            description: 'Order already processed.',
          });
          return null;
        }
        
        throw error;
      }

      console.log('Order created successfully:', data);
      console.log('Customer language set to:', data.customer_language);

      // For Italian shops, automatically generate invoice instead of sending order confirmation
      if (shopConfig.shopType === 'italy' && data.bank_account_id && data.shop_id) {
        try {
          console.log('Automatically generating invoice for Italian shop order...');
          await generateInvoice(data.id, data.shop_id, data.bank_account_id, 'Fattura automatica per ordine italiano');
          console.log('Invoice automatically generated and sent for Italian shop order');
          
          toast({
            title: 'Success',
            description: shopConfig.shopType === 'italy' 
              ? 'Ordine creato con successo. La fattura è stata inviata via email.'
              : 'Order created successfully. Invoice has been sent via email.',
          });
        } catch (invoiceError) {
          console.error('Error automatically generating invoice for Italian order:', invoiceError);
          toast({
            title: 'Note',
            description: shopConfig.shopType === 'italy'
              ? 'Ordine creato con successo. La fattura verrà inviata successivamente.'
              : 'Order created successfully. Invoice will be sent later.',
          });
        }
      } else {
        // For non-Italian shops, send order confirmation email
        try {
          console.log('Sending order confirmation email...');
          const { error: emailError } = await supabase.functions.invoke('send-order-confirmation', {
            body: {
              orderId: data.id,
              customerEmail: data.customer_email,
              originDomain: window.location.hostname
            }
          });

          if (emailError) {
            console.error('Error sending order confirmation email:', emailError);
          } else {
            console.log('Order confirmation email sent successfully');
          }
        } catch (emailError) {
          console.error('Error invoking send-order-confirmation function:', emailError);
        }

        toast({
          title: 'Success',
          description: shopConfig.shopType === 'france' 
            ? 'Commande créée avec succès.'
            : 'Order created successfully.',
        });
      }

      // Refresh orders list
      fetchOrders();
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Error',
        description: shopConfig.shopType === 'italy' 
          ? 'Impossibile creare l\'ordine. Riprova.'
          : shopConfig.shopType === 'france'
          ? 'Impossible de créer la commande. Veuillez réessayer.'
          : 'Unable to create order. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateOrderStatus = async (orderId: string, status: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

      // Add status history entry
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert({
          order_id: orderId,
          new_status: status,
          notes: notes || null
        });

      if (historyError) throw historyError;

      toast({
        title: 'Success',
        description: 'Order status updated successfully',
      });

      // Refresh orders
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive',
      });
    }
  };

  const updateOrder = async (orderId: string, orderData: Partial<Order>) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update(orderData)
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Order updated successfully',
      });

      // Refresh orders
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: 'Error',
        description: 'Failed to update order',
        variant: 'destructive',
      });
    }
  };

  const hideOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ is_hidden: true })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Order hidden successfully',
      });

      // Refresh orders
      fetchOrders();
    } catch (error) {
      console.error('Error hiding order:', error);
      toast({
        title: 'Error',
        description: 'Failed to hide order',
        variant: 'destructive',
      });
    }
  };

  const unhideOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ is_hidden: false })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Order unhidden successfully',
      });

      // Refresh orders
      fetchOrders();
    } catch (error) {
      console.error('Error unhiding order:', error);
      toast({
        title: 'Error',
        description: 'Failed to unhide order',
        variant: 'destructive',
      });
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Order deleted successfully',
      });

      // Refresh orders
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete order',
        variant: 'destructive',
      });
    }
  };

  return {
    orders,
    isLoading,
    createOrder,
    updateOrderStatus,
    updateOrder,
    hideOrder,
    unhideOrder,
    deleteOrder,
    refreshOrders: fetchOrders,
  };
};
