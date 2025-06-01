
import React from 'react';
import { FileText, Download, Truck, CheckCircle, ArrowLeft, ArrowRight, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInvoiceGeneration } from '@/hooks/useInvoiceGeneration';

interface OrderActionsProps {
  orderId: string;
  currentStatus: 'pending' | 'confirmed' | 'shipped' | 'completed';
  onStatusChange: (status: string) => void;
  onGenerateInvoice: () => void;
  onPrintDeliveryNote: () => void;
  onNavigateOrder: (direction: 'prev' | 'next') => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const OrderActions: React.FC<OrderActionsProps> = ({
  orderId,
  currentStatus,
  onStatusChange,
  onGenerateInvoice,
  onPrintDeliveryNote,
  onNavigateOrder,
  hasPrevious,
  hasNext
}) => {
  const { generateInvoice, isGenerating } = useInvoiceGeneration();

  const handleGenerateInvoice = async () => {
    try {
      await generateInvoice(orderId);
    } catch (error) {
      console.error('Failed to generate invoice:', error);
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
            onClick={handleGenerateInvoice}
            disabled={isGenerating}
          >
            <Receipt className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generiere Rechnung...' : 'Rechnung generieren'}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onGenerateInvoice}
          >
            <FileText className="h-4 w-4 mr-2" />
            Rechnung (Alt)
          </Button>
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
    </div>
  );
};

export default OrderActions;
