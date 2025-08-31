/*import React, { useState, useEffect } from 'react';
import { Plus, LogOut, User, StickyNote } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AuthService } from '../../services/AuthService';
import { NotesService } from '../../services/NotesService';
import { Note } from '../../types/auth';
import { CreateNoteModal } from './CreateNoteModal';
import { NoteCard } from './NoteCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    setError('');

    const { data, error } = await NotesService.getNotes();
    
    if (error) {
      setError(error.message);
    } else {
      setNotes(data || []);
    }
    
    setLoading(false);
  };

  const handleSignOut = async () => {
    await AuthService.signOut();
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const getUserAvatar = () => {
    return user?.user_metadata?.avatar_url || null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
     { /* Header */
    /*  <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <StickyNote className="text-blue-600 mr-3" size={24} />
              <h1 className="text-xl font-bold text-gray-900">NotesApp</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {getUserAvatar() ? (
                  <img
                    src={getUserAvatar()!}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-blue-600" />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {getUserDisplayName()}
                </span>
              </div>
              
              <button
                onClick={handleSignOut}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */
    /*  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */
   /*     <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {getUserDisplayName()}!
          </h2>
          <p className="text-blue-100">
            Manage your notes and stay organized with our simple note-taking app.
          </p>
        </div>

        {/* Notes Section */
    /*    <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Your Notes</h3>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>New Note</span>
          </button>
        </div>

        {error && <ErrorMessage message={error} className="mb-6" />}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size={32} className="text-blue-600" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <StickyNote className="mx-auto text-gray-300 mb-4" size={48} />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h4>
            <p className="text-gray-600 mb-4">Create your first note to get started</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Create Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onNoteDeleted={loadNotes}
              />
            ))}
          </div>
        )}
      </main>

      <CreateNoteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onNoteCreated={loadNotes}
      />
    </div>
  );
}; */

import React, { useState, useEffect } from "react";
import { Plus, LogOut, User, StickyNote } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { AuthService } from "../../services/AuthService";
import { NotesService } from "../../services/NotesService";
import { Note } from "../../types/auth";
import { CreateNoteModal } from "./CreateNoteModal";
import { NoteCard } from "./NoteCard";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error } = await NotesService.getNotes();

      if (error) {
        setError(error.message || "Failed to fetch notes");
      } else {
        setNotes(data || []);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await AuthService.signOut();
    } catch (err: unknown) {
      console.error("Sign out failed:", err);
    }
  };

  const getUserDisplayName = (): string => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    return user?.email?.split("@")[0] || "User";
  };

  const getUserAvatar = (): string | null => {
    return user?.user_metadata?.avatar_url || null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <StickyNote className="text-blue-600 mr-3" size={24} />
              <h1 className="text-xl font-bold text-gray-900">NotesApp</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {getUserAvatar() ? (
                  <img
                    src={getUserAvatar()!}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-blue-600" />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {getUserDisplayName()}
                </span>
              </div>

              <button
                onClick={handleSignOut}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {getUserDisplayName()}!
          </h2>
          <p className="text-blue-100">
            Manage your notes and stay organized with our simple note-taking app.
          </p>
        </div>

        {/* Notes Section */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Your Notes</h3>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>New Note</span>
          </button>
        </div>

        {error && <ErrorMessage message={error} className="mb-6" />}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size={32} className="text-blue-600" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <StickyNote className="mx-auto text-gray-300 mb-4" size={48} />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              No notes yet
            </h4>
            <p className="text-gray-600 mb-4">
              Create your first note to get started
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Create Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} onNoteDeleted={loadNotes} />
            ))}
          </div>
        )}
      </main>

      {/* Create Note Modal */}
      <CreateNoteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onNoteCreated={loadNotes}
      />
    </div>
  );
};
