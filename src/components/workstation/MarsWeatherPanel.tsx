import { useEffect, useState } from "react";
import { Loader2, Thermometer, Wind, Gauge, AlertTriangle } from "lucide-react";
import {
  fetchMarsWeather,
  type MarsWeatherResponse,
} from "../../services/proxyClient";
import styles from "./Workstation.module.css";

/**
 * Mars Weather (NASA InSight lander).
 * NOTE: NASA archived the InSight mission weather feed in 2022.
 * The endpoint still returns the last known sols. The UI surfaces an
 * "ARCHIVED" badge so the data is presented honestly.
 */
export default function MarsWeatherPanel() {
  const [data, setData] = useState<MarsWeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchMarsWeather()
      .then((res) => alive && setData(res))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const isArchived = data?.archived === true || !data?.temperature;

  return (
    <section className={`${styles.panel} ${styles.col4}`}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>
          <span className={styles.panelDot} />
          InSight · Mars Weather
        </div>
        <div className={styles.panelMeta}>
          {loading ? (
            <span className={styles.badgeCyan}>
              <Loader2
                size={9}
                style={{ marginRight: 4, animation: "spin 1s linear infinite" }}
              />
              FETCH
            </span>
          ) : isArchived ? (
            <span style={{ color: "var(--ws-alert)" }}>● ARCHIVED</span>
          ) : (
            <span className={styles.badgeCyan}>● {data?.cached ? "CACHED" : "LIVE"}</span>
          )}
          <span>{data?.latestSol ? `SOL ${data.latestSol}` : "—"}</span>
        </div>
      </div>

      <div className={styles.panelBody}>
        {isArchived ? (
          <div className={styles.marsArchived}>
            <AlertTriangle size={20} color="var(--ws-alert)" />
            <div>
              <strong>Feed archivé (2022)</strong>
              <p>
                La mission InSight a cessé d'émettre en décembre 2022. Les
                dernières mesures connues restent affichées à titre de référence.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.marsSeason}>
              <span className={styles.filterLabel}>SEASON</span>
              <span className={styles.marsSeasonVal}>
                {data?.season ?? "—"}
              </span>
            </div>

            <div className={styles.marsMetrics}>
              {/* Température */}
              <div className={styles.marsMetric}>
                <div className={styles.marsMetricHead}>
                  <Thermometer size={11} color="var(--ws-cyan)" />
                  <span>TEMP</span>
                </div>
                <div className={styles.marsMetricBody}>
                  <span className={styles.marsMetricAvg}>
                    {data?.temperature?.avg?.toFixed(1) ?? "—"}
                    <small>°{data?.temperature?.unit ?? "C"}</small>
                  </span>
                  <span className={styles.marsMetricRange}>
                    min {data?.temperature?.min?.toFixed(0) ?? "—"}° /
                    max {data?.temperature?.max?.toFixed(0) ?? "—"}°
                  </span>
                </div>
              </div>

              {/* Vent */}
              <div className={styles.marsMetric}>
                <div className={styles.marsMetricHead}>
                  <Wind size={11} color="var(--ws-cyan)" />
                  <span>WIND</span>
                </div>
                <div className={styles.marsMetricBody}>
                  <span className={styles.marsMetricAvg}>
                    {data?.wind?.avg?.toFixed(1) ?? "—"}
                    <small>{data?.wind?.unit ?? "m/s"}</small>
                  </span>
                  <span className={styles.marsMetricRange}>
                    dir {data?.wind?.direction ?? "—"}
                  </span>
                </div>
              </div>

              {/* Pression */}
              <div className={styles.marsMetric}>
                <div className={styles.marsMetricHead}>
                  <Gauge size={11} color="var(--ws-cyan)" />
                  <span>PRES</span>
                </div>
                <div className={styles.marsMetricBody}>
                  <span className={styles.marsMetricAvg}>
                    {data?.pressure?.avg?.toFixed(0) ?? "—"}
                    <small>{data?.pressure?.unit ?? "Pa"}</small>
                  </span>
                  <span className={styles.marsMetricRange}>
                    min {data?.pressure?.min?.toFixed(0) ?? "—"} /
                    max {data?.pressure?.max?.toFixed(0) ?? "—"}
                  </span>
                </div>
              </div>
            </div>

            {data?.lastUtc && (
              <div className={styles.marsFoot}>
                Last update · {new Date(data.lastUtc).toUTCString().slice(5, 22)} UTC
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
