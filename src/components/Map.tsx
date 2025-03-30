
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import MapControls from "./MapControls";
import MapHeatmapLayer from "./MapHeatmapLayer";
import type mapboxgl from "mapbox-gl";

// Use the provided Mapbox token
const MAPBOX_TOKEN = "pk.eyJ1IjoiZG9yc29uNzU1IiwiYSI6ImNtOHQ5YmM0aTA4bnEyaW9qa2Nyc2szNTUifQ.JvoVNbwm44WVlakNs8ph7g";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"map" | "satellite">("map");
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current) return;
      
      try {
        const mapboxgl = await import("mapbox-gl");
        await import("mapbox-gl/dist/mapbox-gl.css");
        
        mapboxgl.default.accessToken = MAPBOX_TOKEN;
        
        const initialMap = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: viewMode === "map" ? "mapbox://styles/mapbox/light-v11" : "mapbox://styles/mapbox/satellite-streets-v12",
          center: [-77.3554, 25.0443], // Nassau, Bahamas
          zoom: 11,
          minZoom: 2,
          maxZoom: 15,
          attributionControl: false,
        });
        
        map.current = initialMap;
        
        initialMap.on("load", () => {
          setMapLoaded(true);
          setLoading(false);
        });
        
        initialMap.addControl(
          new mapboxgl.default.NavigationControl(),
          "top-right"
        );
        
        initialMap.addControl(
          new mapboxgl.default.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          }),
          "top-right"
        );
        
        console.log("Mapbox initialized with token:", MAPBOX_TOKEN);
      } catch (error) {
        console.error("Error initializing map:", error);
        setLoading(false);
      }
    };
    
    initializeMap();
    
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [viewMode]);

  const toggleMapStyle = () => {
    setViewMode(viewMode === "map" ? "satellite" : "map");
  };
  
  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className="absolute inset-0 rounded-lg overflow-hidden"
      />
      
      <MapControls 
        viewMode={viewMode}
        onToggleMapStyle={toggleMapStyle}
      />
      
      {mapLoaded && map.current && (
        <MapHeatmapLayer 
          map={map.current}
          onDataLoaded={(isLoaded) => setDataLoaded(isLoaded)}
        />
      )}
      
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-md shadow-md">
        <h4 className="font-medium text-sm mb-1">Heat Map Intensity</h4>
        <div className="flex items-center space-x-1">
          <div className="w-full h-2 bg-gradient-to-r from-blue-500 via-yellow-500 to-red-600 rounded" />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
