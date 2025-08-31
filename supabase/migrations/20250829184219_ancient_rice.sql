/*
  # Fix RLS policies for notes table

  1. Security Updates
    - Drop existing policies that might be conflicting
    - Create new comprehensive policies for notes table
    - Ensure authenticated users can perform all CRUD operations on their own notes
    - Add policy for users to insert notes with their own user_id
    - Add policy for users to select their own notes
    - Add policy for users to update their own notes  
    - Add policy for users to delete their own notes

  2. Important Notes
    - All policies check that auth.uid() matches the user_id column
    - This ensures users can only access and modify their own notes
    - INSERT policy uses WITH CHECK to validate user_id on creation
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can insert own notes" ON notes;
DROP POLICY IF EXISTS "Users can read own notes" ON notes;
DROP POLICY IF EXISTS "Users can update own notes" ON notes;
DROP POLICY IF EXISTS "Users can delete own notes" ON notes;

-- Create comprehensive RLS policies for notes table
CREATE POLICY "Enable insert for authenticated users own notes"
  ON notes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable select for authenticated users own notes"
  ON notes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable update for authenticated users own notes"
  ON notes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete for authenticated users own notes"
  ON notes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);