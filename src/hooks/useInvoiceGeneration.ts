
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useInvoiceGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateInvoice = async (orderId: string, shopId?: string, bankAccountId?: string) => {
    try {
      setIsGenerating(true);
      
      console.log('Generating invoice for order:', orderId, 'with shop:', shopId, 'and bank account:', bankAccountId);
      
      const { data, error } = await supabase.functions.invoke('generate-invoice', {
        body: { orderId, shopId, bankAccountId }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (!data || !data.success) {
        console.error('Invoice generation failed:', data?.error);
        throw new Error(data?.error || 'Failed to generate invoice');
      }

      console.log('Invoice generated successfully:', data.invoiceNumber);

      toast({
        title: 'Erfolg',
        description: `Rechnung ${data.invoiceNumber} wurde erfolgreich generiert und gespeichert.`,
      });

      return data;
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast({
        title: 'Fehler',
        description: 'Rechnung konnte nicht generiert werden.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateInvoice,
    isGenerating
  };
};
