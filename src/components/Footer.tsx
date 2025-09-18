import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  ExternalLink
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg agri-gradient">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">AgriVerse</h3>
                <p className="text-xs text-muted-foreground">Government of Kerala</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering Kerala's agricultural sector with AI-driven advisory services, 
              blockchain-verified supply chains, and transparent farming practices.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-smooth">
                  Home
                </a>
              </li>
              <li>
                <a href="#advisory" className="text-muted-foreground hover:text-primary transition-smooth">
                  AI Advisory
                </a>
              </li>
              <li>
                <a href="#blockchain" className="text-muted-foreground hover:text-primary transition-smooth">
                  Supply Chain
                </a>
              </li>
              <li>
                <a href="#verify" className="text-muted-foreground hover:text-primary transition-smooth">
                  Verify Products
                </a>
              </li>
              <li>
                <a href="#dashboard" className="text-muted-foreground hover:text-primary transition-smooth">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Farmer Registration</span>
              </li>
              <li>
                <span className="text-muted-foreground">Crop Advisory</span>
              </li>
              <li>
                <span className="text-muted-foreground">Pest Management</span>
              </li>
              <li>
                <span className="text-muted-foreground">Weather Alerts</span>
              </li>
              <li>
                <span className="text-muted-foreground">Product Certification</span>
              </li>
              <li>
                <span className="text-muted-foreground">Market Intelligence</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Department of Agriculture<br />
                  Government of Kerala<br />
                  Thiruvananthapuram - 695001
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+91-471-XXXX-XXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">agriverse@kerala.gov.in</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Kerala.gov.in
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>
            © {currentYear} AgriVerse - Government of Kerala. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-smooth">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-smooth">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-smooth">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};