import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import StatusBadge from '@/components/admin/StatusBadge';
import OrderFilters from '@/components/admin/OrderFilters';
import BulkActions from '@/components/admin/BulkActions';

type Order = {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  customer: string;
  email: string;
  postalCode: string;
  city: string;
  address: string;
  product: string;
  quantity: number;
  totalPrice: number;
  status: 'Neu' | 'Bezahlt' | 'Versandt' | 'Abgeschlossen';
};

type SortConfig = {
  key: keyof Order;
  direction: 'asc' | 'desc';
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('alle');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'desc' });
  const ordersPerPage = 20;

  // Demo orders with realistic German data
  const orders: Order[] = [
    {
      id: '1', orderNumber: 'HO-2024-001', date: '2024-01-15', time: '09:30',
      customer: 'Max Mustermann', email: 'max.mustermann@email.de',
      postalCode: '12345', city: 'Berlin', address: 'Musterstraße 123',
      product: 'Heizöl Standard', quantity: 1500, totalPrice: 1275.50, status: 'Neu'
    },
    {
      id: '2', orderNumber: 'HO-2024-002', date: '2024-01-15', time: '10:15',
      customer: 'Anna Schmidt', email: 'anna.schmidt@email.de',
      postalCode: '54321', city: 'Hamburg', address: 'Hauptstraße 45',
      product: 'Heizöl Premium', quantity: 2000, totalPrice: 1890.00, status: 'Bezahlt'
    },
    {
      id: '3', orderNumber: 'HO-2024-003', date: '2024-01-14', time: '14:20',
      customer: 'Peter Weber', email: 'peter.weber@email.de',
      postalCode: '67890', city: 'München', address: 'Gartenweg 67',
      product: 'Heizöl Standard', quantity: 3000, totalPrice: 2550.00, status: 'Versandt'
    },
    {
      id: '4', orderNumber: 'HO-2024-004', date: '2024-01-14', time: '11:45',
      customer: 'Maria Klein', email: 'maria.klein@email.de',
      postalCode: '98765', city: 'Köln', address: 'Waldstraße 89',
      product: 'Heizöl Premium', quantity: 1200, totalPrice: 1134.00, status: 'Abgeschlossen'
    },
    {
      id: '5', orderNumber: 'HO-2024-005', date: '2024-01-13', time: '16:10',
      customer: 'Klaus Müller', email: 'klaus.mueller@email.de',
      postalCode: '13579', city: 'Frankfurt', address: 'Bergstraße 12',
      product: 'Heizöl Standard', quantity: 2500, totalPrice: 2125.00, status: 'Bezahlt'
    },
    {
      id: '6', orderNumber: 'HO-2024-006', date: '2024-01-13', time: '08:30',
      customer: 'Sabine Wagner', email: 'sabine.wagner@email.de',
      postalCode: '24680', city: 'Dresden', address: 'Lindenallee 34',
      product: 'Heizöl Premium', quantity: 1800, totalPrice: 1701.00, status: 'Neu'
    },
    {
      id: '7', orderNumber: 'HO-2024-007', date: '2024-01-12', time: '13:25',
      customer: 'Thomas Becker', email: 'thomas.becker@email.de',
      postalCode: '86420', city: 'Stuttgart', address: 'Rosenstraße 78',
      product: 'Heizöl Standard', quantity: 2200, totalPrice: 1870.00, status: 'Versandt'
    },
    {
      id: '8', orderNumber: 'HO-2024-008', date: '2024-01-12', time: '15:40',
      customer: 'Julia Fischer', email: 'julia.fischer@email.de',
      postalCode: '97531', city: 'Düsseldorf', address: 'Ahornweg 56',
      product: 'Heizöl Premium', quantity: 1600, totalPrice: 1512.00, status: 'Abgeschlossen'
    },
    {
      id: '9', orderNumber: 'HO-2024-009', date: '2024-01-11', time: '10:55',
      customer: 'Michael Schulz', email: 'michael.schulz@email.de',
      postalCode: '64208', city: 'Hannover', address: 'Eichenstraße 91',
      product: 'Heizöl Standard', quantity: 2800, totalPrice: 2380.00, status: 'Neu'
    },
    {
      id: '10', orderNumber: 'HO-2024-010', date: '2024-01-11', time: '12:20',
      customer: 'Andrea Hoffmann', email: 'andrea.hoffmann@email.de',
      postalCode: '75319', city: 'Bremen', address: 'Birkenweg 23',
      product: 'Heizöl Premium', quantity: 1400, totalPrice: 1323.00, status: 'Bezahlt'
    },
    {
      id: '11', orderNumber: 'HO-2024-011', date: '2024-01-10', time: '09:15',
      customer: 'Stefan Richter', email: 'stefan.richter@email.de',
      postalCode: '51840', city: 'Leipzig', address: 'Kastanienallee 67',
      product: 'Heizöl Standard', quantity: 3200, totalPrice: 2720.00, status: 'Versandt'
    },
    {
      id: '12', orderNumber: 'HO-2024-012', date: '2024-01-10', time: '14:30',
      customer: 'Petra Zimmermann', email: 'petra.zimmermann@email.de',
      postalCode: '28465', city: 'Nürnberg', address: 'Tannenstraße 45',
      product: 'Heizöl Premium', quantity: 1900, totalPrice: 1795.50, status: 'Abgeschlossen'
    },
    {
      id: '13', orderNumber: 'HO-2024-013', date: '2024-01-09', time: '11:10',
      customer: 'Robert Braun', email: 'robert.braun@email.de',
      postalCode: '39572', city: 'Dortmund', address: 'Ulmenweg 89',
      product: 'Heizöl Standard', quantity: 2600, totalPrice: 2210.00, status: 'Neu'
    },
    {
      id: '14', orderNumber: 'HO-2024-014', date: '2024-01-09', time: '16:45',
      customer: 'Claudia Krüger', email: 'claudia.krueger@email.de',
      postalCode: '62813', city: 'Essen', address: 'Buchenstraße 34',
      product: 'Heizöl Premium', quantity: 1700, totalPrice: 1606.50, status: 'Bezahlt'
    },
    {
      id: '15', orderNumber: 'HO-2024-015', date: '2024-01-08', time: '13:50',
      customer: 'Frank Neumann', email: 'frank.neumann@email.de',
      postalCode: '84721', city: 'Wuppertal', address: 'Fichtenweg 12',
      product: 'Heizöl Standard', quantity: 2400, totalPrice: 2040.00, status: 'Versandt'
    },
    {
      id: '16', orderNumber: 'HO-2024-016', date: '2024-01-08', time: '08:25',
      customer: 'Birgit Lang', email: 'birgit.lang@email.de',
      postalCode: '73694', city: 'Bielefeld', address: 'Kiefernstraße 78',
      product: 'Heizöl Premium', quantity: 1300, totalPrice: 1228.50, status: 'Abgeschlossen'
    },
    {
      id: '17', orderNumber: 'HO-2024-017', date: '2024-01-07', time: '15:35',
      customer: 'Jürgen Wolf', email: 'juergen.wolf@email.de',
      postalCode: '95748', city: 'Münster', address: 'Erlenweg 56',
      product: 'Heizöl Standard', quantity: 2100, totalPrice: 1785.00, status: 'Neu'
    },
    {
      id: '18', orderNumber: 'HO-2024-018', date: '2024-01-07', time: '10:40',
      customer: 'Monika Lange', email: 'monika.lange@email.de',
      postalCode: '46852', city: 'Augsburg', address: 'Pappelstraße 23',
      product: 'Heizöl Premium', quantity: 1550, totalPrice: 1464.25, status: 'Bezahlt'
    },
    {
      id: '19', orderNumber: 'HO-2024-019', date: '2024-01-06', time: '12:15',
      customer: 'Rainer Schmitt', email: 'rainer.schmitt@email.de',
      postalCode: '57390', city: 'Karlsruhe', address: 'Lärchenweg 67',
      product: 'Heizöl Standard', quantity: 2900, totalPrice: 2465.00, status: 'Versandt'
    },
    {
      id: '20', orderNumber: 'HO-2024-020', date: '2024-01-06', time: '14:55',
      customer: 'Ute Hartmann', email: 'ute.hartmann@email.de',
      postalCode: '68235', city: 'Mannheim', address: 'Zedernstraße 89',
      product: 'Heizöl Premium', quantity: 1750, totalPrice: 1653.75, status: 'Abgeschlossen'
    }
  ];

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.postalCode.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'alle' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort orders
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle date sorting specially
      if (sortConfig.key === 'date') {
        aValue = new Date(a.date + ' ' + a.time).getTime();
        bValue = new Date(b.date + ' ' + b.time).getTime();
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
  }, [orders, searchTerm, statusFilter, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedOrders.length / ordersPerPage);
  const paginatedOrders = filteredAndSortedOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // New orders count
  const newOrdersCount = orders.filter(order => order.status === 'Neu').length;

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

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for orders:`, selectedOrders);
    // Here you would implement the actual bulk action logic
    setSelectedOrders([]);
  };

  const exportToCSV = () => {
    const headers = ['Bestellnummer', 'Datum', 'Kunde', 'PLZ', 'Stadt', 'Produkt', 'Menge (L)', 'Gesamtpreis', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedOrders.map(order => [
        order.orderNumber,
        order.date,
        order.customer,
        order.postalCode,
        order.city,
        order.product,
        order.quantity,
        order.totalPrice,
        order.status
      ].join(','))
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

  const handleViewOrder = (orderId: string) => {
    navigate(`/admin/orders/${orderId}`);
  };

  return (
    <div className="space-y-6">
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
              {filteredAndSortedOrders.length} von {orders.length} Bestellungen
              {currentPage > 1 && ` (Seite ${currentPage} von ${totalPages})`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('orderNumber')}
                    >
                      <div className="flex items-center gap-1">
                        Bestellnummer
                        {getSortIcon('orderNumber')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center gap-1">
                        Datum
                        {getSortIcon('date')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('customer')}
                    >
                      <div className="flex items-center gap-1">
                        Kunde
                        {getSortIcon('customer')}
                      </div>
                    </TableHead>
                    <TableHead>PLZ / Stadt</TableHead>
                    <TableHead>Produkt</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('quantity')}
                    >
                      <div className="flex items-center gap-1">
                        Menge (L)
                        {getSortIcon('quantity')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('totalPrice')}
                    >
                      <div className="flex items-center gap-1">
                        Gesamtpreis
                        {getSortIcon('totalPrice')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        {getSortIcon('status')}
                      </div>
                    </TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow 
                      key={order.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={(e) => {
                        if (e.target instanceof HTMLElement && !e.target.closest('input, button')) {
                          handleViewOrder(order.id);
                        }
                      }}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{order.date}</div>
                          <div className="text-gray-500">{order.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-gray-500">{order.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{order.postalCode}</div>
                          <div className="text-gray-500">{order.city}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{order.product}</TableCell>
                      <TableCell className="font-medium">{order.quantity.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">€{order.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewOrder(order.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4">
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
    </div>
  );
};

export default AdminOrders;
