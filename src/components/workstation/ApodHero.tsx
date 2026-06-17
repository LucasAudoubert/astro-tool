import { useEffect, useState } from "react";
import { ArrowUpRight, Crosshair, ExternalLink, Loader2 } from "lucide-react";
import { fetchApod } from "../../services/proxyClient";
import styles from "./Workstation.module.css";

interface ApodHeroProps {
  onExplore?: () => void;
}

export default function ApodHero({ onExplore }: ApodHeroProps) {
  const [hovered, setHovered] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchApod>>["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchApod()
      .then((res) => alive && setData(res.data))
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  // Fallback values when the proxy isn't reachable
  const date = data?.date || "—";
  const title = data?.title || "Nébuleuse de l'Hélice — NGC 7293";
  const explanation = data?.explanation?.slice(0, 140) || "650 ly · constellation Aquarius · magnitude +7.6";
  const mediaUrl = data?.url;

  return (
    <section className={`${styles.panel} ${styles.col12} ${styles.hero}`}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>
          <span className={styles.panelDot} />
          APOD · NASA Astronomy Picture of the Day
        </div>
        <div className={styles.panelMeta}>
          {loading ? (
            <span className={styles.badgeCyan}>
              <Loader2 size={9} style={{ marginRight: 4, animation: "spin 1s linear infinite" }} />
              FETCH
            </span>
          ) : error ? (
            <span style={{ color: "var(--ws-alert)" }}>● OFFLINE</span>
          ) : (
            <span className={styles.badgeCyan}>● {data?.cached ? "CACHED" : "LIVE"}</span>
          )}
          <span>FEATURE FEED</span>
          <span>{date}</span>
        </div>
      </div>

      <div
        className={styles.heroFrame}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {mediaUrl && data?.media_type === "image" ? (
          <img
            src={mediaUrl}
            alt={title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.85,
            }}
          />
        ) : (
          <>
            <div className={styles.heroObject} />
            <div className={styles.crosshair} />
          </>
        )}

        <div className={`${styles.heroOverlay} ${styles.heroOverlayTL}`}>
          <Crosshair size={9} style={{ marginRight: 6, verticalAlign: -1 }} />
          {data ? `RA ${data.date}` : "RA 22h 29m 38s"}
        </div>
        <div className={`${styles.heroOverlay} ${styles.heroOverlayTR}`}>
          {data ? `EXP ${explanation.split(".")[0]}` : "DEC −20° 50' 14\""}
        </div>
        <div className={`${styles.heroOverlay} ${styles.heroOverlayBL}`}>
          {data?.copyright?.slice(0, 24) || "EXP 1h 12m"}
        </div>
        <div
          className={`${styles.heroOverlay} ${styles.heroOverlayBR}`}
          style={{ opacity: hovered ? 1 : 0.4 }}
        >
          HUBBLE · WFC3
        </div>
      </div>

      <div className={styles.heroFooter}>
        <div className={styles.heroTitleBlock}>
          <span className={styles.heroKicker}>// DAILY TARGET</span>
          <span className={styles.heroTitle}>{title}</span>
          <span className={styles.heroSub}>
            {data?.date
              ? `${data.media_type} · ${data.copyright?.slice(0, 40) || "Public domain"}`
              : "650 ly · constellation Aquarius · magnitude +7.6"}
          </span>
        </div>
        <div className={styles.heroCtaRow}>
          <button
            className={styles.heroCtaGhost}
            onClick={() =>
              window.open(mediaUrl || "https://apod.nasa.gov", "_blank")
            }
          >
            Source
            <ExternalLink size={11} />
          </button>
          <button className={styles.heroCta} onClick={onExplore}>
            Explorer maintenant
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}
