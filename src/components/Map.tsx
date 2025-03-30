import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZG9yc29uNzU1IiwiYSI6ImNtOHY4NGFtZjBnZGUyaXB5cnlvb2o3YXcifQ.WIflBvozGkmWz-zrHoDUvw";

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v11"); // Default style
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize the Mapbox map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [-74.5, 40], // Example coordinates
      zoom: 9,
    });

    mapRef.current = map; // Store map instance

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, []);

  // Function to toggle between styles
  const toggleMapStyle = () => {
    const newStyle =
      mapStyle === "mapbox://styles/mapbox/streets-v11"
        ? "mapbox://styles/mapbox/satellite-streets-v11"
        : "mapbox://styles/mapbox/streets-v11";

    setMapStyle(newStyle);

    if (mapRef.current) {
      mapRef.current.setStyle(newStyle); // Apply new style to map
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
      <button
        onClick={toggleMapStyle}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          padding: "8px 12px",
          backgroundColor: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        }}
      >
        {mapStyle.includes("satellite") ? "Switch to Street View" : "Switch to Satellite"}
      </button>
    </div>
  );
};

export default Map;
