
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_address: string;
  delivery_first_name?: string;
  delivery_last_name?: string;
  delivery_street?: string;
  delivery_postcode?: string;
  delivery_city?: string;
  delivery_phone?: string;
  use_same_address?: boolean;
  billing_first_name?: string;
  billing_last_name?: string;
  billing_street?: string;
  billing_postcode?: string;
  billing_city?: string;
  payment_method?: string;
  product?: string;
  amount?: number;
  liters: number;
  price_per_liter: number;
  base_price?: number;
  delivery_fee?: number;
  discount?: number;
  total_amount: number;
  delivery_date?: string;
  delivery_date_display?: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Create a type for order creation that matches Supabase requirements
export interface OrderInsert {
  customer_name: string;
  customer_email: string;
  customer_address: string;
  liters: number;
  price_per_liter: number;
  total_amount: number;
  customer_phone?: string;
  delivery_first_name?: string;
  delivery_last_name?: string;
  delivery_street?: string;
  delivery_postcode?: string;
  delivery_city?: string;
  delivery_phone?: string;
  use_same_address?: boolean;
  billing_first_name?: string;
  billing_last_name?: string;
  billing_street?: string;
  billing_postcode?: string;
  billing_city?: string;
  payment_method?: string;
  product?: string;
  amount?: number;
  base_price?: number;
  delivery_fee?: number;
  discount?: number;
  delivery_date?: string;
  delivery_date_display?: string;
  status?: string;
  notes?: string;
}

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
