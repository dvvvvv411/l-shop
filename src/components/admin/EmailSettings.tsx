import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Settings, History, Plus, Edit, Save, Eye, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  useEmailTemplates, 
  useEmailConfigurations, 
  useEmailLogs,
  useCreateEmailTemplate,
  useUpdateEmailTemplate,
  useCreateEmailConfiguration,
  useUpdateEmailConfiguration,
  useSendOrderEmail,
  type EmailTemplate,
  type EmailConfiguration
} from '@/hooks/useEmailSystem';
import { useShops } from '@/hooks/useShops';

const EmailSettings = () => {
  const { toast } = useToast();
  const { shops } = useShops();
  const { data: templates = [], isLoading: templatesLoading } = useEmailTemplates();
  const { data: configurations = [], isLoading: configurationsLoading } = useEmailConfigurations();
  const { data: logs = [], isLoading: logsLoading } = useEmailLogs();
  
  const createTemplate = useCreateEmailTemplate();
  const updateTemplate = useUpdateEmailTemplate();
  const createConfiguration = useCreateEmailConfiguration();
  const updateConfiguration = useUpdateEmailConfiguration();
  const sendOrderEmail = useSendOrderEmail();

  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [editingConfig, setEditingConfig] = useState<EmailConfiguration | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    html_content: '',
    text_content: '',
    shop_id: '',
    is_active: true
  });
  const [newConfig, setNewConfig] = useState({
    shop_id: '',
    from_email: '',
    from_name: '',
    reply_to: '',
    send_order_confirmation: true,
    order_confirmation_template_id: '',
    is_active: true
  });

  const handleCreateTemplate = async () => {
    try {
      await createTemplate.mutateAsync({
        ...newTemplate,
        shop_id: newTemplate.shop_id || undefined
      });
      setNewTemplate({
        name: '',
        subject: '',
        html_content: '',
        text_content: '',
        shop_id: '',
        is_active: true
      });
      toast({
        title: "Erfolg",
        description: "E-Mail-Vorlage wurde erstellt",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "E-Mail-Vorlage konnte nicht erstellt werden",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTemplate = async (template: EmailTemplate) => {
    try {
      await updateTemplate.mutateAsync(template);
      setEditingTemplate(null);
      toast({
        title: "Erfolg",
        description: "E-Mail-Vorlage wurde aktualisiert",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "E-Mail-Vorlage konnte nicht aktualisiert werden",
        variant: "destructive",
      });
    }
  };

  const handleCreateConfiguration = async () => {
    try {
      await createConfiguration.mutateAsync({
        ...newConfig,
        order_confirmation_template_id: newConfig.order_confirmation_template_id || undefined,
        reply_to: newConfig.reply_to || undefined
      });
      setNewConfig({
        shop_id: '',
        from_email: '',
        from_name: '',
        reply_to: '',
        send_order_confirmation: true,
        order_confirmation_template_id: '',
        is_active: true
      });
      toast({
        title: "Erfolg",
        description: "E-Mail-Konfiguration wurde erstellt",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "E-Mail-Konfiguration konnte nicht erstellt werden",
        variant: "destructive",
      });
    }
  };

  const handleUpdateConfiguration = async (config: EmailConfiguration) => {
    try {
      await updateConfiguration.mutateAsync(config);
      setEditingConfig(null);
      toast({
        title: "Erfolg",
        description: "E-Mail-Konfiguration wurde aktualisiert",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "E-Mail-Konfiguration konnte nicht aktualisiert werden",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-100 text-green-800">Gesendet</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Fehlgeschlagen</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Ausstehend</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">E-Mail-System</h1>
        <p className="text-gray-600 mt-2">Verwalten Sie E-Mail-Vorlagen, Konfigurationen und überwachen Sie den Versand</p>
      </div>

      <Tabs defaultValue="configurations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="configurations" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Konfigurationen
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Vorlagen
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            E-Mail-Protokoll
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configurations">
          <div className="space-y-6">
            {/* Create Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Neue E-Mail-Konfiguration
                </CardTitle>
                <CardDescription>
                  Konfigurieren Sie E-Mail-Einstellungen für einen Shop
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="config-shop">Shop</Label>
                    <Select value={newConfig.shop_id} onValueChange={(value) => setNewConfig(prev => ({ ...prev, shop_id: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Shop auswählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        {shops.map((shop) => (
                          <SelectItem key={shop.id} value={shop.id}>
                            {shop.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="config-from-email">Absender E-Mail</Label>
                    <Input
                      id="config-from-email"
                      type="email"
                      value={newConfig.from_email}
                      onChange={(e) => setNewConfig(prev => ({ ...prev, from_email: e.target.value }))}
                      placeholder="noreply@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="config-from-name">Absender Name</Label>
                    <Input
                      id="config-from-name"
                      value={newConfig.from_name}
                      onChange={(e) => setNewConfig(prev => ({ ...prev, from_name: e.target.value }))}
                      placeholder="Heizöl König"
                    />
                  </div>
                  <div>
                    <Label htmlFor="config-reply-to">Antwort-Adresse (optional)</Label>
                    <Input
                      id="config-reply-to"
                      type="email"
                      value={newConfig.reply_to}
                      onChange={(e) => setNewConfig(prev => ({ ...prev, reply_to: e.target.value }))}
                      placeholder="support@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="config-template">Bestellbestätigungs-Vorlage</Label>
                    <Select 
                      value={newConfig.order_confirmation_template_id} 
                      onValueChange={(value) => setNewConfig(prev => ({ ...prev, order_confirmation_template_id: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Vorlage auswählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.filter(t => t.is_active).map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="config-send-confirmation"
                      checked={newConfig.send_order_confirmation}
                      onCheckedChange={(checked) => setNewConfig(prev => ({ ...prev, send_order_confirmation: checked }))}
                    />
                    <Label htmlFor="config-send-confirmation">Bestellbestätigung senden</Label>
                  </div>
                </div>
                <Button 
                  onClick={handleCreateConfiguration}
                  disabled={!newConfig.shop_id || !newConfig.from_email || !newConfig.from_name || createConfiguration.isPending}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Konfiguration erstellen
                </Button>
              </CardContent>
            </Card>

            {/* Existing Configurations */}
            <Card>
              <CardHeader>
                <CardTitle>Bestehende Konfigurationen</CardTitle>
              </CardHeader>
              <CardContent>
                {configurationsLoading ? (
                  <div>Lade Konfigurationen...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Shop</TableHead>
                        <TableHead>Absender</TableHead>
                        <TableHead>Bestellbestätigung</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {configurations.map((config) => (
                        <TableRow key={config.id}>
                          <TableCell>{config.shop?.name}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{config.from_name}</div>
                              <div className="text-sm text-gray-500">{config.from_email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {config.send_order_confirmation ? (
                              <Badge className="bg-green-100 text-green-800">Aktiviert</Badge>
                            ) : (
                              <Badge variant="secondary">Deaktiviert</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {config.is_active ? (
                              <Badge className="bg-green-100 text-green-800">Aktiv</Badge>
                            ) : (
                              <Badge variant="secondary">Inaktiv</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingConfig(config)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="space-y-6">
            {/* Create Template */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Neue E-Mail-Vorlage
                </CardTitle>
                <CardDescription>
                  Erstellen Sie eine neue E-Mail-Vorlage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="template-name">Name</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="order_confirmation_shop1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-shop">Shop (optional)</Label>
                    <Select value={newTemplate.shop_id} onValueChange={(value) => setNewTemplate(prev => ({ ...prev, shop_id: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Alle Shops..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Alle Shops</SelectItem>
                        {shops.map((shop) => (
                          <SelectItem key={shop.id} value={shop.id}>
                            {shop.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="template-subject">Betreff</Label>
                  <Input
                    id="template-subject"
                    value={newTemplate.subject}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Bestellbestätigung - {{shop_name}}"
                  />
                </div>
                
                <div>
                  <Label htmlFor="template-html">HTML-Inhalt</Label>
                  <Textarea
                    id="template-html"
                    value={newTemplate.html_content}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, html_content: e.target.value }))}
                    placeholder="HTML-E-Mail-Template..."
                    className="min-h-40"
                  />
                </div>
                
                <div>
                  <Label htmlFor="template-text">Text-Inhalt (optional)</Label>
                  <Textarea
                    id="template-text"
                    value={newTemplate.text_content}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, text_content: e.target.value }))}
                    placeholder="Text-Version der E-Mail..."
                    className="min-h-20"
                  />
                </div>
                
                <Button 
                  onClick={handleCreateTemplate}
                  disabled={!newTemplate.name || !newTemplate.subject || !newTemplate.html_content || createTemplate.isPending}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Vorlage erstellen
                </Button>
              </CardContent>
            </Card>

            {/* Existing Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Bestehende Vorlagen</CardTitle>
              </CardHeader>
              <CardContent>
                {templatesLoading ? (
                  <div>Lade Vorlagen...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Betreff</TableHead>
                        <TableHead>Shop</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {templates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell>{template.subject}</TableCell>
                          <TableCell>
                            {template.shop_id ? shops.find(s => s.id === template.shop_id)?.name : 'Alle Shops'}
                          </TableCell>
                          <TableCell>
                            {template.is_active ? (
                              <Badge className="bg-green-100 text-green-800">Aktiv</Badge>
                            ) : (
                              <Badge variant="secondary">Inaktiv</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingTemplate(template)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                E-Mail-Protokoll
              </CardTitle>
              <CardDescription>
                Übersicht über gesendete E-Mails
              </CardDescription>
            </CardHeader>
            <CardContent>
              {logsLoading ? (
                <div>Lade Protokoll...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Datum</TableHead>
                      <TableHead>Bestellung</TableHead>
                      <TableHead>Empfänger</TableHead>
                      <TableHead>Betreff</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Typ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          {new Date(log.created_at).toLocaleDateString('de-DE', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TableCell>
                        <TableCell>
                          {log.order ? (
                            <div>
                              <div className="font-medium">{log.order.order_number}</div>
                              <div className="text-sm text-gray-500">{log.order.customer_name}</div>
                            </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>{log.recipient_email}</TableCell>
                        <TableCell>{log.subject}</TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.email_type}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Template Dialog */}
      {editingTemplate && (
        <Dialog open={!!editingTemplate} onOpenChange={() => setEditingTemplate(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>E-Mail-Vorlage bearbeiten</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-template-name">Name</Label>
                  <Input
                    id="edit-template-name"
                    value={editingTemplate.name}
                    onChange={(e) => setEditingTemplate(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-template-active"
                    checked={editingTemplate.is_active}
                    onCheckedChange={(checked) => setEditingTemplate(prev => prev ? { ...prev, is_active: checked } : null)}
                  />
                  <Label htmlFor="edit-template-active">Aktiv</Label>
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-template-subject">Betreff</Label>
                <Input
                  id="edit-template-subject"
                  value={editingTemplate.subject}
                  onChange={(e) => setEditingTemplate(prev => prev ? { ...prev, subject: e.target.value } : null)}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-template-html">HTML-Inhalt</Label>
                <Textarea
                  id="edit-template-html"
                  value={editingTemplate.html_content}
                  onChange={(e) => setEditingTemplate(prev => prev ? { ...prev, html_content: e.target.value } : null)}
                  className="min-h-40"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-template-text">Text-Inhalt</Label>
                <Textarea
                  id="edit-template-text"
                  value={editingTemplate.text_content || ''}
                  onChange={(e) => setEditingTemplate(prev => prev ? { ...prev, text_content: e.target.value } : null)}
                  className="min-h-20"
                />
              </div>
              
              <Button 
                onClick={() => handleUpdateTemplate(editingTemplate)}
                disabled={updateTemplate.isPending}
              >
                <Save className="h-4 w-4 mr-2" />
                Speichern
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Configuration Dialog */}
      {editingConfig && (
        <Dialog open={!!editingConfig} onOpenChange={() => setEditingConfig(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>E-Mail-Konfiguration bearbeiten</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-config-from-email">Absender E-Mail</Label>
                  <Input
                    id="edit-config-from-email"
                    type="email"
                    value={editingConfig.from_email}
                    onChange={(e) => setEditingConfig(prev => prev ? { ...prev, from_email: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-config-from-name">Absender Name</Label>
                  <Input
                    id="edit-config-from-name"
                    value={editingConfig.from_name}
                    onChange={(e) => setEditingConfig(prev => prev ? { ...prev, from_name: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-config-reply-to">Antwort-Adresse</Label>
                  <Input
                    id="edit-config-reply-to"
                    type="email"
                    value={editingConfig.reply_to || ''}
                    onChange={(e) => setEditingConfig(prev => prev ? { ...prev, reply_to: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-config-template">Bestellbestätigungs-Vorlage</Label>
                  <Select 
                    value={editingConfig.order_confirmation_template_id || ''} 
                    onValueChange={(value) => setEditingConfig(prev => prev ? { ...prev, order_confirmation_template_id: value || undefined } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Vorlage auswählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.filter(t => t.is_active).map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-config-send-confirmation"
                    checked={editingConfig.send_order_confirmation}
                    onCheckedChange={(checked) => setEditingConfig(prev => prev ? { ...prev, send_order_confirmation: checked } : null)}
                  />
                  <Label htmlFor="edit-config-send-confirmation">Bestellbestätigung senden</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-config-active"
                    checked={editingConfig.is_active}
                    onCheckedChange={(checked) => setEditingConfig(prev => prev ? { ...prev, is_active: checked } : null)}
                  />
                  <Label htmlFor="edit-config-active">Aktiv</Label>
                </div>
              </div>
              
              <Button 
                onClick={() => handleUpdateConfiguration(editingConfig)}
                disabled={updateConfiguration.isPending}
              >
                <Save className="h-4 w-4 mr-2" />
                Speichern
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EmailSettings;
