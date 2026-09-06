import { LogoImage } from './LogoImage';
import { useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { useSiteContent } from '@/context/siteContent';
import { useAuth } from '@/context/auth';
import { errorMessage } from '@/lib/validation';

export type View = 'home' | 'walkthroughs' | 'about' | 'admin';

export function Header({
  view,
  onNavigate,
  onSignOut,
}: {
  view: View;
  onNavigate: (view: View) => void;
  onSignOut: () => Promise<void>;
}) {
  const { logoImage } = useSiteContent();
  const { user, isAdmin, loading, isConfigured, openAuth, error } = useAuth();
  const [signOutError, setSignOutError] = useState('');
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    setSignOutError('');
    try {
      await onSignOut();
    } catch (cause) {
      setSignOutError(errorMessage(cause));
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <header className="bg-cream-100 border-b-2 border-tan-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <button
          className="flex items-center gap-3"
          onClick={() => onNavigate('home')}
          aria-label="Jinssi Gaming home"
        >
          <LogoImage
            src={logoImage}
            alt=""
            className="h-10 w-10 object-cover border border-tan-300"
          />
        </button>
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-4 text-sm sm:text-base"
        >
          {(['home', 'walkthroughs', 'about'] as const).map((destination) => (
            <button
              key={destination}
              onClick={() => onNavigate(destination)}
              aria-current={view === destination ? 'page' : undefined}
              className={`font-semibold capitalize ${view === destination ? 'text-peach-500' : 'text-tan-600'}`}
            >
              {destination.charAt(0).toUpperCase() + destination.slice(1)}
            </button>
          ))}
          {isAdmin && (
            <button
              onClick={() => onNavigate('admin')}
              aria-current={view === 'admin' ? 'page' : undefined}
              className="font-bold text-earth-600"
            >
              Admin
            </button>
          )}
          {isConfigured &&
            (user ? (
              <button
                disabled={signingOut}
                onClick={() => void handleSignOut()}
                className="flex items-center gap-1 font-semibold text-tan-600"
              >
                <LogOut size={16} />
                {signingOut ? 'Signing out…' : 'Sign out'}
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={() => openAuth()}
                className="flex items-center gap-1 font-semibold text-earth-600"
              >
                <LogIn size={16} />
                {loading ? 'Loading…' : 'Sign in'}
              </button>
            ))}
        </nav>
      </div>
      {(error || signOutError) && (
        <p role="alert" className="max-w-7xl mx-auto px-4 pb-3 text-sm text-red-700">
          {signOutError || error}
        </p>
      )}
    </header>
  );
}
