
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Order = Tables<'orders'>;

// Use the official Supabase insert type
export type OrderInsert = TablesInsert<'orders'>;

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
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
            setOrders(prev => [payload.new as Order, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setOrders(prev => prev.map(order => 
              order.id === payload.new.id ? payload.new as Order : order
            ));
          } else if (payload.eventType === 'DELETE') {
            setOrders(prev => prev.filter(order => order.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    orders,
    isLoading,
    createOrder,
    updateOrderStatus,
    refetch: fetchOrders,
  };
};
