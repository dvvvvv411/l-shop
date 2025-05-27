
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

export type Order = Tables<'orders'>;

// Create a type for inserting orders where order_number is optional since it's auto-generated
export type OrderInsert = {
  amount?: number | null;
  base_price?: number | null;
  billing_city?: string | null;
  billing_first_name?: string | null;
  billing_last_name?: string | null;
  billing_postcode?: string | null;
  billing_street?: string | null;
  created_at?: string;
  customer_address: string;
  customer_email: string;
  customer_name: string;
  customer_phone?: string | null;
  delivery_city?: string | null;
  delivery_date?: string | null;
  delivery_date_display?: string | null;
  delivery_fee?: number | null;
  delivery_first_name?: string | null;
  delivery_last_name?: string | null;
  delivery_phone?: string | null;
  delivery_postcode?: string | null;
  delivery_street?: string | null;
  discount?: number | null;
  id?: string;
  liters: number;
  notes?: string | null;
  order_number?: string; // Make this optional since it's auto-generated
  payment_method?: string | null;
  price_per_liter: number;
  product?: string | null;
  status?: string;
  total_amount: number;
  updated_at?: string;
  use_same_address?: boolean | null;
};

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

  // Create new order
  const createOrder = async (orderData: OrderInsert) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;

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
