import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';

export type AuthMode = 'signin' | 'signup' | 'reset' | 'recovery';
export interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  isConfigured: boolean;
  error: string | null;
  openAuth: (mode?: AuthMode) => void;
  signOut: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextValue | null>(null);
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
