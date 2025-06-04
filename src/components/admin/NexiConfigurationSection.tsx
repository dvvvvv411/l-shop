
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Settings, Save, TestTube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NexiConfig {
  id: string;
  merchant_id: string;
  terminal_id: string;
  is_sandbox: boolean;
  is_active: boolean;
  shop_id?: string;
}

const NexiConfigurationSection = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<NexiConfig>({
    id: '1',
    merchant_id: '002132517',
    terminal_id: '03893387',
    is_sandbox: true,
    is_active: true,
    shop_id: undefined
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveConfig = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would save to the database
      console.log('Saving Nexi configuration:', config);
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: 'Konfiguration gespeichert',
        description: 'Die Nexi-Zahlungskonfiguration wurde erfolgreich aktualisiert.',
      });
    } catch (error) {
      console.error('Failed to save Nexi configuration:', error);
      toast({
        title: 'Fehler',
        description: 'Die Konfiguration konnte nicht gespeichert werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would test the Nexi connection
      console.log('Testing Nexi connection with config:', config);
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast({
        title: 'Verbindung erfolgreich',
        description: 'Die Verbindung zu Nexi wurde erfolgreich getestet.',
      });
    } catch (error) {
      console.error('Nexi connection test failed:', error);
      toast({
        title: 'Verbindungsfehler',
        description: 'Die Verbindung zu Nexi konnte nicht hergestellt werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          <CardTitle>Nexi Zahlungskonfiguration</CardTitle>
        </div>
        <CardDescription>
          Konfigurieren Sie die Nexi Italy Zahlungsintegration für Kreditkartenzahlungen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label>Status:</Label>
            <Badge variant={config.is_active ? 'default' : 'secondary'}>
              {config.is_active ? 'Aktiv' : 'Inaktiv'}
            </Badge>
            <Badge variant={config.is_sandbox ? 'outline' : 'default'}>
              {config.is_sandbox ? 'Sandbox' : 'Live'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestConnection}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <TestTube className="h-4 w-4" />
              Verbindung testen
            </Button>
          </div>
        </div>

        <Separator />

        {/* Configuration Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="merchant_id">Merchant ID</Label>
            <Input
              id="merchant_id"
              value={config.merchant_id}
              onChange={(e) => setConfig({ ...config, merchant_id: e.target.value })}
              placeholder="z.B. 002132517"
            />
            <p className="text-sm text-gray-500">
              Ihre Nexi Merchant-ID aus dem Nexi Dashboard
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="terminal_id">Terminal ID</Label>
            <Input
              id="terminal_id"
              value={config.terminal_id}
              onChange={(e) => setConfig({ ...config, terminal_id: e.target.value })}
              placeholder="z.B. 03893387"
            />
            <p className="text-sm text-gray-500">
              Ihre Nexi Terminal-ID für Transaktionen
            </p>
          </div>
        </div>

        {/* Switches */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sandbox-Modus</Label>
              <p className="text-sm text-gray-500">
                Verwenden Sie die Nexi-Testumgebung für Entwicklung und Tests
              </p>
            </div>
            <Switch
              checked={config.is_sandbox}
              onCheckedChange={(checked) => setConfig({ ...config, is_sandbox: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Nexi-Zahlungen aktivieren</Label>
              <p className="text-sm text-gray-500">
                Aktivieren oder deaktivieren Sie Nexi-Kreditkartenzahlungen
              </p>
            </div>
            <Switch
              checked={config.is_active}
              onCheckedChange={(checked) => setConfig({ ...config, is_active: checked })}
            />
          </div>
        </div>

        <Separator />

        {/* Information Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Nexi Pay by Link Integration</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Sichere Kreditkartenzahlungen über Nexi Italy</li>
            <li>• Pay by Link-Methode für einfache Integration</li>
            <li>• Unterstützt alle gängigen Kreditkarten</li>
            <li>• Automatische Webhooks für Statusupdates</li>
            <li>• PCI DSS-konforme Zahlungsabwicklung</li>
          </ul>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveConfig}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Speichern...' : 'Konfiguration speichern'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NexiConfigurationSection;
