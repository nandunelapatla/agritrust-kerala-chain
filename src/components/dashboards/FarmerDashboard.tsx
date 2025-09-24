import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mic, Upload, MessageCircle, Bell, Leaf, Camera, MapPin, Calendar } from "lucide-react";

interface FarmerDashboardProps {
  language: "en" | "ml";
}

export const FarmerDashboard = ({ language }: FarmerDashboardProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [query, setQuery] = useState("");

  const texts = {
    en: {
      welcome: "Welcome, Farmer",
      cropDetails: "Crop Registration",
      aiAdvisory: "AI Advisory",
      notifications: "Notifications",
      cropType: "Crop Type",
      harvestDate: "Expected Harvest Date",
      location: "Farm Location",
      uploadCert: "Upload Certificate",
      askQuestion: "Ask your farming question...",
      voiceInput: "Voice Input",
      submit: "Submit",
      register: "Register Crop",
      recentActivity: "Recent Activity",
      weatherAlert: "Weather Alert",
      pestAlert: "Pest Alert",
      marketPrice: "Market Price Update"
    },
    ml: {
      welcome: "സ്വാഗതം, കൃഷിക്കാരൻ",
      cropDetails: "വിള രജിസ്ട്രേഷൻ",
      aiAdvisory: "AI ഉപദേശം",
      notifications: "അറിയിപ്പുകൾ",
      cropType: "വിളയുടെ തരം",
      harvestDate: "വിളവെടുപ്പ് തീയതി",
      location: "കൃഷിസ്ഥലം",
      uploadCert: "സർട്ടിഫിക്കറ്റ് അപ്‌ലോഡ് ചെയ്യുക",
      askQuestion: "നിങ്ങളുടെ കൃഷി ചോദ്യം ചോദിക്കുക...",
      voiceInput: "വോയ്സ് ഇൻപുട്ട്",
      submit: "സമർപ്പിക്കുക",
      register: "വിള രജിസ്റ്റർ ചെയ്യുക",
      recentActivity: "സമീപകാല പ്രവർത്തനം",
      weatherAlert: "കാലാവസ്ഥാ മുന്നറിയിപ്പ്",
      pestAlert: "കീട മുന്നറിയിപ്പ്",
      marketPrice: "വിപണി വില അപ്ഡേറ്റ്"
    }
  };

  const notifications = [
    { type: "weather", message: texts[language].weatherAlert, urgent: true },
    { type: "pest", message: texts[language].pestAlert, urgent: false },
    { type: "price", message: texts[language].marketPrice, urgent: false }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">{texts[language].welcome}</h1>
        <div className="flex justify-center">
          <Leaf className="h-8 w-8 text-success" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crop Registration */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              {texts[language].cropDetails}
            </CardTitle>
            <CardDescription>Register your crop for blockchain tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{texts[language].cropType}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice / അരി</SelectItem>
                    <SelectItem value="coconut">Coconut / തെങ്ങ്</SelectItem>
                    <SelectItem value="pepper">Pepper / കുരുമുളക്</SelectItem>
                    <SelectItem value="cardamom">Cardamom / ഏലം</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{texts[language].harvestDate}</Label>
                <Input type="date" />
              </div>
            </div>
            
            <div>
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {texts[language].location}
              </Label>
              <Input placeholder="Enter farm location" />
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                {texts[language].uploadCert}
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-smooth cursor-pointer">
                <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload certificate</p>
              </div>
            </div>

            <Button className="w-full">{texts[language].register}</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-warning" />
              {texts[language].notifications}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((notif, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Bell className={`h-4 w-4 mt-0.5 ${notif.urgent ? 'text-destructive' : 'text-warning'}`} />
                <div className="flex-1">
                  <p className="text-sm">{notif.message}</p>
                  {notif.urgent && <Badge variant="destructive" className="mt-1">Urgent</Badge>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Advisory */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-secondary" />
              {texts[language].aiAdvisory}
            </CardTitle>
            <CardDescription>Get instant farming advice in your language</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Textarea 
                  placeholder={texts[language].askQuestion}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1"
                  rows={3}
                />
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="icon"
                  className="shrink-0"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Mic className={`h-4 w-4 ${isRecording ? 'animate-pulse' : ''}`} />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">{texts[language].submit}</Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Upload Crop Image
                </Button>
              </div>

              {/* Mock AI Response */}
              <div className="bg-muted/50 rounded-lg p-4 mt-4">
                <p className="text-sm text-muted-foreground mb-2">AI Assistant:</p>
                <p className="text-sm">
                  {language === "en" 
                    ? "Based on current weather conditions, ensure proper drainage for your rice crop. Monitor for brown spot disease and apply recommended fertilizers."
                    : "നിലവിലെ കാലാവസ്ഥയനുസരിച്ച്, നിങ്ങളുടെ നെൽകൃഷിക്ക് ശരിയായ ഡ്രെയിനേജ് ഉറപ്പാക്കുക. ബ്രൗൺ സ്പോട്ട് രോഗത്തിനായി നിരീക്ഷിക്കുകയും ശുപാർശചെയ്ത വളങ്ങൾ പ്രയോഗിക്കുകയും ചെയ്യുക."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};