import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertTriangle, 
  DollarSign,
  Calendar,
  ArrowRight,
  Lightbulb,
  XCircle
} from "lucide-react";
import { Button } from "./ui/button";

interface VisaResultsProps {
  nationality: string;
  destination: string;
  purpose: string;
  onReset: () => void;
}

const countryNames: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom", 
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  JP: "Japan",
  SG: "Singapore",
  AE: "UAE",
  NZ: "New Zealand",
  IN: "India",
  CN: "China",
  BR: "Brazil",
  MX: "Mexico",
  ZA: "South Africa",
};

const countryFlags: Record<string, string> = {
  US: "🇺🇸", GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", DE: "🇩🇪",
  FR: "🇫🇷", JP: "🇯🇵", SG: "🇸🇬", AE: "🇦🇪", NZ: "🇳🇿",
  IN: "🇮🇳", CN: "🇨🇳", BR: "🇧🇷", MX: "🇲🇽", ZA: "🇿🇦",
};

const purposeLabels: Record<string, string> = {
  tourism: "Tourism",
  business: "Business",
  work: "Work",
  study: "Study",
  "digital-nomad": "Digital Nomad",
  family: "Family Visit",
  medical: "Medical",
  transit: "Transit",
};

const VisaResults = ({ nationality, destination, purpose, onReset }: VisaResultsProps) => {
  // Mock data - in a real app, this would come from an API
  const visaInfo = {
    required: true,
    type: "Tourist Visa (B-2)",
    processingTime: "3-5 weeks",
    validity: "Up to 6 months",
    fee: "$160 USD",
    documents: [
      { name: "Valid Passport", description: "Must be valid for at least 6 months beyond your stay", required: true },
      { name: "DS-160 Form", description: "Online Nonimmigrant Visa Application form", required: true },
      { name: "Passport Photo", description: "2x2 inch photo meeting specific requirements", required: true },
      { name: "Proof of Funds", description: "Bank statements showing sufficient funds for your trip", required: true },
      { name: "Travel Itinerary", description: "Flight reservations and accommodation details", required: true },
      { name: "Employment Letter", description: "Letter from employer confirming your job and leave", required: false },
      { name: "Previous Visa Copies", description: "If you've had visas to this or other countries", required: false },
    ],
    tips: [
      "Apply at least 3 months before your intended travel date",
      "Be prepared to demonstrate strong ties to your home country",
      "Bring original documents to your visa interview, not just copies",
      "Practice answering common interview questions confidently",
    ],
    rejectionReasons: [
      "Insufficient proof of ties to home country",
      "Incomplete documentation",
      "Inconsistent information in application",
      "Unable to demonstrate purpose of travel",
    ],
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-4xl">{countryFlags[nationality]}</span>
              <ArrowRight className="w-6 h-6 text-muted-foreground" />
              <span className="text-4xl">{countryFlags[destination]}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Visa Requirements for {countryNames[destination]}
            </h2>
            <p className="text-lg text-muted-foreground">
              {countryNames[nationality]} passport holder • {purposeLabels[purpose]} travel
            </p>
          </div>

          {/* Status card */}
          <div className={`rounded-2xl p-6 mb-8 ${visaInfo.required ? 'bg-coral/10 border border-coral/30' : 'bg-teal/10 border border-teal/30'}`}>
            <div className="flex items-center gap-4">
              {visaInfo.required ? (
                <div className="p-3 rounded-full bg-coral/20">
                  <FileText className="w-6 h-6 text-coral" />
                </div>
              ) : (
                <div className="p-3 rounded-full bg-teal/20">
                  <CheckCircle2 className="w-6 h-6 text-teal" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {visaInfo.required ? "Visa Required" : "Visa Not Required"}
                </h3>
                <p className="text-muted-foreground">
                  {visaInfo.required 
                    ? `You need a ${visaInfo.type} to enter ${countryNames[destination]}`
                    : `You can visit ${countryNames[destination]} visa-free for up to 90 days`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Quick info cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Processing Time</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{visaInfo.processingTime}</p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-teal" />
                <span className="text-sm text-muted-foreground">Validity</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{visaInfo.validity}</p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-coral" />
                <span className="text-sm text-muted-foreground">Application Fee</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{visaInfo.fee}</p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Documents</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{visaInfo.documents.length} Required</p>
            </div>
          </div>

          {/* Documents checklist */}
          <div className="bg-card rounded-2xl border border-border shadow-lg p-6 md:p-8 mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Required Documents
            </h3>
            <div className="space-y-4">
              {visaInfo.documents.map((doc, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-xl ${doc.required ? 'bg-secondary/50' : 'bg-secondary/30'}`}
                >
                  <div className={`mt-0.5 p-1 rounded-full ${doc.required ? 'bg-primary/10' : 'bg-muted'}`}>
                    <CheckCircle2 className={`w-4 h-4 ${doc.required ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{doc.name}</h4>
                      {doc.required && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-coral/10 text-coral font-medium">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips and Warnings */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Pro Tips */}
            <div className="bg-card rounded-2xl border border-border shadow-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-teal" />
                Pro Tips
              </h3>
              <ul className="space-y-3">
                {visaInfo.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Rejection Reasons */}
            <div className="bg-card rounded-2xl border border-border shadow-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-coral" />
                Common Rejection Reasons
              </h3>
              <ul className="space-y-3">
                {visaInfo.rejectionReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <XCircle className="w-4 h-4 text-coral mt-0.5 shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button variant="hero-outline" size="lg" onClick={onReset}>
              Check Another Destination
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaResults;
