
import React from 'react';
import { Trash2, Mail, FileText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BulkActionsProps {
  selectedCount: number;
  onBulkAction: (action: string) => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({ selectedCount, onBulkAction }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/50 shadow-lg backdrop-blur-sm">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-indigo-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-1000" />
      
      <div className="relative z-10 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
            <Check className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              {selectedCount} Bestellung{selectedCount > 1 ? 'en' : ''} ausgewählt
            </span>
            <p className="text-xs text-gray-600">Wählen Sie eine Aktion aus dem Dropdown</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Select onValueChange={onBulkAction}>
            <SelectTrigger className="w-48 bg-white/70 backdrop-blur-sm border-white/50 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white/80">
              <SelectValue placeholder="Aktion wählen..." />
            </SelectTrigger>
            <SelectContent className="bg-white/90 backdrop-blur-md border-white/50 shadow-xl">
              <SelectItem value="delete" className="hover:bg-red-50 transition-colors duration-200">
                <div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span>Löschen</span>
                </div>
              </SelectItem>
              <SelectItem value="email" className="hover:bg-blue-50 transition-colors duration-200">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span>E-Mail senden</span>
                </div>
              </SelectItem>
              <SelectItem value="invoice" className="hover:bg-green-50 transition-colors duration-200">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-500" />
                  <span>Rechnung erstellen</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;
