"use client";

import { TraficLightColorState } from "@/app/models/enums";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import useTrafficLights from "../hooks/useTrafficLights";
import { TrafficLight } from "../models/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setTrafficLights } from "../store/slices/citySlice";
import styles from "./.IntersectionsList.module.css";
import { Badge } from "./Badge";
import { Button } from "./Button"; // presupunem că ai un component Button
import { Card, CardContent, CardHeader, CardTitle } from "./Card";

export function IntersectionsList() {
  const trafficLights = useAppSelector((state) => state.city.trafficLights);
  const dispatch = useAppDispatch();
  const { getAllTrafficLights } = useTrafficLights();

  const [controller, setController] = useState(false); // controlul Go Live / Stop

  useEffect(() => {
    if (!controller) return;

    const fetchTrafficLights = async () => {
      const response = await getAllTrafficLights();
      if (response.success && response.data) {
        dispatch(setTrafficLights(response.data as TrafficLight[]));
        console.log("Fetching traffic lights...");
      }
    };

    fetchTrafficLights();
    const interval = setInterval(fetchTrafficLights, 1000); // 1s

    return () => clearInterval(interval);
  }, [controller, dispatch, getAllTrafficLights]);

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>
          <MapPin className={styles.icon} />
          Semafoarele Monitorizate
        </CardTitle>
        {/* Buton Go Live / Stop */}
        <Button variant={controller ? "destructive" : "default"} onClick={() => setController(!controller)}>
          {controller ? "Stop" : "Go Live"}
        </Button>
      </CardHeader>

      <CardContent className={styles.cardContent}>
        {!controller && <div>Click Go Live to start monitoring traffic lights.</div>}
        {trafficLights.length === 0 && controller && <div>No traffic lights found.</div>}

        {trafficLights.map((trafficLight: TrafficLight) => (
          <div key={trafficLight.id} className={styles.intersectionCard}>
            <div className={styles.left}>
              <div
                className={`${styles.trafficLight} ${
                  trafficLight.trafficLightStatus === TraficLightColorState.GREEN
                    ? styles.green
                    : trafficLight.trafficLightStatus === TraficLightColorState.YELLOW
                    ? styles.yellow
                    : trafficLight.trafficLightStatus === TraficLightColorState.RED
                    ? styles.red
                    : styles.gray
                }`}
              />
              <span className={styles.name}>{trafficLight.id}</span>
            </div>

            <Badge variant="default">{trafficLight.trafficLightStatus}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
