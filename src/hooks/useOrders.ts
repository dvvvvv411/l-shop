
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useOrderTranslations } from '@/hooks/useOrderTranslations';
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
            description: t.info.orderProcessed,
          });
          return null;
        }
        
        throw error;
      }

      console.log('Order created successfully:', data);

      toast({
        title: 'Erfolg',
        description: t.success.orderCreated,
      });

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
