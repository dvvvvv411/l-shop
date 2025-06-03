
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NexiConfig {
  id: string;
  merchant_id: string;
  terminal_id: string;
  password?: string;
  alias?: string;
  mac_key?: string;
  is_sandbox: boolean;
  is_active: boolean;
  shop_id?: string;
  created_at: string;
  updated_at: string;
}

interface NexiConfigListProps {
  onEdit: (config: NexiConfig) => void;
  onRefresh: () => void;
  refreshTrigger?: number;
}

const NexiConfigList = ({ onEdit, onRefresh, refreshTrigger }: NexiConfigListProps) => {
  const [configs, setConfigs] = useState<NexiConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchConfigs = async () => {
    try {
      console.log('Fetching Nexi configurations...');
      const { data, error } = await supabase
        .from('nexi_payment_configs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched configs:', data);
      setConfigs(data || []);
    } catch (error) {
      console.error('Error fetching Nexi configs:', error);
      toast({
        title: 'Fehler',
        description: 'Nexi-Konfigurationen konnten nicht geladen werden.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, [refreshTrigger]);

  const handleDelete = async (configId: string) => {
    try {
      console.log('Deleting config:', configId);
      const { error } = await supabase
        .from('nexi_payment_configs')
        .delete()
        .eq('id', configId);

      if (error) throw error;

      setConfigs(configs.filter(config => config.id !== configId));
      toast({
        title: 'Erfolg',
        description: 'Nexi-Konfiguration wurde gelöscht.',
      });
      onRefresh();
    } catch (error) {
      console.error('Error deleting Nexi config:', error);
      toast({
        title: 'Fehler',
        description: 'Nexi-Konfiguration konnte nicht gelöscht werden.',
        variant: 'destructive'
      });
    }
  };

  const toggleActive = async (config: NexiConfig) => {
    try {
      console.log('Toggling active status for config:', config.id);
      const { error } = await supabase
        .from('nexi_payment_configs')
        .update({ is_active: !config.is_active })
        .eq('id', config.id);

      if (error) throw error;

      setConfigs(configs.map(c => 
        c.id === config.id ? { ...c, is_active: !c.is_active } : c
      ));

      toast({
        title: 'Erfolg',
        description: `Konfiguration wurde ${!config.is_active ? 'aktiviert' : 'deaktiviert'}.`,
      });
      onRefresh();
    } catch (error) {
      console.error('Error updating Nexi config:', error);
      toast({
        title: 'Fehler',
        description: 'Status konnte nicht geändert werden.',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return <div className="text-center py-4">Lade Konfigurationen...</div>;
  }

  if (configs.length === 0) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Keine Nexi-Konfigurationen
        </h3>
        <p className="text-gray-600">
          Erstellen Sie Ihre erste Nexi-Konfiguration, um Kreditkartenzahlungen zu akzeptieren.
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Merchant ID</TableHead>
            <TableHead>Terminal ID</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>ALIAS</TableHead>
            <TableHead>MAC Key</TableHead>
            <TableHead>Umgebung</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Erstellt</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {configs.map((config) => (
            <TableRow key={config.id}>
              <TableCell className="font-medium">
                {config.merchant_id}
              </TableCell>
              <TableCell>{config.terminal_id}</TableCell>
              <TableCell>
                {config.password ? (
                  <span className="text-sm text-gray-600">••••••••</span>
                ) : (
                  <span className="text-sm text-red-400">Fehlt</span>
                )}
              </TableCell>
              <TableCell>
                {config.alias ? (
                  <span className="text-sm text-gray-600">{config.alias}</span>
                ) : (
                  <span className="text-sm text-gray-400">Nicht gesetzt</span>
                )}
              </TableCell>
              <TableCell>
                {config.mac_key ? (
                  <span className="text-sm text-gray-600">••••••••</span>
                ) : (
                  <span className="text-sm text-orange-400">Empfohlen</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={config.is_sandbox ? 'secondary' : 'default'}>
                  {config.is_sandbox ? 'Sandbox' : 'Live'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={config.is_active ? 'default' : 'secondary'}>
                  {config.is_active ? 'Aktiv' : 'Inaktiv'}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(config.created_at).toLocaleDateString('de-DE')}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(config)}
                  >
                    {config.is_active ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(config)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Konfiguration löschen</AlertDialogTitle>
                        <AlertDialogDescription>
                          Sind Sie sicher, dass Sie diese Nexi-Konfiguration löschen möchten? 
                          Diese Aktion kann nicht rückgängig gemacht werden.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(config.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Löschen
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NexiConfigList;
