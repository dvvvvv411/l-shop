
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface OrderNote {
  id: string;
  order_id: string;
  message: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export const useOrderNotes = (orderId: string) => {
  const [notes, setNotes] = useState<OrderNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('order_notes')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching order notes:', error);
      toast({
        title: 'Fehler',
        description: 'Notizen konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addNote = async (message: string) => {
    try {
      const { data, error } = await supabase
        .from('order_notes')
        .insert({
          order_id: orderId,
          message,
          created_by: 'Admin'
        })
        .select()
        .single();

      if (error) throw error;

      setNotes(prev => [...prev, data]);
      
      toast({
        title: 'Erfolg',
        description: 'Notiz wurde hinzugefügt.',
      });

      return data;
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: 'Fehler',
        description: 'Notiz konnte nicht hinzugefügt werden.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchNotes();

      // Set up real-time subscription
      const channel = supabase
        .channel(`order-notes-${orderId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'order_notes',
            filter: `order_id=eq.${orderId}`,
          },
          (payload) => {
            setNotes(prev => [...prev, payload.new as OrderNote]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [orderId]);

  return {
    notes,
    isLoading,
    addNote,
    refetch: fetchNotes,
  };
};
