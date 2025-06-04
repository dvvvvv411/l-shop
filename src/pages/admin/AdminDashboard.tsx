
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrders } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';
import DashboardKPICards from '@/components/admin/dashboard/DashboardKPICards';
import DashboardCharts from '@/components/admin/dashboard/DashboardCharts';
import RecentOrdersTable from '@/components/admin/dashboard/RecentOrdersTable';
import WebhookMonitor from '@/components/admin/WebhookMonitor';

const AdminDashboard = () => {
  const { orders, isLoading, error } = useOrders();
  const { toast } = useToast();

  if (error) {
    toast({
      title: 'Fehler beim Laden der Daten',
      description: 'Die Dashboard-Daten konnten nicht geladen werden.',
      variant: 'destructive'
    });
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Übersicht über Bestellungen und Zahlungen</p>
        </div>
      </div>

      {/* KPI Cards */}
      <DashboardKPICards orders={orders} isLoading={isLoading} />

      {/* Charts and Webhook Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCharts orders={orders} isLoading={isLoading} />
        <WebhookMonitor />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Aktuelle Bestellungen</CardTitle>
          <CardDescription>
            Die neuesten Bestellungen im System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentOrdersTable 
            orders={orders?.slice(0, 10) || []} 
            isLoading={isLoading} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
