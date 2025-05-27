
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Users, TrendingUp, Euro } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminDashboard = () => {
  // Mock data
  const stats = [
    {
      title: 'Bestellungen heute',
      value: '23',
      change: '+12%',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Neue Kunden',
      value: '8',
      change: '+5%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Umsatz heute',
      value: '€4,250',
      change: '+18%',
      icon: Euro,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'Max Mustermann', amount: '€180.50', status: 'Bestätigt', time: '10:30' },
    { id: '#1235', customer: 'Anna Schmidt', amount: '€295.00', status: 'In Bearbeitung', time: '11:15' },
    { id: '#1236', customer: 'Peter Weber', amount: '€420.75', status: 'Geliefert', time: '12:45' },
    { id: '#1237', customer: 'Maria Klein', amount: '€165.25', status: 'Bestätigt', time: '13:20' },
    { id: '#1238', customer: 'Klaus Müller', amount: '€310.00', status: 'In Bearbeitung', time: '14:10' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Bestätigt': return 'text-blue-600 bg-blue-50';
      case 'In Bearbeitung': return 'text-yellow-600 bg-yellow-50';
      case 'Geliefert': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Übersicht über Ihre Heizöl-Verkäufe</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 font-medium">
                    {stat.change} seit gestern
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Aktuelle Bestellungen</CardTitle>
            <CardDescription>
              Die neuesten Heizöl-Bestellungen von heute
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bestellung</TableHead>
                  <TableHead>Kunde</TableHead>
                  <TableHead>Betrag</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Zeit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="font-semibold">{order.amount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-500">{order.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
