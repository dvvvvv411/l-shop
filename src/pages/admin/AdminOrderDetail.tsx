
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

type Order = {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  customer: string;
  email: string;
  phone: string;
  postalCode: string;
  city: string;
  address: string;
  product: string;
  quantity: number;
  pricePerLiter: number;
  totalPrice: number;
  deliveryFee: number;
  discount: number;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'completed';
  notes?: string;
};

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Demo order data - in a real app, this would come from an API
  const orders: Order[] = [
    {
      id: '1', orderNumber: 'HO-2024-001', date: '2024-01-15', time: '09:30',
      customer: 'Max Mustermann', email: 'max.mustermann@email.de', phone: '+49 30 12345678',
      postalCode: '12345', city: 'Berlin', address: 'Musterstraße 123',
      product: 'Heizöl Standard', quantity: 1500, pricePerLiter: 0.82, totalPrice: 1275.50,
      deliveryFee: 45.00, discount: 0, paymentMethod: 'Rechnung',
      status: 'pending', notes: 'Bitte zwischen 10-16 Uhr liefern'
    },
    {
      id: '2', orderNumber: 'HO-2024-002', date: '2024-01-15', time: '10:15',
      customer: 'Anna Schmidt', email: 'anna.schmidt@email.de', phone: '+49 40 87654321',
      postalCode: '54321', city: 'Hamburg', address: 'Hauptstraße 45',
      product: 'Heizöl Premium', quantity: 2000, pricePerLiter: 0.89, totalPrice: 1890.00,
      deliveryFee: 50.00, discount: 100, paymentMethod: 'Lastschrift',
      status: 'confirmed'
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
    { label: order.orderNumber }
  ];

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus as typeof currentStatus);
    toast({
      title: "Status aktualisiert",
      description: `Bestellung ${order.orderNumber} wurde auf "${newStatus}" gesetzt.`,
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

  const subtotal = order.quantity * order.pricePerLiter;

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
              <h1 className="text-3xl font-bold text-gray-900">{order.orderNumber}</h1>
              <p className="text-gray-600">
                {order.date} um {order.time}
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
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {order.email}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {order.phone}
                        </p>
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
                        <p className="text-sm text-gray-600">{order.address}</p>
                        <p className="text-sm text-gray-600">{order.postalCode} {order.city}</p>
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
                      <p className="text-sm text-gray-600">{order.quantity.toLocaleString()} Liter</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{order.pricePerLiter.toFixed(2)}/L</p>
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
                      <span>€{order.deliveryFee.toFixed(2)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Rabatt</span>
                        <span>-€{order.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Gesamtsumme</span>
                      <span>€{order.totalPrice.toFixed(2)}</span>
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
                    <span className="font-medium">{order.paymentMethod}</span>
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
