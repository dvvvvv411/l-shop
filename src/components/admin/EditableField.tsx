
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface EditableFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onSave: (value: string) => void;
  onCancel: () => void;
  placeholder?: string;
  required?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  isEditing,
  onSave,
  onCancel,
  placeholder,
  required = false,
}) => {
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value, isEditing]);

  const handleSave = () => {
    if (required && !editValue.trim()) {
      return; // Don't save empty required fields
    }
    onSave(editValue);
  };

  const handleCancel = () => {
    setEditValue(value);
    onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditing) {
    return (
      <div>
        <span className="font-medium">{label}:</span>
        <span className="ml-2">{value || '-'}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}:</label>
      <div className="flex items-center gap-2">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
          autoFocus
        />
        <Button
          size="sm"
          variant="outline"
          onClick={handleSave}
          disabled={required && !editValue.trim()}
        >
          <Check className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCancel}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default EditableField;
