import { useState, useRef, useEffect } from 'react';
import { useSiteContent } from "@/context/SiteContentContext";
import { Lock, Menu, X } from 'lucide-react';

export type View = 'home' | 'walkthroughs' | 'about' | 'privacy' | 'terms' | 'contact' | 'admin';

export function Header({ view, onNavigate }: { view: View; onNavigate: (v: View) => void }) {
  const { logoImage } = useSiteContent();
  
  // Secret Trigger State
  const [clickCount, setClickCount] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    onNavigate('home');
    setClickCount((prev) => prev + 1);
    
    // Reset the click count if they don't click again within 600ms (rapid succession)
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => setClickCount(0), 600);
  };

  useEffect(() => {
    if (clickCount >= 5) {
      setShowAuthModal(true);
      setClickCount(0); // Reset
    }
  }, [clickCount]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'JINSSICRUISE') {
      setShowAuthModal(false);
      setPassword('');
      setError('');
      onNavigate('admin');
    } else {
      setError('Incorrect password. Nice try!');
    }
  };

  const handleNavigate = (nextView: View) => {
    setMobileMenuOpen(false);
    onNavigate(nextView);
  };

  return (
    <>
      <header className="bg-cream-100 border-b-2 border-tan-200 sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* LOGO WITH SECRET TRIGGER */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={handleLogoClick}>
            <img src={logoImage} alt="Site Logo" className="h-10 w-10 object-contain" />
            <h1 className="font-display font-bold text-xl text-ink-900">Jinssi</h1>
          </div>

          <nav className="hidden items-center gap-4 md:flex">
            <button aria-current={view === 'home' ? 'page' : undefined} onClick={() => handleNavigate('home')} className={`site-nav-link ${view === 'home' ? 'text-peach-500' : 'text-tan-600'}`}>Home</button>
            <button aria-current={view === 'walkthroughs' ? 'page' : undefined} onClick={() => handleNavigate('walkthroughs')} className={`site-nav-link ${view === 'walkthroughs' ? 'text-peach-500' : 'text-tan-600'}`}>Walkthroughs</button>
            <button aria-current={view === 'about' ? 'page' : undefined} onClick={() => handleNavigate('about')} className={`site-nav-link ${view === 'about' ? 'text-peach-500' : 'text-tan-600'}`}>About</button>
            {view === 'admin' && <span className="font-bold text-earth-500 ml-4">Admin Mode</span>}
          </nav>

          <button
            type="button"
            className="rounded-xl border-2 border-tan-200 bg-cream-50 p-2 text-tan-600 shadow-cozy-sm transition-colors hover:border-peach-300 hover:text-peach-500 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav id="mobile-navigation" className="border-t-2 border-tan-200 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              <button aria-current={view === 'home' ? 'page' : undefined} onClick={() => handleNavigate('home')} className={`site-nav-link text-left ${view === 'home' ? 'text-peach-500' : 'text-tan-600'}`}>Home</button>
              <button aria-current={view === 'walkthroughs' ? 'page' : undefined} onClick={() => handleNavigate('walkthroughs')} className={`site-nav-link text-left ${view === 'walkthroughs' ? 'text-peach-500' : 'text-tan-600'}`}>Walkthroughs</button>
              <button aria-current={view === 'about' ? 'page' : undefined} onClick={() => handleNavigate('about')} className={`site-nav-link text-left ${view === 'about' ? 'text-peach-500' : 'text-tan-600'}`}>About</button>
            </div>
          </nav>
        )}
      </header>

      {/* SECRET AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-cream-100 rounded-2xl p-8 max-w-md w-full shadow-2xl border-4 border-earth-200 relative animate-fade-in">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-tan-400 hover:text-ink-900">
              <X size={24} />
            </button>
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-earth-100 rounded-full text-earth-600">
                <Lock size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-display font-bold text-center text-ink-900 mb-2">Restricted Access</h2>
            <p className="text-center text-tan-600 mb-6">Please enter the admin password to manage site content.</p>
            
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input 
                type="password" 
                autoFocus
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-white font-mono"
              />
              {error && <p className="text-red-500 text-sm font-semibold text-center">{error}</p>}
              <button type="submit" className="site-button w-full bg-earth-500 text-white hover:bg-earth-600">
                Unlock Dashboard
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
