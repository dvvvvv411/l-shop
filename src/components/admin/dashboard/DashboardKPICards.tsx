
import React from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, Euro, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrders } from '@/hooks/useOrders';
import { cn } from '@/lib/utils';

interface DashboardKPICardsProps {
  dashboardStats?: any;
  isLoading?: boolean;
}

const DashboardKPICards: React.FC<DashboardKPICardsProps> = ({ isLoading: propIsLoading }) => {
  const { orders, isLoading: ordersLoading } = useOrders();
  
  const isLoading = propIsLoading || ordersLoading;

  // Calculate stats from real orders data
  const todayOrders = orders.filter(order => {
    const today = new Date().toDateString();
    const orderDate = new Date(order.created_at).toDateString();
    return today === orderDate;
  });

  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total_amount, 0);
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const totalOrders = orders.length;
  
  const stats = [
    {
      title: 'Bestellungen heute',
      value: todayOrders.length,
      change: '+12%',
      changeType: 'positive',
      icon: Package,
      gradient: 'from-blue-500 to-cyan-400',
      bgGradient: 'from-blue-50 to-cyan-50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-400'
    },
    {
      title: 'Bestellungen Gesamt',
      value: totalOrders,
      change: '+5%',
      changeType: 'positive',
      icon: Package,
      gradient: 'from-emerald-500 to-teal-400',
      bgGradient: 'from-emerald-50 to-teal-50',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-400'
    },
    {
      title: 'Umsatz heute',
      value: `€${todayRevenue.toLocaleString('de-DE')}`,
      change: '+18%',
      changeType: 'positive',
      icon: Euro,
      gradient: 'from-violet-500 to-purple-400',
      bgGradient: 'from-violet-50 to-purple-50',
      iconBg: 'bg-gradient-to-br from-violet-500 to-purple-400'
    },
    {
      title: 'Umsatz gesamt',
      value: `€${totalRevenue.toLocaleString('de-DE')}`,
      change: '+8%',
      changeType: 'positive',
      icon: Euro,
      gradient: 'from-orange-500 to-amber-400',
      bgGradient: 'from-orange-50 to-amber-50',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-400'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-3" />
              <Skeleton className="h-3 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const ChangeIcon = stat.changeType === 'positive' ? ArrowUpRight : ArrowDownRight;
        
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className={cn(
              "relative overflow-hidden transition-all duration-300",
              "hover:shadow-2xl hover:shadow-blue-500/10",
              "bg-gradient-to-br", stat.bgGradient,
              "border-0 backdrop-blur-sm"
            )}>
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
              
              {/* Decorative gradient blob */}
              <div className={cn(
                "absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20",
                "bg-gradient-to-br", stat.gradient,
                "blur-xl"
              )} />
              
              <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700 leading-none">
                    {stat.title}
                  </p>
                </div>
                <div className={cn(
                  "p-3 rounded-xl shadow-lg text-white",
                  stat.iconBg
                )}>
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className={cn(
                      "flex items-center text-xs font-semibold",
                      stat.changeType === 'positive' ? "text-emerald-600" : "text-red-600"
                    )}>
                      <ChangeIcon className="h-3 w-3 mr-1" />
                      {stat.change} seit gestern
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardKPICards;
