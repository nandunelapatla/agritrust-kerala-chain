import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Wheat, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  BarChart3,
  Download,
  Eye
} from "lucide-react";

interface GovernmentDashboardProps {
  language: "en" | "ml";
}

export const GovernmentDashboard = ({ language }: GovernmentDashboardProps) => {
  const texts = {
    en: {
      welcome: "Government Dashboard",
      overview: "System Overview",
      farmers: "Registered Farmers",
      crops: "Active Crops",
      transactions: "Blockchain Transactions",
      fraudAlerts: "Fraud Alerts",
      subsidyTracking: "Subsidy Tracking",
      analytics: "Analytics & Reports",
      totalFarmers: "Total Farmers",
      activeCrops: "Active Crops",
      verifiedProducts: "Verified Products",
      monthlyGrowth: "Monthly Growth",
      generateReport: "Generate Report",
      viewDetails: "View Details",
      fraudDetected: "Fraud Detected",
      subsidyDisbursed: "Subsidy Disbursed",
      pendingVerification: "Pending Verification",
      systemHealth: "System Health",
      blockchainStatus: "Blockchain Network",
      aiSystemStatus: "AI Advisory System",
      databaseStatus: "Database Performance"
    },
    ml: {
      welcome: "സർക്കാർ ഡാഷ്ബോർഡ്",
      overview: "സിസ്റ്റം അവലോകനം",
      farmers: "രജിസ്റ്റേർഡ് കർഷകർ",
      crops: "സജീവ വിളകൾ",
      transactions: "ബ്ലോക്ക്‌ചെയിൻ ഇടപാടുകൾ",
      fraudAlerts: "വഞ്ചന മുന്നറിയിപ്പുകൾ",
      subsidyTracking: "സബ്‌സിഡി ട്രാക്കിംഗ്",
      analytics: "വിശകലനം & റിപ്പോർട്ടുകൾ",
      totalFarmers: "മൊത്തം കർഷകർ",
      activeCrops: "സജീവ വിളകൾ",
      verifiedProducts: "പരിശോധിച്ച ഉൽപ്പന്നങ്ങൾ",
      monthlyGrowth: "മാസിക വളർച്ച",
      generateReport: "റിപ്പോർട്ട് തയ്യാറാക്കുക",
      viewDetails: "വിശദാംശങ്ങൾ കാണുക",
      fraudDetected: "വഞ്ചന കണ്ടെത്തി",
      subsidyDisbursed: "സബ്‌സിഡി വിതരണം ചെയ്തു",
      pendingVerification: "പരിശോധന ബാക്കി",
      systemHealth: "സിസ്റ്റം ആരോഗ്യം",
      blockchainStatus: "ബ്ലോക്ക്‌ചെയിൻ നെറ്റ്‌വർക്ക്",
      aiSystemStatus: "AI ഉപദേശ സംവിധാനം",
      databaseStatus: "ഡാറ്റാബേസ് പ്രകടനം"
    }
  };

  const stats = [
    { title: texts[language].totalFarmers, value: "12,847", icon: Users, color: "text-primary" },
    { title: texts[language].activeCrops, value: "3,241", icon: Wheat, color: "text-success" },
    { title: texts[language].verifiedProducts, value: "8,592", icon: Shield, color: "text-secondary" },
    { title: texts[language].monthlyGrowth, value: "+12.5%", icon: TrendingUp, color: "text-accent" }
  ];

  const alerts = [
    { type: "fraud", message: "Suspicious activity detected in Kottayam district", severity: "high" },
    { type: "subsidy", message: "₹2.4L subsidy disbursed to 156 farmers", severity: "info" },
    { type: "verification", message: "42 products pending verification", severity: "medium" }
  ];

  const districts = [
    { name: "Thiruvananthapuram", farmers: 1247, crops: 342 },
    { name: "Kollam", farmers: 1156, crops: 298 },
    { name: "Pathanamthitta", farmers: 892, crops: 245 },
    { name: "Alappuzha", farmers: 1534, crops: 423 },
    { name: "Kottayam", farmers: 1389, crops: 367 },
    { name: "Idukki", farmers: 967, crops: 284 }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">{texts[language].welcome}</h1>
        <div className="flex justify-center">
          <Shield className="h-8 w-8 text-primary" />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fraud Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              {texts[language].fraudAlerts}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                  alert.severity === 'high' ? 'text-destructive' : 
                  alert.severity === 'medium' ? 'text-warning' : 'text-secondary'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <Badge 
                    variant={alert.severity === 'high' ? 'destructive' : 'outline'} 
                    className="mt-1"
                  >
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              {texts[language].viewDetails}
            </Button>
          </CardContent>
        </Card>

        {/* District Overview */}
        <Card>
          <CardHeader>
            <CardTitle>District-wise Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {districts.slice(0, 4).map((district, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{district.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {district.farmers} farmers • {district.crops} crops
                  </p>
                </div>
                <Badge variant="outline">{district.farmers}</Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View All Districts
            </Button>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-success" />
              {texts[language].systemHealth}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{texts[language].blockchainStatus}</span>
                <span>98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{texts[language].aiSystemStatus}</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{texts[language].databaseStatus}</span>
                <span>96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-secondary" />
              {texts[language].analytics}
            </CardTitle>
            <CardDescription>Generate comprehensive reports and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Farmer Analytics
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Crop Yield Report
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Blockchain Audit
              </Button>
            </div>
            
            {/* Mock Chart Area */}
            <div className="mt-6 p-6 bg-muted/30 rounded-lg">
              <div className="h-40 flex items-center justify-center border-2 border-dashed border-border rounded">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Analytics Chart Area</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};