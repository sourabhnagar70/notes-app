/*import { supabase } from '../config/supabase';
import { AuthError } from '../types/auth';

export class AuthService {
  static async signUpWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      console.log('Supabase signup response:', { data, error });
      
      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Signup service error:', error);
      return { 
        data: null, 
        error: { message: error.message || 'Failed to sign up' } as AuthError 
      };
    }
  }

  static async signInWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { 
        data: null, 
        error: { message: error.message || 'Failed to sign in' } as AuthError 
      };
    }
  }

  static async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { 
        data: null, 
        error: { message: error.message || 'Failed to sign in with Google' } as AuthError 
      };
    }
  }

  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { 
        error: { message: error.message || 'Failed to sign out' } as AuthError 
      };
    }
  }
} */

  // Mock Auth Service API
export const AuthService = {
  async sendOTP(email: string) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (email === 'error@test.com') throw new Error('Failed to send OTP');
    return { success: true };
  },

  async verifySignUp(email: string, otp: string, name: string, dateOfBirth: string) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (otp !== '1234') throw new Error('Invalid OTP');
    const token = 'jwt_token_' + Math.random().toString(36).substr(2, 9);
    return { token, user: { email, name, dateOfBirth } };
  },

  async signIn(email: string, otp: string) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (otp !== '1234') throw new Error('Invalid OTP');
    const token = 'jwt_token_' + Math.random().toString(36).substr(2, 9);
    return { token, user: { email, name: 'John Doe', dateOfBirth: '1990-01-01' } };
  },

  async signOut() {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Clear any stored tokens, redirect, etc.
    window.location.href = '/login';
  },

  async googleAuth() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const token = 'google_jwt_token_' + Math.random().toString(36).substr(2, 9);
    return { token, user: { email: 'user@gmail.com', name: 'Google User', dateOfBirth: '1990-01-01' } };
  }
};