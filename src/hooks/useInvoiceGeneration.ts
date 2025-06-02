
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
      
      // Update the order with the selected bank account
      if (bankAccountId) {
        const { error: updateError } = await supabase
          .from('orders')
          .update({ bank_account_id: bankAccountId })
          .eq('id', orderId);

        if (updateError) {
          console.error('Error updating order with bank account:', updateError);
          throw updateError;
        }
      }
      
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

      // Update order status to invoice_created and store file URL
      const { error: statusUpdateError } = await supabase
        .from('orders')
        .update({ 
          status: 'invoice_created',
          invoice_number: data.invoiceNumber,
          invoice_date: new Date().toISOString().split('T')[0],
          invoice_file_url: data.fileUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (statusUpdateError) {
        console.error('Error updating order status:', statusUpdateError);
        // Don't throw here as the invoice was successfully generated
      }

      // If invoice was generated successfully and bank account was used, create transaction record
      if (bankAccountId && data.invoiceAmount) {
        const { error: transactionError } = await supabase
          .from('bank_account_transactions')
          .insert({
            bank_account_id: bankAccountId,
            order_id: orderId,
            amount: data.invoiceAmount,
            transaction_date: new Date().toISOString().split('T')[0]
          });

        if (transactionError) {
          console.error('Error creating transaction record:', transactionError);
          // Don't throw here as the invoice was successfully generated
        }
      }

      // Store invoice record in the invoices table
      if (data.invoiceNumber) {
        const { error: invoiceRecordError } = await supabase
          .from('invoices')
          .insert({
            order_id: orderId,
            invoice_number: data.invoiceNumber,
            invoice_date: new Date().toISOString().split('T')[0],
            file_name: data.fileName,
            file_url: data.fileUrl
          });

        if (invoiceRecordError) {
          console.error('Error creating invoice record:', invoiceRecordError);
          // Don't throw here as the invoice was successfully generated
        }
      }

      toast({
        title: 'Erfolg',
        description: `Rechnung ${data.invoiceNumber} wurde generiert und gespeichert. Der Status wurde auf "Rechnung erstellt" gesetzt.`,
      });

      return {
        ...data,
        // Return the updated order data to avoid needing a page refresh
        updatedOrder: {
          status: 'invoice_created',
          invoice_number: data.invoiceNumber,
          invoice_date: new Date().toISOString().split('T')[0],
          invoice_file_url: data.fileUrl
        }
      };
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
