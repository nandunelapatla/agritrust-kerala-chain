import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Truck, 
  Store, 
  User, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  QrCode,
  Link as LinkIcon,
  ArrowRight
} from "lucide-react";
import blockchainImage from "@/assets/blockchain-agriculture.jpg";

export const BlockchainSection = () => {
  const [trackingId, setTrackingId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  
  const sampleProduct = {
    id: "AGT-KL-001-2024",
    name: "Organic Basmati Rice",
    farmer: "Ravi Kumar",
    location: "Palakkad, Kerala",
    harvestDate: "2024-01-15",
    batchSize: "500 kg",
    quality: "Grade A",
    certifications: ["Organic", "Fair Trade"],
    blockchainHash: "0x7f9d4...ab2c8",
    transactions: [
      {
        id: 1,
        stage: "Harvested",
        location: "Farm - Palakkad",
        date: "2024-01-15",
        responsible: "Ravi Kumar (Farmer)",
        verified: true,
        txHash: "0x7f9d4...ab2c8"
      },
      {
        id: 2,
        stage: "Quality Check",
        location: "AgriVerse Center - Palakkad",
        date: "2024-01-16",
        responsible: "Quality Inspector",
        verified: true,
        txHash: "0x8e3a5...cd9f1"
      },
      {
        id: 3,
        stage: "Processing",
        location: "Mill - Thrissur",
        date: "2024-01-18",
        responsible: "Kerala Rice Mills",
        verified: true,
        txHash: "0x9b7c2...ef4a6"
      },
      {
        id: 4,
        stage: "Packaging",
        location: "Packaging Unit - Kochi",
        date: "2024-01-20",
        responsible: "AgriPack Solutions",
        verified: true,
        txHash: "0xa2d8e...gh7b3"
      },
      {
        id: 5,
        stage: "Distribution",
        location: "Warehouse - Ernakulam",
        date: "2024-01-22",
        responsible: "LogiChain Kerala",
        verified: true,
        txHash: "0xb5f1c...ij9k4"
      },
      {
        id: 6,
        stage: "Retail",
        location: "Supermarket - Thiruvananthapuram",
        date: "2024-01-25",
        responsible: "FreshMart Kerala",
        verified: false,
        txHash: "Pending"
      }
    ]
  };

  const handleTrack = () => {
    setIsTracking(true);
    // Simulate tracking delay
    setTimeout(() => {
      setIsTracking(false);
    }, 2000);
  };

  const completedStages = sampleProduct.transactions.filter(t => t.verified).length;
  const progressPercentage = (completedStages / sampleProduct.transactions.length) * 100;

  return (
    <section id="blockchain" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Shield className="h-4 w-4 mr-2" />
            Blockchain Technology
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transparent <span className="text-secondary">Supply Chain</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every product journey tracked on blockchain for complete transparency and consumer trust
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Tracking Interface */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Track Your Product</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Product ID or QR Code"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                  />
                  <Button onClick={handleTrack} disabled={isTracking}>
                    {isTracking ? "Tracking..." : "Track"}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <QrCode className="h-4 w-4 mr-2" />
                    Scan QR Code
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setTrackingId(sampleProduct.id)}
                  >
                    Try Demo
                  </Button>
                </div>
              </div>
            </Card>

            {/* Product Info */}
            {(trackingId === sampleProduct.id || isTracking) && (
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold">{sampleProduct.name}</h4>
                    <p className="text-muted-foreground">ID: {sampleProduct.id}</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Farmer</p>
                    <p className="font-medium">{sampleProduct.farmer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{sampleProduct.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Harvest Date</p>
                    <p className="font-medium">{sampleProduct.harvestDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Batch Size</p>
                    <p className="font-medium">{sampleProduct.batchSize}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">Supply Chain Progress</p>
                    <p className="text-sm text-muted-foreground">
                      {completedStages}/{sampleProduct.transactions.length} stages
                    </p>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                <div className="flex gap-2 flex-wrap">
                  {sampleProduct.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Blockchain Features */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-medium">Tamper Proof</p>
                <p className="text-sm text-muted-foreground">Blockchain Security</p>
              </Card>
              <Card className="p-4 text-center">
                <LinkIcon className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="font-medium">Full Traceability</p>
                <p className="text-sm text-muted-foreground">End-to-End Tracking</p>
              </Card>
            </div>
          </div>

          {/* Supply Chain Journey */}
          <div className="space-y-6">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={blockchainImage}
                alt="Blockchain Agriculture"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-lg font-semibold text-white mb-2">Blockchain Verified Journey</h4>
                <p className="text-sm text-white/90">Every transaction recorded immutably</p>
              </div>
            </div>

            {/* Journey Timeline */}
            {(trackingId === sampleProduct.id || isTracking) && (
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">Supply Chain Journey</h4>
                <div className="space-y-4">
                  {sampleProduct.transactions.map((tx, index) => (
                    <div key={tx.id} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.verified ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {tx.verified ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <div className="w-2 h-2 bg-current rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{tx.stage}</p>
                          <Badge variant={tx.verified ? "default" : "secondary"} className="text-xs">
                            {tx.verified ? "Verified" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{tx.location}</p>
                        <p className="text-xs text-muted-foreground">{tx.date} • {tx.responsible}</p>
                        {tx.verified && (
                          <p className="text-xs font-mono text-secondary mt-1">
                            Tx: {tx.txHash}
                          </p>
                        )}
                      </div>
                      {index < sampleProduct.transactions.length - 1 && (
                        <div className="absolute left-4 mt-8 w-px h-6 bg-border" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};