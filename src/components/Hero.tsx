import { useSiteContent } from '@/context/SiteContentContext';

export function Hero() {
  const { heroImage } = useSiteContent();

  return (
    // Changed 'items-center' to 'items-end' to push the text to the bottom, and added 'pb-12' for spacing
    <div className="relative w-full h-[46vh] min-h-[360px] max-h-[560px] flex items-end justify-center overflow-hidden pb-10">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Fade: Slightly stronger 'via' opacity to help text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-cream-100 from-0% via-cream-100/60 via-30% to-transparent z-10" />

      {/* Hero Text Content */}
      <div className="relative z-20 text-center px-4 animate-fade-in">
        {/* Added a strong white drop-shadow to make the dark text pop against the artwork */}
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