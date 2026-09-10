import { useSiteContent } from '@/context/SiteContentContext';
import { MagneticText } from './MagneticText';

export function Hero() {
  const { heroImage } = useSiteContent();

  return (
    <section className="w-full flex flex-col items-center">
      {/* 1. Cover Banner: Pristine artwork with zero text overlay covering Tuturo */}
      <div className="relative w-full h-[240px] sm:h-[340px] md:h-[420px] lg:h-[480px] overflow-hidden bg-cream-100">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ 
            backgroundImage: `url(${heroImage})`,
          }}
        />
        {/* Soft subtle feathered fade at the bottom to melt into the page background */}
        <div 
          className="absolute inset-x-0 bottom-0 h-20 sm:h-28 pointer-events-none" 
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, var(--hero-fade-solid) 100%)',
          }}
        />
      </div>

      {/* 2. Welcoming Intro Content: Cleanly positioned below the banner without artificial wrapper constraints */}
      <div className="hero-copy relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 pt-6 sm:pt-8 pb-1 text-center animate-fade-in w-full">
        <MagneticText
          as="h1"
          text={"Your cozy sanctuary for\norganizing games & quiet stories."}
          className="hero-title"
        />
        <p className="hero-description mt-4 max-w-2xl mx-auto">
          Step-by-step visual walkthroughs for peaceful organizing games, soothing classic stories to read, and calming lo-fi soundscapes to help you unwind.
        </p>
      </div>
    </section>
  );
}