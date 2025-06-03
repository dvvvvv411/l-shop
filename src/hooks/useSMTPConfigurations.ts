
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type SMTPConfiguration = Tables<'smtp_configurations'> & {
  shops?: {
    id: string;
    name: string;
    company_name: string;
  };
  smtp_domains?: {
    id: string;
    domain: string;
    is_primary: boolean;
  }[];
};

export type SMTPConfigurationInsert = TablesInsert<'smtp_configurations'>;
export type SMTPConfigurationUpdate = TablesUpdate<'smtp_configurations'>;

export interface SMTPConfigurationWithDomains {
  smtp_config: Omit<SMTPConfigurationInsert, 'id' | 'created_at' | 'updated_at'>;
  domains: { domain: string; is_primary: boolean }[];
}

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
          ),
          smtp_domains (
            id,
            domain,
            is_primary
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

  const createConfiguration = async (configData: SMTPConfigurationWithDomains) => {
    try {
      // Create the SMTP configuration first
      const { data: smtpConfig, error: smtpError } = await supabase
        .from('smtp_configurations')
        .insert(configData.smtp_config)
        .select()
        .single();

      if (smtpError) throw smtpError;

      // Create the domains
      if (configData.domains.length > 0) {
        const domainInserts = configData.domains.map(domain => ({
          smtp_config_id: smtpConfig.id,
          domain: domain.domain,
          is_primary: domain.is_primary,
        }));

        const { error: domainsError } = await supabase
          .from('smtp_domains')
          .insert(domainInserts);

        if (domainsError) throw domainsError;
      }

      toast({
        title: 'Erfolg',
        description: 'SMTP-Konfiguration wurde erstellt.',
      });

      await fetchConfigurations();
      return smtpConfig;
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

  const updateConfiguration = async (id: string, configData: SMTPConfigurationWithDomains) => {
    try {
      // Update the SMTP configuration
      const { data, error } = await supabase
        .from('smtp_configurations')
        .update({ ...configData.smtp_config, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Delete existing domains and recreate them
      await supabase
        .from('smtp_domains')
        .delete()
        .eq('smtp_config_id', id);

      if (configData.domains.length > 0) {
        const domainInserts = configData.domains.map(domain => ({
          smtp_config_id: id,
          domain: domain.domain,
          is_primary: domain.is_primary,
        }));

        const { error: domainsError } = await supabase
          .from('smtp_domains')
          .insert(domainInserts);

        if (domainsError) throw domainsError;
      }

      toast({
        title: 'Erfolg',
        description: 'SMTP-Konfiguration wurde aktualisiert.',
      });

      await fetchConfigurations();
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
      // Delete domains first (cascade should handle this, but being explicit)
      await supabase
        .from('smtp_domains')
        .delete()
        .eq('smtp_config_id', id);

      // Delete the SMTP configuration
      const { error } = await supabase
        .from('smtp_configurations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'SMTP-Konfiguration wurde gelöscht.',
      });

      await fetchConfigurations();
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
        .from('smtp_domains')
        .select(`
          smtp_configurations (
            *,
            shops (
              id,
              name,
              company_name
            )
          )
        `)
        .eq('domain', domain)
        .eq('smtp_configurations.is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data?.smtp_configurations || null;
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
          fetchConfigurations();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'smtp_domains',
        },
        (payload) => {
          console.log('Real-time SMTP domains update:', payload);
          fetchConfigurations();
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
