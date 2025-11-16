"use client";
import { useState } from "react";

const TestTrafficLightsComponent = () => {
  const [data, setData] = useState(null);
  const timisoaraBounds = {
    south: 45.713,
    west: 21.161,
    north: 45.82,
    east: 21.3,
  };

  const fetchTrafficLights = async (cityBounds: { south: number; west: number; north: number; east: number }) => {
    const query = `
          [out:json];
          node["highway"="traffic_signals"](${cityBounds.south},${cityBounds.west},${cityBounds.north},${cityBounds.east});
          out;
        `;

    try {
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `data=${encodeURIComponent(query)}`,
      });

      const json = await response.json();
      console.log("OSM Semafore:", json.elements);

      setData(json.elements);
      return json.elements;
    } catch (error) {
      console.error("Eroare Overpass:", error);
    }
  };

  return (
    <div>
      <h1>TestTrafficLightsComponent</h1>

      <button
        onClick={() => {
          fetchTrafficLights(timisoaraBounds);
        }}
      >
        Test data
      </button>
    </div>
  );
};

export default TestTrafficLightsComponent;
