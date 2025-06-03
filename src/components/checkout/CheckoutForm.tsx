
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MapPin, CreditCard, Calendar, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useOrderCreation } from '@/hooks/useOrderCreation';
import { useToast } from '@/hooks/use-toast';

interface PriceCalculatorData {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
  amount: number;
  postcode: string;
  basePrice: number;
  deliveryFee: number;
  totalPrice: number;
  savings: number;
}

interface CheckoutFormProps {
  orderData: PriceCalculatorData;
  onOrderSuccess: (orderNumber: string) => void;
}

const formSchema = z.object({
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  deliveryFirstName: z.string().min(2, 'Vorname muss mindestens 2 Zeichen haben'),
  deliveryLastName: z.string().min(2, 'Nachname muss mindestens 2 Zeichen haben'),
  deliveryStreet: z.string().min(5, 'Straße und Hausnummer sind erforderlich'),
  deliveryPostcode: z.string().min(5, 'Postleitzahl muss mindestens 5 Zeichen haben'),
  deliveryCity: z.string().min(2, 'Stadt ist erforderlich'),
  deliveryPhone: z.string().min(10, 'Telefonnummer ist erforderlich'),
  useSameAddress: z.boolean(),
  billingFirstName: z.string().optional(),
  billingLastName: z.string().optional(),
  billingStreet: z.string().optional(),
  billingPostcode: z.string().optional(),
  billingCity: z.string().optional(),
  paymentMethod: z.string(),
  deliveryDate: z.string(),
  agbAccepted: z.boolean().refine(val => val === true, {
    message: 'Sie müssen die AGB akzeptieren'
  }),
  datenschutzAccepted: z.boolean().refine(val => val === true, {
    message: 'Sie müssen die Datenschutzerklärung akzeptieren'
  })
});

type FormData = z.infer<typeof formSchema>;

const CheckoutForm = ({ orderData, onOrderSuccess }: CheckoutFormProps) => {
  const { createOrderWithEmail, isCreating } = useOrderCreation();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      deliveryFirstName: '',
      deliveryLastName: '',
      deliveryStreet: '',
      deliveryPostcode: orderData.postcode,
      deliveryCity: '',
      deliveryPhone: '',
      useSameAddress: true,
      billingFirstName: '',
      billingLastName: '',
      billingStreet: '',
      billingPostcode: '',
      billingCity: '',
      paymentMethod: 'vorkasse',
      deliveryDate: '4-7 Werktage',
      agbAccepted: false,
      datenschutzAccepted: false
    }
  });

  const watchUseSameAddress = form.watch('useSameAddress');

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Form submission started with data:', data);

      const orderInsertData = {
        customer_email: data.email,
        customer_name: `${data.deliveryFirstName} ${data.deliveryLastName}`,
        customer_phone: data.deliveryPhone,
        customer_address: `${data.deliveryStreet}, ${data.deliveryPostcode} ${data.deliveryCity}`,
        
        // Delivery address
        delivery_first_name: data.deliveryFirstName,
        delivery_last_name: data.deliveryLastName,
        delivery_street: data.deliveryStreet,
        delivery_postcode: data.deliveryPostcode,
        delivery_city: data.deliveryCity,
        delivery_phone: data.deliveryPhone,

        // Billing address
        use_same_address: data.useSameAddress,
        billing_first_name: data.useSameAddress ? data.deliveryFirstName : data.billingFirstName,
        billing_last_name: data.useSameAddress ? data.deliveryLastName : data.billingLastName,
        billing_street: data.useSameAddress ? data.deliveryStreet : data.billingStreet,
        billing_postcode: data.useSameAddress ? data.deliveryPostcode : data.billingPostcode,
        billing_city: data.useSameAddress ? data.deliveryCity : data.billingCity,

        // Payment and order details
        payment_method: data.paymentMethod,
        product: orderData.product.name,
        liters: orderData.amount,
        price_per_liter: orderData.product.price,
        base_price: orderData.basePrice,
        delivery_fee: orderData.deliveryFee,
        discount: 0,
        total_amount: orderData.totalPrice,
        delivery_date_display: data.deliveryDate,
        status: 'pending',
        origin_domain: window.location.host
      };

      console.log('Creating order with data:', orderInsertData);

      const createdOrder = await createOrderWithEmail(orderInsertData);
      
      if (createdOrder) {
        console.log('Order created successfully:', createdOrder);
        onOrderSuccess(createdOrder.order_number);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: 'Fehler',
        description: 'Bei der Bestellung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              Kontaktinformationen
            </CardTitle>
            <CardDescription>
              Ihre E-Mail-Adresse für die Bestellbestätigung
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail-Adresse *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="ihre@email.de" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Lieferadresse
            </CardTitle>
            <CardDescription>
              Wohin soll Ihr Heizöl geliefert werden?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="deliveryFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vorname *</FormLabel>
                    <FormControl>
                      <Input placeholder="Max" {...field} />
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
                      <Input placeholder="Mustermann" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="deliveryStreet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Straße und Hausnummer *</FormLabel>
                  <FormControl>
                    <Input placeholder="Musterstraße 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="deliveryPostcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postleitzahl *</FormLabel>
                    <FormControl>
                      <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="deliveryCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stadt *</FormLabel>
                      <FormControl>
                        <Input placeholder="Musterstadt" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="deliveryPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefonnummer *</FormLabel>
                  <FormControl>
                    <Input placeholder="+49 123 456 7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Billing Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              Rechnungsadresse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="useSameAddress"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="billingFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vorname *</FormLabel>
                        <FormControl>
                          <Input placeholder="Max" {...field} />
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
                          <Input placeholder="Mustermann" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="billingStreet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Straße und Hausnummer *</FormLabel>
                      <FormControl>
                        <Input placeholder="Musterstraße 123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="billingPostcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postleitzahl *</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="billingCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stadt *</FormLabel>
                          <FormControl>
                            <Input placeholder="Musterstadt" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-red-600" />
              Zahlungsart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vorkasse" id="vorkasse" />
                        <Label htmlFor="vorkasse">Vorkasse (Überweisung)</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-gray-600 mt-2">
              Sie erhalten eine Rechnung per E-Mail. Die Lieferung erfolgt nach Zahlungseingang.
            </p>
          </CardContent>
        </Card>

        {/* Delivery Date */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              Liefertermin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gewünschter Liefertermin</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Liefertermin wählen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="4-7 Werktage">4-7 Werktage (Standard)</SelectItem>
                      <SelectItem value="2-3 Werktage">2-3 Werktage (Express)</SelectItem>
                      <SelectItem value="Nächste Woche">Nächste Woche</SelectItem>
                      <SelectItem value="Übernächste Woche">Übernächste Woche</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Legal Agreements */}
        <Card>
          <CardHeader>
            <CardTitle>Rechtliche Hinweise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="agbAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm">
                      Ich habe die <a href="/agb" className="text-blue-600 hover:underline" target="_blank">Allgemeinen Geschäftsbedingungen</a> gelesen und akzeptiere sie. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="datenschutzAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm">
                      Ich habe die <a href="/datenschutz" className="text-blue-600 hover:underline" target="_blank">Datenschutzerklärung</a> gelesen und akzeptiere sie. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            type="submit"
            disabled={isCreating}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold"
          >
            {isCreating ? 'Bestellung wird verarbeitet...' : 'Kostenpflichtig bestellen'}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};

export default CheckoutForm;
