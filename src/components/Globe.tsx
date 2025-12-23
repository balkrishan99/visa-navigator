import { Globe as GlobeIcon, Plane } from "lucide-react";

const Globe = () => {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-3xl animate-pulse-glow" />
      
      {/* Globe container */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/10 via-sky/10 to-teal/10 border border-primary/20 shadow-glow overflow-hidden">
        {/* Globe grid lines - horizontal */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 border-t border-primary/10"
              style={{ top: `${(i + 1) * 16.66}%` }}
            />
          ))}
        </div>
        
        {/* Globe grid lines - vertical */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-primary/10"
              style={{ 
                left: `${50 + 45 * Math.sin((i / 8) * Math.PI * 2)}%`,
                transform: 'translateX(-50%)'
              }}
            />
          ))}
        </div>

        {/* Continents representation - abstract shapes */}
        <div className="absolute top-[20%] left-[15%] w-16 h-12 bg-teal/30 rounded-full blur-sm" />
        <div className="absolute top-[35%] left-[25%] w-20 h-16 bg-teal/25 rounded-full blur-sm" />
        <div className="absolute top-[25%] right-[20%] w-14 h-20 bg-teal/30 rounded-full blur-sm" />
        <div className="absolute bottom-[30%] left-[30%] w-12 h-10 bg-teal/25 rounded-full blur-sm" />
        <div className="absolute bottom-[25%] right-[25%] w-16 h-8 bg-teal/20 rounded-full blur-sm" />

        {/* Central icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 rounded-full bg-background/80 backdrop-blur-sm shadow-lg">
            <GlobeIcon className="w-10 h-10 md:w-14 md:h-14 text-primary" />
          </div>
        </div>

        {/* Orbiting planes */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute top-2 left-1/2 -translate-x-1/2">
            <div className="p-2 rounded-full bg-coral/90 shadow-coral">
              <Plane className="w-4 h-4 text-coral-foreground rotate-45" />
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="p-2 rounded-full bg-teal shadow-md">
              <Plane className="w-4 h-4 text-accent-foreground -rotate-45" />
            </div>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="absolute top-[40%] left-[20%] w-2 h-2 rounded-full bg-coral animate-pulse" />
        <div className="absolute top-[60%] right-[25%] w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-[35%] left-[35%] w-2 h-2 rounded-full bg-teal animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating elements around globe */}
      <div className="absolute -top-4 -right-4 p-3 rounded-xl bg-card shadow-lg border border-border animate-float">
        <span className="text-2xl">🌍</span>
      </div>
      <div className="absolute -bottom-2 -left-4 p-3 rounded-xl bg-card shadow-lg border border-border animate-float" style={{ animationDelay: '1s' }}>
        <span className="text-2xl">✈️</span>
      </div>
      <div className="absolute top-1/2 -right-6 p-3 rounded-xl bg-card shadow-lg border border-border animate-float" style={{ animationDelay: '2s' }}>
        <span className="text-2xl">📋</span>
      </div>
    </div>
  );
};

export default Globe;
