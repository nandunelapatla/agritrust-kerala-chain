import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AIAdvisorySection } from "@/components/AIAdvisorySection";
import { BlockchainSection } from "@/components/BlockchainSection";
import { VerificationSection } from "@/components/VerificationSection";
import { DashboardSection } from "@/components/DashboardSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AIAdvisorySection />
        <BlockchainSection />
        <VerificationSection />
        <DashboardSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;