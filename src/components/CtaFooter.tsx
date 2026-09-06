import { useState } from 'react';
import { useSiteContent, type CtaLink, type WalletOption } from '@/context/SiteContentContext';
import { Mail, Sparkles, Coffee, X, Copy, Check } from 'lucide-react';

export function CtaFooter() {
  const { ctaLinks, logoImage } = useSiteContent();
  const [activeModalLink, setActiveModalLink] = useState<CtaLink | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

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
    <div className="bg-cream-100 flex flex-col mt-12 relative">
      {/* Top CTA Section */}
      <div className="max-w-5xl mx-auto px-4 py-16 w-full">
        <div className="bg-cream-50 border-2 border-tan-100 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
          <div className="inline-flex items-center gap-2 bg-tan-100/50 text-tan-500 font-bold mb-4 px-4 py-1.5 rounded-full text-sm uppercase tracking-wider">
            <Sparkles size={16} />
            <span>Join the community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-900 mb-4">
            Suggest a game or follow along!
          </h2>
          <p className="text-tan-600 mb-8 max-w-xl mx-auto font-medium leading-relaxed">
            Know a cozy game that belongs here? Want to share your progress or just say
            hi? Reach out anytime — we would love to hear from you.
          </p>
          
          {/* Dynamic Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {ctaLinks?.map((link, index) => (
              <a 
                key={link.id} 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(e, link)}
                className={`font-bold py-3 px-8 rounded-full transition-all hover:-translate-y-1 shadow-sm flex items-center gap-2 border-2 cursor-pointer ${
                  index === 0 
                    ? 'bg-peach-400 border-peach-400 text-white hover:bg-peach-500 hover:border-peach-500' 
                    : 'bg-white border-tan-200 text-ink-900 hover:border-peach-400 hover:text-peach-600'
                }`}
              >
                {link.label.toLowerCase().includes('email') && <Mail size={18} />}
                {link.label.toLowerCase().includes('coffee') && <Coffee size={18} className="text-amber-700" />}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* MULTI-WALLET PAYMENT CARD MODAL */}
      {activeModalLink && selectedWallet && (
        <div className="fixed inset-0 bg-ink-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
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
      <footer className="border-t-2 border-tan-200 bg-cream-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
            <p>Site developed by <span className="text-ink-900 font-bold">Mary Jane S. Cruz</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
