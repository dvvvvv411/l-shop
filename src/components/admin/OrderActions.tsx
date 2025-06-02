
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Receipt, Eye, ExternalLink, CheckCircle, ArrowUpDown, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInvoiceGeneration } from '@/hooks/useInvoiceGeneration';
import InvoiceCreationDialog from './InvoiceCreationDialog';
import InvoiceViewerDialog from './InvoiceViewerDialog';
import OrderStatusHistorySection from './OrderStatusHistorySection';
import { useOrderStatusHistory } from '@/hooks/useOrderStatusHistory';
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
  const { addStatusChange, refetch: refetchHistory } = useOrderStatusHistory(order.id);

  const handleGenerateInvoice = async () => {
    try {
      const result = await generateInvoice(order.id);
      if (result && result.updatedOrder && onOrderUpdate) {
        onOrderUpdate(result.updatedOrder);
      }
      // Refresh the status history after invoice generation
      setTimeout(() => {
        refetchHistory();
      }, 1000);
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

  const handleMarkAsPaid = async () => {
    await handleStatusChange('confirmed');
  };

  const handleMarkAsExchanged = async () => {
    await handleStatusChange('exchanged');
  };

  const handleMarkAsDown = async () => {
    await handleStatusChange('down');
  };

  const handleStatusChange = async (newStatus: string) => {
    const oldStatus = currentStatus;
    onStatusChange(newStatus);
    
    // Log the status change
    try {
      await addStatusChange(oldStatus, newStatus);
    } catch (error) {
      console.error('Failed to log status change:', error);
    }
  };

  const handleCloseInvoiceViewer = () => {
    setIsInvoiceViewerOpen(false);
  };

  const handleOrderUpdateFromDialog = async (orderId: string, updatedData: Partial<Order>) => {
    if (onOrderUpdate) {
      onOrderUpdate(updatedData);
    }
    // Refresh the status history after order update from dialog
    setTimeout(() => {
      refetchHistory();
    }, 1000);
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
          <Select value={currentStatus} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Neu</SelectItem>
              <SelectItem value="confirmed">Bezahlt</SelectItem>
              <SelectItem value="invoice_created">Rechnung erstellt</SelectItem>
              <SelectItem value="exchanged">Exchanged</SelectItem>
              <SelectItem value="down">Down</SelectItem>
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
          {currentStatus === 'invoice_created' && (
            <Button
              variant="outline"
              className="w-full justify-start text-green-700 border-green-200 hover:bg-green-50"
              onClick={handleMarkAsPaid}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Als bezahlt markieren
            </Button>
          )}
          {currentStatus === 'confirmed' && (
            <>
              <Button
                variant="outline"
                className="w-full justify-start text-green-700 border-green-200 hover:bg-green-50"
                onClick={handleMarkAsExchanged}
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Als Exchanged markieren
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-700 border-red-200 hover:bg-red-50"
                onClick={handleMarkAsDown}
              >
                <ArrowDown className="h-4 w-4 mr-2" />
                Als Down markieren
              </Button>
            </>
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
        </CardContent>
      </Card>

      {/* Status History */}
      <OrderStatusHistorySection orderId={order.id} />

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
