import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowUpDown, ArrowUp, ArrowDown, Phone, CreditCard, Globe } from 'lucide-react';
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
import { useOrders, Order } from '@/hooks/useOrders';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import { useOrderStatusHistory } from '@/hooks/useOrderStatusHistory';

type SortConfig = {
  key: keyof Order;
  direction: 'asc' | 'desc';
};

const AdminOrders = () => {
  const { orders, isLoading, updateOrderStatus } = useOrders();
  const { getBankAccountSystemName } = useBankAccounts();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('alle');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'created_at', direction: 'desc' });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [selectedOrderForInvoiceView, setSelectedOrderForInvoiceView] = useState<Order | null>(null);
  const [isInvoiceViewerOpen, setIsInvoiceViewerOpen] = useState(false);
  const [localOrders, setLocalOrders] = useState<Order[]>([]);
  const ordersPerPage = 20;

  // Use local orders state if available, otherwise use orders from hook
  const displayOrders = localOrders.length > 0 ? localOrders : orders;

  // Update local orders when orders change
  React.useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = displayOrders.filter(order => {
      const matchesSearch = 
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.delivery_postcode && order.delivery_postcode.includes(searchTerm)) ||
        (order.customer_phone && order.customer_phone.includes(searchTerm));
      
      const matchesStatus = statusFilter === 'alle' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort orders
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle date sorting specially
      if (sortConfig.key === 'created_at') {
        aValue = new Date(a.created_at).getTime();
        bValue = new Date(b.created_at).getTime();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [displayOrders, searchTerm, statusFilter, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedOrders.length / ordersPerPage);
  const paginatedOrders = filteredAndSortedOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // New orders count (using 'pending' instead of 'Neu')
  const newOrdersCount = displayOrders.filter(order => order.status === 'pending').length;

  const handleSort = (key: keyof Order) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
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
    const headers = ['Bestellnummer', 'Datum', 'Kunde', 'Telefon', 'PLZ', 'Stadt', 'Produkt', 'Menge (L)', 'Gesamtpreis', 'Status', 'Bankkonto', 'Domain'];
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedOrders.map(order => {
        return [
          order.order_number,
          new Date(order.created_at).toLocaleDateString('de-DE'),
          order.customer_name,
          order.customer_phone || '',
          order.delivery_postcode || '',
          order.delivery_city || '',
          order.product || 'Standard Heizöl',
          order.liters,
          order.total_amount,
          order.status,
          getBankAccountSystemName(order.bank_account_id),
          order.origin_domain || ''
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

  const getSortIcon = (key: keyof Order) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ArrowUp className="h-4 w-4" /> : 
      <ArrowDown className="h-4 w-4" />;
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

  const handleViewPDF = (order: Order) => {
    if (order.invoice_file_url) {
      window.open(order.invoice_file_url, '_blank');
    }
  };

  // Function to update order locally after invoice generation
  const handleOrderUpdate = (orderId: string, updatedData: Partial<Order>) => {
    setLocalOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, ...updatedData } : order
    ));
    
    // Also update the selected order if it's currently being viewed
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, ...updatedData } : null);
    }
  };

  // Function to handle status changes from the dialog
  const handleStatusChangeFromDialog = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      // Update local state
      setLocalOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      // Update selected order if it's currently being viewed
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleMarkAsPaidFromTable = async (order: Order) => {
    try {
      await updateOrderStatus(order.id, 'confirmed');
      // Update local state
      setLocalOrders(prev => prev.map(o => 
        o.id === order.id ? { ...o, status: 'confirmed' } : o
      ));
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
          </h1>
          <p className="text-gray-600 mt-2">Verwalten Sie alle Heizöl-Bestellungen</p>
        </div>
        <Button onClick={exportToCSV} className="bg-red-600 hover:bg-red-700">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <OrderFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
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
              {filteredAndSortedOrders.length} von {displayOrders.length} Bestellungen
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
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50 min-w-[120px]"
                      onClick={() => handleSort('order_number')}
                    >
                      <div className="flex items-center gap-1">
                        Bestellnummer
                        {getSortIcon('order_number')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50 min-w-[100px]"
                      onClick={() => handleSort('created_at')}
                    >
                      <div className="flex items-center gap-1">
                        Datum
                        {getSortIcon('created_at')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50 min-w-[140px]"
                      onClick={() => handleSort('customer_name')}
                    >
                      <div className="flex items-center gap-1">
                        Kunde
                        {getSortIcon('customer_name')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50 min-w-[110px]"
                      onClick={() => handleSort('customer_phone')}
                    >
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        Telefon
                        {getSortIcon('customer_phone')}
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[90px]">PLZ / Stadt</TableHead>
                    <TableHead className="min-w-[80px]">Produkt</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50 min-w-[80px]"
                      onClick={() => handleSort('liters')}
                    >
                      <div className="flex items-center gap-1">
                        Menge (L)
                        {getSortIcon('liters')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50 min-w-[90px]"
                      onClick={() => handleSort('total_amount')}
                    >
                      <div className="flex items-center gap-1">
                        Gesamtpreis
                        {getSortIcon('total_amount')}
                      </div>
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
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50 min-w-[90px]"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        {getSortIcon('status')}
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[140px] pr-4">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow 
                      key={order.id} 
                      className="hover:bg-gray-50"
                    >
                      <TableCell onClick={(e) => e.stopPropagation()} className="pl-4">
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{order.order_number}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(order.created_at).toLocaleDateString('de-DE')}</div>
                          <div className="text-gray-500">{new Date(order.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
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
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-gray-400" />
                              {order.customer_phone}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{order.delivery_postcode}</div>
                          <div className="text-gray-500">{order.delivery_city}</div>
                        </div>
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
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()} className="min-w-[140px] pr-4">
                        <OrderTableActions
                          order={order}
                          onViewOrder={handleViewOrder}
                          onGenerateInvoice={handleGenerateInvoice}
                          onViewInvoice={handleViewInvoice}
                          onMarkAsPaid={handleMarkAsPaidFromTable}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {displayOrders.length === 0 && (
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
