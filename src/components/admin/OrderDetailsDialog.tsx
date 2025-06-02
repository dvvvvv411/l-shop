
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Truck, CheckCircle, Receipt, Eye, ExternalLink } from 'lucide-react';
import { Order } from '@/hooks/useOrders';
import { useInvoiceGeneration } from '@/hooks/useInvoiceGeneration';
import StatusBadge from './StatusBadge';
import InvoiceCreationDialog from './InvoiceCreationDialog';
import InvoiceViewerDialog from './InvoiceViewerDialog';

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdate?: (orderId: string, updatedData: Partial<Order>) => void;
  onStatusChange?: (orderId: string, status: string) => void;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
  onOrderUpdate,
  onStatusChange,
}) => {
  const { generateInvoice, isGenerating } = useInvoiceGeneration();
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isInvoiceViewerOpen, setIsInvoiceViewerOpen] = useState(false);

  if (!order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const handleGenerateInvoice = async () => {
    try {
      const result = await generateInvoice(order.id);
      if (result && result.updatedOrder && onOrderUpdate) {
        onOrderUpdate(order.id, result.updatedOrder);
      }
    } catch (error) {
      console.error('Failed to generate invoice:', error);
    }
  };

  const handleViewInvoice = () => {
    setIsInvoiceViewerOpen(true);
  };

  const handleViewPDF = () => {
    if (order.invoice_file_url) {
      window.open(order.invoice_file_url, '_blank');
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (onStatusChange) {
      onStatusChange(order.id, newStatus);
    }
  };

  const handleOrderUpdateFromDialog = (orderId: string, updatedData: Partial<Order>) => {
    if (onOrderUpdate) {
      onOrderUpdate(orderId, updatedData);
    }
  };

  const handlePrintDeliveryNote = () => {
    console.log('Print delivery note for order:', order.id);
    // TODO: Implement delivery note printing
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4">
              Bestellung {order.order_number}
              <StatusBadge status={order.status} />
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Schnellaktionen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setIsInvoiceDialogOpen(true)}
                  >
                    <Receipt className="h-4 w-4 mr-2" />
                    Rechnung erstellen
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleGenerateInvoice}
                    disabled={isGenerating}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {isGenerating ? 'Generiere Rechnung...' : 'Rechnung (Schnell)'}
                  </Button>
                  {order.invoice_file_url && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleViewPDF}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      PDF anzeigen
                    </Button>
                  )}
                  {(order.invoice_file_url && order.invoice_number) && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleViewInvoice}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Rechnung anzeigen
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handlePrintDeliveryNote}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Lieferschein drucken
                  </Button>
                  {(order.status === 'confirmed' || order.status === 'invoice_created') && (
                    <Button
                      className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleStatusChange('shipped')}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      Als versandt markieren
                    </Button>
                  )}
                  {order.status === 'shipped' && (
                    <Button
                      className="w-full justify-start bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusChange('completed')}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Als abgeschlossen markieren
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Details Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Bestellinformationen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium">Bestellnummer:</span>
                      <span className="ml-2">{order.order_number}</span>
                    </div>
                    <div>
                      <span className="font-medium">Erstellt am:</span>
                      <span className="ml-2">{formatDate(order.created_at)}</span>
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <span className="ml-2">
                        <StatusBadge status={order.status} />
                      </span>
                    </div>
                    {order.delivery_date && (
                      <div>
                        <span className="font-medium">Lieferdatum:</span>
                        <span className="ml-2">{new Date(order.delivery_date).toLocaleDateString('de-DE')}</span>
                      </div>
                    )}
                    {order.notes && (
                      <div>
                        <span className="font-medium">Notizen:</span>
                        <span className="ml-2">{order.notes}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Kundendaten</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium">Name:</span>
                      <span className="ml-2">{order.customer_name}</span>
                    </div>
                    <div>
                      <span className="font-medium">E-Mail:</span>
                      <span className="ml-2">{order.customer_email}</span>
                    </div>
                    {order.customer_phone && (
                      <div>
                        <span className="font-medium">Telefon:</span>
                        <span className="ml-2">{order.customer_phone}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Adresse:</span>
                      <span className="ml-2">{order.customer_address}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Information */}
                {(order.delivery_first_name || order.delivery_street || order.delivery_postcode) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Lieferadresse</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {(order.delivery_first_name || order.delivery_last_name) && (
                        <div>
                          <span className="font-medium">Name:</span>
                          <span className="ml-2">{order.delivery_first_name} {order.delivery_last_name}</span>
                        </div>
                      )}
                      {order.delivery_street && (
                        <div>
                          <span className="font-medium">Straße:</span>
                          <span className="ml-2">{order.delivery_street}</span>
                        </div>
                      )}
                      {(order.delivery_postcode || order.delivery_city) && (
                        <div>
                          <span className="font-medium">Ort:</span>
                          <span className="ml-2">{order.delivery_postcode} {order.delivery_city}</span>
                        </div>
                      )}
                      {order.delivery_phone && (
                        <div>
                          <span className="font-medium">Telefon:</span>
                          <span className="ml-2">{order.delivery_phone}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Billing Information */}
                {(order.billing_first_name || order.billing_street || order.billing_postcode) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Rechnungsadresse</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {(order.billing_first_name || order.billing_last_name) && (
                        <div>
                          <span className="font-medium">Name:</span>
                          <span className="ml-2">{order.billing_first_name} {order.billing_last_name}</span>
                        </div>
                      )}
                      {order.billing_street && (
                        <div>
                          <span className="font-medium">Straße:</span>
                          <span className="ml-2">{order.billing_street}</span>
                        </div>
                      )}
                      {(order.billing_postcode || order.billing_city) && (
                        <div>
                          <span className="font-medium">Ort:</span>
                          <span className="ml-2">{order.billing_postcode} {order.billing_city}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Product Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Produktdetails</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <span className="font-medium">Produkt:</span>
                      <div className="mt-1">
                        <Badge variant="secondary">{order.product || 'Standard Heizöl'}</Badge>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Menge:</span>
                      <div className="mt-1 text-lg font-semibold">{order.liters.toLocaleString()} L</div>
                    </div>
                    <div>
                      <span className="font-medium">Preis pro Liter:</span>
                      <div className="mt-1">{formatCurrency(order.price_per_liter)}</div>
                    </div>
                    <div>
                      <span className="font-medium">Gesamtpreis:</span>
                      <div className="mt-1 text-lg font-semibold text-green-600">{formatCurrency(order.total_amount)}</div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {order.base_price && (
                      <div>
                        <span className="font-medium">Grundpreis:</span>
                        <div className="mt-1">{formatCurrency(order.base_price)}</div>
                      </div>
                    )}
                    {order.delivery_fee && (
                      <div>
                        <span className="font-medium">Liefergebühr:</span>
                        <div className="mt-1">{formatCurrency(order.delivery_fee)}</div>
                      </div>
                    )}
                    {order.discount && (
                      <div>
                        <span className="font-medium">Rabatt:</span>
                        <div className="mt-1 text-red-600">-{formatCurrency(order.discount)}</div>
                      </div>
                    )}
                  </div>

                  {order.payment_method && (
                    <div className="mt-4">
                      <span className="font-medium">Zahlungsmethode:</span>
                      <span className="ml-2">{order.payment_method}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invoice Creation Dialog */}
      <InvoiceCreationDialog
        order={order}
        isOpen={isInvoiceDialogOpen}
        onClose={() => setIsInvoiceDialogOpen(false)}
        onOrderUpdate={handleOrderUpdateFromDialog}
      />

      {/* Invoice Viewer Dialog */}
      <InvoiceViewerDialog
        order={order}
        isOpen={isInvoiceViewerOpen}
        onClose={() => setIsInvoiceViewerOpen(false)}
      />
    </>
  );
};

export default OrderDetailsDialog;
