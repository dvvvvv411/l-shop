
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit2, Save, X } from 'lucide-react';

interface EditableAddressFieldProps {
  label: string;
  value: string | null | undefined;
  onSave: (newValue: string) => void;
  placeholder?: string;
}

const EditableAddressField: React.FC<EditableAddressFieldProps> = ({
  label,
  value,
  onSave,
  placeholder
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div>
        <span className="font-medium">{label}:</span>
        <div className="mt-1 flex items-center gap-2">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSave();
              } else if (e.key === 'Escape') {
                handleCancel();
              }
            }}
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSave}
            className="text-green-600 hover:text-green-700"
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <span className="font-medium">{label}:</span>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-gray-600">{value || 'Nicht angegeben'}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-700"
        >
          <Edit2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default EditableAddressField;
