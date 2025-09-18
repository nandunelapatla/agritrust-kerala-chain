import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Leaf, Globe } from "lucide-react";

export const Header = () => {
  const [language, setLanguage] = useState<"en" | "ml">("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ml" : "en");
  };

  const navItems = {
    en: [
      { label: "Home", href: "#home" },
      { label: "AI Advisory", href: "#advisory" },
      { label: "Supply Chain", href: "#blockchain" },
      { label: "Verify Product", href: "#verify" },
      { label: "Dashboard", href: "#dashboard" },
    ],
    ml: [
      { label: "ഹോം", href: "#home" },
      { label: "AI ഉപദേശം", href: "#advisory" },
      { label: "വിതരണ ശൃംഖല", href: "#blockchain" },
      { label: "ഉൽപ്പന്നം പരിശോധിക്കുക", href: "#verify" },
      { label: "ഡാഷ്ബോർഡ്", href: "#dashboard" },
    ],
  };

  const texts = {
    en: {
      title: "AgriTrust",
      subtitle: "Government of Kerala",
      login: "Login",
    },
    ml: {
      title: "അഗ്രിട്രസ്റ്റ്",
      subtitle: "കേരള സർക്കാർ",
      login: "ലോഗിൻ",
    },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg agri-gradient">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-primary">{texts[language].title}</h1>
            <p className="text-xs text-muted-foreground">{texts[language].subtitle}</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems[language].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="hidden sm:flex"
          >
            <Globe className="h-4 w-4 mr-1" />
            {language === "en" ? "മലയാളം" : "English"}
          </Button>
          <Button variant="default" size="sm">
            {texts[language].login}
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col space-y-4 mt-6">
                <Button
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="justify-start"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === "en" ? "മലയാളം" : "English"}
                </Button>
                <div className="border-t pt-4">
                  {navItems[language].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-smooth"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};