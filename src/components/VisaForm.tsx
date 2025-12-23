import { useState } from "react";
import { ArrowRight, MapPin, Flag, Briefcase, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "@/hooks/use-toast";

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
];

const purposes = [
  { value: "tourism", label: "Tourism / Vacation", icon: "🏖️" },
  { value: "business", label: "Business", icon: "💼" },
  { value: "work", label: "Work / Employment", icon: "👔" },
  { value: "study", label: "Study / Education", icon: "🎓" },
  { value: "digital-nomad", label: "Digital Nomad", icon: "💻" },
  { value: "family", label: "Family Visit", icon: "👨‍👩‍👧‍👦" },
  { value: "medical", label: "Medical Treatment", icon: "🏥" },
  { value: "transit", label: "Transit", icon: "✈️" },
];

interface VisaFormProps {
  onSubmit: (data: { nationality: string; destination: string; purpose: string }) => void;
}

const VisaForm = ({ onSubmit }: VisaFormProps) => {
  const [nationality, setNationality] = useState("");
  const [destination, setDestination] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nationality || !destination || !purpose) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to get your visa requirements.",
        variant: "destructive",
      });
      return;
    }

    if (nationality === destination) {
      toast({
        title: "Same Country",
        description: "You don't need a visa to visit your own country!",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit({ nationality, destination, purpose });
    setIsLoading(false);
  };

  return (
    <section id="visa-checker" className="py-16 md:py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Check Your Visa Requirements
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tell us about your travel plans and we'll provide personalized visa guidance in seconds.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Nationality */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Flag className="w-4 h-4 text-primary" />
                    Your Nationality
                  </label>
                  <Select value={nationality} onValueChange={setNationality}>
                    <SelectTrigger className="h-12 bg-background">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Destination */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <MapPin className="w-4 h-4 text-teal" />
                    Destination Country
                  </label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger className="h-12 bg-background">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Purpose */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Briefcase className="w-4 h-4 text-coral" />
                    Purpose of Travel
                  </label>
                  <Select value={purpose} onValueChange={setPurpose}>
                    <SelectTrigger className="h-12 bg-background">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposes.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          <span className="flex items-center gap-2">
                            <span>{p.icon}</span>
                            <span>{p.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="xl" 
                  className="w-full md:w-auto"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Requirements...
                    </>
                  ) : (
                    <>
                      Get Visa Requirements
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaForm;
