
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const nexiConfigSchema = z.object({
  merchant_id: z.string().min(1, 'Merchant ID ist erforderlich'),
  terminal_id: z.string().min(1, 'Terminal ID ist erforderlich'),
  is_sandbox: z.boolean(),
  is_active: z.boolean(),
});

type NexiConfigFormData = z.infer<typeof nexiConfigSchema>;

interface NexiConfig {
  id?: string;
  merchant_id: string;
  terminal_id: string;
  is_sandbox: boolean;
  is_active: boolean;
  shop_id?: string;
}

interface NexiConfigFormProps {
  config?: NexiConfig | null;
  onClose: () => void;
  onSuccess: () => void;
}

const NexiConfigForm = ({ config, onClose, onSuccess }: NexiConfigFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<NexiConfigFormData>({
    resolver: zodResolver(nexiConfigSchema),
    defaultValues: {
      merchant_id: config?.merchant_id || '',
      terminal_id: config?.terminal_id || '',
      is_sandbox: config?.is_sandbox ?? true,
      is_active: config?.is_active ?? false,
    },
  });

  const onSubmit = async (data: NexiConfigFormData) => {
    setIsSubmitting(true);
    try {
      // Ensure the data has the correct types for the database
      const updateData = {
        merchant_id: data.merchant_id,
        terminal_id: data.terminal_id,
        is_sandbox: data.is_sandbox,
        is_active: data.is_active,
      };

      if (config?.id) {
        // Update existing config
        const { error } = await supabase
          .from('nexi_payment_configs')
          .update(updateData)
          .eq('id', config.id);

        if (error) throw error;
      } else {
        // Create new config
        const { error } = await supabase
          .from('nexi_payment_configs')
          .insert([updateData]);

        if (error) throw error;
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving Nexi config:', error);
      toast({
        title: 'Fehler',
        description: 'Konfiguration konnte nicht gespeichert werden.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {config ? 'Nexi-Konfiguration bearbeiten' : 'Neue Nexi-Konfiguration'}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="merchant_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merchant ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Ihre Nexi Merchant ID" {...field} />
                  </FormControl>
                  <FormDescription>
                    Die von Nexi bereitgestellte Händler-Identifikationsnummer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terminal_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terminal ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Ihre Nexi Terminal ID" {...field} />
                  </FormControl>
                  <FormDescription>
                    Die von Nexi bereitgestellte Terminal-Identifikationsnummer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_sandbox"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Sandbox-Modus</FormLabel>
                    <FormDescription>
                      Verwenden Sie die Nexi-Testumgebung für Testzahlungen
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Aktiv</FormLabel>
                    <FormDescription>
                      Konfiguration für Zahlungen aktivieren
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Speichere...' : 'Speichern'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NexiConfigForm;
