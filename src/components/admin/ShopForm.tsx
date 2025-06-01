
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { Shop } from '@/hooks/useShops';

const shopSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich'),
  company_name: z.string().min(1, 'Firmenname ist erforderlich'),
  company_address: z.string().min(1, 'Adresse ist erforderlich'),
  company_postcode: z.string().min(1, 'PLZ ist erforderlich'),
  company_city: z.string().min(1, 'Stadt ist erforderlich'),
  company_phone: z.string().optional(),
  company_email: z.string().email('Ungültige E-Mail-Adresse').optional().or(z.literal('')),
  company_website: z.string().optional(),
  vat_number: z.string().optional(),
  court_register_info: z.string().optional(),
});

type ShopFormData = z.infer<typeof shopSchema>;

interface ShopFormProps {
  shop?: Shop;
  onSubmit: (data: ShopFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ShopForm: React.FC<ShopFormProps> = ({ shop, onSubmit, onCancel, isLoading = false }) => {
  const form = useForm<ShopFormData>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      name: shop?.name || '',
      company_name: shop?.company_name || '',
      company_address: shop?.company_address || '',
      company_postcode: shop?.company_postcode || '',
      company_city: shop?.company_city || '',
      company_phone: shop?.company_phone || '',
      company_email: shop?.company_email || '',
      company_website: shop?.company_website || '',
      vat_number: shop?.vat_number || '',
      court_register_info: shop?.court_register_info || '',
    },
  });

  const handleSubmit = async (data: ShopFormData) => {
    await onSubmit(data);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{shop ? 'Geschäft bearbeiten' : 'Neues Geschäft erstellen'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Grundinformationen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Geschäftsname</FormLabel>
                      <FormControl>
                        <Input placeholder="z.B. Hauptgeschäft" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firmenname</FormLabel>
                      <FormControl>
                        <Input placeholder="z.B. Heizöl Handel GmbH" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Adresse</h3>
              <FormField
                control={form.control}
                name="company_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Straße und Hausnummer</FormLabel>
                    <FormControl>
                      <Input placeholder="z.B. Musterstraße 123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company_postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PLZ</FormLabel>
                      <FormControl>
                        <Input placeholder="z.B. 12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stadt</FormLabel>
                      <FormControl>
                        <Input placeholder="z.B. Berlin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Kontaktinformationen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input placeholder="z.B. +49 30 12345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input placeholder="z.B. info@beispiel.de" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="company_website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="z.B. www.beispiel.de" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Legal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Rechtliche Informationen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vat_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>USt-IdNr.</FormLabel>
                      <FormControl>
                        <Input placeholder="z.B. DE123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="court_register_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amtsgericht & Handelsregisternr</FormLabel>
                      <FormControl>
                        <Input placeholder="z.B. Amtsgericht Berlin, HRB 12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={onCancel}>
                Abbrechen
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Speichert...' : shop ? 'Aktualisieren' : 'Erstellen'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ShopForm;
