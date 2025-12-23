import { useState } from "react";
import { ArrowRight, Loader2, Globe, MapPin, Briefcase } from "lucide-react";
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
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
];

const purposes = [
  { value: "work", label: "Work", icon: "💼" },
  { value: "study", label: "Study", icon: "🎓" },
  { value: "travel", label: "Travel", icon: "✈️" },
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSubmit({ nationality, destination, purpose });
    setIsLoading(false);
  };

  return (
    <section id="visa-checker" className="py-8 md:py-12 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Form card */}
          <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nationality */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Globe className="w-4 h-4 text-primary" />
                  Nationality
                </label>
                <Select value={nationality} onValueChange={setNationality}>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue placeholder="Select your nationality" />
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
                    <SelectValue placeholder="Select destination country" />
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
                <div className="grid grid-cols-3 gap-3">
                  {purposes.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPurpose(p.value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                        purpose === p.value
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border bg-background hover:border-primary/30 hover:bg-secondary/50"
                      }`}
                    >
                      <span className="text-2xl">{p.icon}</span>
                      <span className="text-sm font-medium text-foreground">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="xl" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Get Visa Guidance
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
