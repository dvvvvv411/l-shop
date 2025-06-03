
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type SMTPConfiguration = Tables<'smtp_configurations'> & {
  shops?: Tables<'shops'>;
};

export type SMTPConfigurationInsert = TablesInsert<'smtp_configurations'>;
export type SMTPConfigurationUpdate = TablesUpdate<'smtp_configurations'>;

export const useSMTPConfigurations = () => {
  const [configurations, setConfigurations] = useState<SMTPConfiguration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchConfigurations = async () => {
    try {
      const { data, error } = await supabase
        .from('smtp_configurations')
        .select(`
          *,
          shops (
            id,
            name,
            company_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConfigurations(data || []);
    } catch (error) {
      console.error('Error fetching SMTP configurations:', error);
      toast({
        title: 'Fehler',
        description: 'SMTP-Konfigurationen konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createConfiguration = async (configData: Omit<SMTPConfigurationInsert, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('smtp_configurations')
        .insert(configData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'SMTP-Konfiguration wurde erstellt.',
      });

      return data;
    } catch (error) {
      console.error('Error creating SMTP configuration:', error);
      toast({
        title: 'Fehler',
        description: 'SMTP-Konfiguration konnte nicht erstellt werden.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateConfiguration = async (id: string, configData: SMTPConfigurationUpdate) => {
    try {
      const { data, error } = await supabase
        .from('smtp_configurations')
        .update({ ...configData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'SMTP-Konfiguration wurde aktualisiert.',
      });

      return data;
    } catch (error) {
      console.error('Error updating SMTP configuration:', error);
      toast({
        title: 'Fehler',
        description: 'SMTP-Konfiguration konnte nicht aktualisiert werden.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteConfiguration = async (id: string) => {
    try {
      const { error } = await supabase
        .from('smtp_configurations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'SMTP-Konfiguration wurde gelöscht.',
      });
    } catch (error) {
      console.error('Error deleting SMTP configuration:', error);
      toast({
        title: 'Fehler',
        description: 'SMTP-Konfiguration konnte nicht gelöscht werden.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const getConfigByDomain = async (domain: string): Promise<SMTPConfiguration | null> => {
    try {
      const { data, error } = await supabase
        .from('smtp_configurations')
        .select('*')
        .eq('shop_url', domain)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      console.error('Error fetching SMTP config by domain:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchConfigurations();

    // Set up real-time subscription
    const channel = supabase
      .channel('smtp-configurations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'smtp_configurations',
        },
        (payload) => {
          console.log('Real-time SMTP config update:', payload);
          fetchConfigurations(); // Refetch data on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    configurations,
    isLoading,
    createConfiguration,
    updateConfiguration,
    deleteConfiguration,
    getConfigByDomain,
    refetch: fetchConfigurations,
  };
};
