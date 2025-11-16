/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { client, DB_ID, TRAFFIC_LIGHTS_COLLECTION_ID } from "../appwrite";
import { TrafficLight } from "../models/types";

export default function useRealtimeTrafficLights() {
  const [trafficLights, setTrafficLights] = useState<TrafficLight[]>([]);

  useEffect(() => {
    // subscribe la toate documentele din trafficLights
    const unsubscribe = client.subscribe(`databases.${DB_ID}.documents.${TRAFFIC_LIGHTS_COLLECTION_ID}`, (response: any) => {
      const updatedDoc: TrafficLight = response.payload;

      setTrafficLights((prev) => {
        const index = prev.findIndex((t) => t.id === updatedDoc.id);
        if (index > -1) {
          const copy = [...prev];
          copy[index] = updatedDoc;
          return copy;
        } else {
          return [...prev, updatedDoc];
        }
      });
    });

    // curățăm la unmount
    return () => unsubscribe(); // unsubscribe este deja o funcție
  }, []);

  return trafficLights;
}
