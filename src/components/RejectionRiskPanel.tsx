import { AlertTriangle, CheckCircle2, Shield, TrendingUp } from "lucide-react";

interface RejectionRiskPanelProps {
  rejectionReasons: string[];
  tips: string[];
  purpose: string;
}

type RiskLevel = 'Low' | 'Medium' | 'High';

const RejectionRiskPanel = ({ rejectionReasons, tips, purpose }: RejectionRiskPanelProps) => {
  const riskLevel: RiskLevel = purpose === 'travel' ? 'Low' : 'Medium';

  return (
    <div className="space-y-6">
      {/* Risk Level Header */}
      <div className="rounded-xl p-6 text-center bg-coral/10 border border-coral/30">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background mb-4">
          <Shield className="w-8 h-8 text-coral" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-1">🚨 Rejection Risk Analysis</h3>
        <p className="text-lg font-semibold text-coral">
          Risk Level: {riskLevel}
        </p>
      </div>

      {/* Main Risk Factors */}
      <div className="rounded-xl border border-border p-5">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-coral" />
          Main Risk Factors
        </h4>
        <div className="space-y-3">
          {rejectionReasons.map((reason, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-coral/5 border border-coral/20">
              <AlertTriangle className="w-4 h-4 text-coral mt-0.5 shrink-0" />
              <span className="text-foreground">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Tips */}
      <div className="rounded-xl border border-border p-5">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal" />
          AI Tips to Improve Approval Chances
        </h4>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-teal/5 border border-teal/20">
              <CheckCircle2 className="w-4 h-4 text-teal mt-0.5 shrink-0" />
              <span className="text-foreground">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-xl bg-secondary/50 p-5 border border-border">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">💡 Pro Tip:</strong> Applications with complete documentation and clear evidence 
          of ties to home country have significantly higher approval rates. Take time to gather all required documents 
          before submitting your application.
        </p>
      </div>
    </div>
  );
};

export default RejectionRiskPanel;
