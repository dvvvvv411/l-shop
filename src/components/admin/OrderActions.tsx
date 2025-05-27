
import React from 'react';
import { FileText, Download, Truck, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrderActionsProps {
  currentStatus: 'Neu' | 'Bezahlt' | 'Versandt' | 'Abgeschlossen';
  onStatusChange: (status: string) => void;
  onGenerateInvoice: () => void;
  onPrintDeliveryNote: () => void;
  onNavigateOrder: (direction: 'prev' | 'next') => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const OrderActions: React.FC<OrderActionsProps> = ({
  currentStatus,
  onStatusChange,
  onGenerateInvoice,
  onPrintDeliveryNote,
  onNavigateOrder,
  hasPrevious,
  hasNext
}) => {
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
              <SelectItem value="Neu">Neu</SelectItem>
              <SelectItem value="Bezahlt">Bezahlt</SelectItem>
              <SelectItem value="Versandt">Versandt</SelectItem>
              <SelectItem value="Abgeschlossen">Abgeschlossen</SelectItem>
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
            onClick={onGenerateInvoice}
          >
            <FileText className="h-4 w-4 mr-2" />
            Rechnung generieren
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onPrintDeliveryNote}
          >
            <Download className="h-4 w-4 mr-2" />
            Lieferschein drucken
          </Button>
          {currentStatus === 'Bezahlt' && (
            <Button
              className="w-full justify-start bg-blue-600 hover:bg-blue-700"
              onClick={() => onStatusChange('Versandt')}
            >
              <Truck className="h-4 w-4 mr-2" />
              Als versandt markieren
            </Button>
          )}
          {currentStatus === 'Versandt' && (
            <Button
              className="w-full justify-start bg-green-600 hover:bg-green-700"
              onClick={() => onStatusChange('Abgeschlossen')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Als abgeschlossen markieren
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderActions;
