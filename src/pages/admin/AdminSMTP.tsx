
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Mail, Settings, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useSMTPConfigurations } from '@/hooks/useSMTPConfigurations';
import SMTPConfigForm from '@/components/admin/SMTPConfigForm';
import SMTPConfigDeleteDialog from '@/components/admin/SMTPConfigDeleteDialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminSMTP = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingConfig, setEditingConfig] = useState<any>(null);
  const [deletingConfig, setDeletingConfig] = useState<any>(null);
  const { configurations, isLoading, createConfiguration, updateConfiguration, deleteConfiguration } = useSMTPConfigurations();
  const { toast } = useToast();

  const handleCreateConfig = async (configData: any) => {
    try {
      await createConfiguration(configData);
      setShowForm(false);
      toast({
        title: 'Erfolg',
        description: 'SMTP-Konfiguration wurde erstellt.',
      });
    } catch (error) {
      console.error('Error creating SMTP config:', error);
      toast({
        title: 'Fehler',
        description: 'SMTP-Konfiguration konnte nicht erstellt werden.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateConfig = async (configData: any) => {
    try {
      await updateConfiguration(editingConfig.id, configData);
      setEditingConfig(null);
      toast({
        title: 'Erfolg',
        description: 'SMTP-Konfiguration wurde aktualisiert.',
      });
    } catch (error) {
      console.error('Error updating SMTP config:', error);
      toast({
        title: 'Fehler',
        description: 'SMTP-Konfiguration konnte nicht aktualisiert werden.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteConfig = async () => {
    if (!deletingConfig) return;
    
    try {
      await deleteConfiguration(deletingConfig.id);
      setDeletingConfig(null);
      toast({
        title: 'Erfolg',
        description: 'SMTP-Konfiguration wurde gelöscht.',
      });
    } catch (error) {
      console.error('Error deleting SMTP config:', error);
      toast({
        title: 'Fehler',
        description: 'SMTP-Konfiguration konnte nicht gelöscht werden.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-lg text-gray-600">SMTP-Konfigurationen werden geladen...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SMTP-Konfigurationen</h1>
          <p className="text-gray-600 mt-2">Verwalten Sie E-Mail-Einstellungen für verschiedene Domains</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Neue Konfiguration
        </Button>
      </div>

      {configurations.some(config => config.resend_api_key === 'PLACEHOLDER_API_KEY') && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Einige SMTP-Konfigurationen verwenden noch Platzhalter-API-Schlüssel. 
            Bitte aktualisieren Sie diese mit echten Resend API-Schlüsseln.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {configurations.map((config) => (
          <motion.div
            key={config.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{config.shop_url}</CardTitle>
                  </div>
                  <Badge variant={config.is_active ? "default" : "secondary"}>
                    {config.is_active ? 'Aktiv' : 'Inaktiv'}
                  </Badge>
                </div>
                <CardDescription>
                  {config.sender_name} • {config.sender_email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p><strong>API Key:</strong> {config.resend_api_key.substring(0, 8)}...</p>
                  {config.shops && (
                    <p><strong>Shop:</strong> {config.shops.name}</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingConfig(config)}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Bearbeiten
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setDeletingConfig(config)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Löschen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {configurations.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Keine SMTP-Konfigurationen gefunden
            </h3>
            <p className="text-gray-500 mb-4">
              Erstellen Sie Ihre erste SMTP-Konfiguration
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Erste Konfiguration erstellen
            </Button>
          </div>
        )}
      </div>

      {/* Create/Edit Form */}
      {(showForm || editingConfig) && (
        <SMTPConfigForm
          isOpen={showForm || !!editingConfig}
          onClose={() => {
            setShowForm(false);
            setEditingConfig(null);
          }}
          onSubmit={editingConfig ? handleUpdateConfig : handleCreateConfig}
          initialData={editingConfig}
          isEditing={!!editingConfig}
        />
      )}

      {/* Delete Confirmation */}
      {deletingConfig && (
        <SMTPConfigDeleteDialog
          isOpen={!!deletingConfig}
          onClose={() => setDeletingConfig(null)}
          onConfirm={handleDeleteConfig}
          configName={deletingConfig.shop_url}
        />
      )}
    </div>
  );
};

export default AdminSMTP;
