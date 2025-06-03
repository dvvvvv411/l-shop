import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Sparkles, Crown } from 'lucide-react';
import DashboardKPICards from '@/components/admin/dashboard/DashboardKPICards';
import DashboardCharts from '@/components/admin/dashboard/DashboardCharts';
import RecentOrdersTable from '@/components/admin/dashboard/RecentOrdersTable';

const AdminDashboard = () => {
  // Fetch dashboard stats
  const { data: dashboardStats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dashboard_stats')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch recent orders
  const { data: recentOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch orders for charts (last 7 days)
  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ['chart-data'],
    queryFn: async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-8">
      {/* Compact Hero Section - Der Heizöl König */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 p-8 shadow-xl"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              x: [0, 20, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"
            >
              <Crown className="h-8 w-8 text-yellow-200" />
            </motion.div>
            
            <div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
              >
                Der Heizöl König
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-orange-100 font-medium mt-1"
              >
                Ihr Reich der Heizöl-Verwaltung
              </motion.p>
            </div>
          </div>

          {/* Date Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
          >
            <Calendar className="h-4 w-4 text-orange-200" />
            <span className="text-sm text-orange-100 font-medium">
              {new Date().toLocaleDateString('de-DE', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </motion.div>

          {/* Floating Particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, -60],
                x: [0, Math.random() * 30 - 15]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
              className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full"
              style={{
                left: `${30 + Math.random() * 40}%`,
                bottom: '30%'
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Modern Dashboard Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 shadow-xl"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
        
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            </div>
            <p className="text-blue-100">Willkommen zurück! Hier ist Ihre Heizöl-Verkaufsübersicht</p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards with enhanced spacing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <DashboardKPICards 
          dashboardStats={dashboardStats} 
          isLoading={statsLoading} 
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <DashboardCharts 
          chartData={chartData} 
          isLoading={chartLoading} 
        />
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <RecentOrdersTable 
          recentOrders={recentOrders} 
          isLoading={ordersLoading} 
        />
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
