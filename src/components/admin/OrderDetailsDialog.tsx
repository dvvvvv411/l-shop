
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Receipt, Eye, CheckCircle, Globe, ArrowUpDown, ArrowDown, Mail } from 'lucide-react';
import { Order } from '@/hooks/useOrders';
import StatusBadge from './StatusBadge';
import InvoiceCreationDialog from './InvoiceCreationDialog';
import InvoiceViewerDialog from './InvoiceViewerDialog';
import OrderNotesSection from './OrderNotesSection';
import OrderStatusHistorySection from './OrderStatusHistorySection';
import { useOrderStatusHistory } from '@/hooks/useOrderStatusHistory';

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
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isInvoiceViewerOpen, setIsInvoiceViewerOpen] = useState(false);
  const { addStatusChange } = useOrderStatusHistory(order?.id || '');

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

  const isValidUrl = (string: string) => {
    try {
      new URL(string.startsWith('http') ? string : `https://${string}`);
      return true;
    } catch (_) {
      return false;
    }
  };

  const formatDomainUrl = (domain: string) => {
    if (domain.startsWith('http')) {
      return domain;
    }
    return `https://${domain}`;
  };

  const handleViewInvoice = () => {
    setIsInvoiceViewerOpen(true);
  };

  const handleMarkAsPaid = async () => {
    if (onStatusChange) {
      const oldStatus = order.status;
      onStatusChange(order.id, 'confirmed');
      
      // Log the status change
      try {
        await addStatusChange(oldStatus, 'confirmed');
      } catch (error) {
        console.error('Failed to log status change:', error);
      }
    }
  };

  const handleMarkAsExchanged = async () => {
    if (onStatusChange) {
      const oldStatus = order.status;
      onStatusChange(order.id, 'exchanged');
      
      // Log the status change
      try {
        await addStatusChange(oldStatus, 'exchanged');
      } catch (error) {
        console.error('Failed to log status change:', error);
      }
    }
  };

  const handleMarkAsDown = async () => {
    if (onStatusChange) {
      const oldStatus = order.status;
      onStatusChange(order.id, 'down');
      
      // Log the status change
      try {
        await addStatusChange(oldStatus, 'down');
      } catch (error) {
        console.error('Failed to log status change:', error);
      }
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (onStatusChange) {
      const oldStatus = order.status;
      onStatusChange(order.id, newStatus);
      
      // Log the status change
      try {
        await addStatusChange(oldStatus, newStatus);
      } catch (error) {
        console.error('Failed to log status change:', error);
      }
    }
  };

  const handleOrderUpdateFromDialog = (orderId: string, updatedData: Partial<Order>) => {
    if (onOrderUpdate) {
      onOrderUpdate(orderId, updatedData);
    }
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
                <CardContent className="space-y-4">
                  {/* Status Change Dropdown */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Status ändern
                    </label>
                    <Select value={order.status} onValueChange={handleStatusChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Neu</SelectItem>
                        <SelectItem value="confirmed">Bezahlt</SelectItem>
                        <SelectItem value="invoice_created">Rechnung erstellt</SelectItem>
                        <SelectItem value="exchanged">Exchanged</SelectItem>
                        <SelectItem value="down">Down</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setIsInvoiceDialogOpen(true)}
                    >
                      <Receipt className="h-4 w-4 mr-2" />
                      Rechnung erstellen
                    </Button>
                    {order.status === 'invoice_created' && (
                      <Button
                        variant="outline"
                        className="w-full justify-start text-green-700 border-green-200 hover:bg-green-50"
                        onClick={handleMarkAsPaid}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Als bezahlt markieren
                      </Button>
                    )}
                    {order.status === 'confirmed' && (
                      <>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-green-700 border-green-200 hover:bg-green-50"
                          onClick={handleMarkAsExchanged}
                        >
                          <ArrowUpDown className="h-4 w-4 mr-2" />
                          Als Exchanged markieren
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-700 border-red-200 hover:bg-red-50"
                          onClick={handleMarkAsDown}
                        >
                          <ArrowDown className="h-4 w-4 mr-2" />
                          Als Down markieren
                        </Button>
                      </>
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
                  </div>
                </CardContent>
              </Card>

              {/* Status History Section */}
              <div className="mt-6">
                <OrderStatusHistorySection orderId={order.id} />
              </div>
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
                    {order.origin_domain && (
                      <div>
                        <span className="font-medium">Domain:</span>
                        <span className="ml-2 flex items-center gap-1">
                          <Globe className="h-3 w-3 text-gray-400" />
                          {isValidUrl(order.origin_domain) ? (
                            <a
                              href={formatDomainUrl(order.origin_domain)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {order.origin_domain}
                            </a>
                          ) : (
                            <span className="text-gray-600">{order.origin_domain}</span>
                          )}
                        </span>
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

                {/* Customer Information with Email */}
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
                      <span className="font-medium flex items-center gap-1">
                        <Mail className="h-4 w-4 text-blue-500" />
                        E-Mail:
                      </span>
                      <span className="ml-2">
                        <a 
                          href={`mailto:${order.customer_email}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {order.customer_email}
                        </a>
                      </span>
                    </div>
                    {order.customer_phone && (
                      <div>
                        <span className="font-medium">Telefon:</span>
                        <span className="ml-2">
                          <a 
                            href={`tel:${order.customer_phone}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {order.customer_phone}
                          </a>
                        </span>
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
                          <span className="ml-2">
                            <a 
                              href={`tel:${order.delivery_phone}`}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {order.delivery_phone}
                            </a>
                          </span>
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

              {/* Order Notes Section */}
              <OrderNotesSection orderId={order.id} />
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
