import { useEffect, useRef, useState } from "react";

/**
 * Étape de chargement — pondérée pour une progression réaliste.
 * Le poids relatif détermine combien de % cette étape représente.
 */
export interface LoadingStep {
  /** Identifiant unique de l'étape */
  id: string;
  /** Libellé affiché sous la barre de progression */
  label: string;
  /** Poids relatif (plus la valeur est grande, plus l'étape dure longtemps) */
  weight: number;
  /** Durée minimum en ms (pour éviter qu'une étape "légère" soit trop rapide) */
  minDuration?: number;
}

export interface LoadingProgress {
  /** Progression globale 0..100 */
  percent: number;
  /** Étape courante */
  currentStep: LoadingStep | null;
  /** Index de l'étape courante */
  stepIndex: number;
  /** Total des étapes */
  totalSteps: number;
  /** True si toutes les étapes sont terminées */
  done: boolean;
}

export interface UseLoadingProgressOptions {
  /** Étapes à exécuter séquentiellement */
  steps: LoadingStep[];
  /** Callback async exécuté pendant chaque étape (ex: fetch de données) */
  onStep?: (step: LoadingStep, index: number) => Promise<void> | void;
  /** Démarre automatiquement au mount */
  autoStart?: boolean;
}

export interface UseLoadingProgressReturn extends LoadingProgress {
  /** Lance / relance la séquence */
  start: () => void;
  /** Stoppe la séquence */
  reset: () => void;
}

/**
 * Hook de progression de chargement dynamique.
 *
 * - Pondère chaque étape par son `weight` pour une progression fluide.
 * - Garantit une durée minimum par étape (évite les sauts brusques).
 * - Expose un état réactif utilisable par `LoadingScreen`.
 */
export function useLoadingProgress(
  options: UseLoadingProgressOptions,
): UseLoadingProgressReturn {
  const { steps, onStep, autoStart = true } = options;

  const [percent, setPercent] = useState(0);
  const [stepIndex, setStepIndex] = useState(-1);
  const [done, setDone] = useState(false);

  const cancelledRef = useRef(false);
  const runningRef = useRef(false);

  const totalWeight = steps.reduce((sum, s) => sum + s.weight, 0);

  const animateStep = (
    step: LoadingStep,
    startPct: number,
    endPct: number,
    duration: number,
  ): Promise<void> => {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const tick = (now: number) => {
        if (cancelledRef.current) {
          resolve();
          return;
        }
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        // ease-out cubic pour une sensation organique
        const eased = 1 - Math.pow(1 - t, 3);
        const current = startPct + (endPct - startPct) * eased;
        setPercent(current);
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(tick);
    });
  };

  const run = async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    cancelledRef.current = false;
    setDone(false);
    setPercent(0);
    setStepIndex(0);

    let cumulative = 0;
    for (let i = 0; i < steps.length; i++) {
      if (cancelledRef.current) break;
      const step = steps[i];
      setStepIndex(i);

      const startPct = (cumulative / totalWeight) * 100;
      cumulative += step.weight;
      const endPct = (cumulative / totalWeight) * 100;

      // Durée basée sur le poids, avec un minimum
      const baseDuration = 600 + (step.weight / totalWeight) * 1400;
      const duration = Math.max(baseDuration, step.minDuration ?? 400);

      // Lance l'animation de la barre ET le callback en parallèle
      const work = Promise.resolve(onStep?.(step, i));
      await Promise.all([
        animateStep(step, startPct, endPct, duration),
        work,
      ]);
    }

    if (!cancelledRef.current) {
      setPercent(100);
      setDone(true);
    }
    runningRef.current = false;
  };

  const start = () => {
    cancelledRef.current = false;
    void run();
  };

  const reset = () => {
    cancelledRef.current = true;
    runningRef.current = false;
    setPercent(0);
    setStepIndex(-1);
    setDone(false);
  };

  useEffect(() => {
    if (autoStart) start();
    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentStep =
    stepIndex >= 0 && stepIndex < steps.length ? steps[stepIndex] : null;

  return {
    percent,
    currentStep,
    stepIndex,
    totalSteps: steps.length,
    done,
    start,
    reset,
  };
}