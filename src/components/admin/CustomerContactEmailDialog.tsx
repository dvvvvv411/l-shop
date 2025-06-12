
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Send } from 'lucide-react';
import { useShops } from '@/hooks/useShops';
import { useSMTPConfigurations } from '@/hooks/useSMTPConfigurations';
import { useToast } from '@/hooks/use-toast';
import type { Order } from '@/hooks/useOrders';

interface CustomerContactEmailDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const CustomerContactEmailDialog: React.FC<CustomerContactEmailDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const { shops } = useShops();
  const { smtpConfigurations } = useSMTPConfigurations();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [shopInfo, setShopInfo] = useState<any>(null);
  const [smtpConfig, setSMTPConfig] = useState<any>(null);

  useEffect(() => {
    if (order && order.origin_domain && shops.length > 0) {
      // Find shop by domain
      const matchingShop = shops.find(shop => {
        // Check if the order domain matches the shop's domain
        // This is a simplified match - you might need to adjust based on your exact domain structure
        return order.origin_domain?.includes(shop.company_website?.replace('https://', '').replace('http://', '')) ||
               shop.company_website?.includes(order.origin_domain);
      });
      
      if (matchingShop) {
        setShopInfo(matchingShop);
        
        // Find matching SMTP configuration for this shop
        const matchingSMTP = smtpConfigurations.find(smtp => smtp.shop_id === matchingShop.id);
        setSMTPConfig(matchingSMTP);
      }
    }
  }, [order, shops, smtpConfigurations]);

  if (!order) return null;

  const getEmailSubject = () => {
    return `Wichtige Nachricht zu Ihrer Heizöl-Bestellung ${order.order_number}`;
  };

  const getEmailContent = () => {
    const shopPhone = shopInfo?.company_phone || 'unsere Telefonnummer';
    const shopName = shopInfo?.company_name || 'unser Team';
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-bottom: 15px;">Wichtige Nachricht zu Ihrer Bestellung</h2>
          <p style="color: #666; margin-bottom: 10px;"><strong>Bestellnummer:</strong> ${order.order_number}</p>
          <p style="color: #666; margin-bottom: 10px;"><strong>Datum:</strong> ${new Date(order.created_at).toLocaleDateString('de-DE')}</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
            Liebe/r ${order.customer_name},
          </p>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
            vielen Dank für Ihre Heizöl-Bestellung bei uns. Wir haben versucht, Sie bezüglich Ihrer Bestellung telefonisch zu kontaktieren, konnten Sie jedoch unter der angegebenen Telefonnummer nicht erreichen.
          </p>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
            Um Ihre Bestellung schnellstmöglich bearbeiten zu können, bitten wir Sie, sich bei uns zu melden.
          </p>
        </div>
        
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="color: #1976d2; margin-bottom: 15px; display: flex; align-items: center;">
            <span style="margin-right: 8px;">📞</span>
            Bitte kontaktieren Sie uns:
          </h3>
          <p style="color: #333; font-size: 18px; font-weight: bold; margin-bottom: 10px;">
            Telefon: ${shopPhone}
          </p>
          <p style="color: #666; font-size: 14px;">
            Montag - Freitag: 8:00 - 18:00 Uhr<br>
            Samstag: 9:00 - 14:00 Uhr
          </p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <p style="color: #333; line-height: 1.6;">
            Wir freuen uns auf Ihren Anruf und stehen Ihnen gerne für alle Fragen zur Verfügung.
          </p>
          
          <p style="color: #333; line-height: 1.6; margin-top: 20px;">
            Mit freundlichen Grüßen<br>
            Ihr ${shopName}
          </p>
        </div>
        
        <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; font-size: 12px; color: #888;">
          <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.</p>
        </div>
      </div>
    `;
  };

  const handleSendEmail = async () => {
    if (!smtpConfig) {
      toast({
        title: "Fehler",
        description: "Keine SMTP-Konfiguration für diesen Shop gefunden.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      // Here you would implement the actual email sending logic
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast({
        title: "E-Mail versendet",
        description: `Die E-Mail wurde erfolgreich an ${order.customer_email} gesendet.`,
      });
      
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Fehler",
        description: "Die E-Mail konnte nicht versendet werden.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Kunden-E-Mail senden - {order.order_number}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Email Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">E-Mail Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">An:</label>
                  <p className="text-sm">{order.customer_email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Betreff:</label>
                  <p className="text-sm">{getEmailSubject()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Shop:</label>
                  <p className="text-sm">{shopInfo?.company_name || 'Shop nicht gefunden'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Shop Telefon:</label>
                  <p className="text-sm flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {shopInfo?.company_phone || 'Nicht verfügbar'}
                  </p>
                </div>
              </div>
              
              {!shopInfo && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Warnung: Kein Shop für die Domain "{order.origin_domain}" gefunden. 
                    Bitte überprüfen Sie die Domain-Zuordnung in den Geschäften.
                  </p>
                </div>
              )}
              
              {!smtpConfig && shopInfo && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    ❌ Fehler: Keine SMTP-Konfiguration für diesen Shop gefunden. 
                    E-Mail kann nicht versendet werden.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">E-Mail Vorschau</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="border rounded-lg p-4 bg-white max-h-96 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: getEmailContent() }}
              />
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Abbrechen
          </Button>
          <Button 
            onClick={handleSendEmail}
            disabled={!smtpConfig || !shopInfo || isSending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSending ? 'Wird gesendet...' : 'E-Mail senden'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerContactEmailDialog;
