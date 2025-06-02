
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Receipt, CheckCircle, FileText } from 'lucide-react';
import { Order } from '@/hooks/useOrders';

interface OrderTableActionsProps {
  order: Order;
  onViewOrder: (order: Order) => void;
  onGenerateInvoice: (order: Order) => void;
  onViewInvoice: (order: Order) => void;
  onMarkAsPaid?: (order: Order) => void;
}

const OrderTableActions: React.FC<OrderTableActionsProps> = ({
  order,
  onViewOrder,
  onGenerateInvoice,
  onViewInvoice,
  onMarkAsPaid,
}) => {
  const handleMarkAsPaid = () => {
    if (onMarkAsPaid) {
      onMarkAsPaid(order);
    }
  };

  return (
    <div className="flex gap-1">
      {/* View Order - Always available */}
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onViewOrder(order)}
        title="Bestellung anzeigen"
      >
        <Eye className="h-4 w-4" />
      </Button>

      {/* Generate Invoice - Always available */}
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onGenerateInvoice(order)}
        title="Rechnung erstellen"
      >
        <Receipt className="h-4 w-4" />
      </Button>

      {/* Mark as Paid - Only when invoice is created */}
      {order.status === 'invoice_created' && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleMarkAsPaid}
          title="Als bezahlt markieren"
          className="text-green-700 hover:text-green-800 hover:bg-green-50"
        >
          <CheckCircle className="h-4 w-4" />
        </Button>
      )}

      {/* View Invoice - Only when invoice exists */}
      {(order.invoice_file_url && order.invoice_number) && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onViewInvoice(order)}
          title="Rechnung anzeigen"
        >
          <FileText className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default OrderTableActions;
