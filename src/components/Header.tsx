import { useState, useRef, useEffect } from 'react';
import { useSiteContent } from "@/context/SiteContentContext";
import { useMusic } from "@/context/MusicContext";
import { AmbientMixerModal } from "@/components/AmbientMixerModal";
import { Lock, Menu, X, Music, Pause, Volume2, VolumeX, Sliders } from 'lucide-react';

export type View = 'home' | 'walkthroughs' | 'journal' | 'stories' | 'about' | 'privacy' | 'terms' | 'contact' | 'admin';

export function Header({ view, onNavigate }: { view: View; onNavigate: (v: View) => void }) {
  const { logoImage } = useSiteContent();
  const { playing, muted, togglePlayback, toggleMute, userVolume, setVolume, hasActiveAmbience, playDropdownSfx } = useMusic();
  const [showMixer, setShowMixer] = useState(false);
  
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
      <header className="site-header bg-cream-100 border-b-2 border-tan-200 sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* LOGO WITH SECRET TRIGGER */}
          <div className="site-logo-link flex items-center gap-3 cursor-pointer select-none group transition-all duration-300" onClick={handleLogoClick}>
            <img src={logoImage} alt="Site Logo" className="site-logo-img h-10 w-10 object-contain transition-all duration-300" />
            <span className="site-logo-text font-display font-bold text-xl sm:text-2xl text-ink-900 transition-all duration-300">Jinssi</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="hidden items-center gap-2 md:flex">
              <button aria-current={view === 'home' ? 'page' : undefined} onClick={() => handleNavigate('home')} className={`site-nav-link ${view === 'home' ? 'text-peach-500 is-active' : 'text-tan-600'}`}>Home</button>
              <button aria-current={view === 'walkthroughs' ? 'page' : undefined} onClick={() => handleNavigate('walkthroughs')} className={`site-nav-link ${view === 'walkthroughs' ? 'text-peach-500 is-active' : 'text-tan-600'}`}>Walkthroughs</button>
              <button aria-current={view === 'journal' ? 'page' : undefined} onClick={() => handleNavigate('journal')} className={`site-nav-link ${view === 'journal' ? 'text-peach-500 is-active' : 'text-tan-600'}`}>Journal</button>
              <button aria-current={view === 'stories' ? 'page' : undefined} onClick={() => handleNavigate('stories')} className={`site-nav-link ${view === 'stories' ? 'text-peach-500 is-active' : 'text-tan-600'}`}>Stories</button>
              <button aria-current={view === 'about' ? 'page' : undefined} onClick={() => handleNavigate('about')} className={`site-nav-link ${view === 'about' ? 'text-peach-500 is-active' : 'text-tan-600'}`}>About</button>
              {view === 'admin' && <span className="font-bold text-earth-500 ml-4">Admin Mode</span>}
            </nav>

            {/* Persistent Header Music & Ambience Control */}
            <div className="header-music-pill flex items-center gap-1.5 bg-cream-50/90 border border-tan-300/80 rounded-full px-2.5 py-1 shadow-cozy-sm transition-all duration-300">
              <button
                type="button"
                onClick={() => void togglePlayback()}
                className="flex items-center gap-1.5 text-xs font-bold text-ink-800 hover:text-peach-600 transition-colors focus:outline-none"
                title={playing ? 'Pause cozy background music' : 'Play cozy background music'}
                aria-label={playing ? 'Pause background music' : 'Play background music'}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    playing
                      ? 'bg-peach-400 text-white shadow-cozy-sm animate-pulse-gentle'
                      : 'bg-cream-200 text-tan-600'
                  }`}
                >
                  {playing ? <Pause className="w-3 h-3" /> : <Music className="w-3 h-3" />}
                </span>
                <span className="hidden sm:inline font-sans text-xs">
                  {playing ? (muted ? 'Muted' : 'Music On') : 'BGM'}
                </span>
              </button>

              {/* Open Ambient Mixer Lounge */}
              <button
                type="button"
                onClick={() => setShowMixer(true)}
                className={`p-1 rounded-full transition-colors relative ${
                  hasActiveAmbience
                    ? 'text-peach-600 bg-peach-100 hover:bg-peach-200'
                    : 'text-tan-500 hover:text-ink-900 hover:bg-cream-200'
                }`}
                title="Open Ambient Sound Lounge (Rain, Fireplace, Wind)"
                aria-label="Open ambient sound mixer"
              >
                <Sliders className="w-3.5 h-3.5" />
                {hasActiveAmbience && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-peach-500 ring-1 ring-white" />
                )}
              </button>

              {playing && (
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 rounded-full text-tan-500 hover:text-ink-900 transition-colors"
                  title={muted ? 'Unmute music' : 'Mute music'}
                  aria-label={muted ? 'Unmute music' : 'Mute music'}
                >
                  {muted ? (
                    <VolumeX className="w-3.5 h-3.5 text-tan-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-earth-600" />
                  )}
                </button>
              )}
            </div>

            <button
              type="button"
              className="rounded-xl border-2 border-tan-200 bg-cream-50 p-2 text-tan-600 shadow-cozy-sm transition-colors hover:border-peach-300 hover:text-peach-500 md:hidden"
              onClick={() => {
                playDropdownSfx();
                setMobileMenuOpen((open) => !open);
              }}

              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav id="mobile-navigation" className="border-t-2 border-tan-200 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              <button aria-current={view === 'home' ? 'page' : undefined} onClick={() => handleNavigate('home')} className={`site-nav-link text-left ${view === 'home' ? 'text-peach-500' : 'text-tan-600'}`}>Home</button>
              <button aria-current={view === 'walkthroughs' ? 'page' : undefined} onClick={() => handleNavigate('walkthroughs')} className={`site-nav-link text-left ${view === 'walkthroughs' ? 'text-peach-500' : 'text-tan-600'}`}>Walkthroughs</button>
              <button aria-current={view === 'journal' ? 'page' : undefined} onClick={() => handleNavigate('journal')} className={`site-nav-link text-left ${view === 'journal' ? 'text-peach-500' : 'text-tan-600'}`}>Journal</button>
              <button aria-current={view === 'stories' ? 'page' : undefined} onClick={() => handleNavigate('stories')} className={`site-nav-link text-left ${view === 'stories' ? 'text-peach-500' : 'text-tan-600'}`}>Stories</button>
              <button aria-current={view === 'about' ? 'page' : undefined} onClick={() => handleNavigate('about')} className={`site-nav-link text-left ${view === 'about' ? 'text-peach-500' : 'text-tan-600'}`}>About</button>
              
              {/* Mobile volume slider */}
              <div className="mt-3 pt-3 border-t border-tan-200 flex items-center justify-between gap-3 text-xs text-tan-600 px-1">
                <span className="font-bold">Music Volume:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={userVolume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-28 accent-peach-400"
                  aria-label="Mobile music volume"
                />
              </div>

              {/* Mobile open ambient lounge */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowMixer(true);
                }}
                className="mt-2.5 flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-peach-100 text-peach-700 text-xs font-bold hover:bg-peach-200 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                Open Sound Lounge (Rain, Fireplace...)
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* AMBIENT SOUND LOUNGE MODAL */}
      <AmbientMixerModal isOpen={showMixer} onClose={() => setShowMixer(false)} />

      {/* SECRET AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="notepad-card max-w-md w-full p-8 relative animate-fade-in">
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
