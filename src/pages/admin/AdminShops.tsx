
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import ShopForm from '@/components/admin/ShopForm';
import { useShops, type Shop } from '@/hooks/useShops';

const AdminShops = () => {
  const { shops, isLoading, createShop, updateShop, deleteShop } = useShops();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [shopToDelete, setShopToDelete] = useState<Shop | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateShop = () => {
    setSelectedShop(null);
    setIsFormOpen(true);
  };

  const handleEditShop = (shop: Shop) => {
    setSelectedShop(shop);
    setIsFormOpen(true);
  };

  const handleSubmitShop = async (shopData: any) => {
    try {
      setIsSubmitting(true);
      if (selectedShop) {
        await updateShop(selectedShop.id, shopData);
      } else {
        // Remove the id, created_at, and updated_at fields for creating new shops
        const { id, created_at, updated_at, ...createData } = shopData;
        await createShop(createData);
      }
      setIsFormOpen(false);
      setSelectedShop(null);
    } catch (error) {
      console.error('Error submitting shop:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteShop = async () => {
    if (!shopToDelete) return;
    
    try {
      await deleteShop(shopToDelete.id);
      setShopToDelete(null);
    } catch (error) {
      console.error('Error deleting shop:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Geschäfte verwalten</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">Lade Geschäfte...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            Geschäfte verwalten
          </h1>
          <p className="text-gray-600 mt-2">Verwalten Sie alle Geschäfte und Filialen</p>
        </div>
        <Button onClick={handleCreateShop} className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Neues Geschäft
        </Button>
      </div>

      {/* Shops Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Geschäftsübersicht</CardTitle>
            <CardDescription>
              {shops.length} Geschäft{shops.length !== 1 ? 'e' : ''} verwaltet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Firmenname</TableHead>
                    <TableHead>Adresse</TableHead>
                    <TableHead>Kontakt</TableHead>
                    <TableHead>Rechtliche Angaben</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shops.map((shop) => (
                    <TableRow key={shop.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{shop.name}</TableCell>
                      <TableCell>{shop.company_name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{shop.company_address}</div>
                          <div className="text-gray-500">
                            {shop.company_postcode} {shop.company_city}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {shop.company_phone && (
                            <div>{shop.company_phone}</div>
                          )}
                          {shop.company_email && (
                            <div className="text-gray-500">{shop.company_email}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {shop.vat_number && (
                            <div>USt-IdNr.: {shop.vat_number}</div>
                          )}
                          {shop.court_register_info && (
                            <div className="text-gray-500">{shop.court_register_info}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditShop(shop)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShopToDelete(shop)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {shops.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Noch keine Geschäfte angelegt
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Shop Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedShop ? 'Geschäft bearbeiten' : 'Neues Geschäft erstellen'}
            </DialogTitle>
          </DialogHeader>
          <ShopForm
            shop={selectedShop || undefined}
            onSubmit={handleSubmitShop}
            onCancel={() => setIsFormOpen(false)}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!shopToDelete} onOpenChange={(open) => !open && setShopToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Geschäft löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Sind Sie sicher, dass Sie das Geschäft "{shopToDelete?.name}" löschen möchten?
              Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteShop} className="bg-red-600 hover:bg-red-700">
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminShops;
