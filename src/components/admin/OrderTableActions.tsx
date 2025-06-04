
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Receipt, CheckCircle, FileText, ArrowUpDown, ArrowDown, EyeOff } from 'lucide-react';
import { Order } from '@/hooks/useOrders';

interface OrderTableActionsProps {
  order: Order;
  onViewOrder: (order: Order) => void;
  onGenerateInvoice: (order: Order) => void;
  onViewInvoice: (order: Order) => void;
  onMarkAsPaid?: (order: Order) => void;
  onMarkAsExchanged?: (order: Order) => void;
  onMarkAsDown?: (order: Order) => void;
  onHideOrder?: (order: Order) => void;
  onUnhideOrder?: (order: Order) => void;
  showHidden?: boolean;
}

const OrderTableActions: React.FC<OrderTableActionsProps> = ({
  order,
  onViewOrder,
  onGenerateInvoice,
  onViewInvoice,
  onMarkAsPaid,
  onMarkAsExchanged,
  onMarkAsDown,
  onHideOrder,
  onUnhideOrder,
  showHidden = false,
}) => {
  const handleMarkAsPaid = () => {
    if (onMarkAsPaid) {
      onMarkAsPaid(order);
    }
  };

  const handleMarkAsExchanged = () => {
    if (onMarkAsExchanged) {
      onMarkAsExchanged(order);
    }
  };

  const handleMarkAsDown = () => {
    if (onMarkAsDown) {
      onMarkAsDown(order);
    }
  };

  const handleHideOrder = () => {
    if (onHideOrder) {
      onHideOrder(order);
    }
  };

  const handleUnhideOrder = () => {
    if (onUnhideOrder) {
      onUnhideOrder(order);
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

      {/* Generate Invoice - Only when status is pending */}
      {order.status === 'pending' && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onGenerateInvoice(order)}
          title="Rechnung erstellen"
          className="h-7 w-7 p-0 flex-shrink-0"
        >
          <Receipt className="h-3 w-3" />
        </Button>
      )}

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

      {/* Mark as Exchanged - Only when status is confirmed */}
      {order.status === 'confirmed' && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleMarkAsExchanged}
          title="Als Exchanged markieren"
          className="h-7 w-7 p-0 text-green-700 hover:text-green-800 hover:bg-green-50 flex-shrink-0"
        >
          <ArrowUpDown className="h-3 w-3" />
        </Button>
      )}

      {/* Mark as Down - Only when status is confirmed */}
      {order.status === 'confirmed' && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleMarkAsDown}
          title="Als Down markieren"
          className="h-7 w-7 p-0 text-red-700 hover:text-red-800 hover:bg-red-50 flex-shrink-0"
        >
          <ArrowDown className="h-3 w-3" />
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

      {/* Hide/Unhide Order - Show unhide button when showing hidden orders and order is hidden, show hide button only when status is pending and order is not hidden */}
      {showHidden && order.is_hidden ? (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleUnhideOrder}
          title="Bestellung wieder einblenden"
          className="h-7 w-7 p-0 text-blue-700 hover:text-blue-800 hover:bg-blue-50 flex-shrink-0"
        >
          <Eye className="h-3 w-3" />
        </Button>
      ) : (
        !order.is_hidden && order.status === 'pending' && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleHideOrder}
            title="Bestellung ausblenden"
            className="h-7 w-7 p-0 text-gray-700 hover:text-gray-800 hover:bg-gray-50 flex-shrink-0"
          >
            <EyeOff className="h-3 w-3" />
          </Button>
        )
      )}
    </div>
  );
};

export default OrderTableActions;
