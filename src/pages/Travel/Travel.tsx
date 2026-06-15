import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Clock, Ruler } from "lucide-react";
import Header from "../../components/layout/Header";
import PageTransition from "../../components/ui/PageTransition";
import Card from "../../components/ui/Card";
import {
  SPEED_OF_LIGHT,
  astronomicalDistances,
  LIGHT_YEAR_KM,
  AU_KM,
} from "../../data/constants";
import styles from "./Travel.module.css";

type Tab = "voyage" | "relativity" | "distances";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "voyage", label: "Voyage spatial", icon: <Rocket size={16} /> },
  { id: "relativity", label: "Relativité", icon: <Clock size={16} /> },
  { id: "distances", label: "Distances cosmiques", icon: <Ruler size={16} /> },
];

export default function Travel() {
  const [activeTab, setActiveTab] = useState<Tab>("voyage");

  return (
    <PageTransition>
      <Header
        title="Voyage spatial & Distances"
        subtitle="Explore les distances et le temps dans l'univers"
      />
      <div className={styles.page}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {activeTab === tab.id && (
                <motion.div
                  className={styles.tabBg}
                  layoutId="travel-tab"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "voyage" && <VoyageSimulator key="voyage" />}
          {activeTab === "relativity" && (
            <RelativityComparator key="relativity" />
          )}
          {activeTab === "distances" && <DistanceExplorer key="distances" />}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

/* ---- Voyage simulator with animation ---- */
function VoyageSimulator() {
  const [speedPercent, setSpeedPercent] = useState(50);
  const [destination, setDestination] = useState("Proxima Centauri");
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const destinations = [
    { name: "Lune", distKm: 384400 },
    { name: "Mars", distKm: 225e6 },
    { name: "Jupiter", distKm: 778e6 },
    { name: "Neptune", distKm: 4.5e9 },
    { name: "Proxima Centauri", distKm: 4.24 * LIGHT_YEAR_KM },
    { name: "Sirius", distKm: 8.6 * LIGHT_YEAR_KM },
    { name: "Andromède", distKm: 2.537e6 * LIGHT_YEAR_KM },
  ];

  const dest =
    destinations.find((d) => d.name === destination) ?? destinations[4];
  const speedKmS = (speedPercent / 100) * SPEED_OF_LIGHT;
  const travelTimeSec = dest.distKm / speedKmS;
  const lorentzFactor = 1 / Math.sqrt(1 - Math.pow(speedPercent / 100, 2));
  const travelerTimeSec = travelTimeSec / lorentzFactor;

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds.toFixed(1)} s`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(1)} min`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} h`;
    if (seconds < 365.25 * 86400)
      return `${(seconds / 86400).toFixed(1)} jours`;
    return `${(seconds / (365.25 * 86400)).toFixed(2)} ans`;
  };

  useEffect(() => {
    if (animating) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setAnimating(false), 1500);
            return 100;
          }
          return p + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [animating]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={styles.section}
    >
      <div className={styles.controlsGrid}>
        <div className={styles.control}>
          <label className={styles.label}>Destination</label>
          <select
            className={styles.select}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            {destinations.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.control}>
          <label className={styles.label}>
            Vitesse: {speedPercent}% de c (
            {speedKmS.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}{" "}
            km/s)
          </label>
          <input
            type="range"
            min={1}
            max={99}
            value={speedPercent}
            onChange={(e) => setSpeedPercent(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>

      {/* Voyage animation */}
      <div className={styles.voyageScene}>
        <div className={styles.voyageTrack}>
          {/* Star streaks */}
          {animating &&
            Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className={styles.starStreak}
                initial={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0,
                }}
                animate={{ left: "-10%", opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.4 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                }}
              />
            ))}

          <div className={styles.voyageStart}>
            <div className={styles.voyageEarth} />
          </div>
          <div className={styles.voyagePath}>
            <div className={styles.voyagePathLine} />
            <motion.div
              className={styles.voyageRocket}
              animate={{ left: animating ? `${progress}%` : "0%" }}
              transition={{ duration: 0.1 }}
            >
              <div className={styles.voyageRocketIcon} />
            </motion.div>
          </div>
          <div className={styles.voyageEnd}>
            <div className={styles.voyageStar} />
          </div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <motion.div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        <motion.button
          className={styles.launchBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAnimating(true)}
          disabled={animating}
        >
          {animating ? `En route... ${progress}%` : "Lancer le voyage !"}
        </motion.button>
      </div>

      {/* Results */}
      <div className={styles.resultsRow}>
        <Card hover={false} className={styles.resultBox}>
          <span className={styles.resultLabel}>Distance</span>
          <span className={styles.resultValue}>
            {dest.distKm.toExponential(2)} km
          </span>
        </Card>
        <Card hover={false} className={styles.resultBox}>
          <span className={styles.resultLabel}>Temps (observateur Terre)</span>
          <span className={styles.resultValue}>
            {formatTime(travelTimeSec)}
          </span>
        </Card>
        <Card hover={false} className={styles.resultBox}>
          <span className={styles.resultLabel}>Temps (voyageur)</span>
          <span
            className={styles.resultValue}
            style={{ color: "var(--accent-secondary)" }}
          >
            {formatTime(travelerTimeSec)}
          </span>
        </Card>
        <Card hover={false} className={styles.resultBox}>
          <span className={styles.resultLabel}>Facteur de Lorentz</span>
          <span className={styles.resultValue}>{lorentzFactor.toFixed(4)}</span>
        </Card>
      </div>
    </motion.div>
  );
}

/* ---- Relativité ---- */
function RelativityComparator() {
  const [speedPercent, setSpeedPercent] = useState(90);
  const [earthYears, setEarthYears] = useState(10);

  const gamma = 1 / Math.sqrt(1 - Math.pow(speedPercent / 100, 2));
  const travelerYears = earthYears / gamma;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={styles.section}
    >
      <div className={styles.controlsGrid}>
        <div className={styles.control}>
          <label className={styles.label}>Vitesse: {speedPercent}% de c</label>
          <input
            type="range"
            min={1}
            max={99}
            value={speedPercent}
            onChange={(e) => setSpeedPercent(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
        <div className={styles.control}>
          <label className={styles.label}>
            Temps écoulé sur Terre: {earthYears} ans
          </label>
          <input
            type="range"
            min={1}
            max={100}
            value={earthYears}
            onChange={(e) => setEarthYears(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>

      {/* Visual comparison */}
      <div className={styles.relativityVisual}>
        <div className={styles.timeColumn}>
          <div className={styles.timeIconEarth} />
          <span className={styles.timeLabel}>Observateur (Terre)</span>
          <motion.div className={styles.clockFace}>
            <motion.div
              className={styles.clockHand}
              animate={{ rotate: 360 * earthYears }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          <span className={styles.timeValue}>{earthYears} ans</span>
        </div>

        <div className={styles.timeSeparator}>
          <span className={styles.gammaLabel}>γ = {gamma.toFixed(3)}</span>
          <div className={styles.separatorLine} />
        </div>

        <div className={styles.timeColumn}>
          <div className={styles.timeIconRocket} />
          <span className={styles.timeLabel}>Voyageur</span>
          <motion.div className={styles.clockFace}>
            <motion.div
              className={styles.clockHandSlow}
              animate={{ rotate: 360 * travelerYears }}
              transition={{
                duration: 3 * gamma,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
          <span
            className={styles.timeValue}
            style={{ color: "var(--accent-secondary)" }}
          >
            {travelerYears.toFixed(2)} ans
          </span>
        </div>
      </div>

      <Card hover={false} className={styles.explanation}>
        <p>
          À <strong>{speedPercent}%</strong> de la vitesse de la lumière, le
          temps pour le voyageur passe <strong>{gamma.toFixed(2)}×</strong> plus
          lentement.
        </p>
        <p>
          Quand {earthYears} ans passent sur Terre, seulement{" "}
          <strong>{travelerYears.toFixed(2)} ans</strong> s'écoulent pour le
          voyageur.
        </p>
        {speedPercent >= 90 && (
          <p className={styles.funFact}>
            💡 Si tu voyageais à {speedPercent}% de c pendant 10 ans terrestres,
            tu reviendrais plus jeune de{" "}
            {(earthYears - travelerYears).toFixed(2)} ans par rapport à tes amis
            !
          </p>
        )}
      </Card>
    </motion.div>
  );
}

/* ---- Distances cosmiques ---- */
function DistanceExplorer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={styles.section}
    >
      <p className={styles.sectionIntro}>
        Compare les distances entre les objets astronomiques. Les échelles sont
        logarithmiques pour pouvoir tout visualiser.
      </p>

      <div className={styles.distanceList}>
        {astronomicalDistances.map((item, i) => {
          let distKm: number;
          if (item.unit === "UA") distKm = item.distance * AU_KM;
          else if (item.unit === "al") distKm = item.distance * LIGHT_YEAR_KM;
          else distKm = item.distance;

          const logDist = Math.log10(distKm);
          const maxLog = Math.log10(2.537e6 * LIGHT_YEAR_KM);
          const percent = (logDist / maxLog) * 100;

          return (
            <motion.div
              key={item.name}
              className={styles.distanceItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * i }}
            >
              <div className={styles.distanceInfo}>
                <span className={styles.distanceName}>{item.name}</span>
                <span className={styles.distanceVal}>
                  {item.distance.toLocaleString("fr-FR")} {item.unit}
                </span>
              </div>
              <div className={styles.distanceBarWrap}>
                <motion.div
                  className={styles.distanceBar}
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1, delay: 0.08 * i }}
                />
                <span className={styles.distanceKm}>
                  {distKm.toExponential(2)} km
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
