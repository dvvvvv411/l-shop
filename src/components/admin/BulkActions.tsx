
import React from 'react';
import { Trash2, FileCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BulkActionsProps {
  selectedCount: number;
  onBulkAction: (action: string) => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({ selectedCount, onBulkAction }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <span className="text-sm text-blue-700 font-medium">
        {selectedCount} Bestellung{selectedCount > 1 ? 'en' : ''} ausgewählt
      </span>
      <div className="flex gap-2 ml-auto">
        <Select onValueChange={onBulkAction}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Aktion wählen..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mark-paid">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                Als bezahlt markieren
              </div>
            </SelectItem>
            <SelectItem value="mark-shipped">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Als versandt markieren
              </div>
            </SelectItem>
            <SelectItem value="delete">
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Löschen
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BulkActions;
