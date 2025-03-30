
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Bell, Lock, UserCheck } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Protection System</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform offers multiple layers of protection to help keep your community safe and informed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white transition-shadow hover:shadow-lg">
            <CardHeader>
              <Bell className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Real-time Notifications</CardTitle>
              <CardDescription>
                Stay informed with instant alerts when registered offenders move into your area.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Email and SMS notifications</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Customizable alert radius</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Status change notifications</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white transition-shadow hover:shadow-lg">
            <CardHeader>
              <Lock className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Secure Data Access</CardTitle>
              <CardDescription>
                Multiple security layers ensure data privacy while providing necessary transparency.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>End-to-end encryption</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Role-based access control</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Decentralized data storage</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white transition-shadow hover:shadow-lg">
            <CardHeader>
              <UserCheck className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Verified Information</CardTitle>
              <CardDescription>
                All registry data is verified and regularly updated for accuracy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Official government data sources</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Regular synchronization</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Historical record tracking</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
