
import React from 'react';
import { Search, Filter, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface OrderFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  showHidden: boolean;
  setShowHidden: (show: boolean) => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  showHidden,
  setShowHidden
}) => {
  const handleToggleHidden = () => {
    setShowHidden(!showHidden);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Suche nach Bestellnummer, Kunde oder PLZ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full sm:w-48">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Status filtern" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alle">Alle Status</SelectItem>
          <SelectItem value="pending">Neu</SelectItem>
          <SelectItem value="confirmed">Bezahlt</SelectItem>
          <SelectItem value="invoice_created">Rechnung erstellt</SelectItem>
          <SelectItem value="exchanged">Exchanged</SelectItem>
          <SelectItem value="down">Down</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant={showHidden ? "default" : "outline"}
        onClick={handleToggleHidden}
        className="w-full sm:w-auto"
      >
        {showHidden ? (
          <>
            <Eye className="h-4 w-4 mr-2" />
            Ausgeblendete anzeigen
          </>
        ) : (
          <>
            <EyeOff className="h-4 w-4 mr-2" />
            Alle anzeigen
          </>
        )}
      </Button>
    </div>
  );
};

export default OrderFilters;
