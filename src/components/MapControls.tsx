
import React from "react";
import { Button } from "@/components/ui/button";
import { Layers, MapIcon } from "lucide-react";

interface MapControlsProps {
  viewMode: "map" | "satellite";
  onToggleMapStyle: () => void;
}

const MapControls = ({ viewMode, onToggleMapStyle }: MapControlsProps) => {
  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
      <Button
        variant="secondary"
        size="sm"
        className="bg-white/90 shadow-md backdrop-blur-sm hover:bg-white/100 transition-all"
        onClick={onToggleMapStyle}
      >
        {viewMode === "map" ? (
          <>
            <Layers className="mr-2 h-4 w-4" /> Satellite View
          </>
        ) : (
          <>
            <MapIcon className="mr-2 h-4 w-4" /> Map View
          </>
        )}
      </Button>
    </div>
  );
};

export default MapControls;
