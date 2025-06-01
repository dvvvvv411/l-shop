
import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Building2, CreditCard, Landmark, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useShops } from '@/hooks/useShops';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import { useOrders, type Order } from '@/hooks/useOrders';
import { useInvoiceGeneration } from '@/hooks/useInvoiceGeneration';

interface InvoiceCreationDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceCreationDialog: React.FC<InvoiceCreationDialogProps> = ({
  order,
  isOpen,
  onClose
}) => {
  const { shops, isLoading: shopsLoading } = useShops();
  const { bankAccounts, isLoading: bankAccountsLoading, getDailyUsage, checkDailyLimit } = useBankAccounts();
  const { updateOrderStatus } = useOrders();
  const { generateInvoice, isGenerating } = useInvoiceGeneration();
  
  const [selectedShopId, setSelectedShopId] = useState<string>('');
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string>('');
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [processedBy, setProcessedBy] = useState<string>('');
  const [dailyUsage, setDailyUsage] = useState<number>(0);
  const [limitExceeded, setLimitExceeded] = useState<boolean>(false);

  // Get all shops (since is_active field no longer exists)
  const availableShops = shops;
  // Use the first shop as default (since is_default field no longer exists)
  const defaultShop = shops.length > 0 ? shops[0] : null;
  const defaultBankAccount = bankAccounts.find(account => account.is_default);

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen && defaultShop) {
      setSelectedShopId(defaultShop.id);
      setInvoiceDate(new Date().toISOString().split('T')[0]);
      setProcessedBy('');
    }
  }, [isOpen, defaultShop]);

  useEffect(() => {
    if (isOpen && defaultBankAccount) {
      setSelectedBankAccountId(defaultBankAccount.id);
    }
  }, [isOpen, defaultBankAccount]);

  // Check daily usage and limit when bank account or order changes
  useEffect(() => {
    const checkUsageAndLimit = async () => {
      if (selectedBankAccountId && order) {
        const usage = await getDailyUsage(selectedBankAccountId, invoiceDate);
        setDailyUsage(usage);
        
        const canProcess = await checkDailyLimit(selectedBankAccountId, order.total_amount, invoiceDate);
        setLimitExceeded(!canProcess);
      }
    };

    if (isOpen) {
      checkUsageAndLimit();
    }
  }, [selectedBankAccountId, order, invoiceDate, getDailyUsage, checkDailyLimit, isOpen]);

  const handleCreateInvoice = async () => {
    if (!order || !selectedShopId) return;

    try {
      // Generate the invoice with selected shop and bank account
      await generateInvoice(order.id, selectedShopId, selectedBankAccountId);
      
      onClose();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  if (!order) return null;

  const selectedShop = shops.find(shop => shop.id === selectedShopId);
  const selectedBankAccount = bankAccounts.find(account => account.id === selectedBankAccountId);

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

              {/* Bank Account Selection */}
              <div className="space-y-2">
                <Label htmlFor="bank-account-select">Bankkonto auswählen</Label>
                <Select value={selectedBankAccountId} onValueChange={setSelectedBankAccountId}>
                  <SelectTrigger id="bank-account-select">
                    <SelectValue placeholder="Bankkonto auswählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    {bankAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        <div className="flex items-center gap-2">
                          {account.is_default && <span className="text-yellow-600">⭐</span>}
                          <span>{account.bank_name}</span>
                          <span className="text-gray-500">({account.iban.slice(-4)})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Invoice Date */}
              <div className="space-y-2">
                <Label htmlFor="invoice-date">Rechnungsdatum</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="invoice-date"
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Processed By */}
              <div className="space-y-2">
                <Label htmlFor="processed-by">Bearbeitet von (optional)</Label>
                <Input
                  id="processed-by"
                  placeholder="Name des Bearbeiters..."
                  value={processedBy}
                  onChange={(e) => setProcessedBy(e.target.value)}
                />
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
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Tageslimit:</span>
                    <div>€{selectedBankAccount.daily_limit.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div>
                    <span className="font-medium">Bereits verwendet:</span>
                    <div>€{dailyUsage.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div>
                    <span className="font-medium">Verfügbar:</span>
                    <div>€{Math.max(0, selectedBankAccount.daily_limit - dailyUsage).toLocaleString('de-DE', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div>
                    <span className="font-medium">Diese Rechnung:</span>
                    <div className={limitExceeded ? 'text-red-600 font-bold' : ''}>
                      €{order.total_amount.toFixed(2)}
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

          {/* Selected Shop Preview */}
          {selectedShop && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ausgewähltes Geschäft</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="font-medium">{selectedShop.company_name}</div>
                  <div>{selectedShop.company_address}</div>
                  <div>{selectedShop.company_postcode} {selectedShop.company_city}</div>
                  {selectedShop.company_phone && <div>Tel: {selectedShop.company_phone}</div>}
                  {selectedShop.company_email && <div>E-Mail: {selectedShop.company_email}</div>}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Selected Bank Account Preview */}
          {selectedBankAccount && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Landmark className="h-5 w-5" />
                  Ausgewähltes Bankkonto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="font-medium">{selectedBankAccount.bank_name}</div>
                  <div>Kontoinhaber: {selectedBankAccount.account_holder}</div>
                  <div>IBAN: {selectedBankAccount.iban}</div>
                  {selectedBankAccount.bic && <div>BIC: {selectedBankAccount.bic}</div>}
                  {selectedBankAccount.daily_limit > 0 && (
                    <div>Tageslimit: €{selectedBankAccount.daily_limit.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</div>
                  )}
                </div>
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
              disabled={!selectedShopId || !selectedBankAccountId || isGenerating || shopsLoading || bankAccountsLoading || limitExceeded}
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
