
import React from "react";
import { Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/30 py-12 border-t">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-semibold text-lg">SafeguardRegistry</span>
            </div>
            <p className="text-muted-foreground max-w-xs">
              A cloud-based, decentralized registry system designed to protect communities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/safety-guide" className="text-muted-foreground hover:text-foreground">Safety Guide</Link></li>
                <li><Link to="/legal-information" className="text-muted-foreground hover:text-foreground">Legal Information</Link></li>
                <li><Link to="/privacy-tools" className="text-muted-foreground hover:text-foreground">Privacy Tools</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about-us" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><Link to="/compliance" className="text-muted-foreground hover:text-foreground">Compliance</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SafeguardRegistry. All rights reserved.</p>
          <p className="mt-1">This is demo application. No real data is used.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
