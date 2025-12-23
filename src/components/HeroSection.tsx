import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import Globe from "./Globe";

const HeroSection = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-hero">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Immigration Assistant</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up animation-delay-200">
              Navigate Visa Requirements{" "}
              <span className="text-gradient">with Confidence</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up animation-delay-400">
              Get personalized visa guidance in plain language. Our AI translates complex immigration rules into clear, actionable steps tailored to your journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-600">
              <Button variant="hero" size="xl">
                Check Your Visa Requirements
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="hero-outline" size="lg">
                Learn How It Works
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start animate-fade-in-up animation-delay-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['🇺🇸', '🇬🇧', '🇨🇦', '🇦🇺'].map((flag, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-lg border-2 border-background">
                      {flag}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">190+ Countries</span>
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">10,000+</span> users helped
              </div>
            </div>
          </div>

          {/* Right content - Globe */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <Globe />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
