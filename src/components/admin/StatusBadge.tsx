
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Neu':
        return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
      case 'Bezahlt':
        return 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200';
      case 'Versandt':
        return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
      case 'Abgeschlossen':
        return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={`px-2 py-1 text-xs font-medium border ${getStatusStyles(status)}`}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
