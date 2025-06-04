
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Edit, Trash2, ArrowDown, ArrowUp, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb';
import BankAccountForm from '@/components/admin/BankAccountForm';
import BankAccountDeleteDialog from '@/components/admin/BankAccountDeleteDialog';
import BankAccountDetailsDialog from '@/components/admin/BankAccountDetailsDialog';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import type { Tables } from '@/integrations/supabase/types';

// Use the correct type from Supabase and extend with required properties
type BankAccountFromDB = Tables<'bank_accounts'>;
type BankAccount = BankAccountFromDB & {
  is_default?: boolean;
};

const AdminBankAccounts = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
  const [deletingAccount, setDeletingAccount] = useState<BankAccount | null>(null);
  const [selectedAccountForDetails, setSelectedAccountForDetails] = useState<BankAccount | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { getDailyUsage, toggleBankAccountStatus } = useBankAccounts();

  const { data: bankAccounts, isLoading } = useQuery({
    queryKey: ['bank-accounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bank_accounts')
        .select('*')
        .order('is_active', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      // Transform the data to include is_default property
      return (data as BankAccountFromDB[]).map(account => ({
        ...account,
        is_default: false // Default value since this property might not exist in DB
      })) as BankAccount[];
    },
  });

  // Fetch daily usage for all accounts
  const { data: dailyUsageMap } = useQuery({
    queryKey: ['daily-usage-all', bankAccounts?.map(acc => acc.id)],
    queryFn: async () => {
      if (!bankAccounts?.length) return {};
      
      const usagePromises = bankAccounts.map(async (account) => {
        const usage = await getDailyUsage(account.id);
        return { accountId: account.id, usage };
      });

      const results = await Promise.all(usagePromises);
      const usageMap: Record<string, number> = {};
      results.forEach(({ accountId, usage }) => {
        usageMap[accountId] = usage;
      });
      
      return usageMap;
    },
    enabled: !!bankAccounts?.length,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ accountId, isActive }: { accountId: string; isActive: boolean }) => {
      await toggleBankAccountStatus(accountId, isActive);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
    },
  });

  const handleEdit = (account: BankAccount) => {
    setEditingAccount(account);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingAccount(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingAccount(null);
  };

  const handleToggleStatus = (account: BankAccount) => {
    toggleStatusMutation.mutate({
      accountId: account.id,
      isActive: !account.is_active
    });
  };

  const handleViewDetails = (account: BankAccount) => {
    setSelectedAccountForDetails(account);
    setIsDetailsDialogOpen(true);
  };

  const handleCloseDetailsDialog = () => {
    setIsDetailsDialogOpen(false);
    setSelectedAccountForDetails(null);
  };

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

  const breadcrumbItems = [
    { label: 'Admin', href: '/admin' },
    { label: 'Bankkonten' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <AdminBreadcrumb items={breadcrumbItems} />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <AdminBreadcrumb items={breadcrumbItems} />
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Bankkonto hinzufügen
        </Button>
      </div>

      <div className="grid gap-6">
        {bankAccounts?.map((account) => {
          const dailyUsage = dailyUsageMap?.[account.id] || 0;
          const hasLimit = account.daily_limit && account.daily_limit > 0;
          const usagePercentage = hasLimit ? getUsagePercentage(dailyUsage, account.daily_limit) : 0;

          return (
            <Card 
              key={account.id} 
              className={`relative cursor-pointer hover:shadow-md transition-shadow ${
                !account.is_active ? 'border-red-500 border-2 bg-red-50/30' : ''
              }`} 
              onClick={() => handleViewDetails(account)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="font-bold text-blue-600">{account.system_name}</span>
                    <span className="text-gray-500">•</span>
                    <span>{account.bank_name}</span>
                    {!account.is_active && (
                      <Badge variant="destructive">
                        Inaktiv
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(account)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(account)}
                      disabled={toggleStatusMutation.isPending}
                      className={account.is_active ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                    >
                      {account.is_active ? (
                        <>
                          <ArrowDown className="h-4 w-4 mr-1" />
                          Deaktivieren
                        </>
                      ) : (
                        <>
                          <ArrowUp className="h-4 w-4 mr-1" />
                          Aktivieren
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(account)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletingAccount(account)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Kontoinhaber</p>
                    <p className="font-medium">{account.account_holder}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">IBAN</p>
                    <p className="font-medium font-mono">{account.iban}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">BIC</p>
                    <p className="font-medium font-mono">{account.bic}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tageslimit</p>
                    <div className="space-y-2">
                      <p className="font-medium">
                        {hasLimit ? (
                          <span className={getUsageColor(usagePercentage)}>
                            {formatDailyUsage(dailyUsage, account.daily_limit || 0)}
                          </span>
                        ) : (
                          'Unbegrenzt'
                        )}
                      </p>
                      {hasLimit && (
                        <div className="space-y-1">
                          <Progress 
                            value={usagePercentage} 
                            className="h-2"
                          />
                          <p className="text-xs text-gray-500">
                            {usagePercentage.toFixed(1)}% genutzt
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-medium ${account.is_active ? 'text-green-600' : 'text-red-600'}`}>
                      {account.is_active ? 'Aktiv' : 'Inaktiv'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Erstellt am</p>
                    <p className="font-medium">
                      {new Date(account.created_at).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {!bankAccounts?.length && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">Keine Bankkonten vorhanden.</p>
              <Button onClick={handleCreate} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Erstes Bankkonto hinzufügen
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <BankAccountForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        account={editingAccount}
      />

      <BankAccountDeleteDialog
        account={deletingAccount}
        onClose={() => setDeletingAccount(null)}
      />

      <BankAccountDetailsDialog
        bankAccount={selectedAccountForDetails}
        isOpen={isDetailsDialogOpen}
        onClose={handleCloseDetailsDialog}
      />
    </div>
  );
};

export default AdminBankAccounts;
