
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface BankAccount {
  id: string;
  bank_name: string;
  account_holder: string;
  is_default: boolean;
}

interface BankAccountDeleteDialogProps {
  account: BankAccount | null;
  onClose: () => void;
}

const BankAccountDeleteDialog: React.FC<BankAccountDeleteDialogProps> = ({
  account,
  onClose,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (accountId: string) => {
      const { error } = await supabase
        .from('bank_accounts')
        .delete()
        .eq('id', accountId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      toast({
        title: 'Erfolg',
        description: 'Bankkonto wurde erfolgreich gelöscht.',
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Fehler',
        description: 'Fehler beim Löschen des Bankkontos.',
        variant: 'destructive',
      });
      console.error('Error deleting bank account:', error);
    },
  });

  const handleDelete = () => {
    if (account) {
      deleteMutation.mutate(account.id);
    }
  };

  return (
    <AlertDialog open={!!account} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bankkonto löschen</AlertDialogTitle>
          <AlertDialogDescription>
            Sind Sie sicher, dass Sie das Bankkonto "{account?.bank_name}" löschen möchten?
            {account?.is_default && (
              <span className="block mt-2 text-red-600 font-medium">
                Achtung: Dies ist Ihr Standardkonto!
              </span>
            )}
            Diese Aktion kann nicht rückgängig gemacht werden.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Abbrechen</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Löschen...' : 'Löschen'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BankAccountDeleteDialog;
