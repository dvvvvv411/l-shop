
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import StatusBadge from './StatusBadge';
import { BankAccount } from '@/hooks/useBankAccounts';
import { Order } from '@/hooks/useOrders';
import { useBankAccounts } from '@/hooks/useBankAccounts';

interface BankAccountDetailsDialogProps {
  bankAccount: BankAccount | null;
  isOpen: boolean;
  onClose: () => void;
}

const BankAccountDetailsDialog: React.FC<BankAccountDetailsDialogProps> = ({
  bankAccount,
  isOpen,
  onClose,
}) => {
  const { getDailyUsage } = useBankAccounts();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['bank-account-orders', bankAccount?.id],
    queryFn: async () => {
      if (!bankAccount?.id) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('bank_account_id', bankAccount.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    enabled: !!bankAccount?.id && isOpen,
  });

  const { data: stats } = useQuery({
    queryKey: ['bank-account-stats', bankAccount?.id],
    queryFn: async () => {
      if (!bankAccount?.id) return null;
      
      const { data, error } = await supabase
        .from('orders')
        .select('total_amount, liters')
        .eq('bank_account_id', bankAccount.id);

      if (error) throw error;
      
      const totalRevenue = data.reduce((sum, order) => sum + (order.total_amount || 0), 0);
      const totalLiters = data.reduce((sum, order) => sum + (order.liters || 0), 0);
      const orderCount = data.length;

      return {
        totalRevenue,
        totalLiters,
        orderCount,
      };
    },
    enabled: !!bankAccount?.id && isOpen,
  });

  const { data: dailyUsage } = useQuery({
    queryKey: ['daily-usage', bankAccount?.id],
    queryFn: async () => {
      if (!bankAccount?.id) return 0;
      return await getDailyUsage(bankAccount.id);
    },
    enabled: !!bankAccount?.id && isOpen,
  });

  const formatDailyUsage = (usage: number, limit: number) => {
    const formattedUsage = usage.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedLimit = limit.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${formattedUsage}/${formattedLimit}€`;
  };

  const getUsagePercentage = (usage: number, limit: number) => {
    if (limit === 0) return 0;
    return Math.min((usage / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (!bankAccount) return null;

  const hasLimit = bankAccount.daily_limit > 0;
  const usagePercentage = hasLimit && dailyUsage ? getUsagePercentage(dailyUsage, bankAccount.daily_limit) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {bankAccount.bank_name}
            {bankAccount.is_default && (
              <Badge variant="default" className="bg-green-100 text-green-800">
                Standard
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Details und Bestellungen für dieses Bankkonto
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bank Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kontoinformationen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Kontoinhaber</p>
                  <p className="font-medium">{bankAccount.account_holder}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">IBAN</p>
                  <p className="font-medium font-mono">{bankAccount.iban}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">BIC</p>
                  <p className="font-medium font-mono">{bankAccount.bic}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tageslimit & Nutzung</p>
                  <div className="space-y-2">
                    <p className="font-medium">
                      {hasLimit ? (
                        <span className={getUsageColor(usagePercentage)}>
                          {formatDailyUsage(dailyUsage || 0, bankAccount.daily_limit)}
                        </span>
                      ) : (
                        'Unbegrenzt'
                      )}
                    </p>
                    {hasLimit && dailyUsage !== undefined && (
                      <div className="space-y-1">
                        <Progress 
                          value={usagePercentage} 
                          className="h-2"
                        />
                        <p className="text-xs text-gray-500">
                          {usagePercentage.toFixed(1)}% des Tageslimits genutzt
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{stats.orderCount}</div>
                  <p className="text-gray-600">Bestellungen</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    €{stats.totalRevenue.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-gray-600">Gesamtumsatz</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {stats.totalLiters.toLocaleString('de-DE')} L
                  </div>
                  <p className="text-gray-600">Gesamtmenge</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    €{(dailyUsage || 0).toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-gray-600">Heute verwendet</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Zugehörige Bestellungen</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {ordersLoading ? (
                <div className="text-center py-8">Lade Bestellungen...</div>
              ) : orders && orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bestellnummer</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Kunde</TableHead>
                        <TableHead>Menge (L)</TableHead>
                        <TableHead>Gesamtpreis</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.order_number}</TableCell>
                          <TableCell>
                            {new Date(order.created_at).toLocaleDateString('de-DE')}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{order.customer_name}</div>
                              <div className="text-gray-500">{order.customer_email}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {order.liters.toLocaleString()}
                          </TableCell>
                          <TableCell className="font-semibold">
                            €{order.total_amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={order.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Keine Bestellungen für dieses Bankkonto gefunden
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BankAccountDetailsDialog;
