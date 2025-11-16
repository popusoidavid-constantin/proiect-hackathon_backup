"use client";

import { Activity } from "lucide-react";
import { useAppSelector } from "../store/hooks";
import styles from "./.DashboardHeader.module.css";

export function DashboardHeader() {
  const city = useAppSelector((state) => state.city);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.iconWrapper}>
            <Activity className={styles.icon} />
          </div>
          <div>
            <h1 className={styles.title}>Dashboard Trafic Urban</h1>
            <p className={styles.subtitle}>Primăria {city.name}</p>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.liveIndicator}>
            <div className={styles.pulse} />
            <span>
              <p className={styles.liveText}>Live</p>
            </span>
          </div>

          <div className={styles.updateInfo}>
            <p className={styles.liveText}>Ultima actualizare</p>
            <p className={styles.time}>{new Date().toLocaleTimeString("ro-RO")}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
