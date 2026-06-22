import { useEffect, useState } from "react";
import { Loader2, Globe2, ExternalLink } from "lucide-react";
import { fetchEpic, type EpicResponse, type EpicImage } from "../../services/proxyClient";
import styles from "./Workstation.module.css";

/**
 * EPIC — Earth Polychromatic Imaging Camera (DSCOVR @ L1).
 * Shows the most recent full-disk Earth images captured from the Lagrange-1 point.
 */
export default function EpicEarthFeed() {
  const [data, setData] = useState<EpicResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<EpicImage | null>(null);

  useEffect(() => {
    let alive = true;
    fetchEpic()
      .then((res) => {
        if (!alive) return;
        setData(res);
        setSelected(res.images[0] ?? null);
      })
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const featured = selected ?? data?.images[0] ?? null;

  return (
    <section className={`${styles.panel} ${styles.col6}`}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>
          <span className={styles.panelDot} />
          EPIC · DSCOVR Earth Imagery
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
            <span className={styles.badgeCyan}>
              ● {data?.cached ? "CACHED" : "LIVE"}
            </span>
          )}
          <span>L1 HALO ORBIT</span>
          <span>{data?.date ?? "—"}</span>
        </div>
      </div>

      <div className={styles.epicLayout}>
        <div className={styles.epicHero}>
          {featured ? (
            <img
              src={featured.imageUrl}
              alt={featured.caption || "Earth from DSCOVR"}
              loading="lazy"
              className={styles.epicHeroImg}
            />
          ) : (
            <div className={styles.epicHeroFallback}>
              <Globe2 size={28} />
              <span>DSCOVR · 1.5 M km</span>
            </div>
          )}
          <div className={`${styles.heroOverlay} ${styles.heroOverlayTL}`}>
            <Globe2 size={9} style={{ marginRight: 6, verticalAlign: -1 }} />
            EARTH · FULL DISK
          </div>
          <div className={`${styles.heroOverlay} ${styles.heroOverlayTR}`}>
            {featured?.centroidLat !== undefined
              ? `LAT ${featured.centroidLat.toFixed(1)}°`
              : "LAT —"}
          </div>
          <div className={`${styles.heroOverlay} ${styles.heroOverlayBL}`}>
            {featured?.centroidLon !== undefined
              ? `LON ${featured.centroidLon.toFixed(1)}°`
              : "LON —"}
          </div>
          <div className={`${styles.heroOverlay} ${styles.heroOverlayBR}`}>
            {featured ? new Date(featured.date).toUTCString().slice(17, 22) : "—"} UTC
          </div>
        </div>

        <div className={styles.epicSide}>
          <div className={styles.epicSideHeader}>
            <span className={styles.filterLabel}>CAPTURE</span>
            <span className={styles.epicCaption}>
              {featured?.caption
                ? featured.caption.split(" ").slice(0, 3).join(" ")
                : "Earth · natural color"}
            </span>
          </div>
          <div className={styles.epicThumbs}>
            {(data?.images ?? []).slice(0, 6).map((img) => (
              <button
                key={img.identifier}
                className={`${styles.epicThumb} ${
                  selected?.identifier === img.identifier
                    ? styles.epicThumbActive
                    : ""
                }`}
                onClick={() => setSelected(img)}
                title={img.caption || img.identifier}
              >
                <img
                  src={img.thumbnailUrl}
                  alt={img.caption || img.identifier}
                  loading="lazy"
                />
              </button>
            ))}
            {data && data.images.length > 6 && (
              <span className={styles.epicThumbMore}>+{data.images.length - 6}</span>
            )}
          </div>
          {featured && (
            <a
              href={featured.imageUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.epicLink}
            >
              <ExternalLink size={10} />
              Full resolution · NASA EPIC
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
