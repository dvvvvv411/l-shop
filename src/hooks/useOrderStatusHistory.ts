
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  old_status: string | null;
  new_status: string;
  changed_by: string;
  notes: string | null;
  created_at: string;
}

export const useOrderStatusHistory = (orderId: string) => {
  const [history, setHistory] = useState<OrderStatusHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('order_status_history')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching order status history:', error);
      toast({
        title: 'Fehler',
        description: 'Status-Verlauf konnte nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addStatusChange = async (oldStatus: string | null, newStatus: string, notes?: string) => {
    try {
      const { data, error } = await supabase
        .from('order_status_history')
        .insert({
          order_id: orderId,
          old_status: oldStatus,
          new_status: newStatus,
          changed_by: 'Admin',
          notes
        })
        .select()
        .single();

      if (error) throw error;

      setHistory(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error adding status change:', error);
      toast({
        title: 'Fehler',
        description: 'Status-Änderung konnte nicht protokolliert werden.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchHistory();

      // Set up real-time subscription
      const channel = supabase
        .channel(`order-status-history-${orderId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'order_status_history',
            filter: `order_id=eq.${orderId}`,
          },
          (payload) => {
            setHistory(prev => [payload.new as OrderStatusHistory, ...prev]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [orderId]);

  return {
    history,
    isLoading,
    addStatusChange,
    refetch: fetchHistory,
  };
};
