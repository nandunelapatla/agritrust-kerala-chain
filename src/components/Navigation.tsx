import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ShoppingCart, Shield, Leaf, Globe, LogIn } from "lucide-react";

interface NavigationProps {
  language: "en" | "ml";
  onLanguageToggle: () => void;
  activeTab: "farmer" | "consumer" | "government";
  onTabChange: (tab: "farmer" | "consumer" | "government") => void;
}

export const Navigation = ({ language, onLanguageToggle, activeTab, onTabChange }: NavigationProps) => {
  const texts = {
    en: {
      title: "AgriVerse",
      subtitle: "Government of Kerala",
      farmer: "Farmer",
      consumer: "Consumer", 
      government: "Government",
      login: "Login"
    },
    ml: {
      title: "അഗ്രിവേഴ്സ്",
      subtitle: "കേരള സർക്കാർ",
      farmer: "കർഷകൻ",
      consumer: "ഉപഭോക്താവ്",
      government: "സർക്കാർ",
      login: "ലോഗിൻ"
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg agri-gradient">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="hidden sm:flex flex-col">
            <h1 className="text-lg font-bold text-primary">{texts[language].title}</h1>
            <p className="text-xs text-muted-foreground">{texts[language].subtitle}</p>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as any)} className="hidden md:block">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="farmer" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden lg:inline">{texts[language].farmer}</span>
            </TabsTrigger>
            <TabsTrigger value="consumer" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden lg:inline">{texts[language].consumer}</span>
            </TabsTrigger>
            <TabsTrigger value="government" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden lg:inline">{texts[language].government}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <select 
            value={activeTab} 
            onChange={(e) => onTabChange(e.target.value as any)}
            className="bg-background border border-border rounded-md px-2 py-1 text-sm"
          >
            <option value="farmer">{texts[language].farmer}</option>
            <option value="consumer">{texts[language].consumer}</option>
            <option value="government">{texts[language].government}</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLanguageToggle}
            className="hidden sm:flex"
          >
            <Globe className="h-4 w-4 mr-1" />
            {language === "en" ? "മലയാളം" : "English"}
          </Button>
          <Button variant="default" size="sm">
            <LogIn className="h-4 w-4 mr-1" />
            {texts[language].login}
          </Button>
        </div>
      </div>
    </header>
  );
};