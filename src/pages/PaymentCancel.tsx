
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderNumber = searchParams.get('order');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Zahlung abgebrochen</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {orderNumber && (
            <p className="text-gray-600">
              Bestellnummer: <span className="font-semibold">{orderNumber}</span>
            </p>
          )}
          <p className="text-gray-600">
            Ihre Zahlung wurde abgebrochen. Keine Sorge - Ihre Bestellung ist noch aktiv 
            und Sie können die Zahlung jederzeit erneut versuchen.
          </p>
          <div className="pt-4 space-y-2">
            <Button 
              onClick={() => navigate('/checkout')}
              className="w-full"
            >
              Zahlung erneut versuchen
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full"
            >
              Zur Startseite
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCancel;
