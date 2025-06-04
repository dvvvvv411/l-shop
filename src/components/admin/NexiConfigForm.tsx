
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const nexiConfigSchema = z.object({
  merchant_id: z.string().min(1, 'Merchant ID ist erforderlich'),
  terminal_id: z.string().min(1, 'Terminal ID ist erforderlich'),
  password: z.string().min(1, 'Password ist erforderlich'),
  alias: z.string().optional(),
  mac_key: z.string().optional(),
  api_key: z.string().optional(),
  integration_method: z.enum(['form_post', 'pay_by_link', 'hosted_payment_page']),
  test_mode: z.boolean(),
  is_sandbox: z.boolean(),
  is_active: z.boolean(),
});

type NexiConfigFormData = z.infer<typeof nexiConfigSchema>;

interface NexiConfig {
  id?: string;
  merchant_id: string;
  terminal_id: string;
  password?: string;
  alias?: string;
  mac_key?: string;
  api_key?: string;
  integration_method?: string;
  test_mode?: boolean;
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
      password: config?.password || '',
      alias: config?.alias || '',
      mac_key: config?.mac_key || '',
      api_key: config?.api_key || '',
      integration_method: (config?.integration_method as any) || 'pay_by_link',
      test_mode: config?.test_mode ?? true,
      is_sandbox: config?.is_sandbox ?? true,
      is_active: config?.is_active ?? false,
    },
  });

  const onSubmit = async (data: NexiConfigFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting Nexi config:', { 
        ...data, 
        password: data.password ? '[REDACTED]' : undefined,
        mac_key: data.mac_key ? '[REDACTED]' : undefined,
        api_key: data.api_key ? '[REDACTED]' : undefined
      });

      const updateData = {
        merchant_id: data.merchant_id.trim(),
        terminal_id: data.terminal_id.trim(),
        password: data.password.trim(),
        alias: data.alias?.trim() || null,
        mac_key: data.mac_key?.trim() || null,
        api_key: data.api_key?.trim() || null,
        integration_method: data.integration_method,
        test_mode: data.test_mode,
        is_sandbox: data.is_sandbox,
        is_active: data.is_active,
        base_url: data.test_mode ? 'https://int-ecommerce.nexi.it' : 'https://ecommerce.nexi.it'
      };

      console.log('Processed data for database:', { 
        ...updateData, 
        password: updateData.password ? '[REDACTED]' : null,
        mac_key: updateData.mac_key ? '[REDACTED]' : null,
        api_key: updateData.api_key ? '[REDACTED]' : null
      });

      if (config?.id) {
        console.log('Updating existing config with ID:', config.id);
        const { error } = await supabase
          .from('nexi_payment_configs')
          .update(updateData)
          .eq('id', config.id);

        if (error) {
          console.error('Error updating config:', error);
          throw error;
        }
        console.log('Config updated successfully');
      } else {
        console.log('Creating new config');
        const { error } = await supabase
          .from('nexi_payment_configs')
          .insert([updateData]);

        if (error) {
          console.error('Error creating config:', error);
          throw error;
        }
        console.log('Config created successfully');
      }

      toast({
        title: 'Erfolg',
        description: config?.id ? 'Konfiguration wurde aktualisiert.' : 'Konfiguration wurde erstellt.',
      });

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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="Ihr Nexi Password" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Das von Nexi bereitgestellte Password für die API-Authentifizierung
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="api_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="Ihr Nexi API Key (optional)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Der von Nexi bereitgestellte API Key für erweiterte Funktionen
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ALIAS</FormLabel>
                  <FormControl>
                    <Input placeholder="Ihr Nexi ALIAS (optional)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Der von Nexi bereitgestellte ALIAS für die Zahlungsabwicklung
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mac_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MAC Key</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="Ihr Nexi MAC Key (optional aber empfohlen)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Der von Nexi bereitgestellte MAC Key für sichere Transaktionssignierung
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="integration_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Integration Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie die Integrationsmethode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pay_by_link">Pay by Link (Empfohlen für Test)</SelectItem>
                      <SelectItem value="form_post">Form POST</SelectItem>
                      <SelectItem value="hosted_payment_page">Hosted Payment Page</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Die Art der Nexi-Integration. Pay by Link wird für die Testumgebung empfohlen.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="test_mode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Test-Modus</FormLabel>
                    <FormDescription>
                      Verwenden Sie die Nexi-Testumgebung (int-ecommerce.nexi.it)
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
              name="is_sandbox"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Sandbox-Modus</FormLabel>
                    <FormDescription>
                      Legacy Sandbox-Einstellung (wird durch Test-Modus ersetzt)
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
