import React, { useState } from 'react';
import { Trash2, Calendar } from 'lucide-react';
import { Note } from '../../types/auth';
import { NotesService } from '../../services/NotesService';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface NoteCardProps {
  note: Note;
  onNoteDeleted: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onNoteDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    setLoading(true);
    const { error } = await NotesService.deleteNote(note.id);
    
    if (!error) {
      onNoteDeleted();
    }
    
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-3">
          {note.title}
        </h3>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all duration-200 disabled:opacity-50 flex-shrink-0"
        >
          {loading ? (
            <LoadingSpinner size={16} className="text-red-600" />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>

      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
        {note.content}
      </p>

      <div className="flex items-center text-xs text-gray-500">
        <Calendar size={12} className="mr-1" />
        {formatDate(note.created_at)}
      </div>
    </div>
  );
};