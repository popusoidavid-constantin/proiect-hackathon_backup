"use client";

import useDetectionObject from "@/app/hooks/useDetectionObject";
import { Car, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { DetectionObjectType } from "../models/enums";
import { DetectionObject } from "../models/types";
import styles from "./.StatisticsPanel.module.css";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";

export function StatisticsPanel() {
  const { getAllDetectionObjects } = useDetectionObject();
  const [statistics, setStatistics] = useState<DetectionObject[]>([]);

  useEffect(() => {
    const fetchDetectionObjects = async () => {
      try {
        const response = await getAllDetectionObjects();
        setStatistics(response.data as DetectionObject[]);
      } catch (error) {
        console.error("Error fetching detection objects:", error);
      }
    };

    fetchDetectionObjects();
    const interval = setInterval(fetchDetectionObjects, 5000); // actualizare la 5s
    return () => clearInterval(interval);
  }, [getAllDetectionObjects]);

  // Agregare simplă pentru pietoni și vehicule
  const pedestrianCount = statistics.filter((obj) => obj.type === DetectionObjectType.person).length;
  const vehicleCount = statistics.filter(
    (obj) => obj.type === DetectionObjectType.car || DetectionObjectType.bus || DetectionObjectType.motorcycle || DetectionObjectType.truck
  ).length;

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>
          <TrendingUp className={styles.titleIcon} />
          Statistici Trafic
        </CardTitle>
      </CardHeader>

      <CardContent className={styles.cardContent}>
        <div className={styles.statCard}>
          <div className={styles.statItem}>
            <div className={styles.iconWrapperUsers}>
              <Users className={styles.icon} />
            </div>
            <div>
              <p className={styles.label}>Pietoni</p>
              <p className={styles.value}>{pedestrianCount}</p>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.iconWrapperCars}>
              <Car className={styles.icon} />
            </div>
            <div>
              <p className={styles.label}>Vehicule</p>
              <p className={styles.value}>{vehicleCount}</p>
            </div>
          </div>

          <div className={styles.trendBar}>
            <div className={styles.pedestrianBar} style={{ width: `${Math.min(pedestrianCount * 5, 100)}%` }} />
            <div className={styles.vehicleBar} style={{ width: `${Math.min(vehicleCount * 5, 100)}%` }} />
          </div>
        </div>

        <h3 className={styles.subtitle}>Obiecte detectate:</h3>
        {statistics.map((obj) => (
          <div key={obj.id} className={styles.detectionCard}>
            <p>
              <strong>ID:</strong> {obj.id}
            </p>
            <p>
              <strong>Tip:</strong> {obj.type}
            </p>
            <p>
              <strong>Confidence:</strong> {(obj.confidence * 100).toFixed(1)}%
            </p>
            <p>
              <strong>Creare:</strong> {new Date(obj.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
