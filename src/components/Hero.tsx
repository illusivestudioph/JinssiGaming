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
      <div className="hero-copy relative z-20 flex flex-col items-center px-4 text-center animate-fade-in">
        <p className="hero-kicker">Jinssi Gaming · a cozy field guide</p>
        <h1 className="hero-title">
          Make room for
          <span>a little calm.</span>
        </h1>
        <p className="hero-description">
          Visual walkthroughs for the small, satisfying worlds worth taking your time with.
        </p>
      </div>
      
    </div>
  );
}