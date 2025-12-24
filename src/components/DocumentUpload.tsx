import { useState } from "react";
import { Upload, CheckCircle2, XCircle, AlertTriangle, FileText, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface Document {
  name: string;
  description: string;
  required: boolean;
}

interface DocumentUploadProps {
  documents: Document[];
}

type UploadStatus = 'pending' | 'uploading' | 'uploaded' | 'error' | 'warning';

interface UploadedDoc {
  name: string;
  status: UploadStatus;
  message?: string;
  aiNote?: string;
}

// AI validation messages for different document types
const getAIValidation = (docName: string, status: UploadStatus): { status: UploadStatus; message: string; aiNote: string } => {
  const validations: Record<string, { status: UploadStatus; message: string; aiNote: string }[]> = {
    'Valid Passport': [
      { status: 'uploaded', message: 'Valid', aiNote: 'Passport validity confirmed - expires well beyond travel dates' },
      { status: 'warning', message: 'Expiry Soon', aiNote: 'Passport expires within 8 months - some countries may require 6+ month validity' },
    ],
    'Financial Proof': [
      { status: 'uploaded', message: 'Sufficient', aiNote: 'Bank statements show consistent balance meeting minimum requirements' },
      { status: 'warning', message: 'Review Needed', aiNote: 'Recent large deposit detected - embassy may request source explanation' },
    ],
    'Health Insurance': [
      { status: 'uploaded', message: 'Valid', aiNote: 'Coverage period matches visa application dates' },
      { status: 'warning', message: 'Coverage Gap', aiNote: 'Insurance may not cover full stay duration - verify end date' },
    ],
    'Job Offer Letter': [
      { status: 'uploaded', message: 'Valid', aiNote: 'Employment offer includes required salary and position details' },
      { status: 'warning', message: 'Incomplete', aiNote: 'Letter missing job start date - request updated version from employer' },
    ],
    'Admission Letter': [
      { status: 'uploaded', message: 'Valid', aiNote: 'Acceptance letter from accredited institution confirmed' },
    ],
  };

  const docValidations = validations[docName] || [
    { status: 'uploaded', message: 'Uploaded', aiNote: 'Document received - manual review may be required' },
  ];

  // Weighted random selection (mostly success)
  const weights = docValidations.map((_, i) => i === 0 ? 0.8 : 0.2 / (docValidations.length - 1));
  const random = Math.random();
  let cumulative = 0;
  for (let i = 0; i < docValidations.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) return docValidations[i];
  }
  return docValidations[0];
};

const DocumentUpload = ({ documents }: DocumentUploadProps) => {
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileUpload = async (docName: string, file: File) => {
    // Add to uploading state
    setUploadedDocs(prev => {
      const existing = prev.find(d => d.name === docName);
      if (existing) {
        return prev.map(d => d.name === docName ? { ...d, status: 'uploading' as UploadStatus } : d);
      }
      return [...prev, { name: docName, status: 'uploading' as UploadStatus }];
    });

    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get AI validation result
    const validation = getAIValidation(docName, 'uploaded');
    
    setUploadedDocs(prev => 
      prev.map(d => d.name === docName ? { 
        ...d, 
        status: validation.status,
        message: validation.message,
        aiNote: validation.aiNote,
      } : d)
    );
  };

  const runAICheck = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  const getStatusIcon = (status: UploadStatus) => {
    switch (status) {
      case 'uploaded': return <CheckCircle2 className="w-5 h-5 text-teal" />;
      case 'error': return <XCircle className="w-5 h-5 text-destructive" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-coral" />;
      case 'uploading': return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
      default: return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (doc: UploadedDoc | undefined) => {
    if (!doc) return 'Not uploaded';
    switch (doc.status) {
      case 'uploaded': return `✔ ${doc.message || 'Uploaded'}`;
      case 'error': return '❌ Error';
      case 'warning': return `⚠ ${doc.message || 'Needs Review'}`;
      case 'uploading': return 'Uploading...';
      default: return 'Pending';
    }
  };

  const uploadedCount = uploadedDocs.filter(d => d.status === 'uploaded' || d.status === 'warning').length;
  const totalRequired = documents.length;
  const completionPercentage = Math.round((uploadedCount / totalRequired) * 100);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Your Documents</h3>
        <p className="text-sm text-muted-foreground">
          Upload your documents for AI-powered validation and completeness check
        </p>
      </div>

      {/* Progress indicator */}
      <div className="bg-secondary/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Document Checklist</span>
          <span className="text-sm text-muted-foreground">{uploadedCount}/{totalRequired} uploaded</span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-accent transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Document list */}
      <div className="space-y-3">
        {documents.map((doc, index) => {
          const uploadedDoc = uploadedDocs.find(d => d.name === doc.name);
          const status = uploadedDoc?.status || 'pending';
          
          return (
            <div
              key={index}
              className={`rounded-xl border transition-all ${
                status === 'uploaded' ? 'border-teal/30 bg-teal/5' :
                status === 'warning' ? 'border-coral/30 bg-coral/5' :
                status === 'error' ? 'border-destructive/30 bg-destructive/5' :
                'border-border bg-secondary/30'
              }`}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(status)}
                  <div>
                    <span className="font-medium text-foreground">{doc.name}</span>
                    <p className="text-xs text-muted-foreground">{doc.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`text-sm ${
                    status === 'uploaded' ? 'text-teal' :
                    status === 'warning' ? 'text-coral' :
                    status === 'error' ? 'text-destructive' :
                    'text-muted-foreground'
                  }`}>
                    {getStatusLabel(uploadedDoc)}
                  </span>
                  
                  {status !== 'uploaded' && status !== 'uploading' && (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(doc.name, file);
                        }}
                      />
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload
                      </div>
                    </label>
                  )}
                </div>
              </div>
              
              {/* AI Note for uploaded docs */}
              {uploadedDoc?.aiNote && (status === 'uploaded' || status === 'warning') && (
                <div className={`px-4 pb-4 pt-0`}>
                  <div className={`text-xs p-2 rounded-lg flex items-start gap-2 ${
                    status === 'uploaded' ? 'bg-teal/10 text-teal' : 'bg-coral/10 text-coral'
                  }`}>
                    <Sparkles className="w-3 h-3 mt-0.5 shrink-0" />
                    <span>{uploadedDoc.aiNote}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Check Button */}
      {uploadedDocs.length > 0 && !analysisComplete && (
        <Button
          onClick={runAICheck}
          variant="hero"
          size="lg"
          className="w-full"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Running AI Document Check...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Run AI Document Check
            </>
          )}
        </Button>
      )}

      {/* AI Check Results */}
      {analysisComplete && (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="bg-primary/10 p-4 border-b border-border">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI Document Check Results
            </h4>
          </div>
          <div className="p-4 space-y-3">
            {uploadedDocs.map((doc, i) => (
              <div key={i} className="flex items-start gap-2">
                {doc.status === 'uploaded' ? (
                  <CheckCircle2 className="w-4 h-4 text-teal mt-0.5" />
                ) : doc.status === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-coral mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                )}
                <div>
                  <span className="text-sm font-medium text-foreground">
                    {doc.name} - {doc.status === 'uploaded' ? 'Valid' : doc.status === 'warning' ? 'Needs attention' : 'Issue detected'}
                  </span>
                  {doc.aiNote && (
                    <p className="text-xs text-muted-foreground mt-0.5">{doc.aiNote}</p>
                  )}
                </div>
              </div>
            ))}
            
            {documents.filter(d => !uploadedDocs.find(u => u.name === d.name)).map((doc, i) => (
              <div key={`missing-${i}`} className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                <span className="text-sm text-muted-foreground">{doc.name} - Missing (required)</span>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <div className="p-4 bg-secondary/30 border-t border-border">
            <h5 className="font-medium text-foreground mb-2">Summary</h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 rounded-lg bg-teal/10">
                <p className="text-lg font-bold text-teal">{uploadedDocs.filter(d => d.status === 'uploaded').length}</p>
                <p className="text-xs text-muted-foreground">Valid</p>
              </div>
              <div className="p-2 rounded-lg bg-coral/10">
                <p className="text-lg font-bold text-coral">{uploadedDocs.filter(d => d.status === 'warning').length}</p>
                <p className="text-xs text-muted-foreground">Review</p>
              </div>
              <div className="p-2 rounded-lg bg-destructive/10">
                <p className="text-lg font-bold text-destructive">{documents.length - uploadedDocs.length}</p>
                <p className="text-xs text-muted-foreground">Missing</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
