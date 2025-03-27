
import React, { useEffect, useRef, useState } from "react";
import { generateHeatMapPoints } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Layers, MapPin, Map as MapIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [viewMode, setViewMode] = useState<"map" | "satellite">("map");

  useEffect(() => {
    // This would normally be stored in a secure way, but for demo purposes
    // we're asking the user to enter it
    const askForToken = () => {
      const token = prompt(
        "Please enter your Mapbox token (this is for demonstration purposes only)",
        "pk.eyJ1IjoiZXhhbXBsZXRva2VuIiwiYSI6ImNreHh4eDx4eCJ9.example"
      );
      if (token) {
        setMapboxToken(token);
        localStorage.setItem("mapbox_token", token);
      }
    };

    const savedToken = localStorage.getItem("mapbox_token");
    if (savedToken) {
      setMapboxToken(savedToken);
    } else {
      askForToken();
    }
  }, []);

  useEffect(() => {
    // Import mapboxgl dynamically to avoid SSR issues
    const initializeMap = async () => {
      if (!mapboxToken || !mapContainer.current) return;
      
      try {
        const mapboxgl = await import("mapbox-gl");
        await import("mapbox-gl/dist/mapbox-gl.css");
        
        mapboxgl.default.accessToken = mapboxToken;
        
        const initialMap = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: viewMode === "map" ? "mapbox://styles/mapbox/light-v11" : "mapbox://styles/mapbox/satellite-streets-v12",
          center: [-98.5795, 39.8283], // Center of the US
          zoom: 3,
          minZoom: 2,
          maxZoom: 15,
          attributionControl: false,
        });
        
        map.current = initialMap;
        
        initialMap.on("load", () => {
          setMapLoaded(true);
          loadHeatMap();
          setLoading(false);
        });
        
        // Add navigation control
        initialMap.addControl(
          new mapboxgl.default.NavigationControl(),
          "top-right"
        );
        
        // Add geolocation control
        initialMap.addControl(
          new mapboxgl.default.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          }),
          "top-right"
        );
        
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
  }, [mapboxToken, viewMode]);
  
  const loadHeatMap = () => {
    if (!map.current || !mapLoaded) return;
    
    const heatMapPoints = generateHeatMapPoints();
    
    // Remove existing heatmap layer if it exists
    if (map.current.getLayer("heatmap-layer")) {
      map.current.removeLayer("heatmap-layer");
    }
    
    // Remove existing heatmap source if it exists
    if (map.current.getSource("heatmap-data")) {
      map.current.removeSource("heatmap-data");
    }
    
    // Add heat map data source
    map.current.addSource("heatmap-data", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: heatMapPoints.map((point) => ({
          type: "Feature",
          properties: {
            intensity: point.intensity,
          },
          geometry: {
            type: "Point",
            coordinates: point.coordinates,
          },
        })),
      },
    });
    
    // Add heat map layer
    map.current.addLayer({
      id: "heatmap-layer",
      type: "heatmap",
      source: "heatmap-data",
      paint: {
        "heatmap-weight": ["get", "intensity"],
        "heatmap-intensity": 1,
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(33,102,172,0)",
          0.2,
          "rgb(103,169,207)",
          0.4,
          "rgb(209,229,240)",
          0.6,
          "rgb(253,219,199)",
          0.8,
          "rgb(239,138,98)",
          1,
          "rgb(178,24,43)",
        ],
        "heatmap-radius": 20,
        "heatmap-opacity": 0.8,
      },
    });
    
    // Add points for higher zoom levels
    map.current.addLayer({
      id: "circle-layer",
      type: "circle",
      source: "heatmap-data",
      minzoom: 8,
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(178,24,43)",
        "circle-stroke-color": "white",
        "circle-stroke-width": 1,
        "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          8,
          0,
          10,
          1,
        ],
      },
    });
  };
  
  const toggleMapStyle = () => {
    setViewMode(viewMode === "map" ? "satellite" : "map");
  };
  
  if (!mapboxToken) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-secondary/50 rounded-lg">
        <div className="text-center">
          <p className="text-lg font-medium">Mapbox token required</p>
          <p className="text-sm text-muted-foreground mb-4">
            A Mapbox token is needed to display the interactive map
          </p>
          <Button
            onClick={() => {
              const token = prompt(
                "Please enter your Mapbox token"
              );
              if (token) {
                setMapboxToken(token);
                localStorage.setItem("mapbox_token", token);
              }
            }}
          >
            Enter Mapbox Token
          </Button>
        </div>
      </div>
    );
  }
  
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
      
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        <Button
          variant="secondary"
          size="sm"
          className="bg-white/90 shadow-md backdrop-blur-sm hover:bg-white/100 transition-all"
          onClick={toggleMapStyle}
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
