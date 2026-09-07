import { useSiteContent } from '@/context/SiteContentContext';

export function Hero() {
  const { heroImage } = useSiteContent();

  return (
    <div className="relative w-full h-[54vh] min-h-[420px] max-h-[680px] flex items-end justify-center overflow-hidden pb-12">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Fade the artwork into the page background near the bottom. */}
      <div className="absolute inset-0 bg-gradient-to-t from-cream-100/95 from-0% via-cream-100/55 via-45% to-transparent z-10" />

      {/* Hero Text Content */}
      <div className="relative z-20 text-center px-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-ink-900 drop-shadow-[0_0_15px_rgba(255,255,255,1)] mb-2">
          Welcome to Jinssi
        </h1>
        <p className="text-xl text-ink-900 font-bold drop-shadow-[0_0_10px_rgba(255,255,255,1)] max-w-2xl mx-auto">
          Your cozy, step-by-step gaming companion.
        </p>
      </div>
      
    </div>
  );
}