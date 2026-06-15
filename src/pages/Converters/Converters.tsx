import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Calendar } from "lucide-react";
import Header from "../../components/layout/Header";
import PageTransition from "../../components/ui/PageTransition";
import Card from "../../components/ui/Card";
import { planets } from "../../data/planets";
import { LIGHT_YEAR_KM, AU_KM, PARSEC_KM } from "../../data/constants";
import styles from "./Converters.module.css";

type Tab = "units" | "age";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "units",
    label: "Convertisseur d'unités",
    icon: <ArrowLeftRight size={16} />,
  },
  { id: "age", label: "Âge planétaire", icon: <Calendar size={16} /> },
];

type AstroUnit = "km" | "ua" | "al" | "parsec";

const units: { id: AstroUnit; label: string; toKm: number }[] = [
  { id: "km", label: "Kilomètres (km)", toKm: 1 },
  { id: "ua", label: "Unités Astronomiques (UA)", toKm: AU_KM },
  { id: "al", label: "Années-lumière (al)", toKm: LIGHT_YEAR_KM },
  { id: "parsec", label: "Parsecs (pc)", toKm: PARSEC_KM },
];

export default function Converters() {
  const [activeTab, setActiveTab] = useState<Tab>("units");

  return (
    <PageTransition>
      <Header
        title="Convertisseurs & Calculateurs"
        subtitle="Unités astronomiques et âges planétaires"
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
                  layoutId="conv-tab"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "units" && <UnitConverter key="units" />}
          {activeTab === "age" && <AgeCalculator key="age" />}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

/* ---- Unit Converter ---- */
function UnitConverter() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState<AstroUnit>("al");
  const [toUnit, setToUnit] = useState<AstroUnit>("km");

  const from = units.find((u) => u.id === fromUnit)!;
  const to = units.find((u) => u.id === toUnit)!;
  const result = (value * from.toKm) / to.toKm;

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={styles.section}
    >
      <div className={styles.converterBox}>
        <div className={styles.unitCol}>
          <label className={styles.label}>De</label>
          <select
            className={styles.select}
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as AstroUnit)}
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            className={styles.valueInput}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            min={0}
          />
        </div>

        <motion.button
          className={styles.swapBtn}
          whileHover={{ scale: 1.15, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={swap}
        >
          <ArrowLeftRight size={20} />
        </motion.button>

        <div className={styles.unitCol}>
          <label className={styles.label}>Vers</label>
          <select
            className={styles.select}
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as AstroUnit)}
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
          <div className={styles.resultDisplay}>
            <motion.span
              key={result}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.resultNum}
            >
              {result < 0.001
                ? result.toExponential(4)
                : result.toLocaleString("fr-FR", { maximumFractionDigits: 4 })}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Quick reference table */}
      <Card hover={false} className={styles.refTable}>
        <h3 className={styles.refTitle}>Référence rapide</h3>
        <div className={styles.refGrid}>
          <div className={styles.refItem}>
            <span className={styles.refLabel}>1 UA</span>
            <span className={styles.refValue}>
              {AU_KM.toLocaleString("fr-FR")} km
            </span>
          </div>
          <div className={styles.refItem}>
            <span className={styles.refLabel}>1 Année-lumière</span>
            <span className={styles.refValue}>
              {LIGHT_YEAR_KM.toExponential(3)} km
            </span>
          </div>
          <div className={styles.refItem}>
            <span className={styles.refLabel}>1 Parsec</span>
            <span className={styles.refValue}>3.262 al</span>
          </div>
          <div className={styles.refItem}>
            <span className={styles.refLabel}>1 Parsec</span>
            <span className={styles.refValue}>206 265 UA</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ---- Age Calculator ---- */
function AgeCalculator() {
  const [earthAge, setEarthAge] = useState(25);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={styles.section}
    >
      <div className={styles.ageInput}>
        <label className={styles.label}>Ton âge sur Terre (années)</label>
        <input
          type="number"
          className={styles.input}
          value={earthAge}
          onChange={(e) => setEarthAge(Number(e.target.value))}
          min={0}
          max={200}
        />
        <input
          type="range"
          min={1}
          max={100}
          value={earthAge}
          onChange={(e) => setEarthAge(Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.ageGrid}>
        {planets.map((planet, i) => {
          const earthDays = earthAge * 365.25;
          const planetYears = earthDays / planet.orbitalPeriod;
          const isOlder = planetYears > earthAge;

          return (
            <motion.div
              key={planet.name}
              className={styles.ageCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.06 * i }}
            >
              <div className={styles.ageHeader}>
                <span 
                  className={styles.agePlanetIndicator}
                  style={{ background: planet.color }}
                />
                <span className={styles.agePlanet}>{planet.name}</span>
              </div>
              <motion.span
                className={styles.ageValue}
                key={planetYears}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  color: isOlder
                    ? "var(--accent-secondary)"
                    : "var(--accent-primary-light)",
                }}
              >
                {planetYears.toFixed(2)}
              </motion.span>
              <span className={styles.ageUnit}>
                années {planet.name.toLowerCase()}
              </span>
              <span className={styles.agePeriod}>
                1 an = {planet.orbitalPeriod.toLocaleString("fr-FR")} jours
                terrestres
              </span>
              <span className={styles.ageTag}>
                {isOlder ? "👴 Plus vieux" : "👶 Plus jeune"}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
