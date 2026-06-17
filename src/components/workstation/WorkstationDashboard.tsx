import { useState } from "react";
import PageTransition from "../ui/PageTransition";
import ApodHero from "./ApodHero";
import NeoFeed from "./NeoFeed";
import MarsRoverFeed from "./MarsRoverFeed";
import SpaceWeatherPanel from "./SpaceWeatherPanel";
import ProfileNode from "./ProfileNode";
import styles from "./Workstation.module.css";

const NAV_LINKS = [
  { id: "accueil", label: "Accueil" },
  { id: "veille", label: "Veille" },
  { id: "systeme", label: "Système" },
  { id: "quiz", label: "Quiz" },
];

export default function WorkstationDashboard() {
  const [active, setActive] = useState("accueil");
  const now = new Date();
  const utc = now.toISOString().split("T")[1].slice(0, 8);
  const julian = 2460000 + (now.getTime() / 86400000 - 2440587.5);

  return (
    <PageTransition>
      <div className={styles.root}>
        <div className={styles.container}>
          {/* ---- TOP BAR ---- */}
          <header className={styles.topbar}>
            <div className={styles.brand}>
              <div className={styles.brandMark} />
              <div className={styles.brandText}>
                <span className={styles.brandTitle}>Astro · Workstation</span>
                <span className={styles.brandSub}>
                  LES ENGHIENNOIS ASTRONOMES · v0.1
                </span>
              </div>
            </div>

            <nav className={styles.topNav}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  className={`${styles.topLink} ${
                    active === link.id ? styles.topLinkActive : ""
                  }`}
                  onClick={() => setActive(link.id)}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className={styles.topMeta}>
              <div className={styles.topMetaItem}>
                <span className={styles.topMetaDot} />
                <span>FEED · LIVE</span>
              </div>
              <span>UTC {utc}</span>
              <span>JD {julian.toFixed(4)}</span>
            </div>
          </header>

          {/* ---- GRID WORKSTATION ---- */}
          <div className={styles.grid}>
            <ApodHero />
            <NeoFeed />
            <MarsRoverFeed />
            <SpaceWeatherPanel />
            <ProfileNode />
          </div>

          {/* ---- STATUS BAR ---- */}
          <div className={styles.statusbar}>
            <div className={styles.statusbarGroup}>
              <div className={styles.statusbarItem}>
                <span>SYS</span>
                <span className={styles.statusbarItemVal}>ONLINE</span>
              </div>
              <div className={styles.statusbarItem}>
                <span>APIs</span>
                <span className={styles.statusbarItemVal}>
                  NASA · DONKI · NeoWs
                </span>
              </div>
              <div className={styles.statusbarItem}>
                <span>LATENCY</span>
                <span className={styles.statusbarItemVal}>42ms</span>
              </div>
            </div>
            <div className={styles.statusbarGroup}>
              <div className={styles.statusbarItem}>
                <span>BUILD</span>
                <span className={styles.statusbarItemVal}>2026.06.16-α</span>
              </div>
              <div className={styles.statusbarItem}>
                <span>REGION</span>
                <span className={styles.statusbarItemVal}>FR · ENGHIEN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
