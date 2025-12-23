import { Flag, Search, FileCheck, Plane } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Flag,
    title: "Enter Your Details",
    description: "Tell us your nationality, destination country, and purpose of travel. It takes just 30 seconds.",
    color: "primary",
  },
  {
    number: "02",
    icon: Search,
    title: "AI Analyzes Requirements",
    description: "Our AI instantly processes immigration rules and generates personalized requirements for your journey.",
    color: "teal",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Get Your Checklist",
    description: "Receive a complete document checklist, timeline, and tips to maximize your approval chances.",
    color: "coral",
  },
  {
    number: "04",
    icon: Plane,
    title: "Travel with Confidence",
    description: "Submit your application knowing you have everything prepared correctly. Bon voyage!",
    color: "primary",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 text-teal text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Journey to{" "}
            <span className="text-gradient-accent">Visa Approval</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Four simple steps from confusion to clarity. Let our AI do the heavy lifting.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-0.5 bg-border" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colorClasses = {
                primary: "bg-primary text-primary-foreground",
                teal: "bg-teal text-accent-foreground",
                coral: "bg-coral text-coral-foreground",
              };
              
              return (
                <div 
                  key={index}
                  className="relative text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Step number */}
                  <div className="relative inline-flex mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${colorClasses[step.color as keyof typeof colorClasses]} flex items-center justify-center shadow-lg relative z-10`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-border flex items-center justify-center text-xs font-bold text-foreground">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
