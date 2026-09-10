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

  const navItems: { view: View; label: string; icon: string }[] = [
    { view: 'home', label: 'Home', icon: '🏠' },
    { view: 'walkthroughs', label: 'Walkthroughs', icon: '📋' },
    { view: 'journal', label: 'Journal', icon: '☕' },
    { view: 'stories', label: 'Stories', icon: '📖' },
    { view: 'about', label: 'About', icon: '💛' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border-b-2 border-[var(--header-border)]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
          
          {/* COZY LOGO WITH SECRET TRIGGER */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none group py-1 px-2.5 -ml-2 rounded-2xl transition-all duration-200 hover:bg-white/60 active:scale-95"
            onClick={handleLogoClick}
          >
            <div className="relative">
              <img
                src={logoImage}
                alt="Site Logo"
                className="h-9 w-9 sm:h-10 sm:w-10 object-contain drop-shadow-sm group-hover:rotate-6 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl sm:text-2xl text-ink-900 tracking-tight leading-none group-hover:text-[var(--theme-accent)] transition-colors">
                  Jinssi
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--section-kicker-bg)] text-[var(--section-kicker-color)] border border-[var(--section-kicker-border)] leading-none shadow-cozy-xs">
                  gaming
                </span>
              </div>
              <span className="text-[10px] font-semibold text-tan-500 hidden sm:inline-block leading-tight mt-0.5">
                cozy guides &amp; stories ☕
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* COZY NAVIGATION ISLAND */}
            <nav className="hidden items-center gap-1 md:flex p-1 rounded-full bg-white/70 backdrop-blur-sm border border-tan-200/80 shadow-cozy-xs header-nav-bar">
              {navItems.map((item) => {
                const isActive = view === item.view;
                return (
                  <button
                    key={item.view}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => handleNavigate(item.view)}
                    className={`header-nav-pill px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 select-none active:scale-95 ${
                      isActive
                        ? 'header-nav-pill-active shadow-cozy-xs'
                        : 'text-ink-700 hover:text-ink-900 hover:bg-white/80'
                    }`}
                  >
                    <span className="text-xs opacity-90">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
              {view === 'admin' && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-earth-100 text-earth-700 border border-earth-200 ml-1">
                  Admin Mode
                </span>
              )}
            </nav>

            {/* COZY POCKET RADIO / BGM & AMBIENCE CONTROL */}
            <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-tan-300/70 rounded-full p-1 shadow-cozy-xs header-audio-pill">
              <button
                type="button"
                onClick={() => void togglePlayback()}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all select-none active:scale-95 ${
                  playing
                    ? 'shadow-cozy-xs'
                    : 'text-ink-800 hover:bg-cream-100'
                }`}
                style={
                  playing
                    ? {
                        backgroundColor: 'var(--theme-accent)',
                        color: 'var(--theme-accent-text, #ffffff)',
                      }
                    : undefined
                }
                title={playing ? 'Pause cozy background music' : 'Play cozy background music'}
                aria-label={playing ? 'Pause background music' : 'Play background music'}
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  {playing ? <Pause className="w-3.5 h-3.5" /> : <Music className="w-3.5 h-3.5" />}
                </span>
                <span className="hidden sm:inline font-sans text-xs">
                  {playing ? (muted ? 'Muted' : 'Music On') : 'BGM'}
                </span>
              </button>

              {/* Open Ambient Mixer Lounge */}
              <button
                type="button"
                onClick={() => setShowMixer(true)}
                className={`p-1.5 rounded-full transition-all relative select-none active:scale-95 ${
                  hasActiveAmbience
                    ? 'shadow-cozy-xs'
                    : 'text-tan-500 hover:text-ink-900 hover:bg-cream-100'
                }`}
                style={
                  hasActiveAmbience
                    ? {
                        backgroundColor: 'var(--section-kicker-bg)',
                        color: 'var(--section-kicker-color)',
                        border: '1px solid var(--theme-accent-border)',
                      }
                    : undefined
                }
                title="Open Cozy Sound Lounge (Rain, Campfire, Wind)"
                aria-label="Open ambient sound mixer"
              >
                <Sliders className="w-3.5 h-3.5" />
                {hasActiveAmbience && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ring-1 ring-white"
                    style={{ backgroundColor: 'var(--theme-accent)' }}
                  />
                )}
              </button>

              {playing && (
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-full text-tan-500 hover:text-ink-900 hover:bg-cream-100 transition-colors select-none active:scale-95"
                  title={muted ? 'Unmute music' : 'Mute music'}
                  aria-label={muted ? 'Unmute music' : 'Mute music'}
                >
                  {muted ? (
                    <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
                  )}
                </button>
              )}
            </div>

            <button
              type="button"
              className="rounded-full border border-tan-300/80 bg-white/80 p-2 text-ink-700 shadow-cozy-xs transition-all hover:bg-white hover:text-ink-900 active:scale-95 md:hidden"
              onClick={() => {
                playDropdownSfx();
                setMobileMenuOpen((open) => !open);
              }}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="border-t border-[var(--header-border)] px-4 py-4 md:hidden bg-[var(--header-bg)]/98 backdrop-blur-md animate-fade-in shadow-cozy"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = view === item.view;
                return (
                  <button
                    key={item.view}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => handleNavigate(item.view)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-bold transition-all select-none active:scale-95 ${
                      isActive
                        ? 'header-nav-pill-active shadow-cozy-xs'
                        : 'text-ink-800 hover:bg-white/80 bg-white/40'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    {isActive && (
                      <span className="text-[10px] uppercase tracking-wider font-bold opacity-75">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Mobile volume slider & Sound Lounge button */}
              <div className="mt-3 p-3 rounded-2xl bg-white/60 border border-tan-200/80 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3 text-xs text-ink-800">
                  <span className="font-bold flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
                    Music Volume:
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={userVolume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-28 cursor-pointer"
                    style={{ accentColor: 'var(--theme-accent)' }}
                    aria-label="Mobile music volume"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowMixer(true);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-cozy-xs active:scale-95"
                  style={{
                    backgroundColor: 'var(--section-kicker-bg)',
                    color: 'var(--section-kicker-color)',
                    border: '1px solid var(--theme-accent-border)',
                  }}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Open Sound Lounge (Rain, Campfire, Wind...)</span>
                </button>
              </div>
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
