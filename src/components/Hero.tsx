import { useSiteContent } from '@/context/SiteContentContext';

export function Hero() {
  const { heroImage } = useSiteContent();

  return (
    <div className="relative w-full h-[64vh] min-h-[540px] max-h-[750px] flex items-end justify-center overflow-hidden pb-8 sm:pb-12">
      
      {/* Background Image with feathered mask - aligned to top so Tuturo character artwork is completely visible above text */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-[center_top] bg-no-repeat z-0 pointer-events-none"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 78%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 78%, rgba(0,0,0,0) 100%)',
        }}
      />
      
      {/* Seamless feathered gradient blend into page background using theme variables */}
      <div className="absolute inset-0 z-10 pointer-events-none hero-fade-overlay" />

      {/* Hero Text Content - sits in the lower feathered gradient below the character artwork */}
      <div className="hero-copy relative z-20 flex flex-col items-center justify-center px-4 text-center animate-fade-in max-w-3xl mx-auto">
        <h1 className="hero-title">
          A cozy guide to organizing games &amp; quiet stories.
        </h1>
        <p className="hero-description mt-3 max-w-xl">
          Step-by-step visual walkthroughs for peaceful organizing games, quiet stories to read, and calming lo-fi soundscapes.
        </p>
      </div>
      
    </div>
  );
}