import { useState } from 'react';

const consentStorageKey = 'jinssi-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(() => localStorage.getItem(consentStorageKey) === null);

  const saveConsent = (value: 'accepted' | 'declined') => {
    localStorage.setItem(consentStorageKey, value);
    window.dispatchEvent(new Event('jinssi-consent-updated'));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-3xl rounded-2xl border-2 border-tan-200 bg-cream-50 p-5 shadow-cozy-lg" aria-label="Cookie consent">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm font-semibold leading-relaxed text-ink-700">
          We use essential storage to keep Jinssi Gaming working. With your permission, cookies may also support analytics and relevant advertising. Read our <a className="font-extrabold text-peach-600 hover:text-peach-500" href="/privacy-policy">Privacy Policy</a>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" className="site-button border-tan-200 bg-cream-50 text-ink-900 hover:border-peach-300" onClick={() => saveConsent('declined')}>Decline</button>
          <button type="button" className="site-button bg-peach-400 text-white hover:bg-peach-500" onClick={() => saveConsent('accepted')}>Accept</button>
        </div>
      </div>
    </aside>
  );
}
