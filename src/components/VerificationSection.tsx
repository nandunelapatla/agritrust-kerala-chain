import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, 
  Scan, 
  CheckCircle2, 
  AlertCircle, 
  Shield, 
  User,
  MapPin,
  Calendar,
  Award
} from "lucide-react";
import qrImage from "@/assets/qr-verification.jpg";

export const VerificationSection = () => {
  const [qrInput, setQrInput] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const sampleVerification = {
    isValid: true,
    product: {
      name: "Organic Cardamom",
      id: "AGT-CR-445-2024",
      farmer: "Suma Devi",
      farmLocation: "Idukki, Kerala",
      harvestDate: "2024-01-10",
      expiryDate: "2024-12-10",
      grade: "Premium Grade A",
      certifications: ["Organic", "Spices Board Certified", "Fair Trade"],
      batchInfo: {
        size: "25 kg",
        processingDate: "2024-01-12",
        packagingDate: "2024-01-15"
      }
    },
    blockchain: {
      verified: true,
      blockHeight: 15847293,
      transactionHash: "0x7d9e2f8a1b5c6e4d3a2f8b7c9e1d4a6b8c5e2f9d7a3b1c6e4f8a2d5b9c7e3f1a",
      smartContract: "0x742d35cc644c027fb5fbb5d6e79c2b5b4aad32c7",
      lastUpdated: "2024-01-25 14:30:22"
    },
    qualityMetrics: {
      moisture: "12.5%",
      oilContent: "8.2%",
      aromatics: "Excellent",
      pesticides: "Not Detected"
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setVerificationResult(sampleVerification);
      setIsVerifying(false);
    }, 2000);
  };

  const handleScanDemo = () => {
    setQrInput("AGT-CR-445-2024");
    handleVerify();
  };

  return (
    <section id="verify" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Scan className="h-4 w-4 mr-2" />
            Product Verification
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Verify <span className="text-accent">Authentic Products</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scan QR codes or enter product IDs to instantly verify authenticity and view complete product journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Verification Input */}
          <Card className="p-8 mb-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <QrCode className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan or Enter Product Code</h3>
              <p className="text-muted-foreground">Verify any AgriVerse certified product</p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Product ID or scan QR code"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  className="text-center"
                />
                <Button 
                  onClick={handleVerify} 
                  disabled={!qrInput || isVerifying}
                  variant="default"
                >
                  {isVerifying ? "Verifying..." : "Verify"}
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleScanDemo}>
                  <Scan className="h-4 w-4 mr-2" />
                  Open Camera
                </Button>
                <Button variant="outline" onClick={handleScanDemo}>
                  Try Demo
                </Button>
              </div>
            </div>
          </Card>

          {/* Verification Result */}
          {verificationResult && (
            <div className="space-y-6">
              {/* Verification Status */}
              <Card className="p-6">
                <div className="flex items-center justify-center mb-6">
                  {verificationResult.isValid ? (
                    <div className="flex items-center space-x-3 text-green-600">
                      <CheckCircle2 className="h-8 w-8" />
                      <div>
                        <h3 className="text-xl font-semibold">Product Verified ✓</h3>
                        <p className="text-sm text-muted-foreground">This is an authentic AgriVerse product</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 text-red-600">
                      <AlertCircle className="h-8 w-8" />
                      <div>
                        <h3 className="text-xl font-semibold">Verification Failed</h3>
                        <p className="text-sm text-muted-foreground">Product could not be verified</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Product Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Product Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Product</span>
                        <span className="font-medium">{verificationResult.product.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Product ID</span>
                        <span className="font-mono text-sm">{verificationResult.product.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Grade</span>
                        <Badge variant="secondary">{verificationResult.product.grade}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Batch Size</span>
                        <span className="font-medium">{verificationResult.product.batchInfo.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Farm Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Farm Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{verificationResult.product.farmer}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{verificationResult.product.farmLocation}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Harvested: {verificationResult.product.harvestDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Expires: {verificationResult.product.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mt-6">
                  <h4 className="font-semibold text-lg mb-3">Certifications</h4>
                  <div className="flex gap-2 flex-wrap">
                    {verificationResult.product.certifications.map((cert: string) => (
                      <Badge key={cert} variant="outline" className="text-green-600 border-green-200">
                        <Award className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Quality Metrics */}
              <Card className="p-6">
                <h4 className="font-semibold text-lg mb-4">Quality Analysis</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(verificationResult.qualityMetrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-semibold text-primary">{String(value)}</div>
                      <div className="text-sm text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Blockchain Verification */}
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="h-5 w-5 text-secondary" />
                  <h4 className="font-semibold text-lg">Blockchain Verification</h4>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified on Blockchain
                  </Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Block Height</span>
                    <span className="font-mono">{verificationResult.blockchain.blockHeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Hash</span>
                    <span className="font-mono text-xs">{verificationResult.blockchain.transactionHash.slice(0, 20)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Smart Contract</span>
                    <span className="font-mono text-xs">{verificationResult.blockchain.smartContract.slice(0, 20)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span>{verificationResult.blockchain.lastUpdated}</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Visual Banner */}
          <div className="mt-8 relative rounded-lg overflow-hidden">
            <img
              src={qrImage}
              alt="QR Code Verification System"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="text-lg font-semibold text-white mb-2">Instant Product Verification</h4>
              <p className="text-sm text-white/90">Scan any AgriVerse QR code to access complete product history and authenticity</p>
            </div>
          </div>

          {/* How it Works */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">1. Scan QR Code</h3>
              <p className="text-sm text-muted-foreground">
                Every AgriVerse product has a unique QR code linking to blockchain records
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">2. Blockchain Verification</h3>
              <p className="text-sm text-muted-foreground">
                Product data is verified against tamper-proof blockchain records
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">3. Trust Confirmed</h3>
              <p className="text-sm text-muted-foreground">
                Get instant confirmation of authenticity and complete product journey
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};