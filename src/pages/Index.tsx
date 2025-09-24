import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { FarmerDashboard } from "@/components/dashboards/FarmerDashboard";
import { ConsumerDashboard } from "@/components/dashboards/ConsumerDashboard";
import { GovernmentDashboard } from "@/components/dashboards/GovernmentDashboard";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "ml">("en");
  const [activeTab, setActiveTab] = useState<"farmer" | "consumer" | "government">("farmer");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ml" : "en");
  };

  const renderDashboard = () => {
    switch (activeTab) {
      case "farmer":
        return <FarmerDashboard language={language} />;
      case "consumer":
        return <ConsumerDashboard language={language} />;
      case "government":
        return <GovernmentDashboard language={language} />;
      default:
        return <FarmerDashboard language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        language={language}
        onLanguageToggle={toggleLanguage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="min-h-screen">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Index;