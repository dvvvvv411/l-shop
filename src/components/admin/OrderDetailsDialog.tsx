
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/hooks/useOrders';
import StatusBadge from './StatusBadge';

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            Bestellung {order.order_number}
            <StatusBadge status={order.status} />
          </DialogTitle>
        </DialogHeader>

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

          {/* Product Information */}
          <Card className="md:col-span-2">
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
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
