
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { useOrderStatusHistory } from '@/hooks/useOrderStatusHistory';
import StatusBadge from './StatusBadge';

interface OrderStatusHistorySectionProps {
  orderId: string;
}

const OrderStatusHistorySection: React.FC<OrderStatusHistorySectionProps> = ({ orderId }) => {
  const { history, isLoading } = useOrderStatusHistory(orderId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusDisplayName = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'Neu',
      confirmed: 'Bezahlt',
      invoice_created: 'Rechnung erstellt',
      shipped: 'Versandt',
      completed: 'Abgeschlossen',
    };
    return statusMap[status] || status;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Status-Verlauf
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-4 text-gray-500">
              Verlauf wird geladen...
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Kein Status-Verlauf vorhanden
            </div>
          ) : (
            history.map((entry, index) => (
              <div key={entry.id} className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  {index < history.length - 1 && (
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-200" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {entry.old_status && (
                        <>
                          <StatusBadge status={entry.old_status} />
                          <span className="text-gray-400">→</span>
                        </>
                      )}
                      <StatusBadge status={entry.new_status} />
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(entry.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {entry.old_status 
                      ? `Status geändert von "${getStatusDisplayName(entry.old_status)}" zu "${getStatusDisplayName(entry.new_status)}"`
                      : `Status gesetzt auf "${getStatusDisplayName(entry.new_status)}"`
                    }
                  </p>
                  {entry.notes && (
                    <p className="text-xs text-gray-500 mt-1">{entry.notes}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">von {entry.changed_by}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusHistorySection;
