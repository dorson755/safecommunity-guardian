
import React from "react";
import { Shield } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FeatureCard from "@/components/FeatureCard";
import { Search, Map, Bell } from "lucide-react";
import { Offender } from "@/lib/types";

interface HeroSectionProps {
  onSearch: (query: string, filters: any) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-background"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl mx-auto h-[400px] bg-gradient-to-br from-primary/10 to-white/0 rounded-full blur-3xl opacity-60"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full animate-fade-in">
            <Shield size={14} className="mr-1" /> 
            Community Protection System
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight animate-blur-in">
            Safeguard Your Community
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up">
            Access comprehensive sex offender registry data to help protect your neighborhood and loved ones.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-12 md:mb-16 animate-fade-in delay-100">
          <SearchBar onSearch={onSearch} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in delay-150">
          <FeatureCard
            icon={Search}
            title="Advanced Search"
            description="Find detailed information about registered offenders by name, location, or offense type."
          />
          <FeatureCard
            icon={Map}
            title="Interactive Map"
            description="Visualize offender density with our heat map technology to better understand risk areas."
          />
          <FeatureCard
            icon={Bell}
            title="Notifications"
            description="Receive alerts when registered offenders move into your specified area of interest."
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
