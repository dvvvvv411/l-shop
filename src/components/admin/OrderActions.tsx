
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Receipt, Eye, ExternalLink, CheckCircle, ArrowUpDown, ArrowDown, EyeOff, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInvoiceGeneration } from '@/hooks/useInvoiceGeneration';
import { useOrders } from '@/hooks/useOrders';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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
  onOrderDeleted?: () => void;
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
  onOrderUpdate,
  onOrderDeleted
}) => {
  const { generateInvoice, isGenerating } = useInvoiceGeneration();
  const { hideOrder, unhideOrder } = useOrders();
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isInvoiceViewerOpen, setIsInvoiceViewerOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { addStatusChange, refetch: refetchHistory } = useOrderStatusHistory(order.id);
  const { toast } = useToast();

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

  const handleHideOrder = async () => {
    try {
      await hideOrder(order.id);
      if (onOrderUpdate) {
        onOrderUpdate({ is_hidden: true });
      }
    } catch (error) {
      console.error('Failed to hide order:', error);
    }
  };

  const handleUnhideOrder = async () => {
    try {
      await unhideOrder(order.id);
      if (onOrderUpdate) {
        onOrderUpdate({ is_hidden: false });
      }
    } catch (error) {
      console.error('Failed to unhide order:', error);
    }
  };

  const handleDeleteOrder = async () => {
    if (!confirm('Sind Sie sicher, dass Sie diese Bestellung löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.')) {
      return;
    }

    setIsDeleting(true);
    
    try {
      console.log('Starting order deletion process for order:', order.id);

      // Step 1: Delete order notes first
      const { error: notesError } = await supabase
        .from('order_notes')
        .delete()
        .eq('order_id', order.id);

      if (notesError) {
        console.error('Error deleting order notes:', notesError);
        // Continue with deletion even if notes deletion fails
      } else {
        console.log('Successfully deleted order notes');
      }

      // Step 2: Delete order status history
      const { error: historyError } = await supabase
        .from('order_status_history')
        .delete()
        .eq('order_id', order.id);

      if (historyError) {
        console.error('Error deleting order status history:', historyError);
        // Continue with deletion even if history deletion fails
      } else {
        console.log('Successfully deleted order status history');
      }

      // Step 3: Delete email sending logs
      const { error: emailError } = await supabase
        .from('email_sending_logs')
        .delete()
        .eq('order_id', order.id);

      if (emailError) {
        console.error('Error deleting email sending logs:', emailError);
        throw new Error('Fehler beim Löschen der E-Mail-Logs: ' + emailError.message);
      } else {
        console.log('Successfully deleted email sending logs');
      }

      // Step 4: Delete bank account transactions if any
      const { error: transactionError } = await supabase
        .from('bank_account_transactions')
        .delete()
        .eq('order_id', order.id);

      if (transactionError) {
        console.error('Error deleting bank account transactions:', transactionError);
        // Continue with deletion even if transaction deletion fails
      } else {
        console.log('Successfully deleted bank account transactions');
      }

      // Step 5: Delete invoices if any
      const { error: invoiceError } = await supabase
        .from('invoices')
        .delete()
        .eq('order_id', order.id);

      if (invoiceError) {
        console.error('Error deleting invoices:', invoiceError);
        // Continue with deletion even if invoice deletion fails
      } else {
        console.log('Successfully deleted invoices');
      }

      // Step 6: Finally delete the order itself
      const { error: orderError } = await supabase
        .from('orders')
        .delete()
        .eq('id', order.id);

      if (orderError) {
        console.error('Error deleting order:', orderError);
        throw new Error('Fehler beim Löschen der Bestellung: ' + orderError.message);
      }

      console.log('Successfully deleted order');

      toast({
        title: 'Erfolg',
        description: 'Bestellung wurde erfolgreich gelöscht.',
      });

      // Notify parent component that order was deleted
      if (onOrderDeleted) {
        onOrderDeleted();
      }

    } catch (error) {
      console.error('Error in order deletion process:', error);
      toast({
        title: 'Fehler',
        description: error instanceof Error ? error.message : 'Fehler beim Löschen der Bestellung.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
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
          {/* Generate Invoice - Only when status is pending */}
          {currentStatus === 'pending' && (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsInvoiceDialogOpen(true)}
            >
              <Receipt className="h-4 w-4 mr-2" />
              Rechnung erstellen
            </Button>
          )}
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
          
          {/* Hide/Unhide Order - Show unhide button when order is hidden, show hide button only when status is pending and order is not hidden */}
          {order.is_hidden ? (
            <Button
              variant="outline"
              className="w-full justify-start text-blue-700 border-blue-200 hover:bg-blue-50"
              onClick={handleUnhideOrder}
            >
              <Eye className="h-4 w-4 mr-2" />
              Bestellung wieder einblenden
            </Button>
          ) : (
            currentStatus === 'pending' && (
              <Button
                variant="outline"
                className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
                onClick={handleHideOrder}
              >
                <EyeOff className="h-4 w-4 mr-2" />
                Bestellung ausblenden
              </Button>
            )
          )}

          {/* Delete Order - Only show for pending orders */}
          {currentStatus === 'pending' && (
            <Button
              variant="outline"
              className="w-full justify-start text-red-700 border-red-200 hover:bg-red-50"
              onClick={handleDeleteOrder}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeleting ? 'Wird gelöscht...' : 'Bestellung löschen'}
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
