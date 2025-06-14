
import React from 'react';
import { Search, Filter, Eye, EyeOff, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface OrderFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  showHidden: boolean;
  setShowHidden: (show: boolean) => void;
  domainFilter: string[];
  setDomainFilter: (domains: string[]) => void;
  availableDomains: string[];
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  showHidden,
  setShowHidden,
  domainFilter,
  setDomainFilter,
  availableDomains
}) => {
  const handleToggleHidden = () => {
    setShowHidden(!showHidden);
  };

  const handleDomainToggle = (domain: string) => {
    if (domainFilter.includes(domain)) {
      setDomainFilter(domainFilter.filter(d => d !== domain));
    } else {
      setDomainFilter([...domainFilter, domain]);
    }
  };

  const handleSelectAllDomains = () => {
    setDomainFilter(availableDomains);
  };

  const handleDeselectAllDomains = () => {
    setDomainFilter([]);
  };

  const getSelectedDomainsText = () => {
    if (domainFilter.length === 0) return 'Alle Domains';
    if (domainFilter.length === availableDomains.length) return 'Alle Domains';
    if (domainFilter.length === 1) return domainFilter[0];
    return `${domainFilter.length} Domains ausgewählt`;
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
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-48 justify-start">
            <Globe className="h-4 w-4 mr-2" />
            {getSelectedDomainsText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Domain Filter</h4>
              <div className="space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSelectAllDomains}
                  className="h-6 px-2 text-xs"
                >
                  Alle
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeselectAllDomains}
                  className="h-6 px-2 text-xs"
                >
                  Keine
                </Button>
              </div>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableDomains.map((domain) => (
                <div key={domain} className="flex items-center space-x-2">
                  <Checkbox
                    id={domain}
                    checked={domainFilter.includes(domain)}
                    onCheckedChange={() => handleDomainToggle(domain)}
                  />
                  <label
                    htmlFor={domain}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {domain || 'Keine Domain'}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

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
