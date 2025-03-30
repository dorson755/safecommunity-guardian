
import React from "react";
import { AlertTriangle } from "lucide-react";
import MapComponent from "@/components/Map";

interface MapSectionProps {
  dataAvailable: boolean;
}

const MapSection = ({ dataAvailable }: MapSectionProps) => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Offender Heat Map</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visualize the concentration of registered offenders across different geographic areas to better understand potential risk zones.
          </p>
        </div>
        
        <MapComponent />
        
        {!dataAvailable && (
          <div className="flex justify-center mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              <AlertTriangle className="inline-block mr-1 h-4 w-4" />
              No data available. Please sign in to access the offender registry data.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MapSection;
