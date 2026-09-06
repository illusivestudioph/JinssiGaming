import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { AuthContext, type AuthMode } from './auth';
import { AuthDialog } from '@/components/AuthDialog';
import { supabase, supabaseConfigurationError } from '@/lib/supabase';
import { errorMessage } from '@/lib/validation';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(Boolean(supabase));
  const [role, setRole] = useState<{ token: string; isAdmin: boolean } | null>(null);
  const [error, setError] = useState<string | null>(supabaseConfigurationError);
  const [mode, setMode] = useState<AuthMode | null>(null);
  const generation = useRef(0);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    let authEventReceived = false;
    // Do not await Supabase requests in this callback: that can deadlock the
    // client's auth lock. Admin-role lookup happens in a separate effect.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!active) return;
      authEventReceived = true;
      setSession(nextSession);
      setSessionLoading(false);
      if (event === 'PASSWORD_RECOVERY') setMode('recovery');
    });
    supabase.auth
      .getSession()
      .then(({ data, error: cause }) => {
        if (!active || authEventReceived) return;
        if (cause) setError(errorMessage(cause));
        setSession(data.session);
        setSessionLoading(false);
      })
      .catch((cause: unknown) => {
        if (!active || authEventReceived) return;
        setError(errorMessage(cause));
        setSessionLoading(false);
      });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const token = session?.access_token;
  useEffect(() => {
    const current = ++generation.current;
    if (!supabase || !token) {
      setRole(null);
      return;
    }
    setError(null);
    Promise.resolve(supabase.rpc('is_admin'))
      .then(({ data, error: cause }) => {
        if (current !== generation.current) return;
        setRole({ token, isAdmin: !cause && data === true });
        if (cause) setError(`Could not verify admin access: ${cause.message}`);
      })
      .catch((cause: unknown) => {
        if (current !== generation.current) return;
        setRole({ token, isAdmin: false });
        setError(errorMessage(cause));
      });
    return () => {
      generation.current = current + 1;
    };
  }, [token]);

  const openAuth = useCallback((nextMode: AuthMode = 'signin') => setMode(nextMode), []);
  const closeAuth = useCallback(() => setMode(null), []);
  const signOut = async () => {
    if (!supabase) return;
    const { error: cause } = await supabase.auth.signOut({ scope: 'local' });
    if (cause) throw cause;
    setSession(null);
    setRole(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        isAdmin: Boolean(token && role?.token === token && role.isAdmin),
        loading: sessionLoading || Boolean(token && role?.token !== token),
        isConfigured: Boolean(supabase),
        error,
        openAuth,
        signOut,
      }}
    >
      {children}
      {mode && <AuthDialog mode={mode} onModeChange={setMode} onClose={closeAuth} />}
    </AuthContext.Provider>
  );
}
