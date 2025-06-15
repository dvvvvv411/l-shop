import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { CreditCard, Truck, Shield, TestTube, FileText, Mail } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useOrder } from '@/contexts/OrderContext';
import { useOrders } from '@/hooks/useOrders';
import { useCheckoutTranslations } from '@/hooks/useCheckoutTranslations';
import { useItalianCheckoutTranslations } from '@/hooks/useItalianCheckoutTranslations';
import { useDomainShop } from '@/hooks/useDomainShop';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Test data arrays for random generation
const testData = {
  firstNames: ['Marco', 'Giulia', 'Francesco', 'Chiara', 'Alessandro', 'Federica', 'Matteo', 'Valentina', 'Luca', 'Martina'],
  lastNames: ['Rossi', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco', 'Bruno'],
  streets: ['Via Roma', 'Via Garibaldi', 'Via Dante', 'Via Mazzini', 'Via Verdi', 'Via Cavour', 'Via Nazionale', 'Via del Corso'],
  cities: ['Milano', 'Roma', 'Napoli', 'Torino', 'Palermo', 'Genova', 'Bologna', 'Firenze', 'Bari', 'Catania'],
  postcodes: ['20121', '00100', '80100', '10100', '90100', '16100', '40100', '50100', '70100', '95100'],
  emails: ['marco.rossi@gmail.com', 'giulia.ferrari@yahoo.it', 'francesco.bianchi@libero.it', 'chiara.romano@tiscali.it', 'alessandro.colombo@alice.it']
};

const generateRandomTestData = (isItalian: boolean = false) => {
  const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)];
  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  if (isItalian) {
    return {
      customerEmail: getRandomItem(testData.emails),
      deliveryFirstName: getRandomItem(testData.firstNames),
      deliveryLastName: getRandomItem(testData.lastNames),
      deliveryStreet: `${getRandomItem(testData.streets)} ${getRandomNumber(1, 999)}`,
      deliveryPostcode: getRandomItem(testData.postcodes),
      deliveryCity: getRandomItem(testData.cities),
      deliveryPhone: `+39 ${getRandomNumber(100, 999)} ${getRandomNumber(1000000, 9999999)}`,
      useSameAddress: Math.random() > 0.3,
      billingFirstName: getRandomItem(testData.firstNames),
      billingLastName: getRandomItem(testData.lastNames),
      billingStreet: `${getRandomItem(testData.streets)} ${getRandomNumber(1, 999)}`,
      billingPostcode: getRandomItem(testData.postcodes),
      billingCity: getRandomItem(testData.cities),
      paymentMethod: 'vorkasse' as const
    };
  }
  
  // Original German test data
  const germanData = {
    firstNames: ['Max', 'Anna', 'Michael', 'Sarah', 'Thomas', 'Julia', 'Andreas', 'Lisa', 'Markus', 'Elena'],
    lastNames: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'],
    streets: ['Hauptstraße', 'Kirchgasse', 'Bahnhofstraße', 'Gartenweg', 'Am Markt', 'Lindenstraße', 'Rosenweg', 'Feldstraße'],
    cities: ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
    postcodes: ['10115', '20095', '80331', '50667', '60311', '70173', '40213', '44135', '45127', '04109'],
    emails: ['max.mustermann@gmail.com', 'anna.meyer@yahoo.de', 'michael.schmidt@web.de', 'sarah.wagner@gmx.de', 'thomas.fischer@t-online.de']
  };
  
  return {
    customerEmail: getRandomItem(germanData.emails),
    deliveryFirstName: getRandomItem(germanData.firstNames),
    deliveryLastName: getRandomItem(germanData.lastNames),
    deliveryStreet: `${getRandomItem(germanData.streets)} ${getRandomNumber(1, 999)}`,
    deliveryPostcode: getRandomItem(germanData.postcodes),
    deliveryCity: getRandomItem(germanData.cities),
    deliveryPhone: `+49 ${getRandomNumber(100, 999)} ${getRandomNumber(1000000, 9999999)}`,
    useSameAddress: Math.random() > 0.3,
    billingFirstName: getRandomItem(germanData.firstNames),
    billingLastName: getRandomItem(germanData.lastNames),
    billingStreet: `${getRandomItem(germanData.streets)} ${getRandomNumber(1, 999)}`,
    billingPostcode: getRandomItem(germanData.postcodes),
    billingCity: getRandomItem(germanData.cities),
    paymentMethod: 'vorkasse' as const
  };
};

interface CheckoutFormProps {
  orderData: any;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

const CheckoutForm = ({ orderData, onSubmit, isSubmitting }: CheckoutFormProps) => {
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const shopConfig = useDomainShop();
  const { toast } = useToast();
  
  // Use appropriate translations based on shop type
  const germanFrenchTranslations = useCheckoutTranslations();
  const italianTranslations = useItalianCheckoutTranslations();
  const t = shopConfig.shopType === 'italy' ? italianTranslations : germanFrenchTranslations;

  // Create schema with appropriate validation messages
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
    paymentMethod: z.enum(['vorkasse', 'rechnung'])
  });

  type OrderFormData = z.infer<typeof orderSchema>;

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      useSameAddress: true,
      paymentMethod: 'vorkasse'
    }
  });

  const handleGenerateTestData = () => {
    const testDataValues = generateRandomTestData(shopConfig.shopType === 'italy');

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
      title: t.system.testDataGenerated,
      description: t.system.testDataDescription
    });
  };

  const handleFormSubmit = (data: OrderFormData) => {
    if (!acceptedTerms) {
      toast({
        title: 'Fehler',
        description: t.validation.termsRequired,
        variant: 'destructive'
      });
      return;
    }
    onSubmit(data);
  };

  return (
    <div className="space-y-8">
      {/* Test Data Generator Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-amber-50 border border-amber-200 rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <TestTube className="text-amber-600" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-amber-900">
                {shopConfig.shopType === 'italy' ? 'Modalità di sviluppo' : 'Entwicklungsmodus'}
              </h4>
              <p className="text-sm text-amber-700">
                {shopConfig.shopType === 'italy' ? 'Genera dati di test automaticamente' : 'Automatisch Testdaten generieren'}
              </p>
            </div>
          </div>
          <Button
            type="button"
            onClick={handleGenerateTestData}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-100"
          >
            {shopConfig.shopType === 'italy' ? 'Genera dati di test' : 'Testdaten generieren'}
          </Button>
        </div>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
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
                <h3 className="text-xl font-bold text-gray-900">{t.emailSection.title}</h3>
                <p className="text-gray-600">{t.emailSection.subtitle}</p>
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
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <Truck className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{t.deliverySection.title}</h3>
                <p className="text-gray-600">{t.deliverySection.subtitle}</p>
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
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <CreditCard className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{t.billingSection.title}</h3>
                <p className="text-gray-600">{t.billingSection.subtitle}</p>
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
                <h3 className="text-xl font-bold text-gray-900">{t.paymentSection.title}</h3>
                <p className="text-gray-600">{t.paymentSection.subtitle}</p>
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

                        {/* Hide Rechnung option for Italian shops */}
                        {shopConfig.shopType !== 'italy' && (
                          <div className="border border-gray-200 rounded-lg p-4 bg-gray-100 opacity-50">
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="rechnung" id="rechnung" disabled />
                              <Label htmlFor="rechnung" className="flex-1 cursor-not-allowed">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="font-semibold text-gray-600 flex items-center space-x-2">
                                      <FileText size={16} />
                                      <span>{t.paymentSection.rechnung.title}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {t.paymentSection.rechnung.description}
                                    </div>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {t.paymentSection.rechnung.existingCustomers}
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
                </FormItem>
              )}
            />
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <FileText className="text-gray-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{t.termsSection.title}</h3>
                <p className="text-gray-600">{t.termsSection.subtitle}</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-800 mb-2">{t.termsSection.withdrawalTitle}</h4>
              <p className="text-yellow-700 text-sm">
                {t.termsSection.withdrawalText}
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                checked={acceptedTerms}
                onCheckedChange={setAcceptedTerms}
                className="mt-1"
              />
              <label className="text-sm text-gray-700 cursor-pointer" onClick={() => setAcceptedTerms(!acceptedTerms)}>
                {t.termsSection.acceptTermsText}
              </label>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting || !acceptedTerms}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold rounded-lg disabled:bg-gray-400"
            >
              {isSubmitting ? t.termsSection.submittingButton : t.termsSection.submitButton}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
