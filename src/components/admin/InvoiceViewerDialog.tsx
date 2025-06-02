
import React, { useState } from 'react';
import { FileText, Download, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import type { Order } from '@/hooks/useOrders';

interface InvoiceViewerDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceViewerDialog: React.FC<InvoiceViewerDialogProps> = ({
  order,
  isOpen,
  onClose
}) => {
  const [pdfError, setPdfError] = useState(false);
  const { toast } = useToast();

  if (!order) return null;

  const hasInvoice = order.invoice_file_url && order.invoice_number;

  const handleDownload = async () => {
    if (!order.invoice_file_url) return;
    
    try {
      const response = await fetch(order.invoice_file_url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }
      
      const blob = await response.blob();
      
      // Check if the blob is actually a PDF
      if (blob.type !== 'application/pdf' && !blob.type.includes('pdf')) {
        console.warn('Downloaded file may not be a valid PDF:', blob.type);
        toast({
          title: 'Warnung',
          description: 'Die heruntergeladene Datei könnte beschädigt sein.',
          variant: 'destructive',
        });
      }
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Rechnung_${order.order_number}_${order.invoice_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      
      toast({
        title: 'Erfolg',
        description: 'PDF wurde heruntergeladen.',
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: 'Fehler',
        description: 'PDF konnte nicht heruntergeladen werden.',
        variant: 'destructive',
      });
    }
  };

  const handleOpenInNewTab = () => {
    if (order.invoice_file_url) {
      window.open(order.invoice_file_url, '_blank');
    }
  };

  const handleIframeError = () => {
    console.error('PDF could not be loaded in iframe');
    setPdfError(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Rechnung anzeigen - {order.order_number}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Invoice Information */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="font-medium text-gray-700">Rechnungsnummer:</span>
              <div className="text-lg font-bold">{order.invoice_number || 'Noch nicht erstellt'}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Rechnungsdatum:</span>
              <div>{order.invoice_date ? new Date(order.invoice_date).toLocaleDateString('de-DE') : 'N/A'}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Bestellnummer:</span>
              <div>{order.order_number}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Gesamtbetrag:</span>
              <div className="text-lg font-bold">€{order.total_amount.toFixed(2)}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleDownload}
              disabled={!hasInvoice}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              PDF herunterladen
            </Button>
            <Button
              variant="outline"
              onClick={handleOpenInNewTab}
              disabled={!hasInvoice}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              In neuem Tab öffnen
            </Button>
          </div>

          {!hasInvoice && (
            <Alert>
              <AlertDescription>
                Für diese Bestellung wurde noch keine Rechnung erstellt oder die Datei ist nicht verfügbar.
              </AlertDescription>
            </Alert>
          )}

          {pdfError && hasInvoice && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Die PDF-Datei konnte nicht geladen werden. Versuchen Sie, die Datei herunterzuladen oder in einem neuen Tab zu öffnen.
              </AlertDescription>
            </Alert>
          )}

          {/* PDF Viewer */}
          {hasInvoice && !pdfError && (
            <div className="border rounded-lg overflow-hidden bg-white" style={{ height: '600px' }}>
              <iframe
                src={`${order.invoice_file_url}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full"
                title={`Rechnung ${order.invoice_number}`}
                style={{ minHeight: '600px' }}
                onError={handleIframeError}
                onLoad={() => setPdfError(false)}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceViewerDialog;
