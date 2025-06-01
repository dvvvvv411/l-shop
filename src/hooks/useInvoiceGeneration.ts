
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
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate invoice');
      }

      console.log('Invoice generated successfully:', data.invoiceNumber);

      // Convert HTML to PDF and download
      await downloadInvoiceAsPDF(data.htmlContent, data.invoiceNumber);

      toast({
        title: 'Erfolg',
        description: `Rechnung ${data.invoiceNumber} wurde generiert und heruntergeladen.`,
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

  const downloadInvoiceAsPDF = async (htmlContent: string, invoiceNumber: string) => {
    // Create a new window with the HTML content
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Pop-up blocked. Please allow pop-ups for this site.');
    }

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    };
  };

  return {
    generateInvoice,
    isGenerating
  };
};
