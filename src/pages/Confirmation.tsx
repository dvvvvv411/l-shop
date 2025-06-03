
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, FileText, CreditCard, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/contexts/OrderContext';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData, clearOrderData } = useOrder();
  
  // Get order number and email from location state
  const orderNumber = location.state?.orderNumber || orderData?.orderNumber;
  const customerEmail = location.state?.email || orderData?.email;

  useEffect(() => {
    // If no order data, redirect to home
    if (!orderNumber) {
      navigate('/');
    }
  }, [orderNumber, navigate]);

  const handleBackToHome = () => {
    clearOrderData();
    navigate('/');
  };

  if (!orderNumber) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {/* Success Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Vielen Dank für Ihre Bestellung!
              </h1>
              
              <p className="text-lg text-gray-600">
                Ihre Bestellung wurde erfolgreich eingegangen und wird bearbeitet.
              </p>
            </div>

            {/* Order Details */}
            <div className="space-y-6">
              {/* Order Number */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Bestellnummer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {orderNumber}
                  </div>
                  <p className="text-gray-600 mt-2">
                    Bitte notieren Sie sich diese Bestellnummer für Ihre Unterlagen.
                  </p>
                </CardContent>
              </Card>

              {/* Email Confirmation */}
              {customerEmail && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-green-600" />
                      Bestätigungs-E-Mail
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Eine Bestätigungs-E-Mail wurde an{' '}
                      <span className="font-semibold text-blue-600">{customerEmail}</span>{' '}
                      gesendet.
                    </p>
                    <p className="text-gray-600 mt-2 text-sm">
                      Falls Sie keine E-Mail erhalten haben, überprüfen Sie bitte Ihren Spam-Ordner.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-red-600" />
                    Nächste Schritte
                  </CardTitle>
                  <CardDescription>
                    So geht es jetzt weiter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-600 font-semibold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Rechnung per E-Mail</h4>
                        <p className="text-gray-600 text-sm">
                          Sie erhalten in Kürze eine Rechnung mit den Zahlungsdetails per E-Mail.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-600 font-semibold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Zahlung per Überweisung</h4>
                        <p className="text-gray-600 text-sm">
                          Überweisen Sie den Rechnungsbetrag auf das angegebene Bankkonto.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-600 font-semibold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Lieferung nach Zahlungseingang</h4>
                        <p className="text-gray-600 text-sm">
                          Nach Zahlungseingang wird Ihr Heizöl zeitnah geliefert.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    Fragen zur Bestellung?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Bei Fragen zu Ihrer Bestellung können Sie uns gerne kontaktieren:
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>E-Mail: info@heizoel-handel.de</div>
                    <div>Telefon: +49 (0) 123 456 789</div>
                    <div>Montag - Freitag: 08:00 - 18:00 Uhr</div>
                  </div>
                </CardContent>
              </Card>

              {/* Back to Home Button */}
              <div className="text-center pt-6">
                <Button
                  onClick={handleBackToHome}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
                >
                  Zurück zur Startseite
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Confirmation;
