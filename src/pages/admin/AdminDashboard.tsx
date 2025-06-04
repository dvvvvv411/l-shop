
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrders } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';
import DashboardKPICards from '@/components/admin/dashboard/DashboardKPICards';
import DashboardCharts from '@/components/admin/dashboard/DashboardCharts';
import RecentOrdersTable from '@/components/admin/dashboard/RecentOrdersTable';
import WebhookMonitor from '@/components/admin/WebhookMonitor';

const AdminDashboard = () => {
  const { orders, isLoading } = useOrders();
  const { toast } = useToast();

  // Show error toast if there are issues loading data
  React.useEffect(() => {
    if (!isLoading && !orders) {
      toast({
        title: 'Fehler beim Laden der Daten',
        description: 'Die Dashboard-Daten konnten nicht geladen werden.',
        variant: 'destructive'
      });
    }
  }, [isLoading, orders, toast]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Übersicht über Bestellungen und Zahlungen</p>
        </div>
      </div>

      {/* KPI Cards */}
      <DashboardKPICards isLoading={isLoading} />

      {/* Charts and Webhook Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCharts isLoading={isLoading} />
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
            isLoading={isLoading} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
