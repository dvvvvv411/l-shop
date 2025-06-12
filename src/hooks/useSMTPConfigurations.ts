
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SMTPConfiguration {
  id: string;
  shop_id: string;
  sender_email: string;
  sender_name: string;
  resend_api_key: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  shops?: {
    name: string;
  };
  smtp_domains?: Array<{
    id: string;
    domain: string;
    is_primary: boolean;
  }>;
}

export interface SMTPConfigurationWithDomains {
  smtp_config: {
    resend_api_key: string;
    sender_email: string;
    sender_name: string;
    shop_id?: string;
    is_active: boolean;
  };
  domains: Array<{
    domain: string;
    is_primary: boolean;
  }>;
}

export const useSMTPConfigurations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: configurations = [], isLoading, error, refetch } = useQuery({
    queryKey: ['smtp-configurations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('smtp_configurations')
        .select(`
          *,
          shops (name),
          smtp_domains (
            id,
            domain,
            is_primary
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching SMTP configurations:', error);
        throw error;
      }

      return data as SMTPConfiguration[];
    },
  });

  const createConfigurationMutation = useMutation({
    mutationFn: async (configData: SMTPConfigurationWithDomains) => {
      // First create the SMTP configuration
      const { data: smtpConfig, error: smtpError } = await supabase
        .from('smtp_configurations')
        .insert({
          resend_api_key: configData.smtp_config.resend_api_key,
          sender_email: configData.smtp_config.sender_email,
          sender_name: configData.smtp_config.sender_name,
          shop_id: configData.smtp_config.shop_id,
          is_active: configData.smtp_config.is_active,
        })
        .select()
        .single();

      if (smtpError) {
        console.error('Error creating SMTP configuration:', smtpError);
        throw smtpError;
      }

      // Then create the domains
      if (configData.domains.length > 0) {
        const domainsToInsert = configData.domains.map(domain => ({
          smtp_config_id: smtpConfig.id,
          domain: domain.domain,
          is_primary: domain.is_primary,
        }));

        const { error: domainsError } = await supabase
          .from('smtp_domains')
          .insert(domainsToInsert);

        if (domainsError) {
          console.error('Error creating SMTP domains:', domainsError);
          throw domainsError;
        }
      }

      return smtpConfig;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smtp-configurations'] });
      toast({
        title: "Erfolg",
        description: "SMTP-Konfiguration wurde erfolgreich erstellt.",
      });
    },
    onError: (error) => {
      console.error('Error creating SMTP configuration:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Erstellen der SMTP-Konfiguration.",
        variant: "destructive",
      });
    },
  });

  const updateConfigurationMutation = useMutation({
    mutationFn: async ({ id, configData }: { id: string; configData: SMTPConfigurationWithDomains }) => {
      // Update the SMTP configuration
      const { data: smtpConfig, error: smtpError } = await supabase
        .from('smtp_configurations')
        .update({
          resend_api_key: configData.smtp_config.resend_api_key,
          sender_email: configData.smtp_config.sender_email,
          sender_name: configData.smtp_config.sender_name,
          shop_id: configData.smtp_config.shop_id,
          is_active: configData.smtp_config.is_active,
        })
        .eq('id', id)
        .select()
        .single();

      if (smtpError) {
        console.error('Error updating SMTP configuration:', smtpError);
        throw smtpError;
      }

      // Delete existing domains and recreate them
      const { error: deleteError } = await supabase
        .from('smtp_domains')
        .delete()
        .eq('smtp_config_id', id);

      if (deleteError) {
        console.error('Error deleting existing domains:', deleteError);
        throw deleteError;
      }

      // Create new domains
      if (configData.domains.length > 0) {
        const domainsToInsert = configData.domains.map(domain => ({
          smtp_config_id: id,
          domain: domain.domain,
          is_primary: domain.is_primary,
        }));

        const { error: domainsError } = await supabase
          .from('smtp_domains')
          .insert(domainsToInsert);

        if (domainsError) {
          console.error('Error creating new domains:', domainsError);
          throw domainsError;
        }
      }

      return smtpConfig;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smtp-configurations'] });
      toast({
        title: "Erfolg",
        description: "SMTP-Konfiguration wurde erfolgreich aktualisiert.",
      });
    },
    onError: (error) => {
      console.error('Error updating SMTP configuration:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Aktualisieren der SMTP-Konfiguration.",
        variant: "destructive",
      });
    },
  });

  const deleteConfigurationMutation = useMutation({
    mutationFn: async (id: string) => {
      // First delete associated domains
      const { error: domainsError } = await supabase
        .from('smtp_domains')
        .delete()
        .eq('smtp_config_id', id);

      if (domainsError) {
        console.error('Error deleting SMTP domains:', domainsError);
        throw domainsError;
      }

      // Then delete the SMTP configuration
      const { error } = await supabase
        .from('smtp_configurations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting SMTP configuration:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smtp-configurations'] });
      toast({
        title: "Erfolg",
        description: "SMTP-Konfiguration wurde erfolgreich gelöscht.",
      });
    },
    onError: (error) => {
      console.error('Error deleting SMTP configuration:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Löschen der SMTP-Konfiguration.",
        variant: "destructive",
      });
    },
  });

  const createConfiguration = (configData: SMTPConfigurationWithDomains) => {
    return createConfigurationMutation.mutateAsync(configData);
  };

  const updateConfiguration = (id: string, configData: SMTPConfigurationWithDomains) => {
    return updateConfigurationMutation.mutateAsync({ id, configData });
  };

  const deleteConfiguration = (id: string) => {
    return deleteConfigurationMutation.mutateAsync(id);
  };

  return {
    configurations,
    smtpConfigurations: configurations, // Keep backward compatibility
    isLoading,
    error,
    refetch,
    createConfiguration,
    updateConfiguration,
    deleteConfiguration,
  };
};
