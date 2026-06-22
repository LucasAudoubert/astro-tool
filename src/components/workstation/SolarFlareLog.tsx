import { useEffect, useMemo, useState } from "react";
import { Loader2, Sun } from "lucide-react";
import { fetchSolarFlares, type SolarFlare } from "../../services/proxyClient";
import styles from "./Workstation.module.css";

const FLARE_COLORS: Record<string, string> = {
  X: "#ff4d4d",
  M: "#fca311",
  C: "#4fa3e0",
  B: "#8a8a93",
};

/**
 * DONKI · Solar Flare Log.
 * Lists recent GOES-class solar flares (B/C/M/X), color-coded by intensity.
 */
export default function SolarFlareLog() {
  const [flares, setFlares] = useState<SolarFlare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [windowDays, setWindowDays] = useState<7 | 14 | 30>(7);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    const startDate = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    fetchSolarFlares(startDate)
      .then((res) => alive && setFlares(res.flares))
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [windowDays]);

  // Stats par classe
  const stats = useMemo(() => {
    const acc: Record<string, number> = { X: 0, M: 0, C: 0, B: 0 };
    for (const f of flares) {
      const cls = (f.classType || "B").charAt(0);
      if (cls in acc) acc[cls]++;
    }
    return acc;
  }, [flares]);

  const strongest = flares[0];

  return (
    <section className={`${styles.panel} ${styles.col4}`}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>
          <span className={styles.panelDot} />
          DONKI · Solar Flare Log
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
          ) : error ? (
            <span style={{ color: "var(--ws-alert)" }}>● OFFLINE</span>
          ) : (
            <span className={styles.badgeCyan}>● {flares.length} FLARES</span>
          )}
          <span>GOES X-RAY</span>
        </div>
      </div>

      <div className={styles.panelBody}>
        {/* Window selector */}
        <div className={styles.flareWindow}>
          <span className={styles.filterLabel}>WINDOW</span>
          {([7, 14, 30] as const).map((d) => (
            <button
              key={d}
              className={`${styles.filterChip} ${
                windowDays === d ? styles.filterChipActive : ""
              }`}
              onClick={() => setWindowDays(d)}
            >
              {d}J
            </button>
          ))}
        </div>

        {/* Intensity bar */}
        <div className={styles.flareStats}>
          {(["X", "M", "C", "B"] as const).map((cls) => (
            <div key={cls} className={styles.flareStatCell}>
              <span
                className={styles.flareStatKey}
                style={{ color: FLARE_COLORS[cls] }}
              >
                {cls}
              </span>
              <span className={styles.flareStatVal}>{stats[cls]}</span>
              <div
                className={styles.flareStatBar}
                style={{
                  width: `${Math.min(100, stats[cls] * 12)}%`,
                  background: FLARE_COLORS[cls],
                }}
              />
            </div>
          ))}
        </div>

        {/* Strongest flare callout */}
        {strongest && (
          <div className={styles.flareCallout}>
            <Sun size={11} style={{ color: FLARE_COLORS[strongest.classType.charAt(0)] }} />
            <span className={styles.flareCalloutLabel}>PEAK</span>
            <span
              className={styles.flareCalloutClass}
              style={{ color: FLARE_COLORS[strongest.classType.charAt(0)] }}
            >
              {strongest.classType}
            </span>
            <span className={styles.flareCalloutMeta}>
              {new Date(strongest.peakTime).toUTCString().slice(5, 22)}
              {strongest.activeRegion ? ` · AR${strongest.activeRegion}` : ""}
            </span>
          </div>
        )}

        {/* Recent flares list */}
        <div className={styles.flareList}>
          {flares.slice(0, 8).map((f) => {
            const cls = f.classType.charAt(0);
            return (
              <div key={f.flrID} className={styles.flareRow}>
                <span
                  className={styles.flareClass}
                  style={{
                    background: `${FLARE_COLORS[cls]}22`,
                    color: FLARE_COLORS[cls],
                    borderColor: `${FLARE_COLORS[cls]}55`,
                  }}
                >
                  {f.classType}
                </span>
                <span className={styles.flareTime}>
                  {new Date(f.peakTime).toISOString().slice(5, 16).replace("T", " ")}
                </span>
                <span className={styles.flareRegion}>
                  {f.activeRegion ? `AR${f.activeRegion}` : "—"}
                </span>
              </div>
            );
          })}
          {!loading && flares.length === 0 && (
            <span className={styles.flareEmpty}>
              Aucune éruption sur la fenêtre sélectionnée.
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
