
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
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
import type { SMTPConfigurationWithDomains } from '@/hooks/useSMTPConfigurations';

const domainSchema = z.object({
  domain: z.string().min(1, 'Domain ist erforderlich'),
  is_primary: z.boolean(),
});

const smtpConfigSchema = z.object({
  smtp_config: z.object({
    resend_api_key: z.string().min(1, 'Resend API Key ist erforderlich'),
    sender_email: z.string().email('Ungültige E-Mail-Adresse'),
    sender_name: z.string().min(1, 'Absendername ist erforderlich'),
    shop_id: z.string().optional(),
    is_active: z.boolean(),
  }),
  domains: z.array(domainSchema).min(1, 'Mindestens eine Domain ist erforderlich'),
});

type SMTPConfigFormData = z.infer<typeof smtpConfigSchema>;

interface SMTPConfigFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SMTPConfigurationWithDomains) => Promise<void>;
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
      smtp_config: {
        resend_api_key: initialData?.resend_api_key || '',
        sender_email: initialData?.sender_email || '',
        sender_name: initialData?.sender_name || 'Heizöl Team',
        shop_id: initialData?.shop_id || undefined,
        is_active: initialData?.is_active ?? true,
      },
      domains: initialData?.smtp_domains?.length > 0 
        ? initialData.smtp_domains 
        : [{ domain: '', is_primary: true }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'domains',
  });

  const handleSubmit = async (data: SMTPConfigFormData) => {
    try {
      // Transform the form data to match SMTPConfigurationWithDomains type
      const transformedData: SMTPConfigurationWithDomains = {
        smtp_config: {
          resend_api_key: data.smtp_config.resend_api_key,
          sender_email: data.smtp_config.sender_email,
          sender_name: data.smtp_config.sender_name,
          shop_id: data.smtp_config.shop_id,
          is_active: data.smtp_config.is_active,
        },
        domains: data.domains.map(domain => ({
          domain: domain.domain,
          is_primary: domain.is_primary,
        })),
      };

      await onSubmit(transformedData);
      form.reset();
      onClose();
    } catch (error) {
      console.error('Error submitting SMTP config:', error);
    }
  };

  const addDomain = () => {
    append({ domain: '', is_primary: false });
  };

  const removeDomain = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const ensurePrimaryDomain = (index: number, value: boolean) => {
    if (value) {
      // If setting this domain as primary, unset others
      fields.forEach((_, i) => {
        if (i !== index) {
          form.setValue(`domains.${i}.is_primary`, false);
        }
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'SMTP-Konfiguration bearbeiten' : 'Neue SMTP-Konfiguration'}
          </DialogTitle>
          <DialogDescription>
            Konfigurieren Sie die E-Mail-Einstellungen und verknüpften Domains
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* SMTP Configuration Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">E-Mail-Konfiguration</h3>
              
              <FormField
                control={form.control}
                name="smtp_config.resend_api_key"
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
                      Ihr Resend API-Schlüssel für diese Konfiguration
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="smtp_config.sender_email"
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
                name="smtp_config.sender_name"
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
                name="smtp_config.shop_id"
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
                name="smtp_config.is_active"
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
            </div>

            {/* Domains Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Verknüpfte Domains</h3>
                <Button type="button" variant="outline" size="sm" onClick={addDomain}>
                  <Plus className="h-4 w-4 mr-2" />
                  Domain hinzufügen
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`domains.${index}.domain`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Domain</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="beispiel.de oder localhost:5173" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`domains.${index}.is_primary`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(value) => {
                              field.onChange(value);
                              ensurePrimaryDomain(index, value);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm">
                          Primär
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeDomain(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <FormDescription>
                Domains, von denen aus Bestellungen mit dieser SMTP-Konfiguration versendet werden (ohne http://)
              </FormDescription>
            </div>

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
