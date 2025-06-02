
import React, { useState } from 'react';
import { FileText, Download, Truck, CheckCircle, ArrowLeft, ArrowRight, Receipt, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInvoiceGeneration } from '@/hooks/useInvoiceGeneration';
import InvoiceCreationDialog from './InvoiceCreationDialog';
import InvoiceViewerDialog from './InvoiceViewerDialog';
import type { Order } from '@/hooks/useOrders';

interface OrderActionsProps {
  order: Order;
  currentStatus: string;
  onStatusChange: (status: string) => void;
  onGenerateInvoice: () => void;
  onPrintDeliveryNote: () => void;
  onNavigateOrder: (direction: 'prev' | 'next') => void;
  hasPrevious: boolean;
  hasNext: boolean;
  onOrderUpdate?: (updatedOrder: Partial<Order>) => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({
  order,
  currentStatus,
  onStatusChange,
  onGenerateInvoice,
  onPrintDeliveryNote,
  onNavigateOrder,
  hasPrevious,
  hasNext,
  onOrderUpdate
}) => {
  const { generateInvoice, isGenerating } = useInvoiceGeneration();
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isInvoiceViewerOpen, setIsInvoiceViewerOpen] = useState(false);

  const handleGenerateInvoice = async () => {
    try {
      // Generate invoice with default shop and bank account (no specific selection)
      const result = await generateInvoice(order.id);
      if (result && result.updatedOrder && onOrderUpdate) {
        // Update the order data locally to avoid page refresh
        onOrderUpdate(result.updatedOrder);
      }
    } catch (error) {
      console.error('Failed to generate invoice:', error);
    }
  };

  const handleViewInvoice = () => {
    setIsInvoiceViewerOpen(true);
  };

  const handleViewPDF = () => {
    if (order.invoice_file_url) {
      window.open(order.invoice_file_url, '_blank');
    }
  };

  const handleCloseInvoiceViewer = () => {
    setIsInvoiceViewerOpen(false);
  };

  const handleOrderUpdateFromDialog = (orderId: string, updatedData: Partial<Order>) => {
    if (onOrderUpdate) {
      onOrderUpdate(updatedData);
    }
  };

  return (
    <div className="space-y-4">
      {/* Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateOrder('prev')}
              disabled={!hasPrevious}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Vorherige
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateOrder('next')}
              disabled={!hasNext}
              className="flex-1"
            >
              Nächste
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Change */}
      <Card>
        <CardHeader>
          <CardTitle>Status ändern</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={currentStatus} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Neu</SelectItem>
              <SelectItem value="confirmed">Bezahlt</SelectItem>
              <SelectItem value="invoice_created">Rechnung erstellt</SelectItem>
              <SelectItem value="shipped">Versandt</SelectItem>
              <SelectItem value="completed">Abgeschlossen</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Schnellaktionen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setIsInvoiceDialogOpen(true)}
          >
            <Receipt className="h-4 w-4 mr-2" />
            Rechnung erstellen
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleGenerateInvoice}
            disabled={isGenerating}
          >
            <FileText className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generiere Rechnung...' : 'Rechnung (Schnell)'}
          </Button>
          {order.invoice_file_url && (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleViewPDF}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              PDF anzeigen
            </Button>
          )}
          {(order.invoice_file_url && order.invoice_number) && (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleViewInvoice}
            >
              <Eye className="h-4 w-4 mr-2" />
              Rechnung anzeigen
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onPrintDeliveryNote}
          >
            <Download className="h-4 w-4 mr-2" />
            Lieferschein drucken
          </Button>
          {currentStatus === 'confirmed' && (
            <Button
              className="w-full justify-start bg-blue-600 hover:bg-blue-700"
              onClick={() => onStatusChange('shipped')}
            >
              <Truck className="h-4 w-4 mr-2" />
              Als versandt markieren
            </Button>
          )}
          {currentStatus === 'invoice_created' && (
            <Button
              className="w-full justify-start bg-blue-600 hover:bg-blue-700"
              onClick={() => onStatusChange('shipped')}
            >
              <Truck className="h-4 w-4 mr-2" />
              Als versandt markieren
            </Button>
          )}
          {currentStatus === 'shipped' && (
            <Button
              className="w-full justify-start bg-green-600 hover:bg-green-700"
              onClick={() => onStatusChange('completed')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Als abgeschlossen markieren
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Invoice Creation Dialog */}
      <InvoiceCreationDialog
        order={order}
        isOpen={isInvoiceDialogOpen}
        onClose={() => setIsInvoiceDialogOpen(false)}
        onOrderUpdate={handleOrderUpdateFromDialog}
      />

      {/* Invoice Viewer Dialog */}
      <InvoiceViewerDialog
        order={order}
        isOpen={isInvoiceViewerOpen}
        onClose={handleCloseInvoiceViewer}
      />
    </div>
  );
};

export default OrderActions;
