import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Upload, ShieldCheck, MapPin, Calendar, Truck, CheckCircle, AlertTriangle } from "lucide-react";
import consumerMarketImage from "@/assets/consumer-market.jpg";

interface ConsumerDashboardProps {
  language: "en" | "ml";
}

export const ConsumerDashboard = ({ language }: ConsumerDashboardProps) => {
  const [scannedProduct, setScannedProduct] = useState<any>(null);

  const texts = {
    en: {
      welcome: "Verify Your Purchase",
      scanQR: "Scan QR Code",
      uploadQR: "Upload QR Image",
      productInfo: "Product Information",
      trustBadge: "Verified Authentic",
      origin: "Farm Origin",
      journey: "Supply Chain Journey",
      noProduct: "No product scanned yet. Scan QR code to verify authenticity.",
      scanInstructions: "Point your camera at the QR code on the product packaging",
      verified: "Verified Product",
      farmLocation: "Farm Location",
      harvestDate: "Harvest Date",
      farmer: "Farmer",
      transportSteps: "Transport Journey"
    },
    ml: {
      welcome: "നിങ്ങളുടെ വാങ്ങൽ പരിശോധിക്കുക",
      scanQR: "QR കോഡ് സ്കാൻ ചെയ്യുക",
      uploadQR: "QR ഇമേജ് അപ്‌ലോഡ് ചെയ്യുക",
      productInfo: "ഉൽപ്പന്ന വിവരങ്ങൾ",
      trustBadge: "സാധുത പരിശോധിച്ചു",
      origin: "കൃഷിയിടത്തിന്റെ ഉത്പത്തി",
      journey: "വിതരണ ശൃംഖല യാത്ര",
      noProduct: "ഇതുവരെ ഒരു ഉൽപ്പന്നവും സ്കാൻ ചെയ്തിട്ടില്ല. ആധികാരികത പരിശോധിക്കാൻ QR കോഡ് സ്കാൻ ചെയ്യുക.",
      scanInstructions: "ഉൽപ്പന്ന പാക്കേജിംഗിലെ QR കോഡിൽ നിങ്ങളുടെ ക്യാമറ ചൂണ്ടുക",
      verified: "പരിശോധിച്ച ഉൽപ്പന്നം",
      farmLocation: "കൃഷിസ്ഥലം",
      harvestDate: "വിളവെടുപ്പ് തീയതി",
      farmer: "കർഷകൻ",
      transportSteps: "ഗതാഗത യാത്ര"
    }
  };

  // Mock product data
  const mockProduct = {
    id: "KL-RICE-2024-001",
    name: "Organic Basmati Rice",
    farmer: "Rajesh Kumar",
    farmLocation: "Alappuzha, Kerala",
    harvestDate: "2024-01-15",
    verified: true,
    journey: [
      { step: "Farm Harvest", date: "2024-01-15", location: "Alappuzha Farm" },
      { step: "Quality Check", date: "2024-01-16", location: "Local Cooperative" },
      { step: "Processing", date: "2024-01-17", location: "Rice Mill, Kottayam" },
      { step: "Packaging", date: "2024-01-18", location: "Packaging Unit" },
      { step: "Distribution", date: "2024-01-19", location: "Retail Store" }
    ]
  };

  const handleScan = () => {
    // Mock scanning - in real app would use camera
    setScannedProduct(mockProduct);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Hero Banner */}
      <div className="relative rounded-lg overflow-hidden mb-8">
        <img
          src={consumerMarketImage}
          alt="Kerala Market"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <ShieldCheck className="h-12 w-12 text-primary-foreground mb-3 drop-shadow-lg" />
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground drop-shadow-lg mb-2">
            {texts[language].welcome}
          </h1>
          <p className="text-primary-foreground/90 drop-shadow max-w-2xl">
            {language === "en" 
              ? "Scan QR codes to verify authentic Kerala agricultural products from farm to table"
              : "കൃഷിയിടത്തിൽ നിന്ന് മേശവരെ ആധികാരിക കേരള കാർഷിക ഉൽപ്പന്നങ്ങൾ പരിശോധിക്കാൻ QR കോഡുകൾ സ്കാൻ ചെയ്യുക"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Scanner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              {texts[language].scanQR}
            </CardTitle>
            <CardDescription>{texts[language].scanInstructions}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-smooth">
              <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <Button onClick={handleScan} className="mb-2 w-full">
                {texts[language].scanQR}
              </Button>
              <p className="text-xs text-muted-foreground">Or</p>
              <Button variant="outline" className="mt-2 w-full">
                <Upload className="h-4 w-4 mr-2" />
                {texts[language].uploadQR}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Product Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-success" />
              {texts[language].productInfo}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!scannedProduct ? (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">{texts[language].noProduct}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <Badge variant="default" className="bg-success text-success-foreground">
                    {texts[language].trustBadge}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{scannedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground">ID: {scannedProduct.id}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="flex items-center gap-1 text-sm font-medium">
                        <MapPin className="h-4 w-4" />
                        {texts[language].farmLocation}
                      </Label>
                      <p className="text-sm">{scannedProduct.farmLocation}</p>
                    </div>
                    <div>
                      <Label className="flex items-center gap-1 text-sm font-medium">
                        <Calendar className="h-4 w-4" />
                        {texts[language].harvestDate}
                      </Label>
                      <p className="text-sm">{scannedProduct.harvestDate}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">{texts[language].farmer}</Label>
                    <p className="text-sm">{scannedProduct.farmer}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Supply Chain Journey */}
        {scannedProduct && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-secondary" />
                {texts[language].journey}
              </CardTitle>
              <CardDescription>Track the complete journey of your product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scannedProduct.journey.map((step: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      {index < scannedProduct.journey.length - 1 && (
                        <div className="w-0.5 h-8 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{step.step}</h4>
                        <Badge variant="outline">{step.date}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
    {children}
  </label>
);