import { supabase } from '../config/supabase';
import { Note } from '../types/auth';

export class NotesService {
  static async getNotes(): Promise<{ data: Note[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error: any) {
      return { 
        data: null, 
        error: { message: error.message || 'Failed to fetch notes' } 
      };
    }
  }

  static async createNote(title: string, content: string): Promise<{ data: Note | null; error: any }> {
    try {
      // Get the current authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('notes')
        .insert([{ title, content, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { 
        data: null, 
        error: { message: error.message || 'Failed to create note' } 
      };
    }
  }

  static async deleteNote(id: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { 
        error: { message: error.message || 'Failed to delete note' } 
      };
    }
  }
}