import { useState } from 'react';
import { useSiteContent, type CtaLink, type WalletOption } from '@/context/SiteContentContext';
import { supabase } from '@/lib/supabase';
import { Coffee, X, Copy, Check } from 'lucide-react';

export function CtaFooter({ onNavigate }: { onNavigate: (view: 'about' | 'privacy' | 'terms' | 'contact') => void }) {
  const { ctaLinks, logoImage } = useSiteContent();
  const [activeModalLink, setActiveModalLink] = useState<CtaLink | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const supportLink = ctaLinks?.find((link) => (
    (link.wallets && link.wallets.length > 0) ||
    link.label.toLowerCase().includes('coffee') ||
    link.label.toLowerCase().includes('support')
  ));
  const contactLinks = ctaLinks?.filter((link) => (
    link.id !== supportLink?.id && !link.label.toLowerCase().includes('email')
  )) || [];

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterSubmitting(true);
    setNewsletterSubmitted(false);
    setNewsletterError('');

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: newsletterEmail.trim().toLowerCase() });

    if (error && error.code !== '23505') {
      setNewsletterError('We could not save your subscription. Please try again.');
    } else {
      setNewsletterSubmitted(true);
    }

    setNewsletterSubmitting(false);
  };

  const openSupport = () => {
    if (!supportLink) return;
    const wallets: WalletOption[] = supportLink.wallets?.length ? supportLink.wallets : [
      { name: 'GCash', accountName: 'Mary Jane C.', accountNumber: '0912-345-6789' },
      { name: 'Maya', accountName: 'Mary Jane C.', accountNumber: '0912-345-6789' },
      { name: 'PayPal', accountName: 'mjhanesultancruz1514@gmail.com', accountNumber: 'mjhanesultancruz1514@gmail.com' },
      { name: 'Wise', accountName: 'Mary Jane C.', accountNumber: 'mjhanesultancruz1514@gmail.com' },
    ];
    setSelectedWallet(wallets[0]);
    setActiveModalLink({ ...supportLink, wallets });
  };

  const handleLinkClick = (e: React.MouseEvent, link: CtaLink) => {
    // If the button has wallets configured or label mentions coffee/support, open the multi-wallet card
    if ((link.wallets && link.wallets.length > 0) || link.label.toLowerCase().includes('coffee') || link.label.toLowerCase().includes('support')) {
      e.preventDefault();
      // Fallback default wallets if none are explicitly bound in admin state yet
      const defaultWallets: WalletOption[] = link.wallets && link.wallets.length > 0 ? link.wallets : [
        { name: 'GCash', accountName: 'Mary Jane C.', accountNumber: '0912-345-6789' },
        { name: 'Maya', accountName: 'Mary Jane C.', accountNumber: '0912-345-6789' },
        { name: 'PayPal', accountName: 'mjhanesultancruz1514@gmail.com', accountNumber: 'mjhanesultancruz1514@gmail.com' },
        { name: 'Wise', accountName: 'Mary Jane C.', accountNumber: 'mjhanesultancruz1514@gmail.com' }
      ];
      setActiveModalLink(link);
      setSelectedWallet(defaultWallets[0]);
    }
  };

  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(identifier);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="site-footer-shell flex flex-col mt-12 relative">
      {/* Top CTA Section */}
      <div className="max-w-5xl mx-auto px-4 py-16 w-full">
        <div className="site-cta-panel p-10 text-center">
          <div className="site-section-kicker inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-sm uppercase tracking-wider">
            <span>Join the community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-900 mb-3">
            Stay in the cozy loop
          </h2>
          <p className="text-tan-600 mb-0 max-w-xl mx-auto font-medium leading-relaxed">
            Get new game updates, fresh walkthroughs, cozy recommendations, and tidy little tips delivered to your inbox.
          </p>

          <form id="newsletter" onSubmit={handleNewsletterSubmit} className="mx-auto mt-10 mb-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={newsletterEmail}
              onChange={(event) => {
                setNewsletterEmail(event.target.value);
                setNewsletterSubmitted(false);
                setNewsletterError('');
              }}
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-xl border-2 border-tan-200 bg-cream-50 px-4 py-3 text-ink-900 placeholder-tan-400 focus:border-peach-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={newsletterSubmitting}
              className="site-button bg-peach-400 text-white hover:bg-peach-500"
            >
              {newsletterSubmitting ? 'Saving...' : newsletterSubmitted ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {newsletterSubmitted && (
            <p className="mt-3 text-sm font-semibold text-sage-500" role="status">
              You are on the list. Welcome to the cozy corner.
            </p>
          )}
          {newsletterError && (
            <p className="mt-3 text-sm font-semibold text-rose-500" role="alert">
              {newsletterError}
            </p>
          )}
          
          <div className="site-contact-links mt-6 flex flex-wrap justify-center gap-3">
            {contactLinks.map((link, index) => (
              <a 
                key={link.id} 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(e, link)}
                className={`site-button py-3 px-7 cursor-pointer ${
                  index === 0 
                    ? 'bg-peach-400 border-peach-400 text-white hover:bg-peach-500 hover:border-peach-500 shadow-cozy-sm' 
                    : 'bg-cream-50 border-tan-200 text-ink-900 hover:border-peach-400 hover:text-peach-600'
                }`}
              >
                {link.label.toLowerCase().includes('coffee') && <Coffee size={18} className="text-amber-700" />}
                {link.label}
              </a>
            ))}
          </div>

          {supportLink && (
            <div className="site-support-note items-center gap-6 p-6">
              <div>
                <span className="site-support-label"><Coffee size={15} /> Keep the guides cozy</span>
                <p>Support the late-night sorting, shelving, and cleanup sessions.</p>
              </div>
              <button
                type="button"
                onClick={openSupport}
                className="site-support-button"
              >
                <Coffee size={17} />
                {supportLink.label}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MULTI-WALLET PAYMENT CARD MODAL */}
      {activeModalLink && selectedWallet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-cream-50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-tan-200 relative">
            <button 
              onClick={() => setActiveModalLink(null)} 
              className="absolute top-4 right-4 text-tan-400 hover:text-ink-900 bg-white p-1 rounded-full border border-tan-200"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-peach-100 text-peach-600 rounded-full mb-2">
                <Coffee size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold text-ink-900">{activeModalLink.label}</h3>
              <p className="text-sm text-tan-600">Choose your preferred payment method below:</p>
            </div>

            {/* Wallet Selection Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {(activeModalLink.wallets || [
                { name: 'GCash', accountName: 'Mary Jane C.', accountNumber: '0912-345-6789' },
                { name: 'Maya', accountName: 'Mary Jane C.', accountNumber: '0912-345-6789' },
                { name: 'PayPal', accountName: 'mjhanesultancruz1514@gmail.com', accountNumber: 'mjhanesultancruz1514@gmail.com' },
                { name: 'Wise', accountName: 'Mary Jane C.', accountNumber: 'mjhanesultancruz1514@gmail.com' }
              ]).map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => setSelectedWallet(wallet)}
                  className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border-2 ${
                    selectedWallet.name === wallet.name
                      ? 'bg-peach-400 border-peach-400 text-white shadow-sm'
                      : 'bg-white border-tan-200 text-tan-600 hover:border-peach-300'
                  }`}
                >
                  {wallet.name}
                </button>
              ))}
            </div>

            {/* Selected Wallet Details Card */}
            <div className="bg-white p-5 rounded-2xl border-2 border-tan-200 shadow-inner flex flex-col items-center text-center">
              <span className="text-xs font-bold text-tan-400 uppercase tracking-wider mb-1">Sending via {selectedWallet.name}</span>
              <h4 className="font-bold text-lg text-ink-900 mb-3">{selectedWallet.accountName || 'Jinssi Gaming'}</h4>

              {selectedWallet.qrCode && (
                <div className="mb-4 rounded-xl border-2 border-tan-200 bg-white p-3 shadow-cozy-sm">
                  <img
                    src={selectedWallet.qrCode}
                    alt={`${selectedWallet.name} payment QR code`}
                    className="h-48 w-48 max-w-full object-contain"
                  />
                </div>
              )}

              {selectedWallet.accountNumber && (
                <div className="w-full flex items-center justify-between bg-cream-50 px-4 py-2.5 rounded-xl border border-tan-200">
                  <span className="font-mono font-bold text-ink-800 text-sm">{selectedWallet.accountNumber}</span>
                  <button 
                    onClick={() => handleCopy(selectedWallet.accountNumber, selectedWallet.name)}
                    className="flex items-center gap-1 text-xs font-bold text-peach-600 bg-peach-50 px-2.5 py-1 rounded-lg hover:bg-peach-100 transition-colors"
                  >
                    {copiedField === selectedWallet.name ? <Check size={14} className="text-sage-600" /> : <Copy size={14} />}
                    {copiedField === selectedWallet.name ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-tan-500 font-semibold">Thank you so much for supporting the site! ☕✨</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Footer Section */}
      <footer className="site-footer-bottom">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-tan-200 pb-8 mb-8">
            
            {/* Enlarged Dynamic Logo */}
            <div className="flex items-center gap-4">
              {logoImage ? (
                <img 
                  src={logoImage} 
                  alt="Jinssi Logo" 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain" 
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-peach-300 flex items-center justify-center text-white font-bold text-3xl">
                  J
                </div>
              )}
              <span className="font-display font-bold text-2xl text-ink-900">Jinssi Gaming</span>
            </div>

            {/* Clickable Email & Social Handle */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-tan-500">
              <a 
                href="mailto:mjhanesultancruz1514@gmail.com" 
                className="hover:text-peach-500 transition-colors"
              >
                mjhanesultancruz1514@gmail.com
              </a>
              <span className="hidden md:inline text-tan-300">|</span>
              <span>Threads & TikTok: jinssi cruise</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-semibold text-tan-400">
            <p>© 2026 Jinssi Gaming. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={() => onNavigate('privacy')} className="hover:text-peach-500 transition-colors">Privacy</button>
              <button type="button" onClick={() => onNavigate('terms')} className="hover:text-peach-500 transition-colors">Terms</button>
              <button type="button" onClick={() => onNavigate('contact')} className="hover:text-peach-500 transition-colors">Contact</button>
              <span>Site developed by <span className="text-ink-900 font-bold">Mary Jane S. Cruz</span></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
