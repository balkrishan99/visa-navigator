import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  nationality: string;
  destination: string;
  purpose: string;
}

const countryNames: Record<string, string> = {
  US: "United States", GB: "United Kingdom", CA: "Canada", AU: "Australia",
  DE: "Germany", FR: "France", JP: "Japan", SG: "Singapore", AE: "UAE",
  NZ: "New Zealand", IN: "India", CN: "China", BR: "Brazil", MX: "Mexico",
  ZA: "South Africa", NG: "Nigeria", PH: "Philippines", PK: "Pakistan",
};

const ChatInterface = ({ nationality, destination, purpose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm your VisaVerse AI assistant. I can help you with questions about your ${purpose} visa application to ${countryNames[destination]}. What would you like to know?`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes('spouse') || q.includes('family') || q.includes('dependent')) {
      return `Yes, ${countryNames[destination]} allows dependent visas. Your spouse can apply for a dependent visa alongside your ${purpose} visa. Required documents include marriage certificate, proof of relationship, and proof of accommodation. The processing time is usually similar to the main applicant's visa.`;
    }
    
    if (q.includes('how long') || q.includes('processing') || q.includes('time')) {
      return `Processing times for ${countryNames[destination]} ${purpose} visas typically range from 4-12 weeks, depending on your nationality and the embassy's current workload. I recommend applying at least 3 months before your intended travel date to allow for any delays.`;
    }
    
    if (q.includes('cost') || q.includes('fee') || q.includes('price')) {
      return `The visa application fee for ${countryNames[destination]} varies by visa type. ${purpose === 'work' ? 'Work visas typically cost $150-300 USD' : purpose === 'study' ? 'Student visas typically cost $100-250 USD' : 'Tourist visas typically cost $50-150 USD'}. Additional costs may include biometrics, courier services, and document translation.`;
    }
    
    if (q.includes('reject') || q.includes('denied') || q.includes('refuse')) {
      return `Common reasons for visa rejection include incomplete documentation, insufficient funds, weak ties to home country, and inconsistent information. To improve your chances: provide complete documentation, maintain stable bank balance, and clearly demonstrate the purpose of your trip and intention to return.`;
    }
    
    if (q.includes('interview') || q.includes('embassy') || q.includes('appointment')) {
      return `Visa interviews at the ${countryNames[destination]} embassy typically last 5-15 minutes. Be prepared to explain your travel purpose, ties to your home country, and financial situation. Dress professionally, arrive early, and bring original documents along with copies.`;
    }
    
    return `That's a great question about ${countryNames[destination]} visas. Based on current immigration policies, I'd recommend checking the official embassy website for the most up-to-date information, or feel free to ask me about specific requirements, documents, processing times, or application tips.`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = generateResponse(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "Can I bring my spouse with this visa?",
    "How long does processing take?",
    "What are the visa fees?",
    "What if my visa gets rejected?",
  ];

  return (
    <div className="flex flex-col h-[500px]">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">Ask VisaVerse AI</h3>
        <p className="text-sm text-muted-foreground">Get instant answers to your visa questions</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === 'user' ? 'bg-primary' : 'bg-teal'
            }`}>
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-primary-foreground" />
              ) : (
                <Bot className="w-4 h-4 text-accent-foreground" />
              )}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.role === 'user' 
                ? 'bg-primary text-primary-foreground rounded-tr-none'
                : 'bg-secondary text-foreground rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-teal flex items-center justify-center">
              <Bot className="w-4 h-4 text-accent-foreground" />
            </div>
            <div className="bg-secondary rounded-2xl rounded-tl-none px-4 py-3">
              <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 2 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => setInput(q)}
              className="px-3 py-1.5 text-xs rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question..."
          className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <Button 
          onClick={handleSend} 
          variant="hero" 
          size="icon" 
          className="h-12 w-12 shrink-0"
          disabled={!input.trim() || isLoading}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
