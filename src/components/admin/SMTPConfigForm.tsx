
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useShops } from '@/hooks/useShops';

const smtpConfigSchema = z.object({
  shop_url: z.string().min(1, 'Domain URL ist erforderlich'),
  resend_api_key: z.string().min(1, 'Resend API Key ist erforderlich'),
  sender_email: z.string().email('Ungültige E-Mail-Adresse'),
  sender_name: z.string().min(1, 'Absendername ist erforderlich'),
  shop_id: z.string().optional(),
  is_active: z.boolean(),
});

type SMTPConfigFormData = z.infer<typeof smtpConfigSchema>;

interface SMTPConfigFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SMTPConfigFormData) => Promise<void>;
  initialData?: any;
  isEditing?: boolean;
}

const SMTPConfigForm: React.FC<SMTPConfigFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const { shops } = useShops();
  
  const form = useForm<SMTPConfigFormData>({
    resolver: zodResolver(smtpConfigSchema),
    defaultValues: {
      shop_url: initialData?.shop_url || '',
      resend_api_key: initialData?.resend_api_key || '',
      sender_email: initialData?.sender_email || '',
      sender_name: initialData?.sender_name || 'Heizöl Team',
      shop_id: initialData?.shop_id || undefined,
      is_active: initialData?.is_active ?? true,
    },
  });

  const handleSubmit = async (data: SMTPConfigFormData) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error('Error submitting SMTP config:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'SMTP-Konfiguration bearbeiten' : 'Neue SMTP-Konfiguration'}
          </DialogTitle>
          <DialogDescription>
            Konfigurieren Sie die E-Mail-Einstellungen für eine Domain
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="shop_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="beispiel.de oder localhost:5173" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Die Domain, von der aus Bestellungen kommen (ohne http://)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resend_api_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resend API Key</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="re_xxxxxxxxxx" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Ihr Resend API-Schlüssel für diese Domain
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sender_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Absender E-Mail</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="noreply@beispiel.de" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Die E-Mail-Adresse, von der E-Mails gesendet werden
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sender_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Absendername</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Heizöl Team" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Der Name, der als Absender angezeigt wird
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shop_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verknüpfter Shop (Optional)</FormLabel>
                  <Select onValueChange={(value) => field.onChange(value || undefined)} value={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Shop auswählen..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {shops.map((shop) => (
                        <SelectItem key={shop.id} value={shop.id}>
                          {shop.name} - {shop.company_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Optionale Verknüpfung mit einem Shop für erweiterte Einstellungen
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Aktiv
                    </FormLabel>
                    <FormDescription>
                      Aktivieren Sie diese Konfiguration für E-Mail-Versand
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

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Abbrechen
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? 'Speichern...'
                  : isEditing
                  ? 'Aktualisieren'
                  : 'Erstellen'
                }
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SMTPConfigForm;
