import React from 'react';
import { X, Sparkles, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function AuthPromptModal() {
  const { showAuthPrompt, authPromptReason, closeAuthPrompt, signInWithGoogle } = useAuth();

  if (!showAuthPrompt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-sm bg-cream-100 dark:bg-stone-900 border-2 border-tan-300 dark:border-stone-700 rounded-3xl shadow-cozy-lg overflow-hidden flex flex-col p-6 text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthPrompt}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-tan-200/50 dark:hover:bg-stone-800 text-tan-600 dark:text-tan-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-peach-100 dark:bg-peach-950/50 border border-peach-300 dark:border-peach-800 flex items-center justify-center mx-auto text-peach-600 dark:text-peach-400 mb-3 shadow-xs">
          <Sparkles className="w-6 h-6" />
        </div>

        {/* Title & Reason */}
        <h3 className="font-display font-bold text-lg text-ink-900 dark:text-cream-50 mb-1">
          Join the Cozy Community
        </h3>
        <p className="text-xs text-tan-600 dark:text-tan-400 mb-6 leading-relaxed">
          {authPromptReason}
        </p>

        {/* Google 1-Click Button */}
        <button
          type="button"
          onClick={signInWithGoogle}
          className="w-full py-3 px-4 bg-white dark:bg-stone-800 hover:bg-cream-50 dark:hover:bg-stone-700 border-2 border-tan-300 dark:border-stone-600 rounded-2xl font-bold text-xs text-ink-900 dark:text-cream-100 shadow-cozy-xs flex items-center justify-center gap-3 transition-all active:scale-98"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="text-[10px] text-tan-500 dark:text-tan-400 mt-4">
          No passwords required • One-click instant login
        </p>
      </div>
    </div>
  );
}
