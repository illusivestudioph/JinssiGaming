import { useSiteContent } from '@/context/SiteContentContext';

export function Hero() {
  const { heroImage } = useSiteContent();

  return (
    <div className="relative w-full h-[54vh] min-h-[420px] max-h-[680px] flex items-end justify-center overflow-hidden pb-12">
      
      {/* Background Image with feathered mask */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0 pointer-events-none"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0) 100%)',
        }}
      />
      
      {/* Seamless feathered gradient blend into page background using theme variables */}
      <div className="absolute inset-0 z-10 pointer-events-none hero-fade-overlay" />

      {/* Hero Text Content */}
      <div className="hero-copy relative z-20 flex flex-col items-center justify-center px-4 text-center animate-fade-in max-w-4xl mx-auto">
        <h1 className="hero-title">
          Your cozy sanctuary for organizing games &amp; quiet stories.
        </h1>
        <p className="hero-description mt-4 max-w-2xl">
          Step-by-step visual walkthroughs for peaceful organizing games, soothing classic stories to read, and calming lo-fi soundscapes to help you unwind.
        </p>
      </div>
      
    </div>
  );
}