
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrders } from '@/hooks/useOrders';

interface DashboardChartsProps {
  chartData?: any[];
  isLoading?: boolean;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ isLoading: propIsLoading }) => {
  const { orders, isLoading: ordersLoading } = useOrders();
  
  const isLoading = propIsLoading || ordersLoading;

  // Process chart data from real orders
  const processedData = React.useMemo(() => {
    if (!orders.length) return [];
    
    // Get last 7 days of orders
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toLocaleDateString('de-DE'));
    }

    const dailyStats = last7Days.map(date => {
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at).toLocaleDateString('de-DE');
        return orderDate === date;
      });

      return {
        date,
        orders: dayOrders.length,
        revenue: dayOrders.reduce((sum, order) => sum + order.total_amount, 0)
      };
    });
    
    return dailyStats;
  }, [orders]);

  const chartConfig = {
    orders: {
      label: "Bestellungen",
      color: "#3b82f6",
    },
    revenue: {
      label: "Umsatz",
      color: "#10b981",
    },
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verkäufe der letzten 7 Tage</CardTitle>
          <CardDescription>Bestellungen und Umsatzentwicklung</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Verkäufe der letzten 7 Tage</CardTitle>
          <CardDescription>
            Bestellungen und Umsatzentwicklung im Zeitverlauf
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="orders" 
                  fill="var(--color-orders)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardCharts;
