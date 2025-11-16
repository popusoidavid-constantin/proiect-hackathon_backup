"use client";

import { useEffect, useState } from "react";
import styles from "./.DashboardPage.module.css";
import { DashboardHeader } from "./components/DashboardHeader";
import { IntersectionsList } from "./components/IntersectionsList";
import Loading from "./components/Loading";
import { StatisticsPanel } from "./components/StatisticsPanel";
import { TrafficMap } from "./components/TraficMap";
import useCity from "./hooks/useCity";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const { getCity } = useCity();

  useEffect(() => {
    const dataGetter = async () => {
      setLoading(true);
      await getCity();
      setLoading(false);
    };

    dataGetter();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.page}>
          <DashboardHeader />

          <main className={styles.main}>
            <div className={styles.gridContainer}>
              {/* Left Section */}
              <div className={styles.leftSection}>
                <IntersectionsList />
                <StatisticsPanel />
              </div>

              {/* Right Section */}
              <div className={styles.rightSection}>
                <TrafficMap />
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
