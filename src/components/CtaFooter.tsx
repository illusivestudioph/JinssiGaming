import { useEffect, useRef, useState } from 'react';
import { Mail, Sparkles, Coffee, Copy, Check } from 'lucide-react';
import { useSiteContent } from '@/context/siteContent';
import { safeLink } from '@/lib/urls';
import { Modal } from './Modal';

export function CtaFooter() {
  const { ctaLinks, logoImage } = useSiteContent();
  const [activeLinkId, setActiveLinkId] = useState<string | null>(null);
  const [walletIndex, setWalletIndex] = useState(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [copyError, setCopyError] = useState('');
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyOperation = useRef(0);
  const activeLink = ctaLinks.find((link) => link.id === activeLinkId);
  const selectedWallet = activeLink?.wallets?.[walletIndex] ?? activeLink?.wallets?.[0];

  useEffect(
    () => () => {
      copyOperation.current++;
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  const clearCopy = () => {
    copyOperation.current++;
    if (copyTimer.current) clearTimeout(copyTimer.current);
    setCopiedField(null);
    setCopyError('');
  };
  const handleCopy = async (text: string, identifier: string) => {
    clearCopy();
    const operation = copyOperation.current;
    try {
      if (!navigator.clipboard) throw new Error('Clipboard is unavailable.');
      await navigator.clipboard.writeText(text);
      if (operation !== copyOperation.current) return;
      setCopiedField(identifier);
      copyTimer.current = setTimeout(() => setCopiedField(null), 2000);
    } catch {
      if (operation === copyOperation.current)
        setCopyError('Could not copy. Please select and copy the account details manually.');
    }
  };

  return (
    <div className="bg-cream-100 flex flex-col mt-12 relative">
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
            Know a cozy game that belongs here? Want to share your progress or just say hi? Reach
            out anytime — we would love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {ctaLinks.map((link, index) => {
              const className = `font-bold py-3 px-6 rounded-full transition-all hover:-translate-y-1 shadow-sm flex items-center gap-2 border-2 ${index === 0 ? 'bg-peach-400 border-peach-400 text-white hover:bg-peach-500' : 'bg-white border-tan-200 text-ink-900 hover:border-peach-400'}`;
              const children = (
                <>
                  {link.label.toLowerCase().includes('email') && <Mail size={18} />}
                  {link.label.toLowerCase().includes('coffee') && <Coffee size={18} />}
                  {link.label}
                </>
              );
              return link.wallets?.length ? (
                <button
                  key={link.id}
                  className={className}
                  onClick={() => {
                    clearCopy();
                    setWalletIndex(0);
                    setActiveLinkId(link.id);
                  }}
                >
                  {children}
                </button>
              ) : (
                <a
                  key={link.id}
                  href={safeLink(link.url)}
                  target={link.url.startsWith('https:') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={className}
                >
                  {children}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {activeLink && selectedWallet && (
        <Modal
          title={activeLink.label}
          onClose={() => {
            clearCopy();
            setActiveLinkId(null);
          }}
        >
          <p className="text-sm text-tan-600 mb-5">Choose your preferred payment method:</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {activeLink.wallets?.map((wallet, index) => (
              <button
                key={`${index}-${wallet.name}`}
                aria-pressed={selectedWallet === wallet}
                onClick={() => {
                  clearCopy();
                  setWalletIndex(index);
                }}
                className={`py-2 px-3 rounded-xl font-bold text-xs border-2 ${selectedWallet === wallet ? 'bg-peach-400 border-peach-400 text-white' : 'bg-white border-tan-200 text-tan-600'}`}
              >
                {wallet.name}
              </button>
            ))}
          </div>
          <div className="bg-white p-5 rounded-2xl border-2 border-tan-200 flex flex-col items-center text-center">
            <span className="text-xs font-bold text-tan-500 uppercase mb-1">
              Sending via {selectedWallet.name}
            </span>
            <h3 className="font-bold text-lg mb-3">{selectedWallet.accountName}</h3>
            {selectedWallet.qrCode && (
              <img
                src={selectedWallet.qrCode}
                alt={`${selectedWallet.name} payment QR code`}
                className="w-48 h-48 object-contain mb-4"
              />
            )}
            {selectedWallet.accountNumber && (
              <div className="w-full flex flex-wrap items-center justify-center gap-3 bg-cream-50 p-3 rounded-xl border border-tan-200">
                <span className="font-mono font-bold text-sm break-all select-all">
                  {selectedWallet.accountNumber}
                </span>
                <button
                  onClick={() =>
                    void handleCopy(selectedWallet.accountNumber, `${activeLink.id}-${walletIndex}`)
                  }
                  className="flex items-center gap-1 text-xs font-bold text-peach-600 bg-peach-50 px-3 py-1.5 rounded-lg"
                >
                  {copiedField === `${activeLink.id}-${walletIndex}` ? (
                    <>
                      <Check size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            )}
            {copyError && (
              <p role="alert" className="text-red-700 text-sm mt-3">
                {copyError}
              </p>
            )}
          </div>
          <p className="mt-5 text-center text-sm text-tan-600 whitespace-pre-wrap">
            {activeLink.customMessage || 'Thank you for supporting the site! ☕✨'}
          </p>
        </Modal>
      )}

      <footer className="border-t-2 border-tan-200 bg-cream-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-tan-200 pb-8 mb-8">
            <div className="flex items-center gap-4">

              {logoImage ? (
                <img 
                  src={logoImage} 
                  alt="Jinssi Logo" 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover border-2 border-tan-300 shadow-sm" 
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-peach-300 flex items-center justify-center text-white font-bold text-3xl">
                  J
                </div>
              )}

            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-tan-500">
              <a
                href="mailto:mjhanesultancruz1514@gmail.com"
                className="break-all hover:text-peach-500"
              >
                mjhanesultancruz1514@gmail.com
              </a>
              <span className="hidden md:inline text-tan-300">|</span>
              <span>Threads &amp; TikTok: jinssi cruise</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-semibold text-tan-500">
            <p>© {new Date().getFullYear()} Jinssi Gaming. All rights reserved.</p>
            <p>
              Site developed by <span className="text-ink-900 font-bold">Mary Jane C. Cruz</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
