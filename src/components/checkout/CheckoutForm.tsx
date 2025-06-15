
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useOrder } from '@/contexts/OrderContext';
import { useOrders } from '@/hooks/useOrders';
import { useItalianOrders } from '@/hooks/useItalianOrders';
import { useDomainShop } from '@/hooks/useDomainShop';
import { useCheckoutTranslations } from '@/hooks/useCheckoutTranslations';
import { useItalianCheckoutTranslations } from '@/hooks/useItalianCheckoutTranslations';

const formSchema = z.object({
  deliveryFirstName: z.string().min(1, 'Vorname ist erforderlich'),
  deliveryLastName: z.string().min(1, 'Nachname ist erforderlich'),
  deliveryStreet: z.string().min(1, 'Straße ist erforderlich'),
  deliveryPostcode: z.string().min(4, 'Postleitzahl ist erforderlich'),
  deliveryCity: z.string().min(1, 'Stadt ist erforderlich'),
  deliveryPhone: z.string().min(1, 'Telefonnummer ist erforderlich'),
  customerEmail: z.string().email('Gültige E-Mail-Adresse erforderlich'),
  useSameAddress: z.boolean(),
  billingFirstName: z.string().optional(),
  billingLastName: z.string().optional(),
  billingStreet: z.string().optional(),
  billingPostcode: z.string().optional(),
  billingCity: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'Zustimmung erforderlich'),
});

type FormData = z.infer<typeof formSchema>;

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
  onOrderComplete: (orderNumber: string) => void;
}

const CheckoutForm = ({ orderData, onOrderComplete }: CheckoutFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setOrderData } = useOrder();
  const shopConfig = useDomainShop();
  
  // Use appropriate hook based on shop type
  const isItalianShop = shopConfig.shopType === 'italy';
  const { createOrder: createStandardOrder } = useOrders();
  const { createOrder: createItalianOrder } = useItalianOrders();
  
  const t = isItalianShop ? useItalianCheckoutTranslations() : useCheckoutTranslations();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      useSameAddress: true,
      acceptTerms: false,
    },
  });

  const useSameAddress = watch('useSameAddress');

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting order with data:', data);
      console.log('Shop type:', shopConfig.shopType);
      console.log('Is Italian shop:', isItalianShop);

      // Prepare order data
      const orderToCreate = {
        product: orderData.product.name,
        liters: orderData.amount,
        price_per_liter: orderData.product.price,
        base_price: orderData.basePrice,
        delivery_fee: orderData.deliveryFee,
        total_amount: orderData.totalPrice,
        delivery_first_name: data.deliveryFirstName,
        delivery_last_name: data.deliveryLastName,
        delivery_street: data.deliveryStreet,
        delivery_postcode: data.deliveryPostcode,
        delivery_city: data.deliveryCity,
        delivery_phone: data.deliveryPhone,
        customer_email: data.customerEmail,
        billing_first_name: data.useSameAddress ? data.deliveryFirstName : (data.billingFirstName || ''),
        billing_last_name: data.useSameAddress ? data.deliveryLastName : (data.billingLastName || ''),
        billing_street: data.useSameAddress ? data.deliveryStreet : (data.billingStreet || ''),
        billing_postcode: data.useSameAddress ? data.deliveryPostcode : (data.billingPostcode || ''),
        billing_city: data.useSameAddress ? data.deliveryCity : (data.billingCity || ''),
        use_same_address: data.useSameAddress,
        status: 'pending',
      };

      let createdOrder;
      
      if (isItalianShop) {
        console.log('Creating Italian order...');
        createdOrder = await createItalianOrder(orderToCreate);
      } else {
        console.log('Creating standard order...');
        createdOrder = await createStandardOrder(orderToCreate);
      }

      if (createdOrder) {
        console.log('Order created successfully:', createdOrder);
        
        // Store order data in context
        setOrderData({
          ...data,
          product: orderData.product.name,
          amount: orderData.amount,
          pricePerLiter: orderData.product.price,
          basePrice: orderData.basePrice,
          deliveryFee: orderData.deliveryFee,
          total: orderData.totalPrice,
          deliveryDate: 'nach Zahlungseingang',
          orderNumber: createdOrder.order_number,
          discount: orderData.savings,
        });

        // Call completion handler
        onOrderComplete(createdOrder.order_number);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert(isItalianShop ? 'Errore nella creazione dell\'ordine' : 'Fehler beim Erstellen der Bestellung');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl p-8 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.form.title}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Delivery Address Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.form.deliveryAddress}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deliveryFirstName">{t.form.firstName}</Label>
              <Input
                id="deliveryFirstName"
                {...register('deliveryFirstName')}
                className={errors.deliveryFirstName ? 'border-red-500' : ''}
              />
              {errors.deliveryFirstName && (
                <p className="text-red-500 text-sm mt-1">{errors.deliveryFirstName.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="deliveryLastName">{t.form.lastName}</Label>
              <Input
                id="deliveryLastName"
                {...register('deliveryLastName')}
                className={errors.deliveryLastName ? 'border-red-500' : ''}
              />
              {errors.deliveryLastName && (
                <p className="text-red-500 text-sm mt-1">{errors.deliveryLastName.message}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="deliveryStreet">{t.form.street}</Label>
              <Input
                id="deliveryStreet"
                {...register('deliveryStreet')}
                className={errors.deliveryStreet ? 'border-red-500' : ''}
              />
              {errors.deliveryStreet && (
                <p className="text-red-500 text-sm mt-1">{errors.deliveryStreet.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="deliveryPostcode">{t.form.postcode}</Label>
              <Input
                id="deliveryPostcode"
                {...register('deliveryPostcode')}
                defaultValue={orderData.postcode}
                className={errors.deliveryPostcode ? 'border-red-500' : ''}
              />
              {errors.deliveryPostcode && (
                <p className="text-red-500 text-sm mt-1">{errors.deliveryPostcode.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="deliveryCity">{t.form.city}</Label>
              <Input
                id="deliveryCity"
                {...register('deliveryCity')}
                className={errors.deliveryCity ? 'border-red-500' : ''}
              />
              {errors.deliveryCity && (
                <p className="text-red-500 text-sm mt-1">{errors.deliveryCity.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="deliveryPhone">{t.form.phone}</Label>
              <Input
                id="deliveryPhone"
                type="tel"
                {...register('deliveryPhone')}
                className={errors.deliveryPhone ? 'border-red-500' : ''}
              />
              {errors.deliveryPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.deliveryPhone.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="customerEmail">{t.form.email}</Label>
              <Input
                id="customerEmail"
                type="email"
                {...register('customerEmail')}
                className={errors.customerEmail ? 'border-red-500' : ''}
              />
              {errors.customerEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Billing Address Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="useSameAddress"
              checked={useSameAddress}
              onCheckedChange={(checked) => setValue('useSameAddress', checked as boolean)}
            />
            <Label htmlFor="useSameAddress" className="text-sm">
              {t.form.sameAsBilling}
            </Label>
          </div>

          {!useSameAddress && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.form.billingAddress}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingFirstName">{t.form.firstName}</Label>
                  <Input
                    id="billingFirstName"
                    {...register('billingFirstName')}
                    className={errors.billingFirstName ? 'border-red-500' : ''}
                  />
                  {errors.billingFirstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.billingFirstName.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="billingLastName">{t.form.lastName}</Label>
                  <Input
                    id="billingLastName"
                    {...register('billingLastName')}
                    className={errors.billingLastName ? 'border-red-500' : ''}
                  />
                  {errors.billingLastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.billingLastName.message}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="billingStreet">{t.form.street}</Label>
                  <Input
                    id="billingStreet"
                    {...register('billingStreet')}
                    className={errors.billingStreet ? 'border-red-500' : ''}
                  />
                  {errors.billingStreet && (
                    <p className="text-red-500 text-sm mt-1">{errors.billingStreet.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="billingPostcode">{t.form.postcode}</Label>
                  <Input
                    id="billingPostcode"
                    {...register('billingPostcode')}
                    className={errors.billingPostcode ? 'border-red-500' : ''}
                  />
                  {errors.billingPostcode && (
                    <p className="text-red-500 text-sm mt-1">{errors.billingPostcode.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="billingCity">{t.form.city}</Label>
                  <Input
                    id="billingCity"
                    {...register('billingCity')}
                    className={errors.billingCity ? 'border-red-500' : ''}
                  />
                  {errors.billingCity && (
                    <p className="text-red-500 text-sm mt-1">{errors.billingCity.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="acceptTerms"
              {...register('acceptTerms')}
              className={errors.acceptTerms ? 'border-red-500' : ''}
            />
            <Label htmlFor="acceptTerms" className="text-sm cursor-pointer">
              {t.form.acceptTerms}
            </Label>
          </div>
          {errors.acceptTerms && (
            <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t.form.submitting : t.form.submitOrder}
        </Button>
      </form>
    </motion.div>
  );
};

export default CheckoutForm;
