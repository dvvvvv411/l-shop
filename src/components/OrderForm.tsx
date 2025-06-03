import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { CreditCard, Truck, Clock, Shield, TestTube, FileText } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useOrder } from '@/contexts/OrderContext';
import { useOrders } from '@/hooks/useOrders';
import OrderSummary from '@/components/OrderSummary';
import { useToast } from '@/hooks/use-toast';

// Test data arrays for random generation
const testData = {
  firstNames: ['Max', 'Anna', 'Michael', 'Sarah', 'Thomas', 'Julia', 'Andreas', 'Lisa', 'Markus', 'Elena'],
  lastNames: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'],
  streets: ['Hauptstraße', 'Kirchgasse', 'Bahnhofstraße', 'Gartenweg', 'Am Markt', 'Lindenstraße', 'Rosenweg', 'Feldstraße'],
  cities: ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
  postcodes: ['10115', '20095', '80331', '50667', '60311', '70173', '40213', '44135', '45127', '04109']
};
const generateRandomTestData = () => {
  const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)];
  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  return {
    deliveryFirstName: getRandomItem(testData.firstNames),
    deliveryLastName: getRandomItem(testData.lastNames),
    deliveryStreet: `${getRandomItem(testData.streets)} ${getRandomNumber(1, 999)}`,
    deliveryPostcode: getRandomItem(testData.postcodes),
    deliveryCity: getRandomItem(testData.cities),
    deliveryPhone: `+49 ${getRandomNumber(100, 999)} ${getRandomNumber(1000000, 9999999)}`,
    useSameAddress: Math.random() > 0.3,
    // 70% chance for same address
    billingFirstName: getRandomItem(testData.firstNames),
    billingLastName: getRandomItem(testData.lastNames),
    billingStreet: `${getRandomItem(testData.streets)} ${getRandomNumber(1, 999)}`,
    billingPostcode: getRandomItem(testData.postcodes),
    billingCity: getRandomItem(testData.cities),
    paymentMethod: 'vorkasse' as const
  };
};
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
  postcode: string;
  basePrice: number;
  deliveryFee: number;
  totalPrice: number;
  savings: number;
}
const OrderForm = () => {
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderData, setOrderData] = useState<PriceCalculatorData | null>(null);
  const {
    setOrderData: setContextOrderData
  } = useOrder();
  const {
    createOrder
  } = useOrders();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();

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
    const testData = generateRandomTestData();

    // Set form values
    form.setValue('deliveryFirstName', testData.deliveryFirstName);
    form.setValue('deliveryLastName', testData.deliveryLastName);
    form.setValue('deliveryStreet', testData.deliveryStreet);
    form.setValue('deliveryPostcode', testData.deliveryPostcode);
    form.setValue('deliveryCity', testData.deliveryCity);
    form.setValue('deliveryPhone', testData.deliveryPhone);
    form.setValue('useSameAddress', testData.useSameAddress);
    form.setValue('paymentMethod', testData.paymentMethod);

    // Update local state
    setUseSameAddress(testData.useSameAddress);

    // Set billing address if different
    if (!testData.useSameAddress) {
      form.setValue('billingFirstName', testData.billingFirstName);
      form.setValue('billingLastName', testData.billingLastName);
      form.setValue('billingStreet', testData.billingStreet);
      form.setValue('billingPostcode', testData.billingPostcode);
      form.setValue('billingCity', testData.billingCity);
    }
    toast({
      title: 'Testdaten generiert',
      description: 'Das Formular wurde mit zufälligen Testdaten ausgefüllt.'
    });
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
    setIsSubmitting(true);
    try {
      // Calculate final price
      const finalPrice = orderData.totalPrice;

      // Capture the origin domain
      const originDomain = window.location.hostname;

      // Create order data for database using the calculator data
      const dbOrderData = {
        customer_name: `${data.deliveryFirstName} ${data.deliveryLastName}`,
        customer_email: 'kunde@email.de',
        // Would come from user session in real app
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

      // Create order in database
      const createdOrder = await createOrder(dbOrderData);

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
    return <div className="flex justify-center items-center min-h-96">
        <div className="text-lg text-gray-600">Bestelldaten werden geladen...</div>
      </div>;
  }
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2">
        {/* Test Data Generator Button */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
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
            <Button type="button" onClick={handleGenerateTestData} variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
              Testdaten generieren
            </Button>
          </div>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Delivery Address */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="bg-white rounded-xl p-6 shadow-lg">
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
                        <Input placeholder="12345" {...field} defaultValue={orderData.postcode || ''} />
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
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="bg-white rounded-xl p-6 shadow-lg">
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
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }} className="bg-white rounded-xl p-6 shadow-lg">
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
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Zahlungsdetails</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sie werden nach Bestellung telefonisch von unserem Kundesn</li>
                  <li>• Lieferung erfolgt nach Zahlungseingang</li>
                  <li>• Sichere und schnelle Abwicklung</li>
                </ul>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }} className="bg-white rounded-xl p-6 shadow-lg">
              <Button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold rounded-lg disabled:bg-gray-400">
                {isSubmitting ? 'Bestellung wird erstellt...' : 'Weiter zur Zusammenfassung'}
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <OrderSummary orderData={orderData} />
      </div>
    </div>;
};
export default OrderForm;
