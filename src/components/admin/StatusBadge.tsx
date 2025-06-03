
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, FileText, RefreshCw, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Neu',
          variant: 'default',
          className: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300',
          icon: Clock
        };
      case 'confirmed':
        return {
          label: 'Bezahlt',
          variant: 'default',
          className: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300',
          icon: CheckCircle
        };
      case 'invoice_created':
        return {
          label: 'Rechnung erstellt',
          variant: 'default',
          className: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300',
          icon: FileText
        };
      case 'exchanged':
        return {
          label: 'Exchanged',
          variant: 'default',
          className: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300',
          icon: RefreshCw
        };
      case 'down':
        return {
          label: 'Down',
          variant: 'default',
          className: 'bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300',
          icon: XCircle
        };
      case 'Neu':
        return {
          label: 'Neu',
          variant: 'default',
          className: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300',
          icon: Clock
        };
      case 'Bezahlt':
        return {
          label: 'Bezahlt',
          variant: 'default',
          className: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300',
          icon: CheckCircle
        };
      case 'Rechnung erstellt':
        return {
          label: 'Rechnung erstellt',
          variant: 'default',
          className: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300',
          icon: FileText
        };
      default:
        return {
          label: status,
          variant: 'outline',
          className: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300 hover:from-gray-200 hover:to-gray-300 transition-all duration-300',
          icon: Clock
        };
    }
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={`px-3 py-1 text-xs font-semibold inline-flex items-center gap-1.5 ${config.className}`}
    >
      <IconComponent className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
