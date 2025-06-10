
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

// Use the correct Supabase type
type BankAccount = Tables<'bank_accounts'>;

interface BankAccountFormProps {
  isOpen: boolean;
  onClose: () => void;
  account?: BankAccount | null;
}

interface FormData {
  bank_name: string;
  account_holder: string;
  iban: string;
  bic: string;
  is_active: boolean;
  daily_limit: number;
  system_name: string;
  anyname: boolean;
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({
  isOpen,
  onClose,
  account,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    defaultValues: {
      bank_name: account?.bank_name || '',
      account_holder: account?.account_holder || '',
      iban: account?.iban || '',
      bic: account?.bic || '',
      is_active: account?.is_active || false,
      daily_limit: account?.daily_limit || 0,
      system_name: account?.system_name || '',
      anyname: account?.anyname || false,
    },
  });

  React.useEffect(() => {
    if (account) {
      form.reset({
        bank_name: account.bank_name,
        account_holder: account.account_holder,
        iban: account.iban,
        bic: account.bic,
        is_active: account.is_active,
        daily_limit: account.daily_limit || 0,
        system_name: account.system_name,
        anyname: account.anyname || false,
      });
    } else {
      form.reset({
        bank_name: '',
        account_holder: '',
        iban: '',
        bic: '',
        is_active: false,
        daily_limit: 0,
        system_name: '',
        anyname: false,
      });
    }
  }, [account, form]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (account) {
        const { error } = await supabase
          .from('bank_accounts')
          .update(data)
          .eq('id', account.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('bank_accounts')
          .insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      toast({
        title: 'Erfolg',
        description: account 
          ? 'Bankkonto wurde erfolgreich aktualisiert.'
          : 'Bankkonto wurde erfolgreich erstellt.',
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Fehler',
        description: 'Fehler beim Speichern des Bankkontos.',
        variant: 'destructive',
      });
      console.error('Error saving bank account:', error);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {account ? 'Bankkonto bearbeiten' : 'Neues Bankkonto'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="system_name"
              rules={{ required: 'Systemname ist erforderlich' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Systemname</FormLabel>
                  <FormControl>
                    <Input placeholder="z.B. Alpha, Beta, Gamma" {...field} />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-gray-500">
                    Interner Name zur einfachen Identifizierung
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bank_name"
              rules={{ required: 'Bankname ist erforderlich' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bankname</FormLabel>
                  <FormControl>
                    <Input placeholder="z.B. Deutsche Bank" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account_holder"
              rules={{ required: 'Kontoinhaber ist erforderlich' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kontoinhaber</FormLabel>
                  <FormControl>
                    <Input placeholder="z.B. Heizöl Express GmbH" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="iban"
              rules={{ 
                required: 'IBAN ist erforderlich',
                pattern: {
                  value: /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/,
                  message: 'Ungültiges IBAN-Format'
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IBAN</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="z.B. DE89370400440532013000" 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bic"
              rules={{ 
                required: 'BIC ist erforderlich',
                pattern: {
                  value: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
                  message: 'Ungültiges BIC-Format'
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BIC</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="z.B. DEUTDEDBFRA" 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="daily_limit"
              rules={{ 
                required: 'Tageslimit ist erforderlich',
                min: { value: 0, message: 'Tageslimit muss mindestens 0 sein' }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tageslimit (€)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="z.B. 10000.00" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-gray-500">
                    Setzen Sie das Tageslimit auf 0, um es zu deaktivieren
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="anyname"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Anyname</FormLabel>
                    <p className="text-sm text-gray-500">
                      Wenn aktiviert, wird der Firmenname des Shops anstelle des Kontoinhabers verwendet
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Konto aktivieren</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Abbrechen
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Speichern...' : 'Speichern'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BankAccountForm;
