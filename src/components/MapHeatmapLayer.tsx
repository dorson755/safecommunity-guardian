
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { transformOffenderFromDB } from "@/integrations/supabase/client";
import { HeatMapPoint } from "@/lib/types";
import type mapboxgl from "mapbox-gl";

interface MapHeatmapLayerProps {
  map: mapboxgl.Map;
  onDataLoaded: (isLoaded: boolean) => void;
}

const MapHeatmapLayer = ({ map, onDataLoaded }: MapHeatmapLayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHeatMap = async () => {
      try {
        const { data: offenderData, error } = await supabase
          .from('offenders')
          .select('*')
          .eq('registration_status', 'active');
          
        if (error) throw error;
        
        if (offenderData && offenderData.length > 0) {
          onDataLoaded(true);
          console.log("Loaded offender data:", offenderData.length, "records");
          
          const heatMapPoints: HeatMapPoint[] = offenderData.map(offender => {
            const transformed = transformOffenderFromDB(offender);
            return {
              coordinates: transformed.coordinates,
              intensity: Math.random() * 0.5 + 0.5,
            };
          });
          
          if (map.getLayer("heatmap-layer")) {
            map.removeLayer("heatmap-layer");
          }
          
          if (map.getSource("heatmap-data")) {
            map.removeSource("heatmap-data");
          }
          
          map.addSource("heatmap-data", {
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
          
          map.addLayer({
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
          
          map.addLayer({
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
          onDataLoaded(false);
        }
      } catch (error) {
        console.error("Error loading heatmap data:", error);
        onDataLoaded(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadHeatMap();
  }, [map, onDataLoaded]);

  return null; // This is a logic component, no rendering needed
};

export default MapHeatmapLayer;
