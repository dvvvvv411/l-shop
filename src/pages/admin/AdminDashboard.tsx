
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Users, 
  TrendingUp, 
  Euro, 
  Plus, 
  Eye, 
  Calendar,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
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

  const quickActions = [
    {
      title: 'Neue Bestellung',
      description: 'Bestellung manuell hinzufügen',
      icon: Plus,
      href: '/admin/orders',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Bestellungen anzeigen',
      description: 'Alle Bestellungen verwalten',
      icon: Eye,
      href: '/admin/orders',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Kunden verwalten',
      description: 'Kundendatenbank bearbeiten',
      icon: Users,
      href: '/admin/customers',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Berichte',
      description: 'Detaillierte Analysen',
      icon: BarChart3,
      href: '/admin/orders',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Übersicht über Ihre Heizöl-Verkäufe</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Letztes Update: {new Date().toLocaleDateString('de-DE')}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <DashboardKPICards 
        dashboardStats={dashboardStats} 
        isLoading={statsLoading} 
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCharts 
          chartData={chartData} 
          isLoading={chartLoading} 
        />
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Schnellaktionen</CardTitle>
              <CardDescription>
                Häufig verwendete Aktionen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.title}
                      to={action.href}
                      className="block"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-md`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-6 w-6" />
                          <div>
                            <h3 className="font-medium text-sm">{action.title}</h3>
                            <p className="text-xs opacity-90">{action.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable 
        recentOrders={recentOrders} 
        isLoading={ordersLoading} 
      />
    </div>
  );
};

export default AdminDashboard;
