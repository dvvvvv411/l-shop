import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { CreditCard, Truck, Clock, Shield, TestTube, FileText, Mail } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useOrder } from '@/contexts/OrderContext';
import { useOrders } from '@/hooks/useOrders';
import { useItalianOrders } from '@/hooks/useItalianOrders';
import OrderSummary from '@/components/OrderSummary';
import ItalianOrderSummary from '@/components/italian/ItalianOrderSummary';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useDomainShop } from '@/hooks/useDomainShop';

// Test data arrays for random generation
const testData = {
  firstNames: ['Max', 'Anna', 'Michael', 'Sarah', 'Thomas', 'Julia', 'Andreas', 'Lisa', 'Markus', 'Elena'],
  lastNames: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'],
  streets: ['Hauptstraße', 'Kirchgasse', 'Bahnhofstraße', 'Gartenweg', 'Am Markt', 'Lindenstraße', 'Rosenweg', 'Feldstraße'],
  cities: ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
  postcodes: ['10115', '20095', '80331', '50667', '60311', '70173', '40213', '44135', '45127', '04109'],
  emails: ['max.mustermann@gmail.com', 'anna.meyer@yahoo.de', 'michael.schmidt@web.de', 'sarah.wagner@gmx.de', 'thomas.fischer@t-online.de']
};

const generateRandomTestData = () => {
  const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)];
  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  return {
    customerEmail: getRandomItem(testData.emails),
    deliveryFirstName: getRandomItem(testData.firstNames),
    deliveryLastName: getRandomItem(testData.lastNames),
    deliveryStreet: `${getRandomItem(testData.streets)} ${getRandomNumber(1, 999)}`,
    deliveryPostcode: getRandomItem(testData.postcodes),
    deliveryCity: getRandomItem(testData.cities),
    deliveryPhone: `+49 ${getRandomNumber(100, 999)} ${getRandomNumber(1000000, 9999999)}`,
    useSameAddress: Math.random() > 0.3,
    billingFirstName: getRandomItem(testData.firstNames),
    billingLastName: getRandomItem(testData.lastNames),
    billingStreet: `${getRandomItem(testData.streets)} ${getRandomNumber(1, 999)}`,
    billingPostcode: getRandomItem(testData.postcodes),
    billingCity: getRandomItem(testData.cities),
    paymentMethod: 'vorkasse' as const
  };
};

const orderSchema = z.object({
  // Customer Email
  customerEmail: z.string().email('Gültige E-Mail-Adresse erforderlich'),
  // Delivery Address
  deliveryFirstName: z.string().min(2, 'Vorname ist erforderlich'),
  deliveryLastName: z.string().min(2, 'Nachname ist erforderlich'),
  deliveryStreet: z.string().min(5, 'Straße ist erforderlich'),
  deliveryPostcode: z.string().min(1, 'PLZ ist erforderlich'),
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
  paymentMethod: z.enum(['vorkasse', 'rechnung'])
});

type OrderFormData = z.infer<typeof orderSchema>;

interface PriceCalculatorData {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
  amount: number;
  basePrice: number;
  deliveryFee: number;
  totalPrice: number;
  savings: number;
  postcode: string;
}

const OrderForm = () => {
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderData, setOrderData] = useState<PriceCalculatorData | null>(null);
  const { setOrderData: setContextOrderData } = useOrder();
  const { createOrder } = useOrders();
  const { createOrder: createItalianOrder } = useItalianOrders(); // Italian order hook
  const { toast } = useToast();
  const navigate = useNavigate();
  const shopConfig = useDomainShop();

  // Load order data from localStorage on component mount
  useEffect(() => {
    const storedOrderData = localStorage.getItem('orderData');
    console.log('Stored order data:', storedOrderData);
    if (!storedOrderData) {
      console.log('No order data found in localStorage, redirecting to calculator');
      toast({
        title: 'Keine Bestelldaten gefunden',
        description: 'Bitte führen Sie zuerst eine Preisberechnung durch.',
        variant: 'destructive'
      });
      navigate('/');
      return;
    }
    try {
      const parsedData = JSON.parse(storedOrderData) as PriceCalculatorData;
      console.log('Parsed order data:', parsedData);

      // Validate that required fields exist
      if (!parsedData.product || !parsedData.amount || !parsedData.basePrice) {
        console.log('Invalid order data structure, redirecting to calculator');
        toast({
          title: 'Ungültige Bestelldaten',
          description: 'Bitte führen Sie eine neue Preisberechnung durch.',
          variant: 'destructive'
        });
        navigate('/');
        return;
      }
      setOrderData(parsedData);
    } catch (error) {
      console.error('Error parsing order data:', error);
      toast({
        title: 'Fehler beim Laden der Bestelldaten',
        description: 'Bitte führen Sie eine neue Preisberechnung durch.',
        variant: 'destructive'
      });
      navigate('/');
    }
  }, [navigate, toast]);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      useSameAddress: true,
      paymentMethod: 'vorkasse'
    }
  });

  const handleGenerateTestData = () => {
    const testDataValues = generateRandomTestData();

    // Set form values
    form.setValue('customerEmail', testDataValues.customerEmail);
    form.setValue('deliveryFirstName', testDataValues.deliveryFirstName);
    form.setValue('deliveryLastName', testDataValues.deliveryLastName);
    form.setValue('deliveryStreet', testDataValues.deliveryStreet);
    form.setValue('deliveryPostcode', testDataValues.deliveryPostcode);
    form.setValue('deliveryCity', testDataValues.deliveryCity);
    form.setValue('deliveryPhone', testDataValues.deliveryPhone);
    form.setValue('useSameAddress', testDataValues.useSameAddress);
    form.setValue('paymentMethod', testDataValues.paymentMethod);

    // Update local state
    setUseSameAddress(testDataValues.useSameAddress);

    // Set billing address if different
    if (!testDataValues.useSameAddress) {
      form.setValue('billingFirstName', testDataValues.billingFirstName);
      form.setValue('billingLastName', testDataValues.billingLastName);
      form.setValue('billingStreet', testDataValues.billingStreet);
      form.setValue('billingPostcode', testDataValues.billingPostcode);
      form.setValue('billingCity', testDataValues.billingCity);
    }
    
    toast({
      title: 'Testdaten generiert',
      description: 'Das Formular wurde mit zufälligen Testdaten ausgefüllt.'
    });
  };

  const sendOrderConfirmationEmail = async (orderId: string, customerEmail: string) => {
    try {
      console.log('Sending order confirmation email...', { orderId, customerEmail });
      
      const originDomain = window.location.hostname;
      
      const { data, error } = await supabase.functions.invoke('send-order-confirmation', {
        body: {
          orderId,
          customerEmail,
          originDomain
        }
      });

      if (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
      }

      console.log('Order confirmation email sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Failed to send order confirmation email:', error);
      // Don't throw the error - we don't want to fail the order process because of email issues
      toast({
        title: 'E-Mail-Versand',
        description: 'Die Bestellbestätigung konnte nicht versendet werden. Sie erhalten diese in Kürze.',
        variant: 'destructive'
      });
    }
  };

  const onSubmit = async (data: OrderFormData) => {
    if (!orderData) {
      toast({
        title: 'Fehler',
        description: 'Keine Bestelldaten verfügbar. Bitte starten Sie eine neue Bestellung.',
        variant: 'destructive'
      });
      navigate('/');
      return;
    }
    console.log('Order form submitted:', data);
    console.log('Using order data:', orderData);
    console.log('Shop config:', shopConfig);
    setIsSubmitting(true);
    try {
      // Calculate final price
      const finalPrice = orderData.totalPrice;
      const originDomain = window.location.hostname;

      // Create order data for database using the calculator data
      const dbOrderData = {
        customer_name: `${data.deliveryFirstName} ${data.deliveryLastName}`,
        customer_email: 'kunde@email.de', // Keep legacy field for compatibility
        customer_email_actual: data.customerEmail, // New actual email field
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
        product: orderData.product.name,
        amount: orderData.amount,
        liters: orderData.amount,
        price_per_liter: orderData.product.price,
        base_price: orderData.basePrice,
        delivery_fee: orderData.deliveryFee,
        discount: 0,
        total_amount: finalPrice,
        delivery_date_display: '4-7 Werktage',
        status: 'pending',
        origin_domain: originDomain
      };
      console.log('Sending order data to database:', dbOrderData);

      // Use Italian order creation for Italian shops, regular for others
      let createdOrder;
      if (shopConfig.shopType === 'italy') {
        console.log('Using Italian order creation flow for Italian shop');
        createdOrder = await createItalianOrder(dbOrderData);
      } else {
        console.log('Using regular order creation flow for non-Italian shop');
        createdOrder = await createOrder(dbOrderData);
      }

      // Handle case where order was already processed (duplicate request)
      if (!createdOrder) {
        console.log('Order was already processed, redirecting to home');
        navigate('/');
        return;
      }
      console.log('Order created with order number:', createdOrder.order_number);
      console.log('Order created with customer language:', createdOrder.customer_language);

      // Send order confirmation email only for non-Italian shops
      if (shopConfig.shopType !== 'italy') {
        console.log('Sending order confirmation email for non-Italian shop');
        await sendOrderConfirmationEmail(createdOrder.id, data.customerEmail);
      } else {
        console.log('Skipping order confirmation email for Italian shop - invoice will be sent instead');
      }

      // Set order data for context (for summary page) - now includes customerEmail
      const contextOrderData = {
        deliveryFirstName: data.deliveryFirstName,
        deliveryLastName: data.deliveryLastName,
        deliveryStreet: data.deliveryStreet,
        deliveryPostcode: data.deliveryPostcode,
        deliveryCity: data.deliveryCity,
        deliveryPhone: data.deliveryPhone,
        customerEmail: data.customerEmail,
        useSameAddress: data.useSameAddress,
        billingFirstName: data.billingFirstName,
        billingLastName: data.billingLastName,
        billingStreet: data.billingStreet,
        billingPostcode: data.billingPostcode,
        billingCity: data.billingCity,
        paymentMethod: data.paymentMethod,
        product: orderData.product.name,
        amount: orderData.amount,
        pricePerLiter: orderData.product.price,
        basePrice: orderData.basePrice,
        deliveryFee: orderData.deliveryFee,
        discount: 0,
        total: finalPrice,
        deliveryDate: '4-7 Werktage',
        orderNumber: createdOrder.order_number
      };
      setContextOrderData(contextOrderData);
      navigate('/summary');
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while order data is being loaded
  if (!orderData) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-lg text-gray-600">Bestelldaten werden geladen...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2">
        {/* Test Data Generator Button - Hidden for Italian shops */}
        {shopConfig.shopType !== 'italy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <TestTube className="text-amber-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900">Entwicklungsmodus</h4>
                  <p className="text-sm text-amber-700">Automatisch Testdaten generieren</p>
                </div>
              </div>
              <Button
                type="button"
                onClick={handleGenerateTestData}
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                Testdaten generieren
              </Button>
            </div>
          </motion.div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Customer Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Mail className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">E-Mail-Adresse</h3>
                  <p className="text-gray-600">Für Bestellbestätigung und Kommunikation</p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail-Adresse *</FormLabel>
                    <FormControl>
                      <Input placeholder="max.mustermann@email.de" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

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
                <FormField control={form.control} name="deliveryFirstName" render={({
                field
              }) => <FormItem>
                      <FormLabel>Vorname *</FormLabel>
                      <FormControl>
                        <Input placeholder="Max" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="deliveryLastName" render={({
                field
              }) => <FormItem>
                      <FormLabel>Nachname *</FormLabel>
                      <FormControl>
                        <Input placeholder="Mustermann" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="deliveryStreet" render={({
                field
              }) => <FormItem className="md:col-span-2">
                      <FormLabel>Straße und Hausnummer *</FormLabel>
                      <FormControl>
                        <Input placeholder="Musterstraße 123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="deliveryPostcode" render={({
                field
              }) => <FormItem>
                      <FormLabel>Postleitzahl *</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="deliveryCity" render={({
                field
              }) => <FormItem>
                      <FormLabel>Stadt *</FormLabel>
                      <FormControl>
                        <Input placeholder="Musterstadt" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="deliveryPhone" render={({
                field
              }) => <FormItem className="md:col-span-2">
                      <FormLabel>Telefonnummer *</FormLabel>
                      <FormControl>
                        <Input placeholder="+49 123 456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
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
                  <input type="checkbox" checked={useSameAddress} onChange={e => {
                  setUseSameAddress(e.target.checked);
                  form.setValue('useSameAddress', e.target.checked);
                }} className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                  <span className="text-gray-700 font-medium">
                    Rechnungsadresse ist identisch mit Lieferadresse
                  </span>
                </label>
              </div>

              {!useSameAddress && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="billingFirstName" render={({
                field
              }) => <FormItem>
                        <FormLabel>Vorname *</FormLabel>
                        <FormControl>
                          <Input placeholder="Max" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="billingLastName" render={({
                field
              }) => <FormItem>
                        <FormLabel>Nachname *</FormLabel>
                        <FormControl>
                          <Input placeholder="Mustermann" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="billingStreet" render={({
                field
              }) => <FormItem className="md:col-span-2">
                        <FormLabel>Straße und Hausnummer *</FormLabel>
                        <FormControl>
                          <Input placeholder="Musterstraße 123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="billingPostcode" render={({
                field
              }) => <FormItem>
                        <FormLabel>Postleitzahl *</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="billingCity" render={({
                field
              }) => <FormItem>
                        <FormLabel>Stadt *</FormLabel>
                        <FormControl>
                          <Input placeholder="Musterstadt" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>}
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

              <FormField control={form.control} name="paymentMethod" render={({
              field
            }) => <FormItem>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="space-y-3">
                          <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="vorkasse" id="vorkasse" />
                              <Label htmlFor="vorkasse" className="flex-1 cursor-pointer">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="font-semibold text-gray-900">Vorkasse</div>
                                    <div className="text-sm text-gray-600">
                                      Überweisung vor Lieferung
                                    </div>
                                  </div>
                                  <div className="text-sm text-green-600 font-semibold">
                                    Empfohlen
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </div>

                          {shopConfig.shopType !== 'italy' && (
                            <div className="border border-gray-200 rounded-lg p-4 bg-gray-100 opacity-50">
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="rechnung" id="rechnung" disabled />
                                <Label htmlFor="rechnung" className="flex-1 cursor-not-allowed">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <div className="font-semibold text-gray-600 flex items-center space-x-2">
                                        <FileText size={16} />
                                        <span>Rechnung</span>
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        Zahlung nach Lieferung (derzeit nicht verfügbar)
                                      </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      Nur für Bestandskunden verfügbar
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            </div>
                          )}
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Zahlungsdetails</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sie werden nach Bestellung telefonisch von unserem Kundendienst kontaktiert</li>
                  <li>• Lieferung erfolgt nach Zahlungseingang</li>
                  <li>• Sichere und schnelle Abwicklung</li>
                </ul>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
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
        {shopConfig.shopType === 'italy' ? (
          <ItalianOrderSummary orderData={orderData} />
        ) : (
          <OrderSummary orderData={orderData} />
        )}
      </div>
    </div>
  );
};

export default OrderForm;
