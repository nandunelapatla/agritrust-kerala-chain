import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Brain, Scan } from "lucide-react";
import heroImage from "@/assets/kerala-agriculture-hero.jpg";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Kerala Agriculture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">Government of Kerala Initiative</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-primary">AgriVerse</span>
                <br />
                <span className="text-foreground">Smart Agriculture</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Platform
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Empowering Kerala's farmers with AI-driven advisory, blockchain-verified supply chains, and transparent agricultural practices.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg">
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Farmers Connected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">95%</div>
                <div className="text-sm text-muted-foreground">Supply Chain Verified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">AI Advisory Available</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-smooth">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg agri-gradient">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">AI-Powered Advisory</h3>
                  <p className="text-muted-foreground">
                    Get instant crop advice, pest solutions, and weather alerts in Malayalam or English.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-secondary/20 hover:border-secondary/40 transition-smooth">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Shield className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Blockchain Verified</h3>
                  <p className="text-muted-foreground">
                    Every product tracked from farm to consumer with tamper-proof blockchain records.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-accent/20 hover:border-accent/40 transition-smooth">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg harvest-gradient">
                  <Scan className="h-6 w-6 text-accent-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">QR Verification</h3>
                  <p className="text-muted-foreground">
                    Consumers can instantly verify product origin, quality, and journey with QR codes.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};