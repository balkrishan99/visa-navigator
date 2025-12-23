import { Globe, Twitter, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-primary/20">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Visa<span className="text-sky">Verse</span>
              </span>
            </a>
            <p className="text-sm text-primary-foreground/70 mb-6 leading-relaxed">
              Making global mobility accessible for everyone with AI-powered visa guidance.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Visa Checker</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Document Upload</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Timeline Calculator</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Rejection Analyzer</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Country Guides</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Visa Types</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} VisaVerse AI. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/50">
            Made with ❤️ for global travelers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
