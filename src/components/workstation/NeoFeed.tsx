import styles from "./Workstation.module.css";

interface NeoObject {
  id: string;
  name: string;
  category: string;
  distance: string;
  velocity: string;
  hazardous: boolean;
  missDistance?: string;
}

interface NeoFeedProps {
  objects?: NeoObject[];
}

const defaultObjects: NeoObject[] = [
  {
    id: "2026-KL7",
    name: "2026 KL7",
    category: "Apollo",
    distance: "0.024 AU",
    velocity: "12.4 km/s",
    hazardous: true,
    missDistance: "≈ 3.6 M km",
  },
  {
    id: "2026-JR2",
    name: "2026 JR2",
    category: "Aten",
    distance: "0.187 AU",
    velocity: "8.1 km/s",
    hazardous: false,
    missDistance: "≈ 28 M km",
  },
  {
    id: "2026-HQ9",
    name: "2026 HQ9",
    category: "Amor",
    distance: "0.092 AU",
    velocity: "15.7 km/s",
    hazardous: true,
    missDistance: "≈ 13.8 M km",
  },
  {
    id: "2026-MX1",
    name: "2026 MX1",
    category: "Apollo",
    distance: "0.341 AU",
    velocity: "6.2 km/s",
    hazardous: false,
    missDistance: "≈ 51 M km",
  },
  {
    id: "2026-BF4",
    name: "2026 BF4",
    category: "Aten",
    distance: "0.056 AU",
    velocity: "18.3 km/s",
    hazardous: true,
    missDistance: "≈ 8.4 M km",
  },
];

export default function NeoFeed({ objects = defaultObjects }: NeoFeedProps) {
  return (
    <section className={`${styles.panel} ${styles.col6}`}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>
          <span className={styles.panelDot} />
          NeoWs · Near-Earth Object Radar
        </div>
        <div className={styles.panelMeta}>
          <span className={styles.badgeCyan}>{objects.length} TRACKED</span>
          <span>7-DAY WINDOW</span>
        </div>
      </div>

      <div className={styles.neoList}>
        <div className={styles.neoHeader}>
          <span>OBJECT ID</span>
          <span>DISTANCE</span>
          <span>VELOCITY</span>
          <span>STATUS</span>
        </div>

        {objects.map((obj) => (
          <div key={obj.id} className={styles.neoRow}>
            <div className={styles.neoName}>
              <span className={styles.neoNameMain}>{obj.name}</span>
              <span className={styles.neoNameSub}>
                Class · {obj.category} · miss {obj.missDistance}
              </span>
            </div>
            <span className={styles.neoMetric}>{obj.distance}</span>
            <span className={`${styles.neoMetric} ${styles.neoMetricDim}`}>
              {obj.velocity}
            </span>
            <span
              className={`${styles.neoBadge} ${
                obj.hazardous ? styles.badgeHazard : styles.badgeSafe
              }`}
            >
              {obj.hazardous ? "● Potentially hazardous" : "○ Nominal"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
