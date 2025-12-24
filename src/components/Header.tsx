import { Globe, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-gradient-primary shadow-md group-hover:shadow-lg transition-shadow">
              <Globe className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Visa<span className="text-gradient">Verse</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          {/* Desktop CTA removed */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in-up">
            <nav className="flex flex-col gap-4">
              <a 
                href="#features" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#faq" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              {/* Mobile CTA removed */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
