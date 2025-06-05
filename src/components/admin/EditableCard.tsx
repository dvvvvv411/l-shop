
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit3, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EditableCardProps {
  title: string;
  children: React.ReactNode;
  onSave: () => Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
  onEditToggle: () => void;
  isSaving?: boolean;
}

const EditableCard: React.FC<EditableCardProps> = ({
  title,
  children,
  onSave,
  onCancel,
  isEditing,
  onEditToggle,
  isSaving = false,
}) => {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await onSave();
      toast({
        title: 'Erfolg',
        description: 'Änderungen wurden gespeichert.',
      });
    } catch (error) {
      console.error('Error saving changes:', error);
      toast({
        title: 'Fehler',
        description: 'Änderungen konnten nicht gespeichert werden.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Check className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onCancel}
                disabled={isSaving}
              >
                <X className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={onEditToggle}
            >
              <Edit3 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {children}
      </CardContent>
    </Card>
  );
};

export default EditableCard;
