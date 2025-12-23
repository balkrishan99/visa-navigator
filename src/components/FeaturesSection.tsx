import { 
  Brain, 
  FileSearch, 
  Clock, 
  ShieldCheck, 
  Languages, 
  Sparkles 
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Our advanced AI understands complex immigration rules and translates them into simple, personalized guidance.",
    color: "primary",
  },
  {
    icon: FileSearch,
    title: "Document Checker",
    description: "Upload your documents and get instant feedback on completeness and potential issues before submission.",
    color: "teal",
  },
  {
    icon: Clock,
    title: "Timeline Estimates",
    description: "Know exactly how long the process takes and when to apply for stress-free travel planning.",
    color: "coral",
  },
  {
    icon: ShieldCheck,
    title: "Rejection Prevention",
    description: "Learn about common mistakes that lead to visa rejections and how to avoid them.",
    color: "primary",
  },
  {
    icon: Languages,
    title: "Plain Language",
    description: "No more legal jargon. Get explanations in simple, easy-to-understand language.",
    color: "teal",
  },
  {
    icon: Sparkles,
    title: "Always Updated",
    description: "Immigration rules change frequently. Our AI stays current so you don't have to.",
    color: "coral",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for{" "}
            <span className="text-gradient">Visa Success</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From initial requirements to final submission, VisaVerse AI guides you through every step of the immigration process.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              primary: "bg-primary/10 text-primary",
              teal: "bg-teal/10 text-teal",
              coral: "bg-coral/10 text-coral",
            };
            
            return (
              <div 
                key={index}
                className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-3 rounded-xl ${colorClasses[feature.color as keyof typeof colorClasses]} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
