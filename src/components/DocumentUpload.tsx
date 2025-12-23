import { useState } from "react";
import { Upload, CheckCircle2, XCircle, AlertTriangle, FileText, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface Document {
  name: string;
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
}

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

    // Random result for demo
    const statuses: UploadStatus[] = ['uploaded', 'uploaded', 'uploaded', 'warning'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    setUploadedDocs(prev => 
      prev.map(d => d.name === docName ? { 
        ...d, 
        status: randomStatus,
        message: randomStatus === 'warning' ? 'Needs review' : undefined
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

  const getStatusLabel = (docName: string) => {
    const doc = uploadedDocs.find(d => d.name === docName);
    if (!doc) return 'Not uploaded';
    switch (doc.status) {
      case 'uploaded': return '✔ Uploaded';
      case 'error': return '❌ Error';
      case 'warning': return '⚠ Needs Review';
      case 'uploading': return 'Uploading...';
      default: return 'Pending';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Your Documents</h3>
        <p className="text-sm text-muted-foreground">
          Upload your documents for AI-powered validation and completeness check
        </p>
      </div>

      {/* Document list */}
      <div className="space-y-3">
        {documents.map((doc, index) => {
          const uploadedDoc = uploadedDocs.find(d => d.name === doc.name);
          const status = uploadedDoc?.status || 'pending';
          
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                status === 'uploaded' ? 'border-teal/30 bg-teal/5' :
                status === 'warning' ? 'border-coral/30 bg-coral/5' :
                status === 'error' ? 'border-destructive/30 bg-destructive/5' :
                'border-border bg-secondary/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(status)}
                <span className="font-medium text-foreground">{doc.name}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`text-sm ${
                  status === 'uploaded' ? 'text-teal' :
                  status === 'warning' ? 'text-coral' :
                  status === 'error' ? 'text-destructive' :
                  'text-muted-foreground'
                }`}>
                  {getStatusLabel(doc.name)}
                </span>
                
                {status !== 'uploaded' && status !== 'uploading' && (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
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
              🧠 Run AI Document Check
            </>
          )}
        </Button>
      )}

      {/* AI Check Results */}
      {analysisComplete && (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="bg-primary/10 p-4 border-b border-border">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              🧠 AI Document Check Results
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
                <span className="text-sm text-foreground">
                  {doc.name} - {doc.status === 'uploaded' ? 'Valid' : doc.status === 'warning' ? 'Needs attention' : 'Missing'}
                </span>
              </div>
            ))}
            
            {documents.filter(d => !uploadedDocs.find(u => u.name === d.name)).map((doc, i) => (
              <div key={`missing-${i}`} className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                <span className="text-sm text-muted-foreground">{doc.name} - Missing</span>
              </div>
            ))}
          </div>
          
          {/* Suggestions */}
          <div className="p-4 bg-secondary/30 border-t border-border">
            <h5 className="font-medium text-foreground mb-2">Suggestions:</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Upload last 3 months bank statements</li>
              <li>• Insurance must cover entire stay duration</li>
              <li>• Ensure all documents are clearly legible</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
