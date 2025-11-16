"use client";

import { TraficLightColorState } from "@/app/models/enums";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import useLocations from "../hooks/useLocations";
import { Location } from "../models/types";
import { useAppSelector } from "../store/hooks";
import Loading from "./Loading";

type Checkpoint = {
  id: string;
  title: string;
  position: { lat: number; lng: number };
  status?: TraficLightColorState;
};

type Props = {
  zoom?: number;
};

const containerStyle = {
  width: "100%",
  height: "500px",
};

// culori marker pe baza status
const statusColorsMap: Record<TraficLightColorState, string> = {
  [TraficLightColorState.GREEN]: "#34D399",
  [TraficLightColorState.YELLOW]: "#FBBF24",
  [TraficLightColorState.RED]: "#EF4444",
  [TraficLightColorState.GRAY]: "#9CA3AF", // gri pentru nefolosit
};

export default function MapView({ zoom = 14 }: Props) {
  const trafficLights = useAppSelector((state) => state.city.trafficLights);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const { getAllLocations } = useLocations();
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getAllLocations();
        const locations = response.data as Location[];

        const mapped: Checkpoint[] = locations.map((loc) => {
          const trafficLight = trafficLights.find((t) => {
            if (!t.location) return false;
            return typeof t.location === "object" ? t.location.id === loc.id : t.location === loc.id;
          });

          return {
            id: loc.id,
            title: `Location ${loc.id}`,
            position: { lat: loc.lat, lng: loc.lng },
            status: trafficLight?.trafficLightStatus ?? TraficLightColorState.GRAY,
          };
        });

        setCheckpoints(mapped);
      } catch (err) {
        console.error("Error fetching locations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [getAllLocations, trafficLights]);

  if (loading || !isLoaded) return <Loading />;
  if (checkpoints.length === 0) return <div>No locations found.</div>;
  if (loadError) return <div>Failed to load map</div>;

  const getMarkerIcon = (status?: TraficLightColorState) => {
    const color = status ? statusColorsMap[status] : statusColorsMap[TraficLightColorState.GRAY];
    return {
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: "#ffffff",
      scale: 1.5,
      anchor: new google.maps.Point(12, 24),
    };
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={zoom}
      onLoad={(map) => {
        const bounds = new google.maps.LatLngBounds();
        checkpoints.forEach((c) => bounds.extend(c.position));
        map.fitBounds(bounds);
      }}
    >
      {checkpoints.map((c) => (
        <Marker
          key={c.id}
          position={c.position}
          title={c.title}
          icon={getMarkerIcon(c.status)}
          onClick={() => {
            const tl = trafficLights.find((t) => (typeof t.location === "object" ? t.location.id === c.id : t.location === c.id));
            console.log("Traffic Light clicked:", tl);
          }}
        />
      ))}
    </GoogleMap>
  );
}
