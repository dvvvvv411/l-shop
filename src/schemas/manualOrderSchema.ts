
import { z } from 'zod';

export const manualOrderSchema = z.object({
  // Customer Information
  customer_name: z.string().min(1, 'Name ist erforderlich'),
  customer_email: z.string().email('Gültige E-Mail-Adresse erforderlich'),
  customer_phone: z.string().optional(),
  customer_address: z.string().min(1, 'Adresse ist erforderlich'),

  // Delivery Information
  delivery_first_name: z.string().min(1, 'Vorname ist erforderlich'),
  delivery_last_name: z.string().min(1, 'Nachname ist erforderlich'),
  delivery_street: z.string().min(1, 'Straße ist erforderlich'),
  delivery_postcode: z.string().min(5, 'PLZ muss mindestens 5 Zeichen haben'),
  delivery_city: z.string().min(1, 'Stadt ist erforderlich'),
  delivery_phone: z.string().optional(),

  // Billing Information (optional if same as delivery)
  use_same_address: z.boolean().default(true),
  billing_first_name: z.string().optional(),
  billing_last_name: z.string().optional(),
  billing_street: z.string().optional(),
  billing_postcode: z.string().optional(),
  billing_city: z.string().optional(),

  // Product Information
  product: z.string().min(1, 'Produkt ist erforderlich'),
  liters: z.number().min(100, 'Mindestens 100 Liter erforderlich'),
  price_per_liter: z.number().min(0.01, 'Preis pro Liter ist erforderlich'),
  delivery_fee: z.number().min(0, 'Liefergebühr muss positiv sein').default(0),
  discount: z.number().min(0, 'Rabatt muss positiv sein').default(0),

  // Additional Information
  delivery_date: z.string().optional(),
  payment_method: z.string().default('vorkasse'),
  notes: z.string().optional(),
}).refine((data) => {
  // If billing address is different, all billing fields are required
  if (!data.use_same_address) {
    return data.billing_first_name && data.billing_last_name && 
           data.billing_street && data.billing_postcode && data.billing_city;
  }
  return true;
}, {
  message: 'Alle Rechnungsadressfelder sind erforderlich wenn eine andere Adresse gewählt wird',
  path: ['billing_first_name']
});

export type ManualOrderFormData = z.infer<typeof manualOrderSchema>;
