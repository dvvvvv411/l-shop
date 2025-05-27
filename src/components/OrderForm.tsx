import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { CreditCard, Truck, Clock, Shield } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useOrder } from '@/contexts/OrderContext';
import { useOrders } from '@/hooks/useOrders';
import OrderSummary from '@/components/OrderSummary';
import { useToast } from '@/hooks/use-toast';

const orderSchema = z.object({
  // Delivery Address
  deliveryFirstName: z.string().min(2, 'Vorname ist erforderlich'),
  deliveryLastName: z.string().min(2, 'Nachname ist erforderlich'),
  deliveryStreet: z.string().min(5, 'Straße ist erforderlich'),
  deliveryPostcode: z.string().regex(/^\d{5}$/, 'PLZ muss 5-stellig sein'),
  deliveryCity: z.string().min(2, 'Stadt ist erforderlich'),
  deliveryPhone: z.string().min(10, 'Telefonnummer ist erforderlich'),

  // Billing Address
  useSameAddress: z.boolean(),
  billingFirstName: z.string().optional(),
  billingLastName: z.string().optional(),
  billingStreet: z.string().optional(),
  billingPostcode: z.string().optional(),
  billingCity: z.string().optional(),

  // Payment
  paymentMethod: z.literal('vorkasse'),
  
  // Terms
  acceptTerms: z.boolean().refine(val => val === true, 'AGB müssen akzeptiert werden'),
});

type OrderFormData = z.infer<typeof orderSchema>;

const OrderForm = () => {
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setOrderData } = useOrder();
  const { createOrder } = useOrders();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      useSameAddress: true,
      paymentMethod: 'vorkasse',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: OrderFormData) => {
    console.log('Order form submitted:', data);
    setIsSubmitting(true);
    
    try {
      // Create order data for database - order_number and request_id will be auto-generated
      const orderData = {
        customer_name: `${data.deliveryFirstName} ${data.deliveryLastName}`,
        customer_email: 'kunde@email.de', // Would come from user session in real app
        customer_phone: data.deliveryPhone,
        customer_address: `${data.deliveryStreet}, ${data.deliveryPostcode} ${data.deliveryCity}`,
        
        delivery_first_name: data.deliveryFirstName,
        delivery_last_name: data.deliveryLastName,
        delivery_street: data.deliveryStreet,
        delivery_postcode: data.deliveryPostcode,
        delivery_city: data.deliveryCity,
        delivery_phone: data.deliveryPhone,
        
        use_same_address: data.useSameAddress,
        billing_first_name: data.useSameAddress ? data.deliveryFirstName : data.billingFirstName,
        billing_last_name: data.useSameAddress ? data.deliveryLastName : data.billingLastName,
        billing_street: data.useSameAddress ? data.deliveryStreet : data.billingStreet,
        billing_postcode: data.useSameAddress ? data.deliveryPostcode : data.billingPostcode,
        billing_city: data.useSameAddress ? data.deliveryCity : data.billingCity,
        
        payment_method: data.paymentMethod,
        product: 'Standard Heizöl',
        amount: 3000,
        liters: 3000,
        price_per_liter: 0.70,
        base_price: 2100.00,
        delivery_fee: 0,
        discount: 0,
        total_amount: 2100.00,
        delivery_date_display: '28.05.2025',
        status: 'pending',
      };

      console.log('Sending order data to database:', orderData);

      // Create order in database
      const createdOrder = await createOrder(orderData);
      
      // Handle case where order was already processed (duplicate request)
      if (!createdOrder) {
        console.log('Order was already processed, redirecting to home');
        navigate('/');
        return;
      }
      
      console.log('Order created with order number:', createdOrder.order_number);
      
      // Set order data for context (for summary page)
      const contextOrderData = {
        deliveryFirstName: data.deliveryFirstName,
        deliveryLastName: data.deliveryLastName,
        deliveryStreet: data.deliveryStreet,
        deliveryPostcode: data.deliveryPostcode,
        deliveryCity: data.deliveryCity,
        deliveryPhone: data.deliveryPhone,
        useSameAddress: data.useSameAddress,
        billingFirstName: data.billingFirstName,
        billingLastName: data.billingLastName,
        billingStreet: data.billingStreet,
        billingPostcode: data.billingPostcode,
        billingCity: data.billingCity,
        paymentMethod: data.paymentMethod,
        product: 'Standard Heizöl',
        amount: 3000,
        pricePerLiter: 0.70,
        basePrice: 2100.00,
        deliveryFee: 0,
        discount: 0,
        total: 2100.00,
        deliveryDate: '28.05.2025',
        orderNumber: createdOrder.order_number,
      };
      
      setOrderData(contextOrderData);
      navigate('/summary');
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Truck className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Lieferadresse</h3>
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

                <FormField
                  control={form.control}
                  name="deliveryStreet"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Straße und Hausnummer *</FormLabel>
                      <FormControl>
                        <Input placeholder="Musterstraße 123" {...field} />
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
                        <Input placeholder="12345" {...field} />
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
                      <FormLabel>Stadt *</FormLabel>
                      <FormControl>
                        <Input placeholder="Musterstadt" {...field} />
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
                        <Input placeholder="+49 123 456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>

            {/* Billing Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <CreditCard className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Rechnungsadresse</h3>
                  <p className="text-gray-600">Wohin soll die Rechnung gesendet werden?</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useSameAddress}
                    onChange={(e) => {
                      setUseSameAddress(e.target.checked);
                      form.setValue('useSameAddress', e.target.checked);
                    }}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-gray-700 font-medium">
                    Rechnungsadresse ist identisch mit Lieferadresse
                  </span>
                </label>
              </div>

              {!useSameAddress && (
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

                  <FormField
                    control={form.control}
                    name="billingStreet"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Straße und Hausnummer *</FormLabel>
                        <FormControl>
                          <Input placeholder="Musterstraße 123" {...field} />
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
                          <Input placeholder="12345" {...field} />
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
                        <FormLabel>Stadt *</FormLabel>
                        <FormControl>
                          <Input placeholder="Musterstadt" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Shield className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Zahlungsart</h3>
                  <p className="text-gray-600">Sichere und bequeme Zahlung</p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="vorkasse" id="vorkasse" />
                            <Label htmlFor="vorkasse" className="flex-1 cursor-pointer">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-semibold text-gray-900">Vorkasse</div>
                                  <div className="text-sm text-gray-600">
                                    Überweisung vor Lieferung • 3% Skonto möglich
                                  </div>
                                </div>
                                <div className="text-sm text-green-600 font-semibold">
                                  Empfohlen
                                </div>
                              </div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Zahlungsdetails</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sie erhalten nach der Bestellung unsere Bankverbindung</li>
                  <li>• Lieferung erfolgt nach Zahlungseingang</li>
                  <li>• Bei Zahlung innerhalb von 14 Tagen: 3% Skonto</li>
                </ul>
              </div>
            </motion.div>

            {/* Terms & Submit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <div className="flex items-start space-x-3">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-1"
                        />
                      </FormControl>
                      <div className="text-sm">
                        <label className="text-gray-700 cursor-pointer">
                          Ich akzeptiere die{' '}
                          <a href="#" className="text-red-600 hover:underline">
                            Allgemeinen Geschäftsbedingungen
                          </a>{' '}
                          und die{' '}
                          <a href="#" className="text-red-600 hover:underline">
                            Datenschutzerklärung
                          </a>
                          . *
                        </label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold rounded-lg disabled:bg-gray-400"
              >
                {isSubmitting ? 'Bestellung wird erstellt...' : 'Weiter zur Zusammenfassung'}
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  );
};

export default OrderForm;
