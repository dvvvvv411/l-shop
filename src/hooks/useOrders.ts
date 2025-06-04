
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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

  // Fetch orders with latest status change information
  const fetchOrders = async (includeHidden: boolean = false) => {
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          order_status_history!left (
            created_at
          )
        `);

      // Filter out hidden orders unless specifically requested
      if (!includeHidden) {
        query = query.eq('is_hidden', false);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

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
        description: 'Bestellungen konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Create new order with request deduplication
  const createOrder = async (orderData: Omit<OrderInsert, 'order_number' | 'request_id'>) => {
    try {
      console.log('Creating order with data:', orderData);
      
      // Generate a unique request ID for deduplication
      const requestId = crypto.randomUUID();
      
      // Add order data with request_id and temporary order_number
      const orderWithMetadata: OrderInsert = {
        ...orderData,
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
            description: 'Diese Bestellung wurde bereits verarbeitet.',
          });
          return null;
        }
        
        throw error;
      }

      console.log('Order created successfully:', data);

      toast({
        title: 'Erfolg',
        description: 'Bestellung wurde erfolgreich erstellt.',
      });

      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Fehler',
        description: 'Bestellung konnte nicht erstellt werden.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'Bestellstatus wurde aktualisiert.',
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: 'Fehler',
        description: 'Bestellstatus konnte nicht aktualisiert werden.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Hide order
  const hideOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ is_hidden: true, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'Bestellung wurde ausgeblendet.',
      });

      // Remove the order from the current list
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error hiding order:', error);
      toast({
        title: 'Fehler',
        description: 'Bestellung konnte nicht ausgeblendet werden.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Unhide order
  const unhideOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ is_hidden: false, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'Bestellung wurde wieder eingeblendet.',
      });
    } catch (error) {
      console.error('Error unhiding order:', error);
      toast({
        title: 'Fehler',
        description: 'Bestellung konnte nicht wieder eingeblendet werden.',
        variant: 'destructive',
      });
      throw error;
    }
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
    refetch: fetchOrders,
  };
};
