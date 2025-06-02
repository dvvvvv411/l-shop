
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
      case 'invoice_created':
        return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
      case 'Neu':
        return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
      case 'Bezahlt':
        return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
      case 'Rechnung erstellt':
        return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200';
      case 'Versandt':
        return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
      case 'Abgeschlossen':
        return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Neu';
      case 'confirmed':
        return 'Bezahlt';
      case 'invoice_created':
        return 'Rechnung erstellt';
      case 'shipped':
        return 'Versandt';
      case 'completed':
        return 'Abgeschlossen';
      default:
        return status;
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={`px-2 py-1 text-xs font-medium border ${getStatusStyles(status)}`}
    >
      {getStatusLabel(status)}
    </Badge>
  );
};

export default StatusBadge;
