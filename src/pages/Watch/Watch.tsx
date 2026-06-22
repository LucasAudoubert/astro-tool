import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudSun,
  CalendarDays,
  Satellite,
  Telescope,
  Sparkles,
  Radio,
  Construction,
  ArrowRight,
} from "lucide-react";
import Header from "../../components/layout/Header";
import PageTransition from "../../components/ui/PageTransition";
import WeatherFullscreen from "./WeatherFullscreen";
import styles from "./Watch.module.css";

/**
 * Page Veille astronomique — hub de surveillance.
 * Menu principal avec options; la météo est active, le reste en construction.
 */
type WatchView = "menu" | "weather";

interface WatchOption {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  status: "live" | "soon";
  /** Si défini, un clic ouvre le fullscreen. Sinon affiche "bientôt". */
  view?: WatchView;
}

const OPTIONS: WatchOption[] = [
  {
    id: "weather",
    title: "Météo astronomique",
    desc: "Couverture nuageuse, seeing, transparence — prévisions 72h via Astrospheric.",
    icon: <CloudSun size={22} />,
    status: "live",
    view: "weather",
  },
  {
    id: "showers",
    title: "Pluies de météores",
    desc: "Calendrier annuel des essaims, pics d'activité et conditions d'observation.",
    icon: <Sparkles size={22} />,
    status: "soon",
  },
  {
    id: "eclipses",
    title: "Éclipses & transits",
    desc: "Prochains événements, cartes de visibilité et compte à rebours.",
    icon: <CalendarDays size={22} />,
    status: "soon",
  },
  {
    id: "satellites",
    title: "Passages satellites",
    desc: "Trajectoires ISS, Hubble et autres en temps réel au-dessus d'Enghien.",
    icon: <Satellite size={22} />,
    status: "soon",
  },
  {
    id: "deepsky",
    title: "Objets du ciel profond",
    desc: "Suggestions du soir : nébuleuses, amas et galaxies selon la saison.",
    icon: <Telescope size={22} />,
    status: "soon",
  },
  {
    id: "alerts",
    title: "Alertes & radio",
    desc: "Sursauts radio solaires, alertes NOAA SWPC, flux en direct.",
    icon: <Radio size={22} />,
    status: "soon",
  },
];

export default function Watch() {
  const [view, setView] = useState<WatchView>("menu");

  return (
    <PageTransition>
      <Header
        title="Veille astronomique"
        subtitle="Surveillance en temps réel & alertes astronomiques"
      />

      <AnimatePresence mode="wait">
        {view === "menu" && (
          <motion.div
            key="menu"
            className={styles.page}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <div className={styles.heroBanner}>
              <div className={styles.heroBannerContent}>
                <span className={styles.kicker}>SURVEILLANCE · LIVE</span>
                <h2 className={styles.heroTitle}>
                  Que veux-tu observer ce soir ?
                </h2>
                <p className={styles.heroSub}>
                  Sélectionne un module de veille pour ouvrir un tableau de bord
                  spécialisé. Les modules actifs sont marqués{" "}
                  <span className={styles.liveDot}>●</span>{" "}
                  <strong>LIVE</strong>, les autres arrivent progressivement.
                </p>
              </div>
              <div className={styles.heroOrnament} aria-hidden>
                <div className={styles.heroOrbit} />
                <div className={styles.heroOrbitSmall} />
                <div className={styles.heroStar} />
              </div>
            </div>

            <div className={styles.grid}>
              {OPTIONS.map((opt, i) => (
                <motion.button
                  key={opt.id}
                  className={`${styles.card} ${
                    opt.status === "soon" ? styles.cardSoon : ""
                  }`}
                  onClick={() => opt.view && setView(opt.view)}
                  disabled={opt.status === "soon"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                  whileHover={opt.status === "live" ? { y: -3 } : undefined}
                  whileTap={opt.status === "live" ? { scale: 0.98 } : undefined}
                >
                  <div className={styles.cardTop}>
                    <span
                      className={`${styles.cardIcon} ${
                        opt.status === "live" ? styles.cardIconLive : ""
                      }`}
                    >
                      {opt.status === "soon" ? (
                        <Construction size={20} />
                      ) : (
                        opt.icon
                      )}
                    </span>
                    <span
                      className={`${styles.cardStatus} ${
                        opt.status === "live"
                          ? styles.cardStatusLive
                          : styles.cardStatusSoon
                      }`}
                    >
                      {opt.status === "live" ? "● LIVE" : "Bientôt"}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{opt.title}</h3>
                  <p className={styles.cardDesc}>{opt.desc}</p>
                  {opt.status === "live" && (
                    <span className={styles.cardCta}>
                      Ouvrir le module <ArrowRight size={14} />
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {view === "weather" && (
          <WeatherFullscreen key="weather" onBack={() => setView("menu")} />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
