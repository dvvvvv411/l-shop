
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock orders data
  const orders = [
    {
      id: '#1234',
      customer: 'Max Mustermann',
      email: 'max@example.com',
      amount: '€180.50',
      liters: '150L',
      address: 'Musterstraße 123, 12345 Berlin',
      status: 'Bestätigt',
      date: '2024-01-15',
      time: '10:30'
    },
    {
      id: '#1235',
      customer: 'Anna Schmidt',
      email: 'anna@example.com',
      amount: '€295.00',
      liters: '250L',
      address: 'Hauptstraße 45, 54321 Hamburg',
      status: 'In Bearbeitung',
      date: '2024-01-15',
      time: '11:15'
    },
    {
      id: '#1236',
      customer: 'Peter Weber',
      email: 'peter@example.com',
      amount: '€420.75',
      liters: '350L',
      address: 'Gartenweg 67, 67890 München',
      status: 'Geliefert',
      date: '2024-01-14',
      time: '12:45'
    },
    {
      id: '#1237',
      customer: 'Maria Klein',
      email: 'maria@example.com',
      amount: '€165.25',
      liters: '140L',
      address: 'Waldstraße 89, 98765 Köln',
      status: 'Bestätigt',
      date: '2024-01-14',
      time: '13:20'
    },
    {
      id: '#1238',
      customer: 'Klaus Müller',
      email: 'klaus@example.com',
      amount: '€310.00',
      liters: '260L',
      address: 'Bergstraße 12, 13579 Frankfurt',
      status: 'In Bearbeitung',
      date: '2024-01-13',
      time: '14:10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Bestätigt': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'In Bearbeitung': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Geliefert': return 'text-green-600 bg-green-50 border-green-200';
      case 'Storniert': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bestellungen</h1>
          <p className="text-gray-600 mt-2">Verwalten Sie alle Heizöl-Bestellungen</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Suche nach Kunde, Bestellung oder E-Mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

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
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bestellung</TableHead>
                    <TableHead>Kunde</TableHead>
                    <TableHead>Menge</TableHead>
                    <TableHead>Betrag</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.time}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </TableCell>
                      <TableCell className="font-medium">{order.liters}</TableCell>
                      <TableCell className="font-semibold">{order.amount}</TableCell>
                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-500">{order.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminOrders;
