
import React from 'react';
import { useDomainShop } from '@/hooks/useDomainShop';
import { useCheckoutTranslations } from '@/hooks/useCheckoutTranslations';
import { useItalianCheckoutTranslations } from '@/hooks/useItalianCheckoutTranslations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Mail, User, MapPin, Phone, CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useOrder } from '@/contexts/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '@/hooks/useOrders';
import { useItalianOrders } from '@/hooks/useItalianOrders';

// Form schema with validation
const formSchema = z.object({
  email: z.string().email(),
  deliveryFirstName: z.string().min(2),
  deliveryLastName: z.string().min(2),
  deliveryStreet: z.string().min(3),
  deliveryPostcode: z.string().min(4),
  deliveryCity: z.string().min(2),
  deliveryPhone: z.string().min(6),
  useSameAddress: z.boolean().default(true),
  billingFirstName: z.string().optional(),
  billingLastName: z.string().optional(),
  billingStreet: z.string().optional(),
  billingPostcode: z.string().optional(),
  billingCity: z.string().optional(),
  paymentMethod: z.enum(['vorkasse', 'rechnung']).default('vorkasse'),
  acceptTerms: z.boolean(),
});

// Conditional validation for billing address
const formSchemaWithBilling = formSchema.superRefine((data, ctx) => {
  if (!data.useSameAddress) {
    if (!data.billingFirstName || data.billingFirstName.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Billing first name is required",
        path: ["billingFirstName"],
      });
    }
    if (!data.billingLastName || data.billingLastName.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Billing last name is required",
        path: ["billingLastName"],
      });
    }
    if (!data.billingStreet || data.billingStreet.length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Billing street is required",
        path: ["billingStreet"],
      });
    }
    if (!data.billingPostcode || data.billingPostcode.length < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Billing postcode is required",
        path: ["billingPostcode"],
      });
    }
    if (!data.billingCity || data.billingCity.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Billing city is required",
        path: ["billingCity"],
      });
    }
  }
  
  // Require terms acceptance
  if (!data.acceptTerms) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "You must accept the terms and conditions",
      path: ["acceptTerms"],
    });
  }
});

interface OrderFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

const OrderForm = ({ onSubmit, isSubmitting }: OrderFormProps) => {
  const shopConfig = useDomainShop();
  const t = shopConfig.shopType === 'italy'
    ? useItalianCheckoutTranslations()
    : useCheckoutTranslations();
  const { orderData, setOrderData } = useOrder();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createOrder } = useOrders();
  const { createOrder: createItalianOrder } = useItalianOrders();

  // Initialize form with existing order data if available
  const form = useForm<z.infer<typeof formSchemaWithBilling>>({
    resolver: zodResolver(formSchemaWithBilling),
    defaultValues: {
      email: orderData?.customerEmail || '',
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
      paymentMethod: 'vorkasse',
      acceptTerms: false,
    },
  });

  // Watch for useSameAddress changes to conditionally show billing fields
  const useSameAddress = form.watch('useSameAddress');

  // Handle form submission
  const handleSubmit = async (values: z.infer<typeof formSchemaWithBilling>) => {
    try {
      // Update order context with form values using setOrderData
      setOrderData({
        ...orderData,
        ...values,
        customerEmail: values.email
      });

      // Call the onSubmit prop (which will handle the actual order creation)
      onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: 'There was a problem submitting your order. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Generate test data for development
  const fillTestData = () => {
    form.setValue('email', 'test@example.com');
    form.setValue('deliveryFirstName', 'Test');
    form.setValue('deliveryLastName', 'User');
    form.setValue('deliveryStreet', 'Test Street 123');
    form.setValue('deliveryPostcode', '12345');
    form.setValue('deliveryCity', 'Test City');
    form.setValue('deliveryPhone', '123456789');
    form.setValue('useSameAddress', true);
    form.setValue('paymentMethod', 'vorkasse');
    form.setValue('acceptTerms', true);

    toast({
      title: t.system.testDataGenerated,
      description: t.system.testDataDescription,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Email Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Mail className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t.emailSection.title}</h3>
              <p className="text-gray-600">{t.emailSection.subtitle}</p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.emailSection.emailLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.emailSection.emailPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Delivery Address Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-6">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <MapPin className="text-red-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t.deliverySection.title}</h3>
              <p className="text-gray-600">{t.deliverySection.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <div className="mt-4">
            <FormField
              control={form.control}
              name="deliveryStreet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.deliverySection.streetLabel}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.deliverySection.streetPlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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
          </div>

          <div className="mt-4">
            <FormField
              control={form.control}
              name="deliveryPhone"
              render={({ field }) => (
                <FormItem>
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

        {/* Billing Address Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <User className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t.billingSection.title}</h3>
              <p className="text-gray-600">{t.billingSection.subtitle}</p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="useSameAddress"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t.billingSection.sameAddressLabel}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {!useSameAddress && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <FormField
                control={form.control}
                name="billingStreet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.deliverySection.streetLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.deliverySection.streetPlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          )}
        </motion.div>

        {/* Payment Method Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <CreditCard className="text-purple-600" size={24} />
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
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-3"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="vorkasse" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        <div className="ml-2">
                          <div className="font-semibold">{t.paymentSection.vorkasse.title}</div>
                          <div className="text-sm text-gray-500">{t.paymentSection.vorkasse.description}</div>
                          <div className="text-xs text-green-600 mt-1">{t.paymentSection.vorkasse.recommended}</div>
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="rechnung" disabled />
                      </FormControl>
                      <FormLabel className="font-normal cursor-not-allowed text-gray-400">
                        <div className="ml-2">
                          <div className="font-semibold">{t.paymentSection.rechnung.title}</div>
                          <div className="text-sm">{t.paymentSection.rechnung.description}</div>
                          <div className="text-xs mt-1">{t.paymentSection.rechnung.existingCustomers}</div>
                        </div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Terms and Conditions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">{t.termsSection.title}</h3>
            <p className="text-gray-600 mt-1">{t.termsSection.subtitle}</p>
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm">
                    {t.termsSection.acceptTermsText}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="mt-8">
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.termsSection.submittingButton}
                </span>
              ) : (
                t.termsSection.submitButton
              )}
            </Button>
          </div>

          {/* Test data button - only in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={fillTestData}
              >
                Fill Test Data
              </Button>
            </div>
          )}
        </motion.div>
      </form>
    </Form>
  );
};

export default OrderForm;
