import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useOrder } from '@/contexts/OrderContext';
import { supabase } from '@/integrations/supabase/client';
import { useOrderEmail } from '@/hooks/useOrderEmail';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { orderData, updateOrderData } = useOrder();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: orderData.firstName || '',
    lastName: orderData.lastName || '',
    email: orderData.email || '',
    phone: orderData.phone || '',
    street: orderData.street || '',
    city: orderData.city || '',
    postcode: orderData.postcode || '',
    deliveryFirstName: orderData.deliveryFirstName || '',
    deliveryLastName: orderData.deliveryLastName || '',
    deliveryStreet: orderData.deliveryStreet || '',
    deliveryCity: orderData.deliveryCity || '',
    deliveryPostcode: orderData.deliveryPostcode || '',
    deliveryPhone: orderData.deliveryPhone || '',
    billingFirstName: orderData.billingFirstName || '',
    billingLastName: orderData.billingLastName || '',
    billingStreet: orderData.billingStreet || '',
    billingCity: orderData.billingCity || '',
    billingPostcode: orderData.billingPostcode || '',
    notes: orderData.notes || '',
    differentDeliveryAddress: orderData.differentDeliveryAddress || false,
    paymentMethod: orderData.paymentMethod || 'invoice',
    agbAccepted: orderData.agbAccepted || false,
  });

  // Use the email hook to automatically send emails
  const { isLoading: isEmailLoading, error: emailError, success: emailSuccess } = useOrderEmail(orderCreated);

  useEffect(() => {
    // Update form data when orderData changes (e.g., after returning from confirmation page)
    setFormData({
      firstName: orderData.firstName || '',
      lastName: orderData.lastName || '',
      email: orderData.email || '',
      phone: orderData.phone || '',
      street: orderData.street || '',
      city: orderData.city || '',
      postcode: orderData.postcode || '',
      deliveryFirstName: orderData.deliveryFirstName || '',
      deliveryLastName: orderData.deliveryLastName || '',
      deliveryStreet: orderData.deliveryStreet || '',
      deliveryCity: orderData.deliveryCity || '',
      deliveryPostcode: orderData.deliveryPostcode || '',
      deliveryPhone: orderData.deliveryPhone || '',
      billingFirstName: orderData.billingFirstName || '',
      billingLastName: orderData.billingLastName || '',
      billingStreet: orderData.billingStreet || '',
      billingCity: orderData.billingCity || '',
      billingPostcode: orderData.billingPostcode || '',
      notes: orderData.notes || '',
      differentDeliveryAddress: orderData.differentDeliveryAddress || false,
      paymentMethod: orderData.paymentMethod || 'invoice',
      agbAccepted: orderData.agbAccepted || false,
    });
  }, [orderData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));

    // If "differentDeliveryAddress" is unchecked, clear delivery address fields
    if (name === 'differentDeliveryAddress' && !checked) {
      setFormData(prev => ({
        ...prev,
        deliveryFirstName: '',
        deliveryLastName: '',
        deliveryStreet: '',
        deliveryCity: '',
        deliveryPostcode: '',
        deliveryPhone: '',
      }));
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const nextStep = () => {
    // Validate step 1
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.street || !formData.city || !formData.postcode) {
        alert('Bitte füllen Sie alle Pflichtfelder aus.');
        return;
      }
    }

    // Validate step 2
    if (currentStep === 2) {
      if (formData.differentDeliveryAddress) {
        if (!formData.deliveryFirstName || !formData.deliveryLastName || !formData.deliveryStreet || !formData.deliveryCity || !formData.deliveryPostcode) {
          alert('Bitte füllen Sie alle Lieferadressenfelder aus.');
          return;
        }
      }
    }

    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const updateOrderContext = () => {
    updateOrderData({
      ...orderData,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      street: formData.street,
      city: formData.city,
      postcode: formData.postcode,
      deliveryFirstName: formData.deliveryFirstName,
      deliveryLastName: formData.deliveryLastName,
      deliveryStreet: formData.deliveryStreet,
      deliveryCity: formData.deliveryCity,
      deliveryPostcode: formData.deliveryPostcode,
      deliveryPhone: formData.deliveryPhone,
      billingFirstName: formData.billingFirstName,
      billingLastName: formData.billingLastName,
      billingStreet: formData.billingStreet,
      billingCity: formData.billingCity,
      billingPostcode: formData.billingPostcode,
      notes: formData.notes,
      differentDeliveryAddress: formData.differentDeliveryAddress,
      paymentMethod: formData.paymentMethod,
      agbAccepted: formData.agbAccepted,
    });
  };

  const handleSubmitOrder = async () => {
    setIsLoading(true);
    
    try {
      // Get current domain for tracking
      const currentDomain = window.location.origin + window.location.pathname;
      
      // Create order in database
      const orderPayload = {
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: `${formData.street}, ${formData.postcode} ${formData.city}`,
        delivery_first_name: formData.deliveryFirstName || formData.firstName,
        delivery_last_name: formData.deliveryLastName || formData.lastName,
        delivery_street: formData.deliveryStreet || formData.street,
        delivery_postcode: formData.deliveryPostcode || formData.postcode,
        delivery_city: formData.deliveryCity || formData.city,
        delivery_phone: formData.deliveryPhone || formData.phone,
        billing_first_name: formData.billingFirstName || formData.firstName,
        billing_last_name: formData.billingLastName || formData.lastName,
        billing_street: formData.billingStreet || formData.street,
        billing_postcode: formData.billingPostcode || formData.postcode,
        billing_city: formData.billingCity || formData.city,
        liters: orderData.liters,
        price_per_liter: orderData.pricePerLiter,
        total_amount: orderData.totalAmount,
        product: orderData.product,
        notes: formData.notes,
        payment_method: formData.paymentMethod,
        status: 'pending',
        base_price: orderData.basePrice,
        delivery_fee: orderData.deliveryFee,
        discount: orderData.discount,
        delivery_date: orderData.deliveryDate,
        origin_domain: currentDomain, // Add domain tracking for email routing
      };

      const { data: order, error } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select()
        .single();

      if (error) throw error;

      console.log('Order created successfully:', order);
      setOrderCreated(order.id); // This will trigger the email hook
      
      // Navigate to confirmation page
      setTimeout(() => {
        navigate('/bestellung-bestaetigt', { 
          state: { 
            orderNumber: order.order_number,
            customerEmail: formData.email,
            totalAmount: orderData.totalAmount 
          } 
        });
      }, 3000); // Give time for email to be sent

    } catch (error) {
      console.error('Error creating order:', error);
      alert('Fehler beim Erstellen der Bestellung. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const Step1 = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Vorname *</Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Nachname *</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="email">E-Mail *</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Telefon</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="street">Straße und Hausnummer *</Label>
        <Input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="postcode">Postleitzahl *</Label>
          <Input
            type="text"
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="city">Ort *</Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </>
  );

  const Step2 = () => (
    <>
      <div className="mb-4">
        <Label htmlFor="differentDeliveryAddress" className="flex items-center space-x-2">
          <Checkbox
            id="differentDeliveryAddress"
            name="differentDeliveryAddress"
            checked={formData.differentDeliveryAddress}
            onCheckedChange={(checked) => {
              setFormData(prev => ({ ...prev, differentDeliveryAddress: checked }));
              handleCheckboxChange({ target: { name: 'differentDeliveryAddress', checked } } as any);
            }}
          />
          <span>Abweichende Lieferadresse</span>
        </Label>
      </div>

      {formData.differentDeliveryAddress && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deliveryFirstName">Vorname *</Label>
              <Input
                type="text"
                id="deliveryFirstName"
                name="deliveryFirstName"
                value={formData.deliveryFirstName}
                onChange={handleInputChange}
                required={formData.differentDeliveryAddress}
                disabled={!formData.differentDeliveryAddress}
              />
            </div>
            <div>
              <Label htmlFor="deliveryLastName">Nachname *</Label>
              <Input
                type="text"
                id="deliveryLastName"
                name="deliveryLastName"
                value={formData.deliveryLastName}
                onChange={handleInputChange}
                required={formData.differentDeliveryAddress}
                disabled={!formData.differentDeliveryAddress}
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="deliveryStreet">Straße und Hausnummer *</Label>
            <Input
              type="text"
              id="deliveryStreet"
              name="deliveryStreet"
              value={formData.deliveryStreet}
              onChange={handleInputChange}
              required={formData.differentDeliveryAddress}
              disabled={!formData.differentDeliveryAddress}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="deliveryPostcode">Postleitzahl *</Label>
              <Input
                type="text"
                id="deliveryPostcode"
                name="deliveryPostcode"
                value={formData.deliveryPostcode}
                onChange={handleInputChange}
                required={formData.differentDeliveryAddress}
                disabled={!formData.differentDeliveryAddress}
              />
            </div>
            <div>
              <Label htmlFor="deliveryCity">Ort *</Label>
              <Input
                type="text"
                id="deliveryCity"
                name="deliveryCity"
                value={formData.deliveryCity}
                onChange={handleInputChange}
                required={formData.differentDeliveryAddress}
                disabled={!formData.differentDeliveryAddress}
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="deliveryPhone">Telefon</Label>
            <Input
              type="tel"
              id="deliveryPhone"
              name="deliveryPhone"
              value={formData.deliveryPhone}
              onChange={handleInputChange}
              disabled={!formData.differentDeliveryAddress}
            />
          </div>
        </>
      )}

      <div className="mt-6">
        <Label htmlFor="notes">Anmerkungen</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Besondere Wünsche oder Anweisungen"
        />
      </div>
    </>
  );

  const Step3 = () => (
    <>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Rechnungsadresse</h3>
          <p>
            {formData.firstName} {formData.lastName}
            <br />
            {formData.street}
            <br />
            {formData.postcode} {formData.city}
          </p>
        </div>

        {formData.differentDeliveryAddress ? (
          <div>
            <h3 className="text-lg font-semibold">Lieferadresse</h3>
            <p>
              {formData.deliveryFirstName} {formData.deliveryLastName}
              <br />
              {formData.deliveryStreet}
              <br />
              {formData.deliveryPostcode} {formData.deliveryCity}
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold">Lieferadresse</h3>
            <p>
              {formData.firstName} {formData.lastName}
              <br />
              {formData.street}
              <br />
              {formData.postcode} {formData.city}
            </p>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold">Bestellung</h3>
          <p>
            Produkt: {orderData.product}
            <br />
            Menge: {orderData.liters} Liter
            <br />
            Preis pro Liter: €{orderData.pricePerLiter}
            <br />
            Gesamtpreis: €{orderData.totalAmount}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Zahlungsmethode</h3>
          <p>{formData.paymentMethod === 'invoice' ? 'Rechnung' : 'Vorkasse'}</p>
        </div>

        {formData.notes && (
          <div>
            <h3 className="text-lg font-semibold">Anmerkungen</h3>
            <p>{formData.notes}</p>
          </div>
        )}

        <div>
          <Label htmlFor="agbAccepted" className="flex items-center space-x-2">
            <Checkbox
              id="agbAccepted"
              name="agbAccepted"
              checked={formData.agbAccepted}
              onCheckedChange={handleCheckboxChange}
            />
            <span>Ich akzeptiere die AGB *</span>
          </Label>
          {!formData.agbAccepted && <p className="text-red-500 text-sm">Bitte akzeptieren Sie die AGB, um fortzufahren.</p>}
        </div>
      </div>
    </>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && 'Ihre Daten'}
              {currentStep === 2 && 'Lieferadresse'}
              {currentStep === 3 && 'Bestellung überprüfen'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Bitte geben Sie Ihre Kontaktdaten ein'}
              {currentStep === 2 && 'Wohin sollen wir das Heizöl liefern?'}
              {currentStep === 3 && 'Überprüfen Sie Ihre Bestellung vor der Bestätigung'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}

            {currentStep === 3 && orderCreated && (
              <Alert className="mt-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  {isEmailLoading && "E-Mail-Bestätigung wird versendet..."}
                  {emailSuccess && "Bestätigungs-E-Mail wurde erfolgreich versendet!"}
                  {emailError && "E-Mail-Versand fehlgeschlagen, aber Ihre Bestellung wurde erfolgreich erstellt."}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zurück
                </Button>
              )}
              {currentStep < 3 ? (
                <Button onClick={() => {
                  updateOrderContext();
                  nextStep();
                }}>
                  Weiter
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  disabled={!formData.agbAccepted || isLoading}
                  onClick={handleSubmitOrder}
                >
                  {isLoading ? (
                    <>
                      Bestellung wird erstellt...
                      <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </>
                  ) : (
                    "Bestellung aufgeben"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutForm;
