
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SMTPConfiguration {
  id: string;
  shop_id: string;
  sender_email: string;
  sender_name: string;
  resend_api_key: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useSMTPConfigurations = () => {
  const { data: smtpConfigurations = [], isLoading, error, refetch } = useQuery({
    queryKey: ['smtp-configurations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('smtp_configurations')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching SMTP configurations:', error);
        throw error;
      }

      return data as SMTPConfiguration[];
    },
  });

  return {
    smtpConfigurations,
    isLoading,
    error,
    refetch,
  };
};
