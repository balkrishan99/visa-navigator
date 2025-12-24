import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

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
  IT: "Italy", ES: "Spain", NL: "Netherlands", PT: "Portugal", CH: "Switzerland",
  SE: "Sweden", NO: "Norway", DK: "Denmark", BE: "Belgium", AT: "Austria",
  IE: "Ireland", PL: "Poland", GR: "Greece", CZ: "Czech Republic",
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/visa-chat`;

const ChatInterface = ({ nationality, destination, purpose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm your VisaVerse AI assistant. I can help you with questions about your ${purpose} visa application to ${countryNames[destination] || destination}. What would you like to know?`
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    const userMsg: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    let assistantContent = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          nationality,
          destination,
          purpose,
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      // Add empty assistant message to update
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { role: 'assistant', content: assistantContent };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to get AI response");
      // Remove the empty assistant message on error
      setMessages(prev => prev.filter((_, i) => i !== prev.length - 1 || prev[prev.length - 1].content !== ''));
    } finally {
      setIsLoading(false);
    }
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
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && messages[messages.length - 1]?.content === '' && (
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
