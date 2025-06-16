
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Truck, CreditCard, Shield, TestTube, FileText, Mail } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useOrder } from '@/contexts/OrderContext';
import { useOrders } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';
import { useCheckoutTranslations } from '@/hooks/useCheckoutTranslations';
import { useItalianCheckoutTranslations } from '@/hooks/useItalianCheckoutTranslations';
import { useBelgianCheckoutTranslations } from '@/hooks/useBelgianCheckoutTranslations';
import { useItalianCheckout } from '@/hooks/useItalianCheckout';
import { useItalianOrderSubmission } from '@/hooks/useItalianOrderSubmission';
import { useBelgianCheckout } from '@/hooks/useBelgianCheckout';
import { useBelgianOrderSubmission } from '@/hooks/useBelgianOrderSubmission';
import { useDomainShop } from '@/hooks/useDomainShop';
import { supabase } from '@/integrations/supabase/client';

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
    deliveryFirstName: getRandomItem(testData.firstNames),
    deliveryLastName: getRandomItem(testData.lastNames),
    deliveryStreet: `${getRandomItem(testData.streets)} ${getRandomNumber(1, 999)}`,
    deliveryPostcode: getRandomItem(testData.postcodes),
    deliveryCity: getRandomItem(testData.cities),
    deliveryPhone: `+49 ${getRandomNumber(100, 999)} ${getRandomNumber(1000000, 9999999)}`,
    customerEmail: getRandomItem(testData.emails),
    useSameAddress: Math.random() > 0.3,
    billingFirstName: getRandomItem(testData.firstNames),
    billingLastName: getRandomItem(testData.lastNames),
    billingStreet: `${getRandomItem(testData.streets)} ${getRandomNumber(1, 999)}`,
    billingPostcode: getRandomItem(testData.postcodes),
    billingCity: getRandomItem(testData.cities),
    paymentMethod: 'vorkasse' as const
  };
};

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
}

interface CheckoutFormProps {
  orderData: PriceCalculatorData;
  onOrderSuccess: (orderNumber: string) => void;
}

const CheckoutForm = ({ orderData, onOrderSuccess }: CheckoutFormProps) => {
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setOrderData: setContextOrderData } = useOrder();
  const { createOrder } = useOrders();
  const { toast } = useToast();
  const shopConfig = useDomainShop();
  const italianCheckout = useItalianCheckout();
  const belgianCheckout = useBelgianCheckout();
  const { submitItalianOrder, isSubmitting: isSubmittingItalian } = useItalianOrderSubmission();
  const { submitBelgianOrder, isSubmitting: isSubmittingBelgian } = useBelgianOrderSubmission();
  
  // Choose the right translations based on shop type
  const germanFrenchTranslations = useCheckoutTranslations();
  const italianTranslations = useItalianCheckoutTranslations();
  const belgianTranslations = useBelgianCheckoutTranslations();
  
  const t = belgianCheckout.isBelgianCheckout 
    ? belgianTranslations 
    : italianCheckout.isItalianCheckout 
    ? italianTranslations 
    : germanFrenchTranslations;

  // Check if current checkout is French
  const isFrenchCheckout = () => {
    const orderReferrer = localStorage.getItem('orderReferrer');
    return orderReferrer === '/4/home' || shopConfig.shopType === 'france';
  };

  // Check if current checkout should disable invoice payment
  const shouldDisableInvoicePayment = () => {
    return isFrenchCheckout() || italianCheckout.isItalianCheckout || belgianCheckout.isBelgianCheckout;
  };

  // Create the schema inside the component where `t` is available
  const orderSchema = z.object({
    customerEmail: z.string().email(t.validation.emailRequired),
    deliveryFirstName: z.string().min(2, t.validation.firstNameRequired),
    deliveryLastName: z.string().min(2, t.validation.lastNameRequired),
    deliveryStreet: z.string().min(5, t.validation.streetRequired),
    deliveryPostcode: z.string().min(1, t.validation.postcodeRequired),
    deliveryCity: z.string().min(2, t.validation.cityRequired),
    deliveryPhone: z.string().min(10, t.validation.phoneRequired),
    useSameAddress: z.boolean(),
    billingFirstName: z.string().optional(),
    billingLastName: z.string().optional(),
    billingStreet: z.string().optional(),
    billingPostcode: z.string().optional(),
    billingCity: z.string().optional(),
    paymentMethod: z.enum(['vorkasse', 'rechnung']),
    acceptTerms: z.boolean().refine(val => val === true, t.validation.termsRequired)
  });

  type OrderFormData = z.infer<typeof orderSchema>;

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      useSameAddress: true,
      paymentMethod: 'vorkasse',
      acceptTerms: false
    }
  });

  const handleGenerateTestData = () => {
    const testDataValues = generateRandomTestData();

    form.setValue('customerEmail', testDataValues.customerEmail);
    form.setValue('deliveryFirstName', testDataValues.deliveryFirstName);
    form.setValue('deliveryLastName', testDataValues.deliveryLastName);
    form.setValue('deliveryStreet', testDataValues.deliveryStreet);
    form.setValue('deliveryPostcode', testDataValues.deliveryPostcode);
    form.setValue('deliveryCity', testDataValues.deliveryCity);
    form.setValue('deliveryPhone', testDataValues.deliveryPhone);
    form.setValue('useSameAddress', testDataValues.useSameAddress);
    form.setValue('paymentMethod', testDataValues.paymentMethod);

    setUseSameAddress(testDataValues.useSameAddress);

    if (!testDataValues.useSameAddress) {
      form.setValue('billingFirstName', testDataValues.billingFirstName);
      form.setValue('billingLastName', testDataValues.billingLastName);
      form.setValue('billingStreet', testDataValues.billingStreet);
      form.setValue('billingPostcode', testDataValues.billingPostcode);
      form.setValue('billingCity', testDataValues.billingCity);
    }

    toast({
      title: t.system.testDataGenerated,
      description: t.system.testDataDescription
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
        title: t.system.emailSendTitle,
        description: t.system.emailSendDescription,
        variant: 'destructive'
      });
    }
  };

  const onSubmit = async (data: OrderFormData) => {
    console.log('Checkout form submitted:', data);
    console.log('Using order data:', orderData);
    console.log('Belgian checkout config:', belgianCheckout);
    console.log('Italian checkout config:', italianCheckout);
    
    // Use Belgian submission flow for Belgian checkout
    if (belgianCheckout.isBelgianCheckout) {
      console.log('Using Belgian order submission flow');
      
      try {
        const belgianOrderData = {
          customerEmail: data.customerEmail,
          deliveryFirstName: data.deliveryFirstName,
          deliveryLastName: data.deliveryLastName,
          deliveryStreet: data.deliveryStreet,
          deliveryPostcode: data.deliveryPostcode,
          deliveryCity: data.deliveryCity,
          deliveryPhone: data.deliveryPhone,
          billingFirstName: data.useSameAddress ? data.deliveryFirstName : data.billingFirstName,
          billingLastName: data.useSameAddress ? data.deliveryLastName : data.billingLastName,
          billingStreet: data.useSameAddress ? data.deliveryStreet : data.billingStreet,
          billingPostcode: data.useSameAddress ? data.deliveryPostcode : data.billingPostcode,
          billingCity: data.useSameAddress ? data.deliveryCity : data.billingCity,
          useSameAddress: data.useSameAddress,
          product: orderData.product.name,
          amount: orderData.amount,
          pricePerLiter: orderData.product.price,
          basePrice: orderData.basePrice,
          deliveryFee: orderData.deliveryFee,
          discount: 0,
          total: orderData.totalPrice,
        };

        const result = await submitBelgianOrder(belgianOrderData, belgianCheckout.bankAccountDetails);
        
        if (result.success) {
          // Set order data for context
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
            total: orderData.totalPrice,
            deliveryDate: '4-7 werkdagen',
            orderNumber: result.orderNumber
          };

          setContextOrderData(contextOrderData);
          onOrderSuccess(result.orderNumber);
          localStorage.removeItem('orderData');
        }
      } catch (error) {
        console.error('Error in Belgian order submission:', error);
        // Error handling is done in the hook
      }
      
      return;
    }
    
    // Use the appropriate submission flow based on shop type for non-Belgian
    if (italianCheckout.isItalianCheckout) {
      console.log('Using Italian order submission flow');
      
      try {
        const italianOrderData = {
          customerEmail: data.customerEmail,
          deliveryFirstName: data.deliveryFirstName,
          deliveryLastName: data.deliveryLastName,
          deliveryStreet: data.deliveryStreet,
          deliveryPostcode: data.deliveryPostcode,
          deliveryCity: data.deliveryCity,
          deliveryPhone: data.deliveryPhone,
          billingFirstName: data.useSameAddress ? data.deliveryFirstName : data.billingFirstName,
          billingLastName: data.useSameAddress ? data.deliveryLastName : data.billingLastName,
          billingStreet: data.useSameAddress ? data.deliveryStreet : data.billingStreet,
          billingPostcode: data.useSameAddress ? data.deliveryPostcode : data.billingPostcode,
          billingCity: data.useSameAddress ? data.deliveryCity : data.billingCity,
          useSameAddress: data.useSameAddress,
          product: orderData.product.name,
          amount: orderData.amount,
          pricePerLiter: orderData.product.price,
          basePrice: orderData.basePrice,
          deliveryFee: orderData.deliveryFee,
          discount: 0,
          total: orderData.totalPrice,
        };

        const result = await submitItalianOrder(italianOrderData, italianCheckout.bankAccountDetails);
        
        if (result.success) {
          // Set order data for context
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
            total: orderData.totalPrice,
            deliveryDate: '3-5 giorni lavorativi',
            orderNumber: result.orderNumber
          };

          setContextOrderData(contextOrderData);
          onOrderSuccess(result.orderNumber);
          localStorage.removeItem('orderData');
        }
      } catch (error) {
        console.error('Error in Italian order submission:', error);
        // Error handling is done in the hook
      }
      
      return;
    }

    // Regular order submission for non-Italian shops
    setIsSubmitting(true);
    
    try {
      const finalPrice = orderData.totalPrice;
      const originDomain = window.location.hostname;

      // Create order data for database with Italian checkout enhancements
      const dbOrderData = {
        customer_name: `${data.deliveryFirstName} ${data.deliveryLastName}`,
        customer_email: data.customerEmail,
        customer_email_actual: data.customerEmail,
        customer_language: italianCheckout.customerLanguage,
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
        origin_domain: originDomain,
        bank_account_id: italianCheckout.bankAccountId
      };

      console.log('Sending order data to database:', dbOrderData);

      // Create order in database
      const createdOrder = await createOrder(dbOrderData);

      if (!createdOrder) {
        console.log('Order was already processed');
        toast({
          title: t.system.orderProcessedTitle,
          description: t.system.orderProcessedDescription,
        });
        return;
      }

      console.log('Order created with order number:', createdOrder.order_number);

      // Handle email sending based on checkout type
      if (italianCheckout.shouldSendOrderConfirmation) {
        await sendOrderConfirmationEmail(createdOrder.id, data.customerEmail);
      } else if (italianCheckout.shouldSendInvoice) {
        console.log('Skipping order confirmation email for Italian shop - invoice will be sent instead');
      } else if (isFrenchCheckout()) {
        console.log('Skipping order confirmation email for French shop - invoice will be sent instead');
      }

      // Set order data for context
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

      // Call the success callback to move to confirmation step
      onOrderSuccess(createdOrder.order_number);

      // Clear localStorage
      localStorage.removeItem('orderData');

    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: t.system.errorTitle,
        description: t.system.errorDescription,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use the appropriate submitting state
  const currentlySubmitting = belgianCheckout.isBelgianCheckout 
    ? isSubmittingBelgian 
    : italianCheckout.isItalianCheckout 
    ? isSubmittingItalian 
    : isSubmitting;

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Customer Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <Mail className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t.emailSection.title}</h3>
                <p className="text-sm text-gray-600">{t.emailSection.subtitle}</p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.emailSection.emailLabel}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.emailSection.emailPlaceholder} type="email" {...field} />
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
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Truck className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t.deliverySection.title}</h3>
                <p className="text-sm text-gray-600">{t.deliverySection.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="deliveryFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.deliverySection.firstNameLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.deliverySection.firstNamePlaceholder} {...field} />
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
                    <FormLabel>{t.deliverySection.lastNameLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.deliverySection.lastNamePlaceholder} {...field} />
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
                    <FormLabel>{t.deliverySection.streetLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.deliverySection.streetPlaceholder} {...field} />
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
                    <FormLabel>{t.deliverySection.postcodeLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.deliverySection.postcodePlaceholder} {...field} />
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
                    <FormLabel>{t.deliverySection.cityLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.deliverySection.cityPlaceholder} {...field} />
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
                    <FormLabel>{t.deliverySection.phoneLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.deliverySection.phonePlaceholder} {...field} />
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
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <FileText className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t.billingSection.title}</h3>
                <p className="text-sm text-gray-600">{t.billingSection.subtitle}</p>
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
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">
                  {t.billingSection.sameAddressLabel}
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
                      <FormLabel>{t.deliverySection.firstNameLabel}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.deliverySection.firstNamePlaceholder} {...field} />
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
                      <FormLabel>{t.deliverySection.lastNameLabel}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.deliverySection.lastNamePlaceholder} {...field} />
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
                      <FormLabel>{t.deliverySection.streetLabel}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.deliverySection.streetPlaceholder} {...field} />
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
                      <FormLabel>{t.deliverySection.postcodeLabel}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.deliverySection.postcodePlaceholder} {...field} />
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
                      <FormLabel>{t.deliverySection.cityLabel}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.deliverySection.cityPlaceholder} {...field} />
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
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <CreditCard className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t.paymentSection.title}</h3>
                <p className="text-sm text-gray-600">{t.paymentSection.subtitle}</p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                      <div className="space-y-3">
                        <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="vorkasse" id="vorkasse" />
                            <Label htmlFor="vorkasse" className="flex-1 cursor-pointer">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-semibold text-gray-900">{t.paymentSection.vorkasse.title}</div>
                                  <div className="text-sm text-gray-600">
                                    {t.paymentSection.vorkasse.description}
                                  </div>
                                </div>
                                <div className="text-sm text-green-600 font-semibold">
                                  {t.paymentSection.vorkasse.recommended}
                                </div>
                              </div>
                            </Label>
                          </div>
                        </div>

                        <div className={`border border-gray-200 rounded-lg p-4 ${shouldDisableInvoicePayment() ? 'bg-gray-100 opacity-60' : ''}`}>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem 
                              value="rechnung" 
                              id="rechnung" 
                              disabled={shouldDisableInvoicePayment()}
                              className={shouldDisableInvoicePayment() ? 'opacity-50 cursor-not-allowed' : ''}
                            />
                            <Label 
                              htmlFor="rechnung" 
                              className={`flex-1 ${shouldDisableInvoicePayment() ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'}`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className={`font-semibold ${shouldDisableInvoicePayment() ? 'text-gray-400' : 'text-gray-900'}`}>
                                    {t.paymentSection.rechnung.title}
                                  </div>
                                  <div className={`text-sm ${shouldDisableInvoicePayment() ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {t.paymentSection.rechnung.description}
                                  </div>
                                </div>
                                <div className={`text-sm ${shouldDisableInvoicePayment() ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {t.paymentSection.rechnung.existingCustomers}
                                </div>
                              </div>
                            </Label>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Terms and Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <Shield className="text-orange-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t.termsSection.title}</h3>
                <p className="text-sm text-gray-600">{t.termsSection.subtitle}</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-800 mb-2">{t.termsSection.withdrawalTitle}</h4>
              <p className="text-yellow-700 text-sm">
                {t.termsSection.withdrawalText}
              </p>
            </div>

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
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-gray-700 cursor-pointer">
                      {t.termsSection.acceptTermsText}
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={currentlySubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold rounded-lg disabled:bg-gray-400"
            >
              {currentlySubmitting ? t.termsSection.submittingButton : t.termsSection.submitButton}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
