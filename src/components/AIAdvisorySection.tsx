import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mic, Send, Camera, FileImage, MessageSquare, Bot } from "lucide-react";
import aiImage from "@/assets/ai-farming.jpg";

export const AIAdvisorySection = () => {
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hello! I'm your AgriVerse AI advisor. Ask me anything about farming, crops, or pest management in Malayalam or English.",
      timestamp: "10:30 AM"
    }
  ]);

  const handleSendMessage = () => {
    if (!query.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: "user",
      message: query,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "bot",
        message: "Based on your query about rice cultivation, I recommend:\n\n• Plant during the pre-monsoon season (April-May)\n• Ensure proper water management with 2-3 inches standing water\n• Apply organic fertilizers like compost\n• Monitor for pest attacks, especially stem borers\n\nWould you like specific advice for your location in Kerala?",
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);

    setQuery("");
  };

  const commonQueries = [
    { en: "Rice pest management", ml: "നെൽകൃഷിയിലെ കീടനിയന്ത്രണം" },
    { en: "Coconut fertilization", ml: "തെങ്ങിൻ വളപ്രയോഗം" },
    { en: "Spice cultivation tips", ml: "സുഗന്ധവ്യഞ്ജന കൃഷി നുറുങ്ങുകൾ" },
    { en: "Weather alerts", ml: "കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ" }
  ];

  return (
    <section id="advisory" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Bot className="h-4 w-4 mr-2" />
            AI Advisory
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Smart Farming with <span className="text-primary">AI Guidance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant expert advice on crops, pests, irrigation, and weather in your preferred language
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* AI Chat Interface */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">AI Assistant</h3>
              <Badge variant="outline" className="text-green-600 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Online
              </Badge>
            </div>

            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto mb-4 space-y-4 p-4 bg-muted/20 rounded-lg">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-background border"
                  }`}>
                    <p className="text-sm whitespace-pre-line">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask about crops, pests, irrigation, weather... (English or Malayalam)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  className="min-h-[60px]"
                />
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsRecording(!isRecording)}
                    className={isRecording ? "bg-red-100 text-red-600" : ""}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileImage className="h-4 w-4 mr-2" />
                    Upload Crop Photo
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!query.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>

            {/* Quick Queries */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-3">Common Questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {commonQueries.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="text-left justify-start h-auto py-2 px-3"
                    onClick={() => setQuery(item.en)}
                  >
                    <div>
                      <div className="text-sm">{item.en}</div>
                      <div className="text-xs text-muted-foreground">{item.ml}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Features */}
          <div className="space-y-6">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={aiImage}
                alt="AI in Agriculture"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-lg font-semibold text-white mb-2">AI-Powered Disease Detection</h4>
                <p className="text-sm text-white/90">Upload crop photos for instant disease identification and treatment recommendations</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">Always Available</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-secondary mb-2">95%</div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-2">2+</div>
                <p className="text-sm text-muted-foreground">Languages</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-success mb-2">1000+</div>
                <p className="text-sm text-muted-foreground">Crop Varieties</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};