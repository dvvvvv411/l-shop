
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
    <div className="flex gap-1 min-w-[140px] justify-start">
      {/* View Order - Always available */}
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onViewOrder(order)}
        title="Bestellung anzeigen"
        className="h-7 w-7 p-0 flex-shrink-0"
      >
        <Eye className="h-3 w-3" />
      </Button>

      {/* Generate Invoice - Always available */}
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onGenerateInvoice(order)}
        title="Rechnung erstellen"
        className="h-7 w-7 p-0 flex-shrink-0"
      >
        <Receipt className="h-3 w-3" />
      </Button>

      {/* Mark as Paid - Only when invoice is created */}
      {order.status === 'invoice_created' && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleMarkAsPaid}
          title="Als bezahlt markieren"
          className="h-7 w-7 p-0 text-green-700 hover:text-green-800 hover:bg-green-50 flex-shrink-0"
        >
          <CheckCircle className="h-3 w-3" />
        </Button>
      )}

      {/* View Invoice - Only when invoice exists */}
      {(order.invoice_file_url && order.invoice_number) && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onViewInvoice(order)}
          title="Rechnung anzeigen"
          className="h-7 w-7 p-0 flex-shrink-0"
        >
          <FileText className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default OrderTableActions;
