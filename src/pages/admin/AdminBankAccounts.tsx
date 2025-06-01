
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Star, StarOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb';
import BankAccountForm from '@/components/admin/BankAccountForm';
import BankAccountDeleteDialog from '@/components/admin/BankAccountDeleteDialog';

interface BankAccount {
  id: string;
  bank_name: string;
  account_holder: string;
  iban: string;
  bic: string;
  is_default: boolean;
  daily_limit: number;
  created_at: string;
  updated_at: string;
}

const AdminBankAccounts = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
  const [deletingAccount, setDeletingAccount] = useState<BankAccount | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: bankAccounts, isLoading } = useQuery({
    queryKey: ['bank-accounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bank_accounts')
        .select('*')
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as BankAccount[];
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: async (accountId: string) => {
      const { error } = await supabase
        .from('bank_accounts')
        .update({ is_default: true })
        .eq('id', accountId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      toast({
        title: 'Erfolg',
        description: 'Standardkonto wurde erfolgreich festgelegt.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Fehler',
        description: 'Fehler beim Festlegen des Standardkontos.',
        variant: 'destructive',
      });
      console.error('Error setting default account:', error);
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

  const handleSetDefault = (accountId: string) => {
    setDefaultMutation.mutate(accountId);
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
        {bankAccounts?.map((account) => (
          <Card key={account.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {account.bank_name}
                  {account.is_default && (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <Star className="h-3 w-3 mr-1" />
                      Standard
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {!account.is_default && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(account.id)}
                      disabled={setDefaultMutation.isPending}
                    >
                      <StarOff className="h-4 w-4 mr-1" />
                      Als Standard festlegen
                    </Button>
                  )}
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
                  <p className="font-medium">
                    {account.daily_limit > 0 
                      ? `€${account.daily_limit.toLocaleString('de-DE', { minimumFractionDigits: 2 })}` 
                      : 'Unbegrenzt'
                    }
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
        ))}

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
    </div>
  );
};

export default AdminBankAccounts;
