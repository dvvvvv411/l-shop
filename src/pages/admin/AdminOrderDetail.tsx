
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, Package, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import StatusBadge from '@/components/admin/StatusBadge';
import OrderTimeline from '@/components/admin/OrderTimeline';
import OrderActions from '@/components/admin/OrderActions';
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb';
import { useToast } from '@/hooks/use-toast';
import type { Order } from '@/hooks/useOrders';

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Demo order data - in a real app, this would come from an API
  // Mapping demo data to match the database Order type
  const orders: Order[] = [
    {
      id: '1',
      order_number: 'HO-2024-001',
      created_at: '2024-01-15T09:30:00Z',
      updated_at: '2024-01-15T09:30:00Z',
      customer_name: 'Max Mustermann',
      customer_email: 'max.mustermann@email.de',
      customer_phone: '+49 30 12345678',
      customer_address: 'Musterstraße 123',
      delivery_first_name: 'Max',
      delivery_last_name: 'Mustermann',
      delivery_street: 'Musterstraße 123',
      delivery_postcode: '12345',
      delivery_city: 'Berlin',
      delivery_phone: '+49 30 12345678',
      billing_first_name: 'Max',
      billing_last_name: 'Mustermann',
      billing_street: 'Musterstraße 123',
      billing_postcode: '12345',
      billing_city: 'Berlin',
      use_same_address: true,
      product: 'Heizöl Standard',
      liters: 1500,
      amount: 1500,
      price_per_liter: 0.82,
      base_price: 1230.00,
      delivery_fee: 45.50,
      discount: 0,
      total_amount: 1275.50,
      payment_method: 'vorkasse',
      status: 'pending',
      notes: 'Bitte zwischen 10-16 Uhr liefern',
      delivery_date: '2024-01-16',
      delivery_date_display: '16.01.2024',
      invoice_number: null,
      invoice_date: null,
      request_id: null,
      supplier_id: null,
      shop_id: null,
      processed_by: null
    },
    {
      id: '2',
      order_number: 'HO-2024-002',
      created_at: '2024-01-15T10:15:00Z',
      updated_at: '2024-01-15T10:15:00Z',
      customer_name: 'Anna Schmidt',
      customer_email: 'anna.schmidt@email.de',
      customer_phone: '+49 40 87654321',
      customer_address: 'Hauptstraße 45',
      delivery_first_name: 'Anna',
      delivery_last_name: 'Schmidt',
      delivery_street: 'Hauptstraße 45',
      delivery_postcode: '54321',
      delivery_city: 'Hamburg',
      delivery_phone: '+49 40 87654321',
      billing_first_name: 'Anna',
      billing_last_name: 'Schmidt',
      billing_street: 'Hauptstraße 45',
      billing_postcode: '54321',
      billing_city: 'Hamburg',
      use_same_address: true,
      product: 'Heizöl Premium',
      liters: 2000,
      amount: 2000,
      price_per_liter: 0.89,
      base_price: 1780.00,
      delivery_fee: 50.00,
      discount: 100,
      total_amount: 1890.00,
      payment_method: 'lastschrift',
      status: 'confirmed',
      notes: null,
      delivery_date: '2024-01-16',
      delivery_date_display: '16.01.2024',
      invoice_number: null,
      invoice_date: null,
      request_id: null,
      supplier_id: null,
      shop_id: null,
      processed_by: null
    }
  ];

  const order = orders.find(o => o.id === orderId);
  const [currentStatus, setCurrentStatus] = useState(order?.status || 'pending');

  const orderIndex = orders.findIndex(o => o.id === orderId);
  const hasPrevious = orderIndex > 0;
  const hasNext = orderIndex < orders.length - 1;

  // Demo timeline events
  const timelineEvents = useMemo(() => [
    {
      id: '1',
      status: 'Neu',
      timestamp: '15.01.2024 09:30',
      description: 'Bestellung eingegangen',
      user: 'System'
    },
    ...(currentStatus !== 'pending' ? [{
      id: '2',
      status: 'Bezahlt',
      timestamp: '15.01.2024 14:20',
      description: 'Zahlung erhalten',
      user: 'Admin'
    }] : []),
    ...(currentStatus === 'shipped' || currentStatus === 'completed' ? [{
      id: '3',
      status: 'Versandt',
      timestamp: '16.01.2024 08:15',
      description: 'Lieferung gestartet',
      user: 'Fahrer'
    }] : []),
    ...(currentStatus === 'completed' ? [{
      id: '4',
      status: 'Abgeschlossen',
      timestamp: '16.01.2024 11:30',
      description: 'Lieferung abgeschlossen',
      user: 'Fahrer'
    }] : [])
  ], [currentStatus]);

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bestellung nicht gefunden</h2>
        <Button onClick={() => navigate('/admin/orders')}>
          Zurück zur Übersicht
        </Button>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Admin', href: '/admin' },
    { label: 'Bestellungen', href: '/admin/orders' },
    { label: order.order_number }
  ];

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus as typeof currentStatus);
    toast({
      title: "Status aktualisiert",
      description: `Bestellung ${order.order_number} wurde auf "${newStatus}" gesetzt.`,
    });
  };

  const handleNavigateOrder = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? orderIndex - 1 : orderIndex + 1;
    if (newIndex >= 0 && newIndex < orders.length) {
      navigate(`/admin/orders/${orders[newIndex].id}`);
    }
  };

  const handleGenerateInvoice = () => {
    toast({
      title: "Rechnung generiert",
      description: "Die Rechnung wird heruntergeladen...",
    });
  };

  const handlePrintDeliveryNote = () => {
    toast({
      title: "Lieferschein gedruckt",
      description: "Der Lieferschein wird gedruckt...",
    });
  };

  const subtotal = order.liters * Number(order.price_per_liter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <AdminBreadcrumb items={breadcrumbItems} />
          <div className="flex items-center gap-4 mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/orders')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{order.order_number}</h1>
              <p className="text-gray-600">
                {new Date(order.created_at).toLocaleDateString('de-DE')} um {new Date(order.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
        <StatusBadge status={currentStatus} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Kundeninformationen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Kontaktdaten</h4>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">{order.customer_name}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {order.customer_email}
                        </p>
                        {order.customer_phone && (
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {order.customer_phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Lieferadresse
                      </h4>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">{order.delivery_street}</p>
                        <p className="text-sm text-gray-600">{order.delivery_postcode} {order.delivery_city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Bestelldetails
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{order.product}</h4>
                      <p className="text-sm text-gray-600">{order.liters.toLocaleString()} Liter</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{Number(order.price_per_liter).toFixed(2)}/L</p>
                      <p className="text-sm text-gray-600">€{subtotal.toFixed(2)}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zwischensumme</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lieferkosten</span>
                      <span>€{Number(order.delivery_fee).toFixed(2)}</span>
                    </div>
                    {Number(order.discount) > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Rabatt</span>
                        <span>-€{Number(order.discount).toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Gesamtsumme</span>
                      <span>€{Number(order.total_amount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Zahlungsinformationen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Zahlungsart</span>
                    <span className="font-medium">{order.payment_method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <StatusBadge status={currentStatus} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notes */}
          {order.notes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Notizen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{order.notes}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OrderActions
              order={order}
              currentStatus={currentStatus}
              onStatusChange={handleStatusChange}
              onGenerateInvoice={handleGenerateInvoice}
              onPrintDeliveryNote={handlePrintDeliveryNote}
              onNavigateOrder={handleNavigateOrder}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <OrderTimeline events={timelineEvents} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
