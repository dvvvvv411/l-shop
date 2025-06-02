
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send } from 'lucide-react';
import { useOrderNotes } from '@/hooks/useOrderNotes';

interface OrderNotesSectionProps {
  orderId: string;
}

const OrderNotesSection: React.FC<OrderNotesSectionProps> = ({ orderId }) => {
  const { notes, isLoading, addNote } = useOrderNotes(orderId);
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsSubmitting(true);
    try {
      await addNote(newNote.trim());
      setNewNote('');
    } catch (error) {
      console.error('Failed to add note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Bestellnotizen
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Notes Display */}
        <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-4 text-gray-500">
              Notizen werden geladen...
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Keine Notizen vorhanden
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm text-gray-900">{note.created_by}</span>
                  <span className="text-xs text-gray-500">{formatDate(note.created_at)}</span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Add Note Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Neue Notiz hinzufügen..."
            className="min-h-[80px]"
            disabled={isSubmitting}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!newNote.trim() || isSubmitting}
              size="sm"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Wird hinzugefügt...' : 'Notiz hinzufügen'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderNotesSection;
