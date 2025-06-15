
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Loader2, User, MapPin, Building, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useCheckoutTranslations } from '@/hooks/useCheckoutTranslations';
import { useItalianCheckoutTranslations } from '@/hooks/useItalianCheckoutTranslations';
import { useItalianOrderSubmission } from '@/hooks/useItalianOrderSubmission';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import { useDomainShop } from '@/hooks/useDomainShop';

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
  customerEmail: z.string().email('Ungültige E-Mail-Adresse'),
  deliveryFirstName: z.string().min(1, 'Vorname ist erforderlich'),
  deliveryLastName: z.string().min(1, 'Nachname ist erforderlich'),
  deliveryStreet: z.string().min(1, 'Straße ist erforderlich'),
  deliveryPostcode: z.string().min(1, 'PLZ ist erforderlich'),
  deliveryCity: z.string().min(1, 'Stadt ist erforderlich'),
  deliveryPhone: z.string().min(1, 'Telefon ist erforderlich'),
  billingFirstName: z.string().optional(),
  billingLastName: z.string().optional(),
  billingStreet: z.string().optional(),
  billingPostcode: z.string().optional(),
  billingCity: z.string().optional(),
  useSameAddress: z.boolean().default(true),
  acceptTerms: z.boolean().refine((val) => val === true, 'Sie müssen die AGB akzeptieren'),
  acceptPrivacy: z.boolean().refine((val) => val === true, 'Sie müssen die Datenschutzerklärung akzeptieren'),
});

type FormData = z.infer<typeof formSchema>;

const CheckoutForm = ({ orderData, onOrderSuccess }: CheckoutFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const shopConfig = useDomainShop();
  const { bankAccounts } = useBankAccounts();
  const { submitItalianOrder } = useItalianOrderSubmission();
  
  // Use the appropriate translations based on shop type
  const germanFrenchTranslations = useCheckoutTranslations();
  const italianTranslations = useItalianCheckoutTranslations();
  const t = shopConfig.shopType === 'italy' ? italianTranslations : germanFrenchTranslations;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      useSameAddress: true,
      acceptTerms: false,
      acceptPrivacy: false,
    },
  });

  const { watch } = form;
  const useSameAddress = watch('useSameAddress');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      if (shopConfig.shopType === 'italy') {
        // Handle Italian order submission
        const italianAccount = bankAccounts.find(account => 
          account.system_name === 'GasolioCasa' && account.is_active
        ) || bankAccounts.find(account => 
          account.system_name.toLowerCase().includes('gasoliocasa') && account.is_active
        ) || bankAccounts.find(account => 
          account.system_name.toLowerCase().includes('gasolio') && account.is_active
        );

        if (!italianAccount) {
          throw new Error('No Italian bank account found');
        }

        const result = await submitItalianOrder({
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
          discount: orderData.savings,
          total: orderData.totalPrice,
        }, italianAccount);

        if (result.success) {
          // Store order data for confirmation page
          const confirmationData = {
            orderNumber: result.orderNumber,
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
            discount: orderData.savings,
            total: orderData.totalPrice,
            bankAccountDetails: italianAccount,
          };

          // Store in localStorage for confirmation page
          localStorage.setItem('italianOrderConfirmation', JSON.stringify(confirmationData));

          // Navigate to Italian confirmation page
          navigate('/conferma', {
            state: {
              orderNumber: result.orderNumber,
              orderData: confirmationData
            }
          });
        }
      } else {
        // Handle other shop types (existing logic)
        console.log('Processing order for non-Italian shop:', data);
        onOrderSuccess('HÖ123456');
      }
    } catch (error: any) {
      console.error('Order submission error:', error);
      toast({
        title: t.toasts.orderErrorTitle,
        description: t.toasts.orderErrorDescription,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
            <User className="text-red-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">{t.form.contactInformation}</h3>
          </div>
          
          <div>
            <Label htmlFor="customerEmail">{t.form.email}</Label>
            <Input
              id="customerEmail"
              type="email"
              {...form.register('customerEmail')}
              className="mt-1"
              placeholder={t.form.emailPlaceholder}
            />
            {form.formState.errors.customerEmail && (
              <p className="text-red-600 text-sm mt-1">{form.formState.errors.customerEmail.message}</p>
            )}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
            <MapPin className="text-red-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">{t.form.deliveryAddress}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deliveryFirstName">{t.form.firstName}</Label>
              <Input
                id="deliveryFirstName"
                {...form.register('deliveryFirstName')}
                className="mt-1"
                placeholder={t.form.firstNamePlaceholder}
              />
              {form.formState.errors.deliveryFirstName && (
                <p className="text-red-600 text-sm mt-1">{form.formState.errors.deliveryFirstName.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="deliveryLastName">{t.form.lastName}</Label>
              <Input
                id="deliveryLastName"
                {...form.register('deliveryLastName')}
                className="mt-1"
                placeholder={t.form.lastNamePlaceholder}
              />
              {form.formState.errors.deliveryLastName && (
                <p className="text-red-600 text-sm mt-1">{form.formState.errors.deliveryLastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="deliveryStreet">{t.form.street}</Label>
            <Input
              id="deliveryStreet"
              {...form.register('deliveryStreet')}
              className="mt-1"
              placeholder={t.form.streetPlaceholder}
            />
            {form.formState.errors.deliveryStreet && (
              <p className="text-red-600 text-sm mt-1">{form.formState.errors.deliveryStreet.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deliveryPostcode">{t.form.postcode}</Label>
              <Input
                id="deliveryPostcode"
                {...form.register('deliveryPostcode')}
                className="mt-1"
                placeholder={t.form.postcodePlaceholder}
              />
              {form.formState.errors.deliveryPostcode && (
                <p className="text-red-600 text-sm mt-1">{form.formState.errors.deliveryPostcode.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="deliveryCity">{t.form.city}</Label>
              <Input
                id="deliveryCity"
                {...form.register('deliveryCity')}
                className="mt-1"
                placeholder={t.form.cityPlaceholder}
              />
              {form.formState.errors.deliveryCity && (
                <p className="text-red-600 text-sm mt-1">{form.formState.errors.deliveryCity.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="deliveryPhone">{t.form.phone}</Label>
            <Input
              id="deliveryPhone"
              type="tel"
              {...form.register('deliveryPhone')}
              className="mt-1"
              placeholder={t.form.phonePlaceholder}
            />
            {form.formState.errors.deliveryPhone && (
              <p className="text-red-600 text-sm mt-1">{form.formState.errors.deliveryPhone.message}</p>
            )}
          </div>
        </div>

        {/* Billing Address */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
            <Building className="text-red-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">{t.form.billingAddress}</h3>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="useSameAddress"
              checked={useSameAddress}
              onCheckedChange={(checked) => form.setValue('useSameAddress', checked as boolean)}
            />
            <Label htmlFor="useSameAddress" className="cursor-pointer">
              {t.form.sameAsDelivery}
            </Label>
          </div>

          {!useSameAddress && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingFirstName">{t.form.firstName}</Label>
                  <Input
                    id="billingFirstName"
                    {...form.register('billingFirstName')}
                    className="mt-1"
                    placeholder={t.form.firstNamePlaceholder}
                  />
                </div>
                
                <div>
                  <Label htmlFor="billingLastName">{t.form.lastName}</Label>
                  <Input
                    id="billingLastName"
                    {...form.register('billingLastName')}
                    className="mt-1"
                    placeholder={t.form.lastNamePlaceholder}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="billingStreet">{t.form.street}</Label>
                <Input
                  id="billingStreet"
                  {...form.register('billingStreet')}
                  className="mt-1"
                  placeholder={t.form.streetPlaceholder}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingPostcode">{t.form.postcode}</Label>
                  <Input
                    id="billingPostcode"
                    {...form.register('billingPostcode')}
                    className="mt-1"
                    placeholder={t.form.postcodePlaceholder}
                  />
                </div>
                
                <div>
                  <Label htmlFor="billingCity">{t.form.city}</Label>
                  <Input
                    id="billingCity"
                    {...form.register('billingCity')}
                    className="mt-1"
                    placeholder={t.form.cityPlaceholder}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
            <CreditCard className="text-red-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">{t.form.termsAndConditions}</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="acceptTerms"
                checked={form.watch('acceptTerms')}
                onCheckedChange={(checked) => form.setValue('acceptTerms', checked as boolean)}
              />
              <Label htmlFor="acceptTerms" className="text-sm leading-relaxed cursor-pointer">
                {t.form.acceptTermsText}
              </Label>
            </div>
            {form.formState.errors.acceptTerms && (
              <p className="text-red-600 text-sm">{form.formState.errors.acceptTerms.message}</p>
            )}

            <div className="flex items-start space-x-3">
              <Checkbox
                id="acceptPrivacy"
                checked={form.watch('acceptPrivacy')}
                onCheckedChange={(checked) => form.setValue('acceptPrivacy', checked as boolean)}
              />
              <Label htmlFor="acceptPrivacy" className="text-sm leading-relaxed cursor-pointer">
                {t.form.acceptPrivacyText}
              </Label>
            </div>
            {form.formState.errors.acceptPrivacy && (
              <p className="text-red-600 text-sm">{form.formState.errors.acceptPrivacy.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold rounded-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t.form.processing}
              </>
            ) : (
              t.form.submitOrder
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CheckoutForm;
