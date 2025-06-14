import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useOrderTranslations } from '@/hooks/useOrderTranslations';
import { useInvoiceGeneration } from '@/hooks/useInvoiceGeneration';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Order = Tables<'orders'> & {
  latest_status_change?: string;
};

// Use the official Supabase insert type
export type OrderInsert = TablesInsert<'orders'>;

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const t = useOrderTranslations();
  const { generateInvoice } = useInvoiceGeneration();
  const { bankAccounts } = useBankAccounts();

  // Always fetch all orders (including hidden) - filtering happens in UI
  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_status_history!left (
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Process orders to get the latest status change
      const processedOrders = (data || []).map(order => {
        let latestStatusChange = order.created_at;
        
        if (order.order_status_history && order.order_status_history.length > 0) {
          // Get the most recent status change
          const sortedHistory = order.order_status_history.sort(
            (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          latestStatusChange = sortedHistory[0].created_at;
        }

        return {
          ...order,
          latest_status_change: latestStatusChange,
          order_status_history: undefined // Remove the joined data to keep the interface clean
        };
      });

      setOrders(processedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Fehler',
        description: t.errors.fetchOrders,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get the "Italien Champion" bank account ID
  const getItalienChampionBankAccountId = () => {
    const italienChampionAccount = bankAccounts.find(
      account => account.system_name === 'Italien Champion'
    );
    return italienChampionAccount?.id || null;
  };

  // Get the "GasolioCasa" bank account ID for Italian orders
  const getGasolioCasaBankAccountId = () => {
    const gasolioCasaAccount = bankAccounts.find(
      account => account.system_name === 'GasolioCasa'
    );
    return gasolioCasaAccount?.id || null;
  };

  // Get shop ID for Fioul Rapide
  const getFioulRapideShopId = async () => {
    try {
      const { data: shops, error } = await supabase
        .from('shops')
        .select('id')
        .eq('name', 'Fioul Rapide')
        .limit(1);

      if (error) throw error;
      return shops?.[0]?.id || null;
    } catch (error) {
      console.error('Error fetching Fioul Rapide shop:', error);
      return null;
    }
  };

  // Get shop ID for Gasolio Casa
  const getGasolioCasaShopId = async () => {
    try {
      const { data: shops, error } = await supabase
        .from('shops')
        .select('id')
        .eq('name', 'Gasolio Casa')
        .limit(1);

      if (error) throw error;
      return shops?.[0]?.id || null;
    } catch (error) {
      console.error('Error fetching Gasolio Casa shop:', error);
      return null;
    }
  };

  // Create new order with request deduplication
  const createOrder = async (orderData: Omit<OrderInsert, 'order_number' | 'request_id'>) => {
    try {
      console.log('Creating order with data:', orderData);
      
      // Generate a unique request ID for deduplication
      const requestId = crypto.randomUUID();
      
      // Check if this is a French shop order (fioul-rapide.fr)
      const isFrenchShop = orderData.origin_domain === 'fioul-rapide.fr';
      
      // Check if this is an Italian shop order (gasoliocasa.com)
      const isItalianShop = orderData.origin_domain === 'gasoliocasa.com';
      
      let finalOrderData = { ...orderData };
      
      // For French shop orders, automatically assign Italien Champion bank account and shop
      if (isFrenchShop) {
        const italienChampionBankAccountId = getItalienChampionBankAccountId();
        const fioulRapideShopId = await getFioulRapideShopId();
        
        if (italienChampionBankAccountId) {
          finalOrderData.bank_account_id = italienChampionBankAccountId;
          console.log('Automatically assigned Italien Champion bank account for French shop order');
        }
        
        if (fioulRapideShopId) {
          finalOrderData.shop_id = fioulRapideShopId;
          console.log('Automatically assigned Fioul Rapide shop ID');
        }
      }
      
      // For Italian shop orders, automatically assign GasolioCasa bank account and shop
      if (isItalianShop) {
        const gasolioCasaBankAccountId = getGasolioCasaBankAccountId();
        const gasolioCasaShopId = await getGasolioCasaShopId();
        
        if (gasolioCasaBankAccountId) {
          finalOrderData.bank_account_id = gasolioCasaBankAccountId;
          console.log('Automatically assigned GasolioCasa bank account for Italian shop order');
        }
        
        if (gasolioCasaShopId) {
          finalOrderData.shop_id = gasolioCasaShopId;
          console.log('Automatically assigned Gasolio Casa shop ID');
        }
      }
      
      // Add order data with request_id and temporary order_number
      const orderWithMetadata: OrderInsert = {
        ...finalOrderData,
        request_id: requestId,
        order_number: 'TEMP', // This will be overwritten by the database trigger
      };

      console.log('Inserting order with request_id:', requestId);

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
            description: t.info.orderProcessed,
          });
          return null;
        }
        
        throw error;
      }

      console.log('Order created successfully:', data);

      // For French and Italian shop orders, automatically generate and send invoice
      if ((isFrenchShop || isItalianShop) && data.bank_account_id && data.shop_id) {
        try {
          console.log(`Automatically generating invoice for ${isItalianShop ? 'Italian' : 'French'} shop order...`);
          await generateInvoice(data.id, data.shop_id, data.bank_account_id);
          console.log(`Invoice automatically generated and sent for ${isItalianShop ? 'Italian' : 'French'} shop order`);
        } catch (invoiceError) {
          console.error('Error automatically generating invoice:', invoiceError);
          // Don't fail the order creation if invoice generation fails
          toast({
            title: 'Hinweis',
            description: 'Bestellung erfolgreich erstellt. Rechnung wird nachträglich versendet.',
          });
        }
      } else {
        // For non-French/Italian shops, show normal success message
        toast({
          title: 'Erfolg',
          description: t.success.orderCreated,
        });
      }

      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Fehler',
        description: t.errors.createOrder,
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Update order status with optimistic updates
  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      // Optimistic update
      const now = new Date().toISOString();
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status, updated_at: now, latest_status_change: now }
          : order
      ));

      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: now })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: t.success.statusUpdated,
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      // Revert optimistic update on error
      fetchOrders();
      toast({
        title: 'Fehler',
        description: t.errors.updateStatus,
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Hide order with optimistic updates
  const hideOrder = async (orderId: string) => {
    try {
      // Optimistic update
      const now = new Date().toISOString();
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, is_hidden: true, updated_at: now }
          : order
      ));

      const { error } = await supabase
        .from('orders')
        .update({ is_hidden: true, updated_at: now })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: t.success.orderHidden,
      });
    } catch (error) {
      console.error('Error hiding order:', error);
      // Revert optimistic update on error
      fetchOrders();
      toast({
        title: 'Fehler',
        description: t.errors.hideOrder,
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Unhide order with optimistic updates
  const unhideOrder = async (orderId: string) => {
    try {
      // Optimistic update
      const now = new Date().toISOString();
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, is_hidden: false, updated_at: now }
          : order
      ));

      const { error } = await supabase
        .from('orders')
        .update({ is_hidden: false, updated_at: now })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: t.success.orderUnhidden,
      });
    } catch (error) {
      console.error('Error unhiding order:', error);
      // Revert optimistic update on error
      fetchOrders();
      toast({
        title: 'Fehler',
        description: t.errors.unhideOrder,
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Update order with optimistic updates (for invoice generation, etc.)
  const updateOrder = (orderId: string, updatedData: Partial<Order>) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, ...updatedData } : order
    ));
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },
        (payload) => {
          console.log('Real-time order update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setOrders(prev => [{ ...payload.new as Order, latest_status_change: payload.new.created_at }, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setOrders(prev => prev.map(order => 
              order.id === payload.new.id ? { ...payload.new as Order, latest_status_change: order.latest_status_change } : order
            ));
          } else if (payload.eventType === 'DELETE') {
            setOrders(prev => prev.filter(order => order.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // Also listen for status history changes to update latest_status_change
    const statusHistoryChannel = supabase
      .channel('status-history-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'order_status_history',
        },
        (payload) => {
          console.log('Real-time status history update:', payload);
          
          // Update the latest_status_change for the affected order
          setOrders(prev => prev.map(order => 
            order.id === payload.new.order_id 
              ? { ...order, latest_status_change: payload.new.created_at } 
              : order
          ));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(statusHistoryChannel);
    };
  }, []);

  return {
    orders,
    isLoading,
    createOrder,
    updateOrderStatus,
    hideOrder,
    unhideOrder,
    updateOrder,
    refetch: fetchOrders,
  };
};
