
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, CreditCard } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const orderDetailsSchema = z.object({
  deliveryFirstName: z.string().min(1, 'Vorname ist erforderlich'),
  deliveryLastName: z.string().min(1, 'Nachname ist erforderlich'),
  deliveryStreet: z.string().min(1, 'Straße ist erforderlich'),
  deliveryPostcode: z.string().min(1, 'PLZ ist erforderlich'),
  deliveryCity: z.string().min(1, 'Ort ist erforderlich'),
  deliveryPhone: z.string().min(1, 'Telefon ist erforderlich'),
  useSameAddress: z.boolean(),
  billingFirstName: z.string().optional(),
  billingLastName: z.string().optional(),
  billingStreet: z.string().optional(),
  billingPostcode: z.string().optional(),
  billingCity: z.string().optional(),
  paymentMethod: z.string(),
}).refine((data) => {
  if (!data.useSameAddress) {
    return data.billingFirstName && data.billingLastName && data.billingStreet && 
           data.billingPostcode && data.billingCity;
  }
  return true;
}, {
  message: 'Alle Rechnungsadress-Felder sind erforderlich',
  path: ['billingFirstName'],
});

interface OrderDetailsStepProps {
  orderData: any;
  setOrderData: (data: any) => void;
  onPostcodeChange: (postcode: string) => void;
}

const OrderDetailsStep: React.FC<OrderDetailsStepProps> = ({ 
  orderData, 
  setOrderData, 
  onPostcodeChange 
}) => {
  const form = useForm({
    resolver: zodResolver(orderDetailsSchema),
    defaultValues: {
      deliveryFirstName: orderData?.deliveryFirstName || '',
      deliveryLastName: orderData?.deliveryLastName || '',
      deliveryStreet: orderData?.deliveryStreet || '',
      deliveryPostcode: orderData?.deliveryPostcode || '',
      deliveryCity: orderData?.deliveryCity || '',
      deliveryPhone: orderData?.deliveryPhone || '',
      useSameAddress: orderData?.useSameAddress !== false,
      billingFirstName: orderData?.billingFirstName || '',
      billingLastName: orderData?.billingLastName || '',
      billingStreet: orderData?.billingStreet || '',
      billingPostcode: orderData?.billingPostcode || '',
      billingCity: orderData?.billingCity || '',
      paymentMethod: orderData?.paymentMethod || 'vorkasse',
    },
  });

  const watchUseSameAddress = form.watch('useSameAddress');
  const watchPostcode = form.watch('deliveryPostcode');

  useEffect(() => {
    if (watchPostcode && watchPostcode.length === 5) {
      onPostcodeChange(watchPostcode);
    }
  }, [watchPostcode, onPostcodeChange]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      setOrderData({
        ...orderData,
        ...value,
      });
    });
    return () => subscription.unsubscribe();
  }, [form, orderData, setOrderData]);

  return (
    <Form {...form}>
      <div className="space-y-8">
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-red-100 p-3 rounded-full">
              <MapPin className="text-red-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Lieferadresse</h2>
              <p className="text-gray-600">Wohin soll das Heizöl geliefert werden?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="deliveryFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vorname *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryLastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nachname *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryStreet"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Straße und Hausnummer *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryPostcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postleitzahl *</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ort *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryPhone"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Telefonnummer *</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Rechnungsadresse</h2>
              <p className="text-gray-600">Wohin soll die Rechnung geschickt werden?</p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="useSameAddress"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Rechnungsadresse ist identisch mit Lieferadresse
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {!watchUseSameAddress && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <FormField
                control={form.control}
                name="billingFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vorname *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nachname *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingStreet"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Straße und Hausnummer *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingPostcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postleitzahl *</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ort *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
        </div>

        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <CreditCard className="text-green-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Zahlungsart</h2>
              <p className="text-gray-600">Wie möchten Sie bezahlen?</p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg">
                      <RadioGroupItem value="vorkasse" id="vorkasse" />
                      <Label htmlFor="vorkasse" className="flex-1 cursor-pointer">
                        <div className="font-medium">Vorkasse</div>
                        <div className="text-sm text-gray-600">
                          Überweisung vor Lieferung - Sie erhalten unsere Bankverbindung per E-Mail
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  );
};

export default OrderDetailsStep;
