import React, { useState, useEffect } from 'react';
import { FileText, Building2, CreditCard, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
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

interface BankAccountUsage {
  accountId: string;
  usage: number;
  limit: number;
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
  
  const [selectedShopId, setSelectedShopId] = useState<string>('');
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string>('');
  const [dailyUsage, setDailyUsage] = useState<number>(0);
  const [limitExceeded, setLimitExceeded] = useState<boolean>(false);
  const [bankAccountUsages, setBankAccountUsages] = useState<BankAccountUsage[]>([]);
  const [enableAdditionalNotes, setEnableAdditionalNotes] = useState<boolean>(false);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Get all shops (since is_active field no longer exists)
  const availableShops = shops;
  // Use the first shop as default (since is_default field no longer exists)
  const defaultShop = shops.length > 0 ? shops[0] : null;
  
  // Filter only active bank accounts for selection
  const activeBankAccounts = bankAccounts.filter(account => account.is_active);
  const defaultBankAccount = activeBankAccounts.length > 0 ? activeBankAccounts[0] : null;

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen && defaultShop) {
      setSelectedShopId(defaultShop.id);
    }
  }, [isOpen, defaultShop]);

  useEffect(() => {
    if (isOpen && defaultBankAccount) {
      setSelectedBankAccountId(defaultBankAccount.id);
    }
  }, [isOpen, defaultBankAccount]);

  // Reset additional notes when dialog opens
  useEffect(() => {
    if (isOpen) {
      setEnableAdditionalNotes(false);
      setAdditionalNotes('');
    }
  }, [isOpen]);

  // Fetch daily usage for all active bank accounts when dialog opens
  useEffect(() => {
    const fetchAllBankAccountUsages = async () => {
      if (isOpen && activeBankAccounts.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        const usages = await Promise.all(
          activeBankAccounts.map(async (account) => {
            const usage = await getDailyUsage(account.id, today);
            return {
              accountId: account.id,
              usage,
              limit: account.daily_limit || 0
            };
          })
        );
        setBankAccountUsages(usages);
      }
    };

    if (isOpen) {
      fetchAllBankAccountUsages();
    }
  }, [isOpen, activeBankAccounts, getDailyUsage]);

  // Check daily usage and limit when bank account or order changes
  useEffect(() => {
    const checkUsageAndLimit = async () => {
      if (selectedBankAccountId && order) {
        const usage = bankAccountUsages.find(u => u.accountId === selectedBankAccountId);
        if (usage) {
          setDailyUsage(usage.usage);
          
          const canProcess = await checkDailyLimit(selectedBankAccountId, order.total_amount, new Date().toISOString().split('T')[0]);
          setLimitExceeded(!canProcess);
        }
      }
    };

    if (isOpen && bankAccountUsages.length > 0) {
      checkUsageAndLimit();
    }
  }, [selectedBankAccountId, order, checkDailyLimit, isOpen, bankAccountUsages]);

  const handleCreateInvoice = async () => {
    if (!order || !selectedShopId) return;

    try {
      // Generate the invoice with selected shop, bank account, and additional notes
      const result = await generateInvoice(
        order.id, 
        selectedShopId, 
        selectedBankAccountId, 
        enableAdditionalNotes ? additionalNotes : undefined
      );
      
      // Update local state if onOrderUpdate is provided
      if (result && result.updatedOrder && onOrderUpdate) {
        onOrderUpdate(order.id, result.updatedOrder);
      }
      
      onClose();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  // Helper function to get bank account display text
  const getBankAccountDisplayText = (account: any) => {
    const usage = bankAccountUsages.find(u => u.accountId === account.id);
    if (usage && usage.limit > 0) {
      const formattedUsage = usage.usage.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      const formattedLimit = usage.limit.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      return `${account.system_name} (${formattedUsage}/${formattedLimit}€)`;
    }
    return account.system_name;
  };

  if (!order) return null;

  const selectedBankAccount = activeBankAccounts.find(account => account.id === selectedBankAccountId);
  const usagePercentage = selectedBankAccount && selectedBankAccount.daily_limit > 0 
    ? (dailyUsage / selectedBankAccount.daily_limit) * 100 
    : 0;

  // Show 100% when limit is exceeded
  const displayPercentage = limitExceeded ? 100 : usagePercentage;

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

          {/* Invoice Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Rechnungseinstellungen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Shop Selection */}
              <div className="space-y-2">
                <Label htmlFor="shop-select">Geschäft auswählen</Label>
                <Select value={selectedShopId} onValueChange={setSelectedShopId}>
                  <SelectTrigger id="shop-select">
                    <SelectValue placeholder="Geschäft auswählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableShops.map((shop) => (
                      <SelectItem key={shop.id} value={shop.id}>
                        <div className="flex items-center gap-2">
                          <span>{shop.name}</span>
                          <span className="text-gray-500">({shop.company_name})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bank Account Selection - Only show active accounts */}
              <div className="space-y-2">
                <Label htmlFor="bank-account-select">Bankkonto auswählen</Label>
                <Select value={selectedBankAccountId} onValueChange={setSelectedBankAccountId}>
                  <SelectTrigger id="bank-account-select">
                    <SelectValue placeholder="Bankkonto auswählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    {activeBankAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        <div className="flex items-center gap-2">
                          <span>{getBankAccountDisplayText(account)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {activeBankAccounts.length === 0 && (
                  <p className="text-sm text-red-600">
                    Keine aktiven Bankkonten verfügbar. Bitte aktivieren Sie mindestens ein Bankkonto.
                  </p>
                )}
              </div>

              {/* Additional Notes Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="enable-notes" 
                    checked={enableAdditionalNotes}
                    onCheckedChange={setEnableAdditionalNotes}
                  />
                  <Label htmlFor="enable-notes" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Zusätzliche Anmerkungen hinzufügen
                  </Label>
                </div>
                
                {enableAdditionalNotes && (
                  <div className="space-y-2">
                    <Label htmlFor="additional-notes">Anmerkungen</Label>
                    <Textarea
                      id="additional-notes"
                      placeholder="Geben Sie hier zusätzliche Anmerkungen ein (z.B. Anzahlung, besondere Hinweise, etc.)"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Daily Limit Information */}
          {selectedBankAccount && selectedBankAccount.daily_limit > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Tageslimit-Übersicht
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Verwendung heute:</span>
                    <span className="font-medium">
                      €{dailyUsage.toLocaleString('de-DE', { minimumFractionDigits: 2 })} / €{selectedBankAccount.daily_limit.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <Progress 
                    value={displayPercentage} 
                    className={`h-2 ${limitExceeded ? '[&_.bg-primary]:bg-orange-500' : ''}`}
                  />
                  <div className="text-xs text-gray-500 text-center">
                    {limitExceeded ? '100' : usagePercentage.toFixed(1)}% des Tageslimits verwendet
                  </div>
                </div>
                
                {limitExceeded && (
                  <Alert variant="default" className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      <strong>Warnung:</strong> Diese Rechnung würde das Tageslimit überschreiten! Sie können trotzdem fortfahren, sollten aber das Risiko berücksichtigen.
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
              disabled={!selectedShopId || !selectedBankAccountId || isGenerating || shopsLoading || bankAccountsLoading || activeBankAccounts.length === 0}
              className={`${limitExceeded ? 'bg-orange-600 hover:bg-orange-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              <FileText className="h-4 w-4 mr-2" />
              {isGenerating ? 'Erstelle Rechnung...' : limitExceeded ? 'Trotzdem erstellen' : 'Rechnung erstellen'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceCreationDialog;
