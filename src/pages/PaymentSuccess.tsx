
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNexiPayments } from '@/hooks/useNexiPayments';
import { useToast } from '@/hooks/use-toast';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkPaymentStatus } = useNexiPayments();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const orderNumber = searchParams.get('order');
  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentId) {
        setIsVerifying(false);
        return;
      }

      try {
        const status = await checkPaymentStatus(paymentId);
        if (status && status.status === 'completed') {
          setPaymentVerified(true);
          toast({
            title: 'Zahlung erfolgreich',
            description: 'Ihre Zahlung wurde erfolgreich verarbeitet.',
          });
        }
      } catch (error) {
        console.error('Payment verification failed:', error);
        toast({
          title: 'Fehler',
          description: 'Die Zahlungsverifizierung ist fehlgeschlagen.',
          variant: 'destructive',
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [paymentId, checkPaymentStatus, toast]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {isVerifying ? (
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
            ) : (
              <CheckCircle className="h-16 w-16 text-green-600" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isVerifying ? 'Zahlung wird überprüft...' : 'Zahlung erfolgreich!'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {orderNumber && (
            <p className="text-gray-600">
              Bestellnummer: <span className="font-semibold">{orderNumber}</span>
            </p>
          )}
          <p className="text-gray-600">
            {isVerifying 
              ? 'Wir überprüfen Ihre Zahlung. Bitte warten Sie einen Moment...'
              : paymentVerified 
                ? 'Ihre Zahlung wurde erfolgreich verarbeitet. Sie erhalten in Kürze eine Bestätigungsemail.'
                : 'Ihre Zahlung wird verarbeitet. Sie erhalten eine Bestätigungsemail, sobald die Zahlung abgeschlossen ist.'
            }
          </p>
          <div className="pt-4">
            <Button 
              onClick={() => navigate('/')}
              className="w-full"
              disabled={isVerifying}
            >
              Zur Startseite
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
