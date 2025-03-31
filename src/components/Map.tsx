import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZG9yc29uNzU1IiwiYSI6ImNtOHY4NGFtZjBnZGUyaXB5cnlvb2o3YXcifQ.WIflBvozGkmWz-zrHoDUvw";

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/dark-v11");
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const generateHeatmapData = (): GeoJSON.FeatureCollection<GeoJSON.Point> => {
    const features: GeoJSON.Feature<GeoJSON.Point>[] = [];

    // Helper to create clusters
    const createCluster = (
      center: [number, number],
      count: number,
      spread: number
    ) => {
      return Array(count)
        .fill(null)
        .map(() => ({
          type: "Feature" as const,
          properties: { intensity: 1 },
          geometry: {
            type: "Point" as const,
            coordinates: [
              center[0] + (Math.random() - 0.5) * spread,
              center[1] + (Math.random() - 0.5) * spread,
            ] as [number, number],
          },
        }));
    };

    return {
      type: "FeatureCollection" as const,
      features: [
        ...createCluster([-77.3754, 25.0443], 15, 0.02), // Dense cluster
        ...createCluster([-77.42, 25.08], 8, 0.03),     // Medium cluster
        ...createCluster([-77.34, 25.01], 3, 0.05),     // Sparse cluster
      ],
    };
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [-77.3754, 25.0443],
      zoom: 11,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      map.addSource("heatmap-data", {
        type: "geojson",
        data: generateHeatmapData(),
      });

      map.addLayer({
        id: "heatmap-layer",
        type: "heatmap",
        source: "heatmap-data",
        paint: {
          "heatmap-weight": 1,
          "heatmap-radius": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            0, 25,
            14, 100,
          ],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0.0, "rgba(33, 102, 172, 0.2)",
            0.2, "rgba(103, 169, 207, 0.5)",
            0.4, "rgba(209, 229, 240, 0.8)",
            0.6, "rgba(253, 219, 199, 0.9)",
            0.8, "rgba(240, 59, 32, 1)",
            1.0, "rgba(165, 0, 38, 1)",
          ],
          "heatmap-intensity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0, 0.5,
            14, 3,
          ],
          "heatmap-opacity": 0.75,
        },
      });
    });

    return () => map.remove();
  }, [mapStyle]);

  const toggleMapStyle = () => {
    const newStyle = mapStyle.includes("satellite")
      ? "mapbox://styles/mapbox/dark-v11"
      : "mapbox://styles/mapbox/satellite-streets-v11";
    setMapStyle(newStyle);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
      <button
        onClick={toggleMapStyle}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          padding: "10px 15px",
          backgroundColor: mapStyle.includes("satellite") ? "#000" : "#fff",
          color: mapStyle.includes("satellite") ? "#fff" : "#000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          transition: "all 0.2s",
        }}
      >
        {mapStyle.includes("satellite") ? "Dark Map" : "Satellite View"}
      </button>
    </div>
  );
};

export default Map;
