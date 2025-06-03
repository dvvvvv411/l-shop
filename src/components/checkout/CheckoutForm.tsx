
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, CreditCard, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOrder } from '@/contexts/OrderContext';
import { useOrderCreation } from '@/hooks/useOrderCreation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { orderData, setOrderData } = useOrder();
  const { createOrderWithEmail, isCreating } = useOrderCreation();

  // Form state
  const [email, setEmail] = useState('');
  const [deliveryFirstName, setDeliveryFirstName] = useState('');
  const [deliveryLastName, setDeliveryLastName] = useState('');
  const [deliveryStreet, setDeliveryStreet] = useState('');
  const [deliveryPostcode, setDeliveryPostcode] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [billingFirstName, setBillingFirstName] = useState('');
  const [billingLastName, setBillingLastName] = useState('');
  const [billingStreet, setBillingStreet] = useState('');
  const [billingPostcode, setBillingPostcode] = useState('');
  const [billingCity, setBillingCity] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState('vorkasse');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Load existing order data if available
  useEffect(() => {
    if (orderData) {
      setEmail(orderData.deliveryFirstName ? `${orderData.deliveryFirstName.toLowerCase()}@email.de` : '');
      setDeliveryFirstName(orderData.deliveryFirstName || '');
      setDeliveryLastName(orderData.deliveryLastName || '');
      setDeliveryStreet(orderData.deliveryStreet || '');
      setDeliveryPostcode(orderData.deliveryPostcode || '');
      setDeliveryCity(orderData.deliveryCity || '');
      setDeliveryPhone(orderData.deliveryPhone || '');
      setUseSameAddress(orderData.useSameAddress);
      setBillingFirstName(orderData.billingFirstName || '');
      setBillingLastName(orderData.billingLastName || '');
      setBillingStreet(orderData.billingStreet || '');
      setBillingPostcode(orderData.billingPostcode || '');
      setBillingCity(orderData.billingCity || '');
      setPaymentMethod(orderData.paymentMethod || 'vorkasse');
    }
  }, [orderData]);

  const validateForm = () => {
    if (!email || !email.includes('@')) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return false;
    }
    
    if (!deliveryFirstName || !deliveryLastName || !deliveryStreet || !deliveryPostcode || !deliveryCity || !deliveryPhone) {
      alert('Bitte füllen Sie alle Felder der Lieferadresse aus.');
      return false;
    }

    if (!useSameAddress && (!billingFirstName || !billingLastName || !billingStreet || !billingPostcode || !billingCity)) {
      alert('Bitte füllen Sie alle Felder der Rechnungsadresse aus.');
      return false;
    }

    if (!acceptTerms) {
      alert('Bitte akzeptieren Sie die AGB und Widerrufsbelehrung.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !orderData) return;

    try {
      // Generate order number for tracking
      const orderNumber = 'H' + Math.floor(100000 + Math.random() * 900000);
      
      // Prepare order data for database
      const orderForDB = {
        customer_name: `${deliveryFirstName} ${deliveryLastName}`,
        customer_email: email,
        customer_phone: deliveryPhone,
        customer_address: `${deliveryStreet}, ${deliveryPostcode} ${deliveryCity}`,
        
        // Delivery details
        delivery_first_name: deliveryFirstName,
        delivery_last_name: deliveryLastName,
        delivery_street: deliveryStreet,
        delivery_postcode: deliveryPostcode,
        delivery_city: deliveryCity,
        delivery_phone: deliveryPhone,
        
        // Billing details
        use_same_address: useSameAddress,
        billing_first_name: useSameAddress ? deliveryFirstName : billingFirstName,
        billing_last_name: useSameAddress ? deliveryLastName : billingLastName,
        billing_street: useSameAddress ? deliveryStreet : billingStreet,
        billing_postcode: useSameAddress ? deliveryPostcode : billingPostcode,
        billing_city: useSameAddress ? deliveryCity : billingCity,
        
        // Order details
        product: orderData.product,
        liters: orderData.amount,
        price_per_liter: orderData.pricePerLiter,
        base_price: orderData.basePrice,
        delivery_fee: orderData.deliveryFee,
        discount: orderData.discount,
        total_amount: orderData.total,
        payment_method: paymentMethod,
        delivery_date_display: orderData.deliveryDate,
        origin_domain: window.location.host,
        status: 'pending'
      };

      console.log('Creating order with data:', orderForDB);
      
      // Create order with email sending
      const createdOrder = await createOrderWithEmail(orderForDB);
      
      if (createdOrder) {
        // Update context with complete order data including the generated order number
        const updatedOrderData = {
          ...orderData,
          deliveryFirstName,
          deliveryLastName,
          deliveryStreet,
          deliveryPostcode,
          deliveryCity,
          deliveryPhone,
          useSameAddress,
          billingFirstName: useSameAddress ? deliveryFirstName : billingFirstName,
          billingLastName: useSameAddress ? deliveryLastName : billingLastName,
          billingStreet: useSameAddress ? deliveryStreet : billingStreet,
          billingPostcode: useSameAddress ? deliveryPostcode : billingPostcode,
          billingCity: useSameAddress ? deliveryCity : billingCity,
          paymentMethod,
          orderNumber: createdOrder.order_number,
        };

        setOrderData(updatedOrderData);
        
        // Navigate to confirmation with the order number from database
        navigate('/confirmation', {
          state: {
            orderNumber: createdOrder.order_number,
            email: email
          }
        });
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const handleBack = () => {
    navigate('/order');
  };

  if (!orderData) {
    navigate('/order');
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-red-600" />
              Kontaktdaten
            </CardTitle>
            <CardDescription>
              Ihre E-Mail-Adresse für die Bestellbestätigung
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail-Adresse *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ihre@email.de"
                  required
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Lieferadresse
            </CardTitle>
            <CardDescription>
              Wohin soll Ihr Heizöl geliefert werden?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="deliveryFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Vorname *
                </label>
                <Input
                  id="deliveryFirstName"
                  value={deliveryFirstName}
                  onChange={(e) => setDeliveryFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="deliveryLastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nachname *
                </label>
                <Input
                  id="deliveryLastName"
                  value={deliveryLastName}
                  onChange={(e) => setDeliveryLastName(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="deliveryStreet" className="block text-sm font-medium text-gray-700 mb-1">
                  Straße und Hausnummer *
                </label>
                <Input
                  id="deliveryStreet"
                  value={deliveryStreet}
                  onChange={(e) => setDeliveryStreet(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="deliveryPostcode" className="block text-sm font-medium text-gray-700 mb-1">
                  Postleitzahl *
                </label>
                <Input
                  id="deliveryPostcode"
                  value={deliveryPostcode}
                  onChange={(e) => setDeliveryPostcode(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="deliveryCity" className="block text-sm font-medium text-gray-700 mb-1">
                  Ort *
                </label>
                <Input
                  id="deliveryCity"
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="deliveryPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefonnummer *
                </label>
                <Input
                  id="deliveryPhone"
                  value={deliveryPhone}
                  onChange={(e) => setDeliveryPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-red-600" />
              Rechnungsadresse
            </CardTitle>
            <CardDescription>
              Wohin soll die Rechnung geschickt werden?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useSameAddress"
                  checked={useSameAddress}
                  onCheckedChange={(checked) => setUseSameAddress(checked as boolean)}
                />
                <label
                  htmlFor="useSameAddress"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Rechnungsadresse entspricht der Lieferadresse
                </label>
              </div>

              {!useSameAddress && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div>
                    <label htmlFor="billingFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Vorname *
                    </label>
                    <Input
                      id="billingFirstName"
                      value={billingFirstName}
                      onChange={(e) => setBillingFirstName(e.target.value)}
                      required={!useSameAddress}
                    />
                  </div>
                  <div>
                    <label htmlFor="billingLastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nachname *
                    </label>
                    <Input
                      id="billingLastName"
                      value={billingLastName}
                      onChange={(e) => setBillingLastName(e.target.value)}
                      required={!useSameAddress}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="billingStreet" className="block text-sm font-medium text-gray-700 mb-1">
                      Straße und Hausnummer *
                    </label>
                    <Input
                      id="billingStreet"
                      value={billingStreet}
                      onChange={(e) => setBillingStreet(e.target.value)}
                      required={!useSameAddress}
                    />
                  </div>
                  <div>
                    <label htmlFor="billingPostcode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postleitzahl *
                    </label>
                    <Input
                      id="billingPostcode"
                      value={billingPostcode}
                      onChange={(e) => setBillingPostcode(e.target.value)}
                      required={!useSameAddress}
                    />
                  </div>
                  <div>
                    <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-1">
                      Ort *
                    </label>
                    <Input
                      id="billingCity"
                      value={billingCity}
                      onChange={(e) => setBillingCity(e.target.value)}
                      required={!useSameAddress}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-red-600" />
              Zahlungsart
            </CardTitle>
            <CardDescription>
              Wählen Sie Ihre bevorzugte Zahlungsmethode
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vorkasse">Vorkasse (Überweisung)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600 mt-2">
              Bei Vorkasse erhalten Sie die Bankverbindung per E-Mail. Die Lieferung erfolgt nach Zahlungseingang.
            </p>
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="acceptTerms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                Ich akzeptiere die{' '}
                <a href="/agb" className="text-red-600 hover:underline" target="_blank">
                  Allgemeinen Geschäftsbedingungen
                </a>{' '}
                und die{' '}
                <a href="/widerrufsrecht" className="text-red-600 hover:underline" target="_blank">
                  Widerrufsbelehrung
                </a>
                . Mir ist bekannt, dass ich bei einer Bestellung von Heizöl mein Widerrufsrecht verliere, 
                sobald die Lieferung begonnen hat. *
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Button>
          
          <Button
            type="submit"
            disabled={!acceptTerms || isCreating}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            {isCreating ? 'Wird bearbeitet...' : 'Bestellung abschließen'}
            {!isCreating && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CheckoutForm;
