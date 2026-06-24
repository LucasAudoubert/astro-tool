import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LoadingScreen.module.css";

export interface LoadingScreenProps {
  /** Progression 0..100 */
  progress: number;
  /** Étape courante (optionnel) */
  currentStep?: { label: string } | null;
  /** Total des étapes */
  totalSteps?: number;
  /** Index de l'étape courante (1-based) */
  stepIndex?: number;
  /** Affiche ou cache l'écran */
  visible: boolean;
  /** Titre principal */
  title?: string;
  /** Sous-titre / tagline */
  tagline?: string;
  /** Callback quand l'animation de sortie est terminée */
  onExitComplete?: () => void;
  /** Durée minimum d'affichage en ms (pour éviter un flash) */
  minDuration?: number;
}

/**
 * LoadingScreen — Écran de chargement style HUD / Workstation.
 *
 * - Couleurs et fonts alignées sur le design system (variables.css).
 * - Coins coupés, marqueurs de coin, grille subtile.
 * - Barre de progression dynamique avec étapes.
 * - Animation d'entrée / sortie via framer-motion.
 */
export default function LoadingScreen({
  progress,
  currentStep,
  totalSteps = 0,
  stepIndex = 0,
  visible,
  title = "LES ENGHIENNOIS",
  tagline = "ASTRONOMES",
  onExitComplete,
  minDuration = 0,
}: LoadingScreenProps) {
  const [mountedAt] = useState(() => Date.now());
  const [canHide, setCanHide] = useState(minDuration <= 0);

  // Garantit un temps minimum d'affichage
  useEffect(() => {
    if (minDuration <= 0) {
      setCanHide(true);
      return;
    }
    const remaining = Math.max(0, minDuration - (Date.now() - mountedAt));
    const t = setTimeout(() => setCanHide(true), remaining);
    return () => clearTimeout(t);
  }, [minDuration, mountedAt]);

  const show = visible && !canHide ? true : visible;
  const shouldRender = visible || (canHide && !visible);

  const clamped = Math.max(0, Math.min(100, progress));
  const stepLabel = currentStep?.label ?? "INITIALISATION";
  const stepCounter =
    totalSteps > 0 ? `${String(stepIndex + 1).padStart(2, "0")} / ${String(totalSteps).padStart(2, "0")}` : "";

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {show && shouldRender && (
        <motion.div
          className={styles.root}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          aria-busy={!visible}
        >
          {/* ---- Backdrop cosmic ---- */}
          <div className={styles.backdrop} aria-hidden="true">
            <div className={styles.grid} />
            <div className={styles.aurora} />
            <div className={styles.vignette} />
          </div>

          {/* ---- HUD frame ---- */}
          <div className={styles.frame}>
            {/* Corner markers */}
            <span className={`${styles.corner} ${styles.cornerTL}`} />
            <span className={`${styles.corner} ${styles.cornerTR}`} />
            <span className={`${styles.corner} ${styles.cornerBL}`} />
            <span className={`${styles.corner} ${styles.cornerBR}`} />

            {/* Top bar */}
            <header className={styles.topbar}>
              <div className={styles.topbarLeft}>
                <span className={styles.statusDot} />
                <span className={styles.topbarLabel}>WORKSTATION</span>
                <span className={styles.topbarSep}>·</span>
                <span className={styles.topbarVersion}>v2.0.0</span>
              </div>
              <div className={styles.topbarRight}>
                <span className={styles.topbarLabel}>SYS</span>
                <span className={styles.topbarSep}>·</span>
                <span className={styles.topbarLabel}>LOAD</span>
              </div>
            </header>

            {/* Center content */}
            <div className={styles.center}>
              {/* Compass / crosshair */}
              <div className={styles.crosshair} aria-hidden="true">
                <span className={styles.crosshairRing} />
                <span className={styles.crosshairRingInner} />
                <span className={`${styles.crosshairTick} ${styles.tickN}`} />
                <span className={`${styles.crosshairTick} ${styles.tickE}`} />
                <span className={`${styles.crosshairTick} ${styles.tickS}`} />
                <span className={`${styles.crosshairTick} ${styles.tickW}`} />
                <svg
                  className={styles.compass}
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                  <path
                    d="M32 8 L36 32 L32 56 L28 32 Z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <path
                    d="M8 32 L32 28 L56 32 L32 36 Z"
                    fill="currentColor"
                    opacity="0.5"
                  />
                  <circle cx="32" cy="32" r="2" fill="currentColor" />
                </svg>
              </div>

              {/* Title */}
              <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {title}
              </motion.h1>
              <motion.span
                className={styles.tagline}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              >
                {tagline}
              </motion.span>

              {/* Progress block */}
              <div className={styles.progressBlock}>
                <div className={styles.progressMeta}>
                  <span className={styles.progressLabel}>{stepLabel}</span>
                  {stepCounter && (
                    <span className={styles.progressCounter}>{stepCounter}</span>
                  )}
                </div>

                <div className={styles.progressTrack}>
                  <motion.div
                    className={styles.progressFill}
                    style={{ width: `${clamped}%` }}
                    transition={{ duration: 0.15, ease: "linear" }}
                  />
                  <div className={styles.progressShine} aria-hidden="true" />
                </div>

                <div className={styles.progressFooter}>
                  <span className={styles.percent}>{Math.round(clamped)}%</span>
                  <span className={styles.progressHint}>
                    {clamped >= 100 ? "READY" : "LOADING"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom tagline */}
            <footer className={styles.footer}>
              <span>EXPLORER</span>
              <span className={styles.footerSep}>·</span>
              <span>COMPRENDRE</span>
              <span className={styles.footerSep}>·</span>
              <span>PARTAGER</span>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}