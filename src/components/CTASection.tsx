
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface CTASectionProps {
  onOpenAuthModal: () => void;
}

const CTASection = ({ onOpenAuthModal }: CTASectionProps) => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background"></div>
      <div className="max-w-5xl mx-auto px-6 text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to protect your community?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Sign up for free to access full registry data, set up alerts, and help keep your neighborhood safe.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={onOpenAuthModal}>
            Create Free Account
          </Button>
          <Button size="lg" variant="outline">
            Learn More <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
