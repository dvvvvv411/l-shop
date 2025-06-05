
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
import { Receipt, Eye, CheckCircle, Globe, ArrowUpDown, ArrowDown } from 'lucide-react';
import { Order } from '@/hooks/useOrders';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import StatusBadge from './StatusBadge';
import InvoiceCreationDialog from './InvoiceCreationDialog';
import InvoiceViewerDialog from './InvoiceViewerDialog';
import OrderNotesSection from './OrderNotesSection';
import OrderStatusHistorySection from './OrderStatusHistorySection';
import EditableCard from './EditableCard';
import EditableField from './EditableField';
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
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { addStatusChange } = useOrderStatusHistory(order?.id || '');

  // Editable field states
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [deliveryData, setDeliveryData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    postcode: '',
    city: '',
    phone: '',
  });

  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    postcode: '',
    city: '',
  });

  // Initialize data when order changes
  React.useEffect(() => {
    if (order) {
      setCustomerData({
        name: order.customer_name || '',
        email: order.customer_email || '',
        phone: order.customer_phone || '',
        address: order.customer_address || '',
      });

      setDeliveryData({
        firstName: order.delivery_first_name || '',
        lastName: order.delivery_last_name || '',
        street: order.delivery_street || '',
        postcode: order.delivery_postcode || '',
        city: order.delivery_city || '',
        phone: order.delivery_phone || '',
      });

      setBillingData({
        firstName: order.billing_first_name || '',
        lastName: order.billing_last_name || '',
        street: order.billing_street || '',
        postcode: order.billing_postcode || '',
        city: order.billing_city || '',
      });
    }
  }, [order]);

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

  const saveCustomerData = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          customer_name: customerData.name,
          customer_email: customerData.email,
          customer_phone: customerData.phone,
          customer_address: customerData.address,
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id);

      if (error) throw error;

      if (onOrderUpdate) {
        onOrderUpdate(order.id, {
          customer_name: customerData.name,
          customer_email: customerData.email,
          customer_phone: customerData.phone,
          customer_address: customerData.address,
        });
      }

      setEditingCard(null);
    } catch (error) {
      console.error('Error updating customer data:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const saveDeliveryData = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          delivery_first_name: deliveryData.firstName,
          delivery_last_name: deliveryData.lastName,
          delivery_street: deliveryData.street,
          delivery_postcode: deliveryData.postcode,
          delivery_city: deliveryData.city,
          delivery_phone: deliveryData.phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id);

      if (error) throw error;

      if (onOrderUpdate) {
        onOrderUpdate(order.id, {
          delivery_first_name: deliveryData.firstName,
          delivery_last_name: deliveryData.lastName,
          delivery_street: deliveryData.street,
          delivery_postcode: deliveryData.postcode,
          delivery_city: deliveryData.city,
          delivery_phone: deliveryData.phone,
        });
      }

      setEditingCard(null);
    } catch (error) {
      console.error('Error updating delivery data:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const saveBillingData = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          billing_first_name: billingData.firstName,
          billing_last_name: billingData.lastName,
          billing_street: billingData.street,
          billing_postcode: billingData.postcode,
          billing_city: billingData.city,
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id);

      if (error) throw error;

      if (onOrderUpdate) {
        onOrderUpdate(order.id, {
          billing_first_name: billingData.firstName,
          billing_last_name: billingData.lastName,
          billing_street: billingData.street,
          billing_postcode: billingData.postcode,
          billing_city: billingData.city,
        });
      }

      setEditingCard(null);
    } catch (error) {
      console.error('Error updating billing data:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset data to original values
    if (order) {
      setCustomerData({
        name: order.customer_name || '',
        email: order.customer_email || '',
        phone: order.customer_phone || '',
        address: order.customer_address || '',
      });

      setDeliveryData({
        firstName: order.delivery_first_name || '',
        lastName: order.delivery_last_name || '',
        street: order.delivery_street || '',
        postcode: order.delivery_postcode || '',
        city: order.delivery_city || '',
        phone: order.delivery_phone || '',
      });

      setBillingData({
        firstName: order.billing_first_name || '',
        lastName: order.billing_last_name || '',
        street: order.billing_street || '',
        postcode: order.billing_postcode || '',
        city: order.billing_city || '',
      });
    }
    setEditingCard(null);
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
                    {/* Generate Invoice - Only when status is pending */}
                    {order.status === 'pending' && (
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => setIsInvoiceDialogOpen(true)}
                      >
                        <Receipt className="h-4 w-4 mr-2" />
                        Rechnung erstellen
                      </Button>
                    )}
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

                {/* Customer Information */}
                <EditableCard
                  title="Kundendaten"
                  isEditing={editingCard === 'customer'}
                  onEditToggle={() => setEditingCard('customer')}
                  onSave={saveCustomerData}
                  onCancel={handleCancelEdit}
                  isSaving={isSaving}
                >
                  <EditableField
                    label="Name"
                    value={customerData.name}
                    isEditing={editingCard === 'customer'}
                    onSave={(value) => setCustomerData(prev => ({ ...prev, name: value }))}
                    onCancel={() => {}}
                    required
                  />
                  <EditableField
                    label="E-Mail"
                    value={customerData.email}
                    isEditing={editingCard === 'customer'}
                    onSave={(value) => setCustomerData(prev => ({ ...prev, email: value }))}
                    onCancel={() => {}}
                    required
                  />
                  <EditableField
                    label="Telefon"
                    value={customerData.phone}
                    isEditing={editingCard === 'customer'}
                    onSave={(value) => setCustomerData(prev => ({ ...prev, phone: value }))}
                    onCancel={() => {}}
                  />
                  <EditableField
                    label="Adresse"
                    value={customerData.address}
                    isEditing={editingCard === 'customer'}
                    onSave={(value) => setCustomerData(prev => ({ ...prev, address: value }))}
                    onCancel={() => {}}
                    required
                  />
                </EditableCard>

                {/* Delivery Information */}
                {(order.delivery_first_name || order.delivery_street || order.delivery_postcode || editingCard === 'delivery') && (
                  <EditableCard
                    title="Lieferadresse"
                    isEditing={editingCard === 'delivery'}
                    onEditToggle={() => setEditingCard('delivery')}
                    onSave={saveDeliveryData}
                    onCancel={handleCancelEdit}
                    isSaving={isSaving}
                  >
                    <EditableField
                      label="Vorname"
                      value={deliveryData.firstName}
                      isEditing={editingCard === 'delivery'}
                      onSave={(value) => setDeliveryData(prev => ({ ...prev, firstName: value }))}
                      onCancel={() => {}}
                    />
                    <EditableField
                      label="Nachname"
                      value={deliveryData.lastName}
                      isEditing={editingCard === 'delivery'}
                      onSave={(value) => setDeliveryData(prev => ({ ...prev, lastName: value }))}
                      onCancel={() => {}}
                    />
                    <EditableField
                      label="Straße"
                      value={deliveryData.street}
                      isEditing={editingCard === 'delivery'}
                      onSave={(value) => setDeliveryData(prev => ({ ...prev, street: value }))}
                      onCancel={() => {}}
                    />
                    <EditableField
                      label="PLZ"
                      value={deliveryData.postcode}
                      isEditing={editingCard === 'delivery'}
                      onSave={(value) => setDeliveryData(prev => ({ ...prev, postcode: value }))}
                      onCancel={() => {}}
                    />
                    <EditableField
                      label="Stadt"
                      value={deliveryData.city}
                      isEditing={editingCard === 'delivery'}
                      onSave={(value) => setDeliveryData(prev => ({ ...prev, city: value }))}
                      onCancel={() => {}}
                    />
                    <EditableField
                      label="Telefon"
                      value={deliveryData.phone}
                      isEditing={editingCard === 'delivery'}
                      onSave={(value) => setDeliveryData(prev => ({ ...prev, phone: value }))}
                      onCancel={() => {}}
                    />
                  </EditableCard>
                )}

                {/* Billing Information */}
                {(order.billing_first_name || order.billing_street || order.billing_postcode || editingCard === 'billing') && (
                  <EditableCard
                    title="Rechnungsadresse"
                    isEditing={editingCard === 'billing'}
                    onEditToggle={() => setEditingCard('billing')}
                    onSave={saveBillingData}
                    onCancel={handleCancelEdit}
                    isSaving={isSaving}
                  >
                    <EditableField
                      label="Vorname"
                      value={billingData.firstName}
                      isEditing={editingCard === 'billing'}
                      onSave={(value) => setBillingData(prev => ({ ...prev, firstName: value }))}
                      onCancel={() => {}}
                    />
                    <EditableField
                      label="Nachname"
                      value={billingData.lastName}
                      isEditing={editingCard === 'billing'}
                      onSave={(value) => setBillingData(prev => ({ ...prev, lastName: value }))}
                      onCancel={() => {}}
                    />
                    <EditableField
                      label="Straße"
                      value={billingData.street}
                      isEditing={editingCard === 'billing'}
                      onSave={(value) => setBillingData(prev => ({ ...prev, street: value }))}
                      onCancel={() => {}}
                    />
                    <EditableField
                      label="PLZ"
                      value={billingData.postcode}
                      isEditing={editingCard === 'billing'}
                      onSave={(value) => setBillingData(prev => ({ ...prev, postcode: value }))}
                      onCancel={() => {}}
                    />
                    <EditableField
                      label="Stadt"
                      value={billingData.city}
                      isEditing={editingCard === 'billing'}
                      onSave={(value) => setBillingData(prev => ({ ...prev, city: value }))}
                      onCancel={() => {}}
                    />
                  </EditableCard>
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
