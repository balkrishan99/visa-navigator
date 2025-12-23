import { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertTriangle, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Bot,
  Upload,
  MessageCircle,
  Shield,
  XCircle
} from "lucide-react";
import { Button } from "./ui/button";
import DocumentUpload from "./DocumentUpload";
import ChatInterface from "./ChatInterface";
import RejectionRiskPanel from "./RejectionRiskPanel";

interface VisaResultsProps {
  nationality: string;
  destination: string;
  purpose: string;
  onReset: () => void;
}

const countryNames: Record<string, string> = {
  US: "United States", GB: "United Kingdom", CA: "Canada", AU: "Australia",
  DE: "Germany", FR: "France", JP: "Japan", SG: "Singapore", AE: "UAE",
  NZ: "New Zealand", IN: "India", CN: "China", BR: "Brazil", MX: "Mexico",
  ZA: "South Africa", NG: "Nigeria", PH: "Philippines", PK: "Pakistan",
};

const countryFlags: Record<string, string> = {
  US: "🇺🇸", GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", DE: "🇩🇪", FR: "🇫🇷",
  JP: "🇯🇵", SG: "🇸🇬", AE: "🇦🇪", NZ: "🇳🇿", IN: "🇮🇳", CN: "🇨🇳",
  BR: "🇧🇷", MX: "🇲🇽", ZA: "🇿🇦", NG: "🇳🇬", PH: "🇵🇭", PK: "🇵🇰",
};

const purposeLabels: Record<string, string> = {
  work: "Work Visa",
  study: "Student Visa", 
  travel: "Tourist Visa",
};

const VisaResults = ({ nationality, destination, purpose, onReset }: VisaResultsProps) => {
  const [showAIExplanation, setShowAIExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'results' | 'upload' | 'risk' | 'chat'>('results');

  const visaInfo = {
    type: purpose === 'work' ? "Employment Visa" : purpose === 'study' ? "Student Visa" : "Tourist Visa",
    processingTime: purpose === 'work' ? "6-12 weeks" : purpose === 'study' ? "4-8 weeks" : "2-4 weeks",
    documents: [
      { name: "Passport (valid 6+ months)", required: true },
      { name: purpose === 'work' ? "Job Offer Letter" : purpose === 'study' ? "Admission Letter" : "Travel Itinerary", required: true },
      { name: "Proof of Qualifications", required: purpose === 'work' || purpose === 'study' },
      { name: "Financial Proof", required: true },
      { name: "Health Insurance", required: true },
    ].filter(d => d.required),
    rejectionReasons: [
      "Incomplete financial proof",
      "Unverified employer/institution",
      "Insufficient qualifications",
    ],
    aiExplanation: purpose === 'work' 
      ? `You need a job offer from a ${countryNames[destination]} employer. The salary must meet the minimum threshold set by immigration authorities. Bank statements should show stable income over the last 3 months. Your employer may need to prove they couldn't find a local candidate for this role.`
      : purpose === 'study'
      ? `You need an acceptance letter from a recognized ${countryNames[destination]} educational institution. You must demonstrate sufficient funds to cover tuition and living expenses for the duration of your studies. Health insurance coverage is mandatory.`
      : `You'll need to show proof of accommodation, return flights, and sufficient funds for your stay. Travel insurance is highly recommended. Make sure your passport is valid for at least 6 months beyond your planned departure date.`,
  };

  return (
    <section className="py-8 md:py-12 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden mb-6">
            <div className="bg-gradient-dark p-6 text-center">
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="text-3xl">{countryFlags[nationality]}</span>
                <ArrowRight className="w-5 h-5 text-primary-foreground/70" />
                <span className="text-3xl">{countryFlags[destination]}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-primary-foreground">
                Visa Results: {countryNames[nationality]} → {countryNames[destination]}
              </h2>
              <p className="text-primary-foreground/70 mt-1">({purposeLabels[purpose]})</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-border">
              {[
                { id: 'results', label: 'Results', icon: FileText },
                { id: 'upload', label: 'Upload Docs', icon: Upload },
                { id: 'risk', label: 'Risk Analysis', icon: Shield },
                { id: 'chat', label: 'Ask AI', icon: MessageCircle },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'results' && (
                <div className="space-y-6">
                  {/* Eligible Visa Type */}
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Eligible Visa Type
                    </h3>
                    <div className="pl-4 border-l-2 border-primary/20">
                      <p className="font-medium text-foreground">{countryNames[destination]} {visaInfo.type}</p>
                    </div>
                  </div>

                  {/* Required Documents */}
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Required Documents
                    </h3>
                    <div className="pl-4 space-y-2">
                      {visaInfo.documents.map((doc, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                          <span className="text-foreground">{doc.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Estimated Timeline */}
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Estimated Timeline
                    </h3>
                    <div className="pl-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{visaInfo.processingTime} (varies by embassy)</span>
                    </div>
                  </div>

                  {/* Common Rejection Reasons */}
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Common Rejection Reasons
                    </h3>
                    <div className="pl-4 space-y-2">
                      {visaInfo.rejectionReasons.map((reason, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-coral shrink-0" />
                          <span className="text-muted-foreground">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Explanation Panel */}
                  <div className="mt-6 rounded-xl border border-border overflow-hidden">
                    <button
                      onClick={() => setShowAIExplanation(!showAIExplanation)}
                      className="w-full flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary/70 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">AI Explanation</span>
                      </div>
                      {showAIExplanation ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    {showAIExplanation && (
                      <div className="p-4 bg-background border-t border-border">
                        <p className="text-muted-foreground leading-relaxed italic">
                          "{visaInfo.aiExplanation}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    onClick={() => setActiveTab('upload')}
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Documents for AI Check
                  </Button>
                </div>
              )}

              {activeTab === 'upload' && (
                <DocumentUpload documents={visaInfo.documents} />
              )}

              {activeTab === 'risk' && (
                <RejectionRiskPanel 
                  rejectionReasons={visaInfo.rejectionReasons}
                  purpose={purpose}
                />
              )}

              {activeTab === 'chat' && (
                <ChatInterface 
                  nationality={nationality}
                  destination={destination}
                  purpose={purpose}
                />
              )}
            </div>
          </div>

          {/* Back button */}
          <div className="text-center">
            <Button variant="hero-outline" onClick={onReset}>
              ← Check Another Destination
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaResults;
