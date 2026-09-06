import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { AuthMode } from '@/context/auth';
import { requireSupabase } from '@/lib/supabase';
import { displayNameSchema, errorMessage } from '@/lib/validation';
import { Modal } from './Modal';

const titles: Record<AuthMode, string> = {
  signin: 'Welcome back',
  signup: 'Join the community',
  reset: 'Reset your password',
  recovery: 'Choose a new password',
};

export function AuthDialog({
  mode,
  onModeChange,
  onClose,
}: {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    setError('');
    setMessage('');
    setPassword('');
  }, [mode]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setError('');
    setMessage('');
    try {
      const client = requireSupabase();
      // Use the real browser origin, not a sandbox-only localhost URL.
      const redirectTo = new URL(import.meta.env.BASE_URL, window.location.origin).href;
      if (mode === 'signin') {
        const { error: cause } = await client.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (cause) throw cause;
        if (mounted.current) onClose();
      } else if (mode === 'signup') {
        const name = displayNameSchema.parse(displayName);
        const { data, error: cause } = await client.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { display_name: name }, emailRedirectTo: redirectTo },
        });
        if (cause) throw cause;
        if (mounted.current) {
          if (data.session) onClose();
          else {
            setMessage('Check your email to confirm your account, then sign in.');
            setPassword('');
          }
        }
      } else if (mode === 'reset') {
        const { error: cause } = await client.auth.resetPasswordForEmail(email.trim(), {
          redirectTo,
        });
        if (cause) throw cause;
        if (mounted.current)
          setMessage(
            'If an account exists for that address, a password reset link will arrive by email.',
          );
      } else {
        const { error: cause } = await client.auth.updateUser({ password });
        if (cause) throw cause;
        if (mounted.current) {
          setMessage('Your password has been updated. You can close this window.');
          setPassword('');
        }
      }
    } catch (cause) {
      if (mounted.current) setError(errorMessage(cause));
    } finally {
      if (mounted.current) setPending(false);
    }
  };

  return (
    <Modal title={titles[mode]} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <fieldset disabled={pending} className="flex flex-col gap-4 disabled:opacity-60">
          {mode === 'signup' && (
            <label className="font-semibold">
              Public display name
              <input
                className="form-input mt-1"
                autoComplete="nickname"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                minLength={2}
                maxLength={50}
                required
              />
            </label>
          )}
          {mode !== 'recovery' && (
            <label className="font-semibold">
              Email
              <input
                className="form-input mt-1"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoFocus
              />
            </label>
          )}
          {mode !== 'reset' && (
            <label className="font-semibold">
              Password
              <input
                className="form-input mt-1"
                type="password"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={mode === 'signin' ? 1 : 12}
                required
              />
              {mode !== 'signin' && (
                <span className="text-xs text-tan-600">Use at least 12 characters.</span>
              )}
            </label>
          )}
          <button
            type="submit"
            className="btn-cozy bg-earth-500 text-white hover:bg-earth-600 disabled:opacity-50"
          >
            {pending
              ? 'Please wait…'
              : mode === 'signin'
                ? 'Sign in'
                : mode === 'signup'
                  ? 'Create account'
                  : mode === 'reset'
                    ? 'Send reset link'
                    : 'Update password'}
          </button>
        </fieldset>
        {error && (
          <p role="alert" className="text-red-700 text-sm">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="text-sage-500 text-sm">
            {message}
          </p>
        )}
      </form>
      {mode !== 'recovery' && (
        <div className="mt-5 flex flex-col gap-3 text-sm font-semibold text-tan-600">
          <button
            disabled={pending}
            onClick={() => onModeChange(mode === 'signup' ? 'signin' : 'signup')}
          >
            {mode === 'signup' ? 'Already have an account? Sign in' : 'New here? Create an account'}
          </button>
          {mode === 'signin' && (
            <button disabled={pending} onClick={() => onModeChange('reset')}>
              Forgot your password?
            </button>
          )}
          {mode === 'reset' && (
            <button disabled={pending} onClick={() => onModeChange('signin')}>
              Back to sign in
            </button>
          )}
        </div>
      )}
    </Modal>
  );
}
