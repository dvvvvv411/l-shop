
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrders } from '@/hooks/useOrders';

interface RecentOrdersTableProps {
  recentOrders?: any[];
  isLoading?: boolean;
}

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ isLoading: propIsLoading }) => {
  const { orders, isLoading: ordersLoading } = useOrders();
  
  const isLoading = propIsLoading || ordersLoading;

  // Get most recent orders
  const recentOrders = orders.slice(0, 5);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'processing': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'shipped': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'pending': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Neu';
      case 'confirmed': return 'Bestätigt';
      case 'processing': return 'In Bearbeitung';
      case 'shipped': return 'Versandt';
      case 'delivered': return 'Geliefert';
      case 'cancelled': return 'Storniert';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Aktuelle Bestellungen</CardTitle>
          <CardDescription>Die neuesten Heizöl-Bestellungen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Aktuelle Bestellungen</CardTitle>
            <CardDescription>
              Die neuesten Heizöl-Bestellungen
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/orders">
              Alle anzeigen
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bestellung</TableHead>
                <TableHead>Kunde</TableHead>
                <TableHead>Menge</TableHead>
                <TableHead>Betrag</TableHead>
                <TableHead>Zahlungsart</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead className="w-20">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders?.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {order.order_number}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer_name}</div>
                      <div className="text-sm text-gray-500">{order.customer_email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{order.liters.toLocaleString('de-DE')} L</span>
                  </TableCell>
                  <TableCell className="font-semibold">
                    €{order.total_amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-purple-600">
                      {getPaymentMethodLabel(order.payment_method)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(order.status)}
                    >
                      {getStatusLabel(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('de-DE')}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/orders/${order.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {(!recentOrders || recentOrders.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              Keine Bestellungen gefunden
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentOrdersTable;
