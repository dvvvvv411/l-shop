
import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Building2, CreditCard, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const { bankAccounts, isLoading: bankAccountsLoading } = useBankAccounts();
  const { updateOrderStatus } = useOrders();
  const { generateInvoice, isGenerating } = useInvoiceGeneration();
  
  const [selectedShopId, setSelectedShopId] = useState<string>('');
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string>('');
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [processedBy, setProcessedBy] = useState<string>('');

  // Get active shops and default shop
  const activeShops = shops.filter(shop => shop.is_active);
  const defaultShop = shops.find(shop => shop.is_default);
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
      <DialogContent className="max-w-2xl">
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
                    {activeShops.map((shop) => (
                      <SelectItem key={shop.id} value={shop.id}>
                        <div className="flex items-center gap-2">
                          {shop.is_default && <span className="text-yellow-600">⭐</span>}
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
              disabled={!selectedShopId || !selectedBankAccountId || isGenerating || shopsLoading || bankAccountsLoading}
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
