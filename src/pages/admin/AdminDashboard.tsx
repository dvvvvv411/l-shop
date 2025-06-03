
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
      {/* Hero Section - Der Heizöl König */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 p-12 shadow-2xl"
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
            className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center mb-6"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl mr-4"
            >
              <Crown className="h-12 w-12 text-yellow-200" />
            </motion.div>
          </motion.div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Der Heizöl König
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-orange-100 font-medium drop-shadow-md"
          >
            Ihr Reich der Heizöl-Verwaltung
          </motion.p>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, -100],
                x: [0, Math.random() * 40 - 20]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut"
              }}
              className={`absolute w-2 h-2 bg-yellow-200 rounded-full`}
              style={{
                left: `${20 + Math.random() * 60}%`,
                bottom: '20%'
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Modern Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 shadow-2xl"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            </div>
            <p className="text-blue-100 text-lg">Willkommen zurück! Hier ist Ihre Heizöl-Verkaufsübersicht</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <Calendar className="h-4 w-4 text-blue-200" />
            <span className="text-sm text-blue-100 font-medium">
              {new Date().toLocaleDateString('de-DE', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
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
