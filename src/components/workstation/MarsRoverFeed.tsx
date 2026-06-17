import { useState } from "react";
import styles from "./Workstation.module.css";

interface MarsRoverFeedProps {
  sols?: string[];
  cameras?: string[];
  onSelectImage?: (id: number) => void;
}

const defaultSols = ["SOL 1247", "SOL 1246", "SOL 1245", "SOL 1244"];
const defaultCameras = ["ALL", "MASTCAM-Z", "NAVCAM", "FRONT HAZCAM"];

export default function MarsRoverFeed({
  sols = defaultSols,
  cameras = defaultCameras,
  onSelectImage,
}: MarsRoverFeedProps) {
  const [activeSol, setActiveSol] = useState(sols[0]);
  const [activeCam, setActiveCam] = useState(cameras[0]);

  return (
    <section className={`${styles.panel} ${styles.col6}`}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>
          <span className={styles.panelDot} />
          Mars Perseverance · Raw Downlink
        </div>
        <div className={styles.panelMeta}>
          <span>LIVE FEED</span>
          <span>JEZERO CRATER</span>
        </div>
      </div>

      <div className={styles.roverFilters}>
        <span className={styles.filterLabel}>SOL</span>
        {sols.map((sol) => (
          <button
            key={sol}
            className={`${styles.filterChip} ${
              activeSol === sol ? styles.filterChipActive : ""
            }`}
            onClick={() => setActiveSol(sol)}
          >
            {sol}
          </button>
        ))}
        <span
          className={styles.filterLabel}
          style={{ marginLeft: "0.75rem" }}
        >
          CAM
        </span>
        {cameras.map((cam) => (
          <button
            key={cam}
            className={`${styles.filterChip} ${
              activeCam === cam ? styles.filterChipActive : ""
            }`}
            onClick={() => setActiveCam(cam)}
          >
            {cam}
          </button>
        ))}
      </div>

      <div className={styles.roverGrid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={styles.roverItem}
            onClick={() => onSelectImage?.(i)}
          >
            <span className={styles.roverMetaTop}>{activeCam}</span>
            <div className={styles.roverMeta}>
              <span>IMG_{1247 + i}</span>
              <span>{(Math.random() * 0.9 + 0.1).toFixed(2)}MB</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
