import styles from "./Workstation.module.css";

interface Metric {
  key: string;
  label: string;
  value: string;
  percent: number;
  unit: string;
}

interface SpaceWeatherPanelProps {
  metrics?: Metric[];
  kpIndex?: string;
  solarFlux?: string;
  protonFlux?: string;
}

const defaultMetrics: Metric[] = [
  {
    key: "WIND",
    label: "Solar Wind Speed",
    value: "487",
    percent: 62,
    unit: "km/s",
  },
  {
    key: "DENS",
    label: "Proton Density",
    value: "8.2",
    percent: 41,
    unit: "p/cm³",
  },
  {
    key: "FLUX",
    label: "X-Ray Flux",
    value: "C2.4",
    percent: 35,
    unit: "class",
  },
  {
    key: "MAG",
    label: "IMF Magnitude",
    value: "6.1",
    percent: 48,
    unit: "nT",
  },
];

export default function SpaceWeatherPanel({
  metrics = defaultMetrics,
  kpIndex = "Kp 3 · Unsettled",
  solarFlux = "142 sfu",
  protonFlux = "0.21 pfu",
}: SpaceWeatherPanelProps) {
  return (
    <section className={`${styles.panel} ${styles.col4}`}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>
          <span className={styles.panelDot} />
          DONKI · Space Weather
        </div>
        <div className={styles.panelMeta}>
          <span className={styles.badgeCyan}>NOMINAL</span>
          <span>NOAA SWPC</span>
        </div>
      </div>

      <div className={styles.panelBody}>
        <div className={styles.weatherRows}>
          {metrics.map((m) => (
            <div key={m.key} className={styles.weatherRow}>
              <div className={styles.weatherRowHead}>
                <span className={styles.weatherRowLabel}>
                  <span className={styles.weatherRowLabelKey}>{m.key}</span>
                  {m.label}
                </span>
                <span className={styles.weatherRowValue}>
                  {m.value} <span style={{ opacity: 0.5 }}>{m.unit}</span>
                </span>
              </div>
              <div className={styles.weatherBar}>
                <div
                  className={styles.weatherBarFill}
                  style={{ width: `${m.percent}%` }}
                />
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.weatherBarSeg}
                    style={{ left: `${(i + 1) * 10}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.weatherStatusRow}>
          <div className={styles.weatherStatusCell}>
            <span className={styles.weatherStatusKey}>Kp INDEX</span>
            <span className={styles.weatherStatusValCyan}>{kpIndex}</span>
          </div>
          <div className={styles.weatherStatusCell}>
            <span className={styles.weatherStatusKey}>SOLAR FLUX</span>
            <span className={styles.weatherStatusVal}>{solarFlux}</span>
          </div>
          <div className={styles.weatherStatusCell}>
            <span className={styles.weatherStatusKey}>PROTON FLUX</span>
            <span className={styles.weatherStatusVal}>{protonFlux}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
