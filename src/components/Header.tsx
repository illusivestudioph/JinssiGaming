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
    <button

    <>
      <header className="bg-cream-100 border-b-2 border-tan-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* LOGO WITH SECRET TRIGGER */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={handleLogoClick}>
            <img src={logoImage} alt="Site Logo" className="h-10 w-10 object-cover border border-tan-300" />
          </div>

          <nav className="flex gap-4">
            <button onClick={() => onNavigate('home')} className={`font-semibold ${view === 'home' ? 'text-peach-500' : 'text-tan-600'}`}>Home</button>
            <button onClick={() => onNavigate('walkthroughs')} className={`font-semibold ${view === 'walkthroughs' ? 'text-peach-500' : 'text-tan-600'}`}>Walkthroughs</button>
            {view === 'admin' && <span className="font-bold text-earth-500 ml-4">Admin Mode</span>}
          </nav>
        </div>
      </header>

      {/* SECRET AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-cream-100 rounded-2xl p-8 max-w-md w-full shadow-2xl border-4 border-earth-200 relative animate-fade-in">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-tan-400 hover:text-ink-900">
              <X size={24} />

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
