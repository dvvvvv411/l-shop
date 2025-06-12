
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Phone, CreditCard, Globe, Copy, Clock, Receipt, Truck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import StatusBadge from '@/components/admin/StatusBadge';
import OrderFilters from '@/components/admin/OrderFilters';
import BulkActions from '@/components/admin/BulkActions';
import OrderDetailsDialog from '@/components/admin/OrderDetailsDialog';
import InvoiceCreationDialog from '@/components/admin/InvoiceCreationDialog';
import InvoiceViewerDialog from '@/components/admin/InvoiceViewerDialog';
import OrderTableActions from '@/components/admin/OrderTableActions';
import OrdersStatsCards from '@/components/admin/OrdersStatsCards';
import { useOrders, Order } from '@/hooks/useOrders';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import { useToast } from '@/hooks/use-toast';

const AdminOrders = () => {
  const { orders, isLoading, updateOrderStatus, hideOrder, unhideOrder, updateOrder } = useOrders();
  const { getBankAccountSystemName } = useBankAccounts();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('alle');
  const [showHidden, setShowHidden] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [selectedOrderForInvoiceView, setSelectedOrderForInvoiceView] = useState<Order | null>(null);
  const [isInvoiceViewerOpen, setIsInvoiceViewerOpen] = useState(false);
  const { toast } = useToast();
  const ordersPerPage = 20;

  // Filter orders based on search, status, and hidden visibility
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.delivery_postcode && order.delivery_postcode.includes(searchTerm)) ||
        (order.customer_phone && order.customer_phone.includes(searchTerm));
      
      const matchesStatus = statusFilter === 'alle' || order.status === statusFilter;
      
      // If showHidden is false, exclude hidden orders; if true, include all orders
      const matchesHiddenFilter = showHidden || !order.is_hidden;
      
      return matchesSearch && matchesStatus && matchesHiddenFilter;
    });
  }, [orders, searchTerm, statusFilter, showHidden]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // New orders count (using 'pending' instead of 'Neu')
  const newOrdersCount = orders.filter(order => order.status === 'pending' && !order.is_hidden).length;

  // Helper function to get German payment method label
  const getPaymentMethodLabel = (paymentMethod: string | null | undefined) => {
    switch (paymentMethod) {
      case 'vorkasse':
        return 'Vorkasse';
      case 'rechnung':
        return 'Rechnung';
      default:
        return 'Vorkasse'; // Default to Vorkasse if not specified
    }
  };

  // Helper function to check if delivery address differs from billing
  const hasDifferentDeliveryAddress = (order: Order) => {
    // If use_same_address is explicitly false, then they have different addresses
    if (order.use_same_address === false) return true;
    
    // If use_same_address is true, then they should be the same
    if (order.use_same_address === true) return false;
    
    // If use_same_address is null/undefined, we need to compare the actual addresses
    // Check if delivery fields exist and are filled
    if (!order.delivery_street || !order.delivery_postcode || !order.delivery_city) {
      // No delivery address specified, so they're using billing address
      return false;
    }
    
    // Compare delivery address with billing address
    const deliveryAddress = `${order.delivery_street.trim().toLowerCase()} ${order.delivery_postcode.trim()} ${order.delivery_city.trim().toLowerCase()}`;
    
    // Build billing address from available fields
    const billingStreet = order.billing_street || order.customer_address || '';
    const billingPostcode = order.billing_postcode || '';
    const billingCity = order.billing_city || '';
    
    const billingAddress = `${billingStreet.trim().toLowerCase()} ${billingPostcode.trim()} ${billingCity.trim().toLowerCase()}`;
    
    // If billing address is empty, compare with customer_address (fallback)
    if (!billingStreet && !billingPostcode && !billingCity) {
      const customerAddress = order.customer_address.trim().toLowerCase();
      return deliveryAddress !== customerAddress;
    }
    
    return deliveryAddress !== billingAddress;
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(paginatedOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders(prev => [...prev, orderId]);
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
    }
  };

  const handleBulkAction = async (action: string) => {
    console.log(`Bulk action: ${action} for orders:`, selectedOrders);
    
    if (action === 'mark-paid') {
      // Update selected orders to "confirmed" status (instead of "Bezahlt")
      try {
        await Promise.all(
          selectedOrders.map(orderId => updateOrderStatus(orderId, 'confirmed'))
        );
        setSelectedOrders([]);
      } catch (error) {
        console.error('Error updating orders:', error);
      }
    }
  };

  const exportToCSV = () => {
    // Updated headers to include "Zahlungsmethode" column
    const headers = ['Datum', 'Bestellnummer', 'Kunde', 'Telefon', 'Adresse', 'Produkt', 'Menge (L)', 'Gesamtpreis', 'Bankkonto', 'Domain', 'Zahlungsmethode', 'Abw. Lieferadresse', 'Letztes Update', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredOrders.map(order => {
        const lastUpdate = order.latest_status_change 
          ? new Date(order.latest_status_change).toLocaleString('de-DE')
          : new Date(order.created_at).toLocaleString('de-DE');
        
        return [
          new Date(order.created_at).toLocaleDateString('de-DE'),
          order.order_number,
          order.customer_name,
          order.customer_phone || '',
          `${order.delivery_street || order.customer_address} ${order.delivery_postcode || ''} ${order.delivery_city || ''}`,
          order.product || 'Standard Heizöl',
          order.liters,
          order.total_amount,
          getBankAccountSystemName(order.bank_account_id),
          order.origin_domain || '',
          getPaymentMethodLabel(order.payment_method),
          hasDifferentDeliveryAddress(order) ? 'Ja' : 'Nein',
          lastUpdate,
          order.status
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bestellungen.csv';
    a.click();
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleGenerateInvoice = (order: Order) => {
    setSelectedOrderForInvoice(order);
    setIsInvoiceDialogOpen(true);
  };

  const handleCloseInvoiceDialog = () => {
    setIsInvoiceDialogOpen(false);
    setSelectedOrderForInvoice(null);
  };

  const handleViewInvoice = (order: Order) => {
    setSelectedOrderForInvoiceView(order);
    setIsInvoiceViewerOpen(true);
  };

  const handleCloseInvoiceViewer = () => {
    setIsInvoiceViewerOpen(false);
    setSelectedOrderForInvoiceView(null);
  };

  // Function to copy phone number to clipboard
  const handleCopyPhone = async (phone: string | null) => {
    if (!phone) return;
    
    try {
      await navigator.clipboard.writeText(phone);
      toast({
        title: "Kopiert",
        description: "Telefonnummer wurde in die Zwischenablage kopiert.",
      });
    } catch (error) {
      console.error('Failed to copy phone number:', error);
      toast({
        title: "Fehler",
        description: "Telefonnummer konnte nicht kopiert werden.",
        variant: "destructive",
      });
    }
  };

  // Function to handle order updates from dialogs
  const handleOrderUpdate = (orderId: string, updatedData: Partial<Order>) => {
    updateOrder(orderId, updatedData);
    
    // Also update the selected order if it's currently being viewed
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, ...updatedData } : null);
    }
  };

  // Function to handle status changes from the dialog
  const handleStatusChangeFromDialog = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      // Update selected order if it's currently being viewed
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Bestellungen</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">Lade Bestellungen...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bestellungen
            {newOrdersCount > 0 && (
              <span className="ml-3 px-2 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                {newOrdersCount} Neue
              </span>
            )}
            {showHidden && (
              <span className="ml-3 px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                Inkl. ausgeblendete
              </span>
            )}
          </h1>
          <p className="text-gray-600 mt-2">Verwalten Sie alle Heizöl-Bestellungen</p>
        </div>
        <Button onClick={exportToCSV} className="bg-red-600 hover:bg-red-700">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Statistics Cards */}
      <OrdersStatsCards orders={orders} />

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <OrderFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            showHidden={showHidden}
            setShowHidden={setShowHidden}
          />
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedOrders.length}
        onBulkAction={handleBulkAction}
      />

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Bestellübersicht</CardTitle>
            <CardDescription>
              {filteredOrders.length} von {orders.length} Bestellungen
              {currentPage > 1 && ` (Seite ${currentPage} von ${totalPages})`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 pl-4">
                      <Checkbox
                        checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="min-w-[100px]">
                      Datum
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      Bestellnummer
                    </TableHead>
                    <TableHead className="min-w-[140px]">
                      Kunde
                    </TableHead>
                    <TableHead className="min-w-[110px]">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        Telefon
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[140px]">Adresse</TableHead>
                    <TableHead className="w-[40px]">
                      <div className="flex items-center justify-center">
                        <Truck className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[80px]">Produkt</TableHead>
                    <TableHead className="min-w-[80px]">
                      Menge (L)
                    </TableHead>
                    <TableHead className="min-w-[90px]">
                      Gesamtpreis
                    </TableHead>
                    <TableHead className="min-w-[110px]">
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        Bankkonto
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[100px]">
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        Domain
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[110px]">
                      <div className="flex items-center gap-1">
                        <Receipt className="h-4 w-4" />
                        Zahlungsmethode
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Letztes Update
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[90px]">
                      Status
                    </TableHead>
                    <TableHead className="min-w-[200px] pr-4">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => {
                    const lastUpdate = order.latest_status_change 
                      ? new Date(order.latest_status_change)
                      : new Date(order.created_at);
                    
                    return (
                      <TableRow 
                        key={order.id} 
                        className={`hover:bg-gray-50 ${order.is_hidden ? 'opacity-60 bg-gray-100' : ''}`}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()} className="pl-4">
                          <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{new Date(order.created_at).toLocaleDateString('de-DE')}</div>
                            <div className="text-gray-500">{new Date(order.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {order.order_number}
                          {order.is_hidden && <span className="ml-2 text-xs text-gray-500">(ausgeblendet)</span>}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">{order.customer_name}</div>
                            <div className="text-gray-500">{order.customer_email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {order.customer_phone ? (
                              <div 
                                className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors"
                                onClick={() => handleCopyPhone(order.customer_phone)}
                                title="Klicken zum Kopieren"
                              >
                                <Phone className="h-3 w-3 text-gray-400" />
                                <span>{order.customer_phone}</span>
                                <Copy className="h-3 w-3 text-gray-400 ml-1 opacity-0 group-hover:opacity-100" />
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">
                              {order.delivery_street || order.customer_address}
                            </div>
                            <div className="text-gray-500">
                              {order.delivery_postcode || ''} {order.delivery_city || ''}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center w-[40px]">
                          {hasDifferentDeliveryAddress(order) ? (
                            <div className="flex items-center justify-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full" title="Abweichende Lieferadresse"></div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <div className="w-2 h-2 bg-red-500 rounded-full" title="Gleiche Adresse"></div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">{order.product || 'Standard Heizöl'}</TableCell>
                        <TableCell className="font-medium">{order.liters.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold">€{order.total_amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {order.bank_account_id ? (
                              <div className="flex items-center gap-1">
                                <CreditCard className="h-3 w-3 text-gray-400" />
                                <span className="font-medium text-blue-600">
                                  {getBankAccountSystemName(order.bank_account_id)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {order.origin_domain ? (
                              <div className="flex items-center gap-1">
                                <Globe className="h-3 w-3 text-gray-400" />
                                <span className="font-medium text-green-600">
                                  {order.origin_domain}
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <Receipt className="h-3 w-3 text-gray-400" />
                              <span className="font-medium text-purple-600">
                                {getPaymentMethodLabel(order.payment_method)}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{lastUpdate.toLocaleDateString('de-DE')}</div>
                            <div className="text-gray-500">{lastUpdate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()} className="min-w-[200px] pr-4">
                          <OrderTableActions
                            order={order}
                            onViewOrder={handleViewOrder}
                            onGenerateInvoice={handleGenerateInvoice}
                            onViewInvoice={handleViewInvoice}
                            onMarkAsPaid={(order) => updateOrderStatus(order.id, 'confirmed')}
                            onMarkAsExchanged={(order) => updateOrderStatus(order.id, 'exchanged')}
                            onMarkAsDown={(order) => updateOrderStatus(order.id, 'down')}
                            onHideOrder={(order) => hideOrder(order.id)}
                            onUnhideOrder={(order) => unhideOrder(order.id)}
                            showHidden={showHidden}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {orders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Noch keine Bestellungen vorhanden
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 px-4 pb-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNum)}
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Order Details Dialog with Actions */}
      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onOrderUpdate={handleOrderUpdate}
        onStatusChange={handleStatusChangeFromDialog}
      />

      {/* Invoice Creation Dialog */}
      <InvoiceCreationDialog
        order={selectedOrderForInvoice}
        isOpen={isInvoiceDialogOpen}
        onClose={handleCloseInvoiceDialog}
        onOrderUpdate={handleOrderUpdate}
      />

      {/* Invoice Viewer Dialog */}
      <InvoiceViewerDialog
        order={selectedOrderForInvoiceView}
        isOpen={isInvoiceViewerOpen}
        onClose={handleCloseInvoiceViewer}
      />
    </div>
  );
};

export default AdminOrders;
