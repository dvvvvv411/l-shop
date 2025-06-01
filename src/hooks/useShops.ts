
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type Shop = Tables<'shops'>;
export type ShopInsert = TablesInsert<'shops'>;
export type ShopUpdate = TablesUpdate<'shops'>;

export const useShops = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch shops
  const fetchShops = async () => {
    try {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setShops(data || []);
    } catch (error) {
      console.error('Error fetching shops:', error);
      toast({
        title: 'Fehler',
        description: 'Geschäfte konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Create shop
  const createShop = async (shopData: Omit<ShopInsert, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('shops')
        .insert(shopData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'Geschäft wurde erfolgreich erstellt.',
      });

      return data;
    } catch (error) {
      console.error('Error creating shop:', error);
      toast({
        title: 'Fehler',
        description: 'Geschäft konnte nicht erstellt werden.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Update shop
  const updateShop = async (id: string, shopData: ShopUpdate) => {
    try {
      const { error } = await supabase
        .from('shops')
        .update({ ...shopData, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'Geschäft wurde aktualisiert.',
      });
    } catch (error) {
      console.error('Error updating shop:', error);
      toast({
        title: 'Fehler',
        description: 'Geschäft konnte nicht aktualisiert werden.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Delete shop
  const deleteShop = async (id: string) => {
    try {
      const { error } = await supabase
        .from('shops')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'Geschäft wurde gelöscht.',
      });
    } catch (error) {
      console.error('Error deleting shop:', error);
      toast({
        title: 'Fehler',
        description: 'Geschäft konnte nicht gelöscht werden.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchShops();

    const channel = supabase
      .channel('shops-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'shops',
        },
        (payload) => {
          console.log('Real-time shop update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setShops(prev => [payload.new as Shop, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setShops(prev => prev.map(shop => 
              shop.id === payload.new.id ? payload.new as Shop : shop
            ));
          } else if (payload.eventType === 'DELETE') {
            setShops(prev => prev.filter(shop => shop.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    shops,
    isLoading,
    createShop,
    updateShop,
    deleteShop,
    refetch: fetchShops,
  };
};
