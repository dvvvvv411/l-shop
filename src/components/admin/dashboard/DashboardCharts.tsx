
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrders } from '@/hooks/useOrders';
import { TrendingUp, BarChart3 } from 'lucide-react';

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
      last7Days.push(date.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit' }));
    }

    const dailyStats = last7Days.map(date => {
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit' });
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-40" />
            </CardTitle>
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-40" />
            </CardTitle>
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Orders Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-0 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              Bestellungen (7 Tage)
            </CardTitle>
            <CardDescription className="text-gray-600">
              Entwicklung der täglichen Bestellungen
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processedData}>
                  <defs>
                    <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#64748b' }}
                  />
                  <YAxis 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#64748b' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="orders" 
                    fill="url(#orderGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-0 shadow-xl shadow-emerald-500/10 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              Umsatz (7 Tage)
            </CardTitle>
            <CardDescription className="text-gray-600">
              Tägliche Umsatzentwicklung in Euro
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={processedData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#64748b' }}
                  />
                  <YAxis 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#64748b' }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent formatter={(value) => [`€${value}`, 'Umsatz']} />} 
                  />
                  <Area 
                    dataKey="revenue" 
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardCharts;
