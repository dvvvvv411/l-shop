
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb';
import NexiConfigList from '@/components/admin/NexiConfigList';
import NexiConfigForm from '@/components/admin/NexiConfigForm';
import { useToast } from '@/hooks/use-toast';

const AdminNexi = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);
  const { toast } = useToast();

  const breadcrumbItems = [
    { label: 'Admin', href: '/admin' },
    { label: 'Nexi Konfiguration' }
  ];

  const handleAddConfig = () => {
    setEditingConfig(null);
    setIsFormOpen(true);
  };

  const handleEditConfig = (config) => {
    setEditingConfig(config);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingConfig(null);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingConfig(null);
    toast({
      title: "Erfolg",
      description: "Nexi-Konfiguration wurde erfolgreich gespeichert.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <AdminBreadcrumb items={breadcrumbItems} />
          <div className="flex items-center gap-3 mt-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nexi Konfiguration</h1>
              <p className="text-gray-600">Verwalten Sie Ihre Nexi-Zahlungsgateway-Einstellungen</p>
            </div>
          </div>
        </div>
        <Button onClick={handleAddConfig} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Neue Konfiguration
        </Button>
      </div>

      {/* Configuration Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Nexi-Konfigurationen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NexiConfigList 
              onEdit={handleEditConfig}
              onRefresh={() => {}}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Configuration Form Dialog */}
      {isFormOpen && (
        <NexiConfigForm
          config={editingConfig}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default AdminNexi;
