
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html_content: string;
  text_content?: string;
  shop_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmailConfiguration {
  id: string;
  shop_id: string;
  from_email: string;
  from_name: string;
  reply_to?: string;
  send_order_confirmation: boolean;
  order_confirmation_template_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmailLog {
  id: string;
  order_id?: string;
  email_type: string;
  recipient_email: string;
  subject: string;
  status: 'pending' | 'sent' | 'failed';
  error_message?: string;
  sent_at?: string;
  created_at: string;
}

export const useEmailTemplates = () => {
  return useQuery({
    queryKey: ['email-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as EmailTemplate[];
    },
  });
};

export const useEmailConfigurations = () => {
  return useQuery({
    queryKey: ['email-configurations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_configurations')
        .select(`
          *,
          shop:shops(*),
          order_confirmation_template:email_templates!order_confirmation_template_id(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as (EmailConfiguration & { 
        shop: any;
        order_confirmation_template: EmailTemplate;
      })[];
    },
  });
};

export const useEmailLogs = (limit = 50) => {
  return useQuery({
    queryKey: ['email-logs', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_logs')
        .select(`
          *,
          order:orders(order_number, customer_name)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data as (EmailLog & { order: any })[];
    },
  });
};

export const useCreateEmailTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (template: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('email_templates')
        .insert(template)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-templates'] });
    },
  });
};

export const useUpdateEmailTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<EmailTemplate> & { id: string }) => {
      const { data, error } = await supabase
        .from('email_templates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      queryClient.invalidateQueries({ queryKey: ['email-configurations'] });
    },
  });
};

export const useCreateEmailConfiguration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (config: Omit<EmailConfiguration, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('email_configurations')
        .insert(config)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-configurations'] });
    },
  });
};

export const useUpdateEmailConfiguration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<EmailConfiguration> & { id: string }) => {
      const { data, error } = await supabase
        .from('email_configurations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-configurations'] });
    },
  });
};

export const useSendOrderEmail = () => {
  return useMutation({
    mutationFn: async (orderId: string) => {
      const { data, error } = await supabase.functions.invoke('send-order-email', {
        body: { orderId }
      });
      
      if (error) throw error;
      return data;
    },
  });
};
