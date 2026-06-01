import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Weight, ArrowDown, Zap, Orbit } from "lucide-react";
import Header from "../../components/layout/Header";
import PageTransition from "../../components/ui/PageTransition";
import Card from "../../components/ui/Card";
import { planets, moons, materials } from "../../data/planets";
import { G } from "../../data/constants";
import styles from "./Gravity.module.css";

type Tab = "weight" | "freefall" | "gravforce" | "escape";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "weight", label: "Poids planétaire", icon: <Weight size={16} /> },
  { id: "freefall", label: "Chute libre", icon: <ArrowDown size={16} /> },
  {
    id: "gravforce",
    label: "Force gravitationnelle",
    icon: <Orbit size={16} />,
  },
  { id: "escape", label: "Énergie de fuite", icon: <Zap size={16} /> },
];

export default function Gravity() {
  const [activeTab, setActiveTab] = useState<Tab>("weight");

  return (
    <PageTransition>
      <Header
        title="Gravité & Physique"
        subtitle="Calcule, simule et compare les forces de l'univers"
      />
      <div className={styles.page}>
        {/* Tabs */}
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
                  layoutId="gravity-tab"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "weight" && <WeightCalculator key="weight" />}
          {activeTab === "freefall" && <FreeFall key="freefall" />}
          {activeTab === "gravforce" && <GravForce key="gravforce" />}
          {activeTab === "escape" && <EscapeEnergy key="escape" />}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

/* ---- Poids sur les planètes ---- */
function WeightCalculator() {
  const [mass, setMass] = useState(70);
  const allBodies = [
    ...planets,
    ...moons.map((m) => ({ ...m, type: "moon" as const })),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={styles.section}
    >
      <div className={styles.inputRow}>
        <label className={styles.label}>Ta masse sur Terre (kg)</label>
        <input
          type="number"
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
          className={styles.input}
          min={1}
          max={500}
        />
        <input
          type="range"
          min={1}
          max={200}
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.resultGrid}>
        {allBodies.map((body, i) => {
          const weight = (mass * body.gravity).toFixed(1);
          const ratio = body.gravity / 9.81;
          return (
            <motion.div
              key={body.name}
              className={styles.resultCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04 * i }}
            >
              <span className={styles.resultEmoji}>{body.emoji}</span>
              <span className={styles.resultName}>{body.name}</span>
              <span className={styles.resultWeight}>{weight} kg</span>
              <div className={styles.barWrap}>
                <motion.div
                  className={styles.bar}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(ratio * 100, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.04 * i }}
                  style={{
                    background:
                      ratio > 1
                        ? "linear-gradient(90deg, #ff6b6b, #ee5a24)"
                        : "linear-gradient(90deg, #6c5ce7, #a29bfe)",
                  }}
                />
              </div>
              <span className={styles.resultGravity}>{body.gravity} m/s²</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ---- Chute libre ---- */
function FreeFall() {
  const [height, setHeight] = useState(100);
  const [selectedPlanet, setSelectedPlanet] = useState(planets[2]); // Earth
  const [selectedMaterial, setSelectedMaterial] = useState(materials[3]); // Aluminium
  const [dropping, setDropping] = useState(false);

  const g = selectedPlanet.gravity;
  const fallTime = Math.sqrt((2 * height) / g);
  const finalSpeed = g * fallTime;
  const cubeMass = selectedMaterial.density; // 1m³
  const impactForce = cubeMass * finalSpeed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={styles.section}
    >
      <div className={styles.controlsGrid}>
        <div className={styles.control}>
          <label className={styles.label}>Planète</label>
          <select
            className={styles.select}
            value={selectedPlanet.name}
            onChange={(e) => {
              const p = planets.find((p) => p.name === e.target.value);
              if (p) setSelectedPlanet(p);
            }}
          >
            {planets.map((p) => (
              <option key={p.name} value={p.name}>
                {p.emoji} {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.control}>
          <label className={styles.label}>Matériau (cube 1m³)</label>
          <select
            className={styles.select}
            value={selectedMaterial.name}
            onChange={(e) => {
              const m = materials.find((m) => m.name === e.target.value);
              if (m) setSelectedMaterial(m);
            }}
          >
            {materials.map((m) => (
              <option key={m.name} value={m.name}>
                {m.emoji} {m.name} ({m.density} kg/m³)
              </option>
            ))}
          </select>
        </div>
        <div className={styles.control}>
          <label className={styles.label}>Hauteur: {height} m</label>
          <input
            type="range"
            min={1}
            max={1000}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>

      {/* Animation area */}
      <div className={styles.simArea}>
        <div className={styles.simBackground}>
          <div
            className={styles.simSurface}
            style={{ background: selectedPlanet.color }}
          />
          <motion.div
            className={styles.cube}
            animate={dropping ? { y: 260 } : { y: 0 }}
            transition={
              dropping
                ? { duration: fallTime * 0.5, ease: [0.4, 0, 1, 1] }
                : { duration: 0.3 }
            }
            onAnimationComplete={() => {
              if (dropping) setTimeout(() => setDropping(false), 1500);
            }}
          >
            <span>{selectedMaterial.emoji}</span>
          </motion.div>
          {dropping && (
            <motion.div
              className={styles.impactRing}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.6, delay: fallTime * 0.5 }}
              style={{ background: selectedPlanet.color }}
            />
          )}
        </div>
        <motion.button
          className={styles.dropBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDropping(true)}
          disabled={dropping}
        >
          {dropping ? "En chute..." : "Lâcher !"}
        </motion.button>
      </div>

      {/* Results */}
      <div className={styles.resultsRow}>
        <Card hover={false} className={styles.resultBox}>
          <span className={styles.resultBoxLabel}>Temps de chute</span>
          <span className={styles.resultBoxValue}>{fallTime.toFixed(2)} s</span>
        </Card>
        <Card hover={false} className={styles.resultBox}>
          <span className={styles.resultBoxLabel}>Vitesse d'impact</span>
          <span className={styles.resultBoxValue}>
            {finalSpeed.toFixed(1)} m/s
          </span>
        </Card>
        <Card hover={false} className={styles.resultBox}>
          <span className={styles.resultBoxLabel}>Masse du cube</span>
          <span className={styles.resultBoxValue}>
            {cubeMass.toLocaleString()} kg
          </span>
        </Card>
        <Card hover={false} className={styles.resultBox}>
          <span className={styles.resultBoxLabel}>Force d'impact</span>
          <span className={styles.resultBoxValue}>
            {impactForce.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}{" "}
            N
          </span>
        </Card>
      </div>
    </motion.div>
  );
}

/* ---- Force gravitationnelle ---- */
function GravForce() {
  const [mass1, setMass1] = useState(5.972e24); // Earth
  const [mass2, setMass2] = useState(7.342e22); // Moon
  const [distance, setDistance] = useState(384400000); // Earth-Moon distance in m
  const [m1Label, setM1Label] = useState("Terre");
  const [m2Label, setM2Label] = useState("Lune");

  const force = (G * mass1 * mass2) / (distance * distance);

  const presets = [
    {
      label: "Terre – Lune",
      m1: 5.972e24,
      m2: 7.342e22,
      d: 3.844e8,
      l1: "Terre",
      l2: "Lune",
    },
    {
      label: "Terre – Soleil",
      m1: 5.972e24,
      m2: 1.989e30,
      d: 1.496e11,
      l1: "Terre",
      l2: "Soleil",
    },
    {
      label: "Jupiter – Io",
      m1: 1.898e27,
      m2: 8.932e22,
      d: 4.217e8,
      l1: "Jupiter",
      l2: "Io",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={styles.section}
    >
      <div className={styles.presets}>
        {presets.map((p) => (
          <motion.button
            key={p.label}
            className={styles.presetBtn}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setMass1(p.m1);
              setMass2(p.m2);
              setDistance(p.d);
              setM1Label(p.l1);
              setM2Label(p.l2);
            }}
          >
            {p.label}
          </motion.button>
        ))}
      </div>

      <div className={styles.forceVisual}>
        <motion.div
          className={styles.body1}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>🌍</span>
          <span className={styles.bodyLabel}>{m1Label}</span>
        </motion.div>
        <div className={styles.forceLine}>
          <motion.div
            className={styles.forceArrow}
            animate={{ scaleX: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className={styles.forceValue}>{force.toExponential(3)} N</span>
        </div>
        <motion.div
          className={styles.body2}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <span>🌙</span>
          <span className={styles.bodyLabel}>{m2Label}</span>
        </motion.div>
      </div>

      <div className={styles.controlsGrid}>
        <div className={styles.control}>
          <label className={styles.label}>
            Masse 1 (kg): {mass1.toExponential(2)}
          </label>
          <input
            type="range"
            min={1e20}
            max={2e30}
            step={1e20}
            value={mass1}
            onChange={(e) => setMass1(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
        <div className={styles.control}>
          <label className={styles.label}>
            Masse 2 (kg): {mass2.toExponential(2)}
          </label>
          <input
            type="range"
            min={1e18}
            max={2e30}
            step={1e18}
            value={mass2}
            onChange={(e) => setMass2(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
        <div className={styles.control}>
          <label className={styles.label}>
            Distance (m): {distance.toExponential(2)}
          </label>
          <input
            type="range"
            min={1e6}
            max={1e12}
            step={1e6}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>

      <Card hover={false} className={styles.formula}>
        <p className={styles.formulaText}>F = G × m₁ × m₂ / d²</p>
        <p className={styles.formulaDetail}>
          F = {G} × {mass1.toExponential(2)} × {mass2.toExponential(2)} / (
          {distance.toExponential(2)})²
        </p>
        <p className={styles.formulaResult}>= {force.toExponential(4)} N</p>
      </Card>
    </motion.div>
  );
}

/* ---- Énergie de fuite ---- */
function EscapeEnergy() {
  const [rocketMass, setRocketMass] = useState(50000); // kg

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={styles.section}
    >
      <div className={styles.inputRow}>
        <label className={styles.label}>Masse de la fusée (kg)</label>
        <input
          type="number"
          value={rocketMass}
          onChange={(e) => setRocketMass(Number(e.target.value))}
          className={styles.input}
          min={100}
          max={1000000}
        />
      </div>

      <div className={styles.escapeGrid}>
        {planets.map((planet, i) => {
          const escapeVel = planet.escapeVelocity * 1000; // m/s
          const energy = 0.5 * rocketMass * escapeVel * escapeVel;
          const maxEnergy = 0.5 * rocketMass * (59500 * 59500); // Jupiter's escape

          return (
            <motion.div
              key={planet.name}
              className={styles.escapeCard}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * i }}
            >
              <div className={styles.escapeHeader}>
                <span className={styles.escapeEmoji}>{planet.emoji}</span>
                <div>
                  <span className={styles.escapeName}>{planet.name}</span>
                  <span className={styles.escapeVel}>
                    {planet.escapeVelocity} km/s
                  </span>
                </div>
              </div>
              <div className={styles.escapeBarWrap}>
                <motion.div
                  className={styles.escapeBar}
                  initial={{ width: 0 }}
                  animate={{ width: `${(energy / maxEnergy) * 100}%` }}
                  transition={{ duration: 1, delay: 0.06 * i }}
                  style={{ background: planet.color }}
                />
              </div>
              <span className={styles.escapeEnergy}>
                {energy.toExponential(2)} J
              </span>

              {/* Animated rocket */}
              <motion.span
                className={styles.escapeRocket}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                🚀
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
