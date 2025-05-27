
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock customers data
  const customers = [
    {
      id: 'C001',
      name: 'Max Mustermann',
      email: 'max@example.com',
      phone: '+49 123 456789',
      address: 'Musterstraße 123, 12345 Berlin',
      totalOrders: 5,
      totalSpent: '€950.25',
      lastOrder: '2024-01-15',
      status: 'Aktiv'
    },
    {
      id: 'C002',
      name: 'Anna Schmidt',
      email: 'anna@example.com',
      phone: '+49 234 567890',
      address: 'Hauptstraße 45, 54321 Hamburg',
      totalOrders: 3,
      totalSpent: '€720.00',
      lastOrder: '2024-01-10',
      status: 'Aktiv'
    },
    {
      id: 'C003',
      name: 'Peter Weber',
      email: 'peter@example.com',
      phone: '+49 345 678901',
      address: 'Gartenweg 67, 67890 München',
      totalOrders: 8,
      totalSpent: '€1,850.75',
      lastOrder: '2024-01-12',
      status: 'VIP'
    },
    {
      id: 'C004',
      name: 'Maria Klein',
      email: 'maria@example.com',
      phone: '+49 456 789012',
      address: 'Waldstraße 89, 98765 Köln',
      totalOrders: 2,
      totalSpent: '€340.50',
      lastOrder: '2024-01-05',
      status: 'Aktiv'
    },
    {
      id: 'C005',
      name: 'Klaus Müller',
      email: 'klaus@example.com',
      phone: '+49 567 890123',
      address: 'Bergstraße 12, 13579 Frankfurt',
      totalOrders: 1,
      totalSpent: '€180.00',
      lastOrder: '2024-01-01',
      status: 'Neu'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Aktiv': return 'text-green-600 bg-green-50 border-green-200';
      case 'Neu': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Inaktiv': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kunden</h1>
          <p className="text-gray-600 mt-2">Verwalten Sie Ihre Kundendaten</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Gesamt Kunden
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              VIP Kunden
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.status === 'VIP').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Neue Kunden
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.status === 'Neu').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Durchschnittlicher Wert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€678</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Suche nach Name, E-Mail oder Kunden-ID..."
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

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Kundenübersicht</CardTitle>
            <CardDescription>
              {filteredCustomers.length} von {customers.length} Kunden
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kunde</TableHead>
                    <TableHead>Kontakt</TableHead>
                    <TableHead>Bestellungen</TableHead>
                    <TableHead>Gesamtumsatz</TableHead>
                    <TableHead>Letzte Bestellung</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{customer.totalOrders}</TableCell>
                      <TableCell className="font-semibold">{customer.totalSpent}</TableCell>
                      <TableCell className="text-gray-500">{customer.lastOrder}</TableCell>
                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                          {customer.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
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

export default AdminCustomers;
