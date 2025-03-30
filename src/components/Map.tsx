
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Layers, MapPin, Map as MapIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type mapboxgl from "mapbox-gl";
import { supabase } from "@/integrations/supabase/client";
import { transformOffenderFromDB } from "@/integrations/supabase/client";
import { HeatMapPoint } from "@/lib/types";

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
          loadHeatMap();
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
  
  const loadHeatMap = async () => {
    if (!map.current || !mapLoaded) return;
    
    try {
      const { data: offenderData, error } = await supabase
        .from('offenders')
        .select('*')
        .eq('registration_status', 'active');
        
      if (error) throw error;
      
      if (offenderData && offenderData.length > 0) {
        setDataLoaded(true);
        console.log("Loaded offender data:", offenderData.length, "records");
        
        const heatMapPoints: HeatMapPoint[] = offenderData.map(offender => {
          const transformed = transformOffenderFromDB(offender);
          return {
            coordinates: transformed.coordinates,
            intensity: Math.random() * 0.5 + 0.5,
          };
        });
        
        if (map.current.getLayer("heatmap-layer")) {
          map.current.removeLayer("heatmap-layer");
        }
        
        if (map.current.getSource("heatmap-data")) {
          map.current.removeSource("heatmap-data");
        }
        
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
      } else {
        console.log("No offender data found. You may need to add data to the database.");
      }
    } catch (error) {
      console.error("Error loading heatmap data:", error);
    }
  };
  
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
