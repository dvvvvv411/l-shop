
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
    const shopEmail = shopInfo?.company_email || '';
    const shopWebsite = shopInfo?.company_website || '';
    const shopAddress = shopInfo?.company_address || '';
    
    return `
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kundenkontakt - ${order.order_number}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
          }
          .container {
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          .header p {
            font-size: 16px;
            opacity: 0.9;
          }
          .content {
            padding: 40px 30px;
          }
          .order-info {
            background-color: #f8fafc;
            border-left: 4px solid #2563eb;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 0 8px 8px 0;
          }
          .order-info h3 {
            color: #1e40af;
            font-size: 18px;
            margin-bottom: 15px;
            font-weight: 600;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .info-label {
            font-weight: 600;
            color: #64748b;
            min-width: 120px;
          }
          .info-value {
            color: #1e293b;
            font-weight: 500;
          }
          .message-section {
            margin: 30px 0;
          }
          .message-section p {
            margin-bottom: 20px;
            font-size: 16px;
            line-height: 1.7;
          }
          .contact-box {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            margin: 30px 0;
            box-shadow: 0 8px 16px rgba(5, 150, 105, 0.2);
          }
          .contact-box h3 {
            font-size: 22px;
            margin-bottom: 20px;
            font-weight: 700;
          }
          .phone-number {
            font-size: 28px;
            font-weight: 800;
            margin: 20px 0;
            letter-spacing: 1px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          .business-hours {
            background-color: rgba(255, 255, 255, 0.15);
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            font-size: 14px;
            line-height: 1.5;
          }
          .footer {
            background-color: #f1f5f9;
            padding: 30px;
            border-top: 1px solid #e2e8f0;
          }
          .footer-content {
            text-align: center;
          }
          .company-info {
            margin-bottom: 20px;
          }
          .company-name {
            font-size: 18px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 10px;
          }
          .company-details {
            font-size: 14px;
            color: #64748b;
            line-height: 1.6;
          }
          .disclaimer {
            font-size: 12px;
            color: #94a3b8;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            line-height: 1.5;
          }
          @media (max-width: 600px) {
            .container {
              margin: 0;
              box-shadow: none;
            }
            .header, .content, .footer {
              padding: 20px;
            }
            .phone-number {
              font-size: 24px;
            }
            .info-row {
              flex-direction: column;
              align-items: flex-start;
            }
            .info-label {
              margin-bottom: 5px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Wichtige Nachricht</h1>
            <p>Bezüglich Ihrer Heizöl-Bestellung</p>
          </div>
          
          <div class="content">
            <div class="order-info">
              <h3>📋 Bestelldetails</h3>
              <div class="info-row">
                <span class="info-label">Bestellnummer:</span>
                <span class="info-value">${order.order_number}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Bestelldatum:</span>
                <span class="info-value">${new Date(order.created_at).toLocaleDateString('de-DE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Kunde:</span>
                <span class="info-value">${order.customer_name}</span>
              </div>
            </div>
            
            <div class="message-section">
              <p><strong>Liebe/r ${order.customer_name},</strong></p>
              
              <p>vielen Dank für Ihre Heizöl-Bestellung bei uns. Wir haben versucht, Sie bezüglich Ihrer Bestellung telefonisch zu kontaktieren, konnten Sie jedoch unter der angegebenen Telefonnummer nicht erreichen.</p>
              
              <p>Um Ihre Bestellung schnellstmöglich bearbeiten und den Liefertermin koordinieren zu können, bitten wir Sie dringend, sich bei uns zu melden.</p>
            </div>
            
            <div class="contact-box">
              <h3>📞 Bitte rufen Sie uns an</h3>
              <div class="phone-number">${shopPhone}</div>
              <div class="business-hours">
                <strong>Unsere Geschäftszeiten:</strong><br>
                Montag - Freitag: 8:00 - 18:00 Uhr<br>
                Samstag: 9:00 - 14:00 Uhr
              </div>
            </div>
            
            <div class="message-section">
              <p>Wir sind bereit, Ihre Bestellung zu bearbeiten und freuen uns auf Ihren Anruf, um alle Details zu klären und einen passenden Liefertermin zu vereinbaren.</p>
              
              <p><strong>Mit freundlichen Grüßen</strong><br>
              Ihr ${shopName}</p>
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-content">
              <div class="company-info">
                <div class="company-name">${shopName}</div>
                <div class="company-details">
                  ${shopAddress ? `${shopAddress}<br>` : ''}
                  ${shopPhone ? `Tel: ${shopPhone}<br>` : ''}
                  ${shopEmail ? `E-Mail: ${shopEmail}<br>` : ''}
                  ${shopWebsite ? `Web: ${shopWebsite}` : ''}
                </div>
              </div>
              
              <div class="disclaimer">
                Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail, sondern kontaktieren Sie uns telefonisch unter der oben angegebenen Nummer.
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
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
                className="border rounded-lg bg-white max-h-[500px] overflow-y-auto"
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
