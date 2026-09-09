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
      
      {/* Seamless feathered gradient blend into page background */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none" 
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(253, 248, 241, 0.45) 70%, rgba(253, 248, 241, 0.9) 92%, #fdf8f1 100%)',
        }}
      />

      {/* Hero Text Content */}
      <div className="hero-copy relative z-20 flex flex-col items-center justify-center px-4 text-center animate-fade-in">
        <h1 className="hero-title">
          Your field guide to cozy games.
        </h1>
        <p className="hero-description mt-4">
          Clear, step-by-step visual walkthroughs to help you get unstuck and back to relaxing.
        </p>
      </div>
      
    </div>
  );
}