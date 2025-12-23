import { CheckCircle2 } from "lucide-react";

const features = [
  "Personalized Requirements",
  "Plain-Language Explanations",
  "Rejection Risk Insights",
  "AI Document Check",
];

const HeroSection = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-8 md:pb-12 overflow-hidden bg-gradient-hero">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo/Brand */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in-up">
            Visa<span className="text-gradient">Verse</span> AI
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in-up animation-delay-200">
            Simplify Visas. Move Without Borders.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 animate-fade-in-up animation-delay-400">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-teal" />
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
