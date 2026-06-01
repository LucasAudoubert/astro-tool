import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Sun, Maximize2, Trophy } from "lucide-react";
import Header from "../../components/layout/Header";
import PageTransition from "../../components/ui/PageTransition";
import Card from "../../components/ui/Card";
import { planets } from "../../data/planets";
import styles from "./SolarSystem.module.css";

type Tab = "orbits" | "sizes" | "ranking";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "orbits", label: "Orbites en temps réel", icon: <Sun size={16} /> },
  { id: "sizes", label: "Comparaison tailles", icon: <Maximize2 size={16} /> },
  { id: "ranking", label: "Jeu de classement", icon: <Trophy size={16} /> },
];

export default function SolarSystem() {
  const [activeTab, setActiveTab] = useState<Tab>("orbits");

  return (
    <PageTransition>
      <Header
        title="Système solaire"
        subtitle="Explore les planètes, leurs orbites et leurs tailles"
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
                  layoutId="solar-tab"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "orbits" && <OrbitsView key="orbits" />}
          {activeTab === "sizes" && <SizeComparison key="sizes" />}
          {activeTab === "ranking" && <RankingGame key="ranking" />}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

/* ---- Orbites en temps réel ---- */
function OrbitsView() {
  const [time, setTime] = useState(Date.now());
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 50 * speed);
    }, 50);
    return () => clearInterval(interval);
  }, [speed]);

  // Simplified orbital positions (angle based on orbital period)
  const getPlanetPosition = (orbitalPeriod: number, orbitRadius: number) => {
    const angle =
      (time / 1000) * (360 / (orbitalPeriod * 0.05)) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * orbitRadius,
      y: Math.sin(angle) * orbitRadius * 0.4, // elliptical perspective
    };
  };

  const orbitRadii = [50, 75, 100, 130, 175, 220, 265, 305];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={styles.section}
    >
      <div className={styles.speedControl}>
        <label className={styles.label}>Vitesse: ×{speed}</label>
        <input
          type="range"
          min={0.1}
          max={50}
          step={0.1}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.solarScene}>
        <div className={styles.solarContainer}>
          {/* Sun */}
          <motion.div
            className={styles.sun}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 30px #fdcb6e",
                "0 0 50px #fdcb6e",
                "0 0 30px #fdcb6e",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ☀️
          </motion.div>

          {/* Orbits & Planets */}
          {planets.map((planet, i) => {
            const radius = orbitRadii[i];
            const pos = getPlanetPosition(planet.orbitalPeriod, radius);
            const size = Math.max(12, Math.min(30, planet.radius / 3000));

            return (
              <div key={planet.name}>
                {/* Orbit path */}
                <div
                  className={styles.orbitPath}
                  style={{
                    width: radius * 2,
                    height: radius * 2 * 0.4,
                    marginLeft: -radius,
                    marginTop: -radius * 0.4,
                  }}
                />

                {/* Planet */}
                <motion.div
                  className={styles.planet}
                  style={{
                    width: size,
                    height: size,
                    background: planet.color,
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  title={planet.name}
                >
                  <span className={styles.planetLabel}>{planet.name}</span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Planet info cards */}
      <div className={styles.planetGrid}>
        {planets.map((planet, i) => (
          <motion.div
            key={planet.name}
            className={styles.planetInfo}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * i }}
          >
            <div
              className={styles.planetDot}
              style={{ background: planet.color }}
            />
            <span className={styles.planetName}>
              {planet.emoji} {planet.name}
            </span>
            <span className={styles.planetPeriod}>
              {planet.orbitalPeriod.toLocaleString("fr-FR")} j
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---- Comparaison des tailles ---- */
function SizeComparison() {
  const maxRadius = Math.max(...planets.map((p) => p.radius));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={styles.section}
    >
      <p className={styles.sectionIntro}>
        Les tailles sont proportionnelles aux vrais rayons des planètes.
      </p>

      <div className={styles.sizeContainer}>
        {planets.map((planet, i) => {
          const relSize = Math.max(16, (planet.radius / maxRadius) * 200);
          return (
            <motion.div
              key={planet.name}
              className={styles.sizeItem}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className={styles.sizeSphere}
                style={{
                  width: relSize,
                  height: relSize,
                  background: `radial-gradient(circle at 30% 30%, ${planet.color}dd, ${planet.color}44)`,
                  boxShadow: `0 0 ${relSize / 3}px ${planet.color}44`,
                }}
                whileHover={{ scale: 1.1 }}
              />
              <span className={styles.sizeName}>
                {planet.emoji} {planet.name}
              </span>
              <span className={styles.sizeValue}>
                {planet.radius.toLocaleString("fr-FR")} km
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ---- Jeu de classement ---- */
function RankingGame() {
  const criteria = [
    { label: "Taille (rayon)", key: "radius" as const, unit: "km" },
    { label: "Masse", key: "mass" as const, unit: "kg" },
    { label: "Gravité", key: "gravity" as const, unit: "m/s²" },
    {
      label: "Distance au Soleil",
      key: "distanceFromSun" as const,
      unit: "UA",
    },
  ];

  const [selectedCriteria, setSelectedCriteria] = useState(criteria[0]);
  const [items, setItems] = useState(() => shufflePlanets());
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  function shufflePlanets() {
    return [...planets].sort(() => Math.random() - 0.5);
  }

  const checkOrder = useCallback(() => {
    const sorted = [...planets].sort(
      (a, b) => b[selectedCriteria.key] - a[selectedCriteria.key],
    );
    let correct = 0;
    items.forEach((item, i) => {
      if (item.name === sorted[i].name) correct++;
    });
    setScore(correct);
    setChecked(true);
  }, [items, selectedCriteria]);

  const reset = () => {
    setItems(shufflePlanets());
    setChecked(false);
    setScore(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={styles.section}
    >
      <div className={styles.gameHeader}>
        <p className={styles.sectionIntro}>
          Classe les planètes du plus grand au plus petit selon le critère
          choisi. Glisse pour réorganiser !
        </p>
        <div className={styles.criteriaSelect}>
          {criteria.map((c) => (
            <button
              key={c.key}
              className={`${styles.criteriaBtn} ${selectedCriteria.key === c.key ? styles.criteriaBtnActive : ""}`}
              onClick={() => {
                setSelectedCriteria(c);
                reset();
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className={styles.rankList}
      >
        {items.map((planet, i) => {
          const correctSorted = [...planets].sort(
            (a, b) => b[selectedCriteria.key] - a[selectedCriteria.key],
          );
          const isCorrect = checked && planet.name === correctSorted[i]?.name;
          const isWrong = checked && !isCorrect;

          return (
            <Reorder.Item
              key={planet.name}
              value={planet}
              className={`${styles.rankItem} ${isCorrect ? styles.rankCorrect : ""} ${isWrong ? styles.rankWrong : ""}`}
              whileDrag={{
                scale: 1.02,
                boxShadow: "0 8px 32px rgba(108, 92, 231, 0.3)",
              }}
            >
              <span className={styles.rankPos}>{i + 1}</span>
              <span className={styles.rankEmoji}>{planet.emoji}</span>
              <span className={styles.rankName}>{planet.name}</span>
              {checked && (
                <span className={styles.rankVal}>
                  {selectedCriteria.key === "mass"
                    ? planet[selectedCriteria.key].toExponential(2)
                    : planet[selectedCriteria.key].toLocaleString("fr-FR")}{" "}
                  {selectedCriteria.unit}
                </span>
              )}
              <span className={styles.rankDrag}>⠿</span>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      <div className={styles.gameActions}>
        {!checked ? (
          <motion.button
            className={styles.checkBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkOrder}
          >
            Vérifier
          </motion.button>
        ) : (
          <>
            <Card hover={false} className={styles.scoreCard}>
              <span className={styles.scoreText}>
                {score === planets.length
                  ? "🎉 Parfait !"
                  : `${score}/${planets.length} correct${score !== null && score > 1 ? "s" : ""}`}
              </span>
            </Card>
            <motion.button
              className={styles.resetBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
            >
              Rejouer
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}
