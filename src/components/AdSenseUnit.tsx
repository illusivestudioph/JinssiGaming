import { useEffect, useState } from 'react';

interface AdSenseUnitProps {
  slot: string;
  format?: string;
  responsive?: boolean;
}

export function AdSenseUnit({ slot, format = 'auto', responsive = true }: AdSenseUnitProps) {
  const client = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;
  const [consent, setConsent] = useState(() => localStorage.getItem('jinssi-cookie-consent'));

  useEffect(() => {
    const updateConsent = () => setConsent(localStorage.getItem('jinssi-cookie-consent'));
    window.addEventListener('jinssi-consent-updated', updateConsent);
    return () => window.removeEventListener('jinssi-consent-updated', updateConsent);
  }, []);

  useEffect(() => {
    if (!client || !slot || consent !== 'accepted') return;
    const scriptId = 'google-adsense-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [client, consent, slot]);

  useEffect(() => {
    if (!client || !slot || consent !== 'accepted') return;
    try {
      ((window as Window & { adsbygoogle?: unknown[] }).adsbygoogle ||= []).push({});
    } catch {
      // AdSense can be unavailable during local development or blocked by a browser extension.
    }
  }, [client, consent, slot]);

  if (!client || !slot || consent !== 'accepted') return null;

  return (
    <div className="mx-auto my-8 min-h-[100px] max-w-3xl overflow-hidden text-center" aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
