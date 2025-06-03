
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Euro, Truck, Settings as SettingsIcon, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmailSettings from '@/components/admin/EmailSettings';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // Pricing Settings
    pricePerLiter: '1.20',
    minOrderAmount: '150',
    deliveryFee: '25.00',
    
    // Delivery Settings
    maxDeliveryDistance: '50',
    deliveryDays: 'Mo-Fr',
    deliveryHours: '8:00-18:00',
    
    // Company Settings
    companyName: 'HeizölDirekt GmbH',
    companyEmail: 'info@heizoeldirekt.de',
    companyPhone: '0800 123 456 7',
    companyAddress: 'Musterstraße 123, 12345 Berlin'
  });

  const handleInputChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to your backend
    console.log('Saving settings:', settings);
    alert('Einstellungen gespeichert!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Einstellungen</h1>
        <p className="text-gray-600 mt-2">Verwalten Sie Ihre Shop-Einstellungen</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            Allgemein
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            E-Mail-System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pricing Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Euro className="h-5 w-5 text-red-600" />
                    <CardTitle>Preiseinstellungen</CardTitle>
                  </div>
                  <CardDescription>
                    Verwalten Sie Ihre Heizölpreise und Gebühren
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preis pro Liter (€)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={settings.pricePerLiter}
                      onChange={(e) => handleInputChange('pricePerLiter', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mindestbestellmenge (Liter)
                    </label>
                    <Input
                      type="number"
                      value={settings.minOrderAmount}
                      onChange={(e) => handleInputChange('minOrderAmount', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Liefergebühr (€)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={settings.deliveryFee}
                      onChange={(e) => handleInputChange('deliveryFee', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Delivery Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-red-600" />
                    <CardTitle>Liefereinstellungen</CardTitle>
                  </div>
                  <CardDescription>
                    Konfigurieren Sie Ihre Lieferoptionen
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max. Lieferentfernung (km)
                    </label>
                    <Input
                      type="number"
                      value={settings.maxDeliveryDistance}
                      onChange={(e) => handleInputChange('maxDeliveryDistance', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Liefertage
                    </label>
                    <Input
                      value={settings.deliveryDays}
                      onChange={(e) => handleInputChange('deliveryDays', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lieferzeiten
                    </label>
                    <Input
                      value={settings.deliveryHours}
                      onChange={(e) => handleInputChange('deliveryHours', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Company Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5 text-red-600" />
                    <CardTitle>Firmenangaben</CardTitle>
                  </div>
                  <CardDescription>
                    Verwalten Sie Ihre Firmendaten
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Firmenname
                    </label>
                    <Input
                      value={settings.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-Mail
                    </label>
                    <Input
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <Input
                      value={settings.companyPhone}
                      onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <Input
                      value={settings.companyAddress}
                      onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-end"
          >
            <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
              <Save className="h-4 w-4 mr-2" />
              Einstellungen speichern
            </Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="email">
          <EmailSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
