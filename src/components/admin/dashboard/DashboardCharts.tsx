
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardChartsProps {
  chartData: any[];
  isLoading: boolean;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ chartData, isLoading }) => {
  // Process chart data
  const processedData = React.useMemo(() => {
    if (!chartData) return [];
    
    const dailyStats = chartData.reduce((acc, order) => {
      const date = new Date(order.created_at).toLocaleDateString('de-DE');
      if (!acc[date]) {
        acc[date] = { date, orders: 0, revenue: 0 };
      }
      acc[date].orders += 1;
      acc[date].revenue += parseFloat(order.total_amount);
      return acc;
    }, {});
    
    return Object.values(dailyStats);
  }, [chartData]);

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
