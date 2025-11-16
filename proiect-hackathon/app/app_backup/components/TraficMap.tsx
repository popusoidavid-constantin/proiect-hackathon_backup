"use client";

import { useAppSelector } from "../store/hooks";
import { Card, CardContent } from "./Card";
import MapView from "./MapView";

type Checkpoint = {
  id: string;
  title: string;
  position: { lat: number; lng: number };
  status: "normal" | "warning" | "critical";
};

const checkpoints: Checkpoint[] = [
  { id: "1", title: "Piața Unirii", position: { lat: 44.4375, lng: 26.0973 }, status: "normal" },
  { id: "2", title: "Bd. Magheru", position: { lat: 44.4378, lng: 26.102 }, status: "warning" },
  { id: "3", title: "Piața Victoriei", position: { lat: 44.4425, lng: 26.0966 }, status: "normal" },
  { id: "4", title: "Șos. Kiseleff", position: { lat: 44.4521, lng: 26.0832 }, status: "normal" },
  { id: "5", title: "Piața Romană", position: { lat: 44.439, lng: 26.1065 }, status: "critical" },
];

export function TrafficMap() {
  const center = { lat: 44.4375, lng: 26.0973 };
  const city = useAppSelector((state) => state.city);

  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent style={{ flex: 1, padding: 0, position: "relative" }}>
        {/* Map Title and Buttons */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            display: "flex",
            justifyContent: "space-between",
            zIndex: 10,
            width: 150,
          }}
        >
          <div style={{ backgroundColor: "rgba(255,255,255,0.95)", padding: 8, borderRadius: 8, boxShadow: "0 0 6px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: 12, fontWeight: 600 }}>Harta Trafic - {city.name}</h3>
            <p style={{ fontSize: 10, color: "#555" }}>Monitorizare în timp real</p>
          </div>
        </div>

        {/* Google Map */}
        <MapView
          center={center}
          zoom={14}
          checkpoints={checkpoints.map((c) => ({
            id: c.id,
            title: c.title,
            position: c.position,
          }))}
        />

        {/* Legend */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            backgroundColor: "rgba(255,255,255,0.95)",
            padding: 12,
            borderRadius: 8,
            boxShadow: "0 0 6px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ fontSize: 10, fontWeight: 600, marginBottom: 4 }}>Legendă</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#34D399" }} />
              <span style={{ fontSize: 10 }}>Verde</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FBBF24" }} />
              <span style={{ fontSize: 10 }}>Galben</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EF4444" }} />
              <span style={{ fontSize: 10 }}>Rosu</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
