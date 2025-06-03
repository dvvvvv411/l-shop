
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface SMTPConfigDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  configName: string;
}

const SMTPConfigDeleteDialog: React.FC<SMTPConfigDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  configName,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>SMTP-Konfiguration löschen</AlertDialogTitle>
          <AlertDialogDescription>
            Sind Sie sicher, dass Sie die SMTP-Konfiguration für "{configName}" löschen möchten?
            <br /><br />
            Diese Aktion kann nicht rückgängig gemacht werden. Alle verknüpften E-Mail-Templates werden ebenfalls gelöscht.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SMTPConfigDeleteDialog;
