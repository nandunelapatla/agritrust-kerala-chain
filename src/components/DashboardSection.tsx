import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Package, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  IndianRupee,
  Sprout,
  Activity
} from "lucide-react";

export const DashboardSection = () => {
  const stats = {
    farmers: { count: 12543, growth: 15.3 },
    products: { count: 45621, growth: 23.1 },
    verified: { count: 43890, growth: 18.7 },
    revenue: { amount: 2.3, growth: 12.4 }
  };

  const recentProducts = [
    {
      id: "AGT-RC-001",
      name: "Organic Basmati Rice",
      farmer: "Ravi Kumar",
      location: "Palakkad",
      status: "Verified",
      date: "2024-01-25"
    },
    {
      id: "AGT-SP-102",
      name: "Black Pepper",
      farmer: "Suma Devi",
      location: "Idukki",
      status: "Processing",
      date: "2024-01-24"
    },
    {
      id: "AGT-CN-203",
      name: "Coconut Oil",
      farmer: "James Thomas",
      location: "Thrissur",
      status: "Verified",
      date: "2024-01-23"
    }
  ];

  const alerts = [
    {
      type: "weather",
      message: "Heavy rainfall expected in Wayanad district",
      severity: "high",
      time: "2 hours ago"
    },
    {
      type: "pest",
      message: "Stem borer activity reported in Kottayam rice fields",
      severity: "medium",
      time: "4 hours ago"
    },
    {
      type: "market",
      message: "Cardamom prices increased by 8% this week",
      severity: "low",
      time: "1 day ago"
    }
  ];

  const districts = [
    { name: "Thiruvananthapuram", farmers: 1250, products: 3420 },
    { name: "Kollam", farmers: 980, products: 2890 },
    { name: "Pathanamthitta", farmers: 756, products: 2100 },
    { name: "Alappuzha", farmers: 1340, products: 4200 },
    { name: "Kottayam", farmers: 1120, products: 3600 },
    { name: "Idukki", farmers: 890, products: 2800 },
    { name: "Ernakulam", farmers: 1450, products: 4800 },
    { name: "Thrissur", farmers: 1280, products: 3950 },
    { name: "Palakkad", farmers: 1650, products: 5100 },
    { name: "Malappuram", farmers: 1380, products: 4300 },
    { name: "Kozhikode", farmers: 1200, products: 3800 },
    { name: "Wayanad", farmers: 780, products: 2200 },
    { name: "Kannur", farmers: 950, products: 2900 },
    { name: "Kasaragod", farmers: 670, products: 1950 }
  ];

  return (
    <section id="dashboard" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <BarChart3 className="h-4 w-4 mr-2" />
            Government Dashboard
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Kerala Agriculture <span className="text-primary">Monitoring</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into agricultural activities, supply chain transparency, and farmer welfare across Kerala
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-primary" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                +{stats.farmers.growth}%
              </Badge>
            </div>
            <div className="text-2xl font-bold">{stats.farmers.count.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Registered Farmers</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Package className="h-8 w-8 text-secondary" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                +{stats.products.growth}%
              </Badge>
            </div>
            <div className="text-2xl font-bold">{stats.products.count.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Products Tracked</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Shield className="h-8 w-8 text-accent" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                +{stats.verified.growth}%
              </Badge>
            </div>
            <div className="text-2xl font-bold">{stats.verified.count.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Blockchain Verified</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <IndianRupee className="h-8 w-8 text-success" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                +{stats.revenue.growth}%
              </Badge>
            </div>
            <div className="text-2xl font-bold">₹{stats.revenue.amount}Cr</div>
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Product Registrations</h3>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Sprout className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.farmer} • {product.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={product.status === "Verified" ? "default" : "secondary"}>
                        {product.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{product.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Products
              </Button>
            </Card>

            {/* District-wise Data */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">District-wise Overview</h3>
              <div className="space-y-3">
                {districts.slice(0, 6).map((district) => (
                  <div key={district.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{district.name}</span>
                    </div>
                    <div className="text-right text-sm">
                      <span className="text-muted-foreground">{district.farmers} farmers</span>
                      <span className="mx-2">•</span>
                      <span className="text-primary">{district.products} products</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Districts
              </Button>
            </Card>
          </div>

          {/* Alerts & Notifications */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">System Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Blockchain Network</span>
                    <span className="text-green-600">99.8%</span>
                  </div>
                  <Progress value={99.8} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>AI Advisory Uptime</span>
                    <span className="text-green-600">98.5%</span>
                  </div>
                  <Progress value={98.5} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Database Performance</span>
                    <span className="text-green-600">97.2%</span>
                  </div>
                  <Progress value={97.2} className="h-2" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Active Alerts</h3>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === "high" ? "bg-red-500" :
                      alert.severity === "medium" ? "bg-yellow-500" : "bg-blue-500"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Alerts
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Farmer Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Market Insights
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Issue Alerts
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};