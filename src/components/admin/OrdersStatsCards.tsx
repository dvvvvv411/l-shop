
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, ShoppingCart, DollarSign, Clock } from 'lucide-react';
import { Order } from '@/hooks/useOrders';

interface OrdersStatsCardsProps {
  orders: Order[];
}

const OrdersStatsCards: React.FC<OrdersStatsCardsProps> = ({ orders }) => {
  const stats = useMemo(() => {
    const today = new Date();
    const todayStr = today.toDateString();
    
    // Filter orders for today
    const todayOrders = orders.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate.toDateString() === todayStr;
    });
    
    // Calculate statistics
    const totalRevenueToday = todayOrders.reduce((sum, order) => sum + order.total_amount, 0);
    const ordersCountToday = todayOrders.length;
    const averageOrderValue = ordersCountToday > 0 ? totalRevenueToday / ordersCountToday : 0;
    const newOrdersCount = orders.filter(order => order.status === 'pending').length;
    
    return {
      totalRevenueToday,
      ordersCountToday,
      averageOrderValue,
      newOrdersCount
    };
  }, [orders]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Revenue Today */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Umsatz heute
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenueToday)}</div>
          <p className="text-xs text-muted-foreground">
            Gesamtumsatz des heutigen Tages
          </p>
        </CardContent>
      </Card>

      {/* Orders Today */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Bestellungen heute
          </CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.ordersCountToday}</div>
          <p className="text-xs text-muted-foreground">
            Anzahl Bestellungen heute
          </p>
        </CardContent>
      </Card>

      {/* Average Order Value Today */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Ø Bestellwert heute
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.averageOrderValue)}</div>
          <p className="text-xs text-muted-foreground">
            Durchschnittlicher Bestellwert heute
          </p>
        </CardContent>
      </Card>

      {/* New Orders (Pending) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Neue Bestellungen
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.newOrdersCount}</div>
          <p className="text-xs text-muted-foreground">
            Wartende Bestellungen
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersStatsCards;
