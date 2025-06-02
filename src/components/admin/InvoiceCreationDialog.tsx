
import React, { useState, useEffect } from 'react';
import { FileText, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useShops } from '@/hooks/useShops';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import { useOrders, type Order } from '@/hooks/useOrders';
import { useInvoiceGeneration } from '@/hooks/useInvoiceGeneration';

interface InvoiceCreationDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdate?: (orderId: string, updatedData: Partial<Order>) => void;
}

const InvoiceCreationDialog: React.FC<InvoiceCreationDialogProps> = ({
  order,
  isOpen,
  onClose,
  onOrderUpdate
}) => {
  const { shops, isLoading: shopsLoading } = useShops();
  const { bankAccounts, isLoading: bankAccountsLoading, getDailyUsage, checkDailyLimit } = useBankAccounts();
  const { updateOrderStatus } = useOrders();
  const { generateInvoice, isGenerating } = useInvoiceGeneration();
  
  const [dailyUsage, setDailyUsage] = useState<number>(0);
  const [limitExceeded, setLimitExceeded] = useState<boolean>(false);

  // Use the first shop as default (since is_default field no longer exists)
  const defaultShop = shops.length > 0 ? shops[0] : null;
  const defaultBankAccount = bankAccounts.find(account => account.is_default);

  // Use current date as invoice date
  const invoiceDate = new Date().toISOString().split('T')[0];

  // Check daily usage and limit when dialog opens or order changes
  useEffect(() => {
    const checkUsageAndLimit = async () => {
      if (defaultBankAccount && order) {
        const usage = await getDailyUsage(defaultBankAccount.id, invoiceDate);
        setDailyUsage(usage);
        
        const canProcess = await checkDailyLimit(defaultBankAccount.id, order.total_amount, invoiceDate);
        setLimitExceeded(!canProcess);
      }
    };

    if (isOpen) {
      checkUsageAndLimit();
    }
  }, [defaultBankAccount, order, invoiceDate, getDailyUsage, checkDailyLimit, isOpen]);

  const handleCreateInvoice = async () => {
    if (!order || !defaultShop || !defaultBankAccount) return;

    try {
      // Generate the invoice with default shop and bank account
      const result = await generateInvoice(order.id, defaultShop.id, defaultBankAccount.id);
      
      // Update local state if onOrderUpdate is provided
      if (result && result.updatedOrder && onOrderUpdate) {
        onOrderUpdate(order.id, result.updatedOrder);
      }
      
      onClose();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  if (!order) return null;

  // Calculate progress percentage for the daily limit
  const progressPercentage = defaultBankAccount && defaultBankAccount.daily_limit > 0 
    ? Math.min(100, (dailyUsage / defaultBankAccount.daily_limit) * 100)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Rechnung erstellen
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bestellinformationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Bestellnummer:</span>
                  <div>{order.order_number}</div>
                </div>
                <div>
                  <span className="font-medium">Kunde:</span>
                  <div>{order.customer_name}</div>
                </div>
                <div>
                  <span className="font-medium">Gesamtbetrag:</span>
                  <div className="font-bold">€{order.total_amount.toFixed(2)}</div>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <div className="capitalize">{order.status}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Limit Information */}
          {defaultBankAccount && defaultBankAccount.daily_limit > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Tageslimit-Übersicht ({defaultBankAccount.system_name})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bereits verwendet:</span>
                    <span className="font-medium">
                      €{dailyUsage.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tageslimit:</span>
                    <span className="font-medium">
                      €{defaultBankAccount.daily_limit.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <Progress 
                      value={progressPercentage} 
                      className="h-3"
                    />
                    <div className="text-xs text-gray-500 text-center">
                      {progressPercentage.toFixed(1)}% verwendet
                    </div>
                  </div>
                </div>
                
                {limitExceeded && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Diese Rechnung würde das Tageslimit überschreiten! Bitte wählen Sie ein anderes Bankkonto oder verschieben Sie die Rechnung auf einen anderen Tag.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Abbrechen
            </Button>
            <Button
              onClick={handleCreateInvoice}
              disabled={!defaultShop || !defaultBankAccount || isGenerating || shopsLoading || bankAccountsLoading || limitExceeded}
              className="bg-red-600 hover:bg-red-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              {isGenerating ? 'Erstelle Rechnung...' : 'Rechnung erstellen'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceCreationDialog;
