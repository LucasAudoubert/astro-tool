import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Lightbulb,
  KeyRound,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  Brain,
  Rocket,
  Atom,
  Home,
} from "lucide-react";
import PageTransition from "../../components/ui/PageTransition";
import quizDataRaw from "../../data/quizz.json";
import { CHOICES } from "../../data/quizAnswers";
import styles from "./Quiz.module.css";

/* ---- Types ---- */
type Difficulty = "Easy" | "Medium" | "Hard" | "Impossible";

interface RawQuestion {
  question: string;
  hint: string;
}

interface QuizQuestion {
  /** Unique key, e.g. "Easy-0" */
  key: string;
  question: string;
  hint: string;
  /** Extracted short answer (best-effort) from the hint */
  answer: string;
  /** Optional QCM choices */
  options?: string[];
  correctIndex?: number;
}

const quizData = quizDataRaw as {
  astronomy_questions: Record<Difficulty, RawQuestion[]>;
};

/* ---- Extract a short answer from the hint ---- */
function extractAnswer(hint: string): string {
  const trimmed = hint.trim();
  const m1 = trimmed.match(/^[«"'']?([A-ZÉÀÂÊÎÔÛÄËÏÖÜÇ][^.,;:\n!?]{1,60})[.!?]?$/);
  if (m1) return m1[1].trim();
  const m2 = trimmed.match(/[:.]\s*([A-ZÉÀÂÊÎÔÛÄËÏÖÜÇ][^.,;:\n!?]{1,60})[.!?]?$/);
  if (m2) return m2[1].trim();
  const m3 = trimmed.match(/\(([^)]{2,60})\)/);
  if (m3) return m3[1].trim();
  return trimmed.replace(/[.!?]+$/, "");
}

/* ---- Fisher-Yates shuffle (immutable) ---- */
function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Shuffle QCM options while keeping track of the correctIndex. */
function shuffleOptions(options: string[], correctIndex: number) {
  const indexed = options.map((text, i) => ({
    text,
    isCorrect: i === correctIndex,
  }));
  const shuffled = shuffle(indexed);
  return {
    options: shuffled.map((o) => o.text),
    correctIndex: shuffled.findIndex((o) => o.isCorrect),
  };
}

/* ---- Build enriched question list (shuffled once at module load) ----
 * The source order of the questions is randomized and the QCM options
 * are shuffled too, so the correct answer never lands at the same index.
 */
function buildQuestions(): Record<Difficulty, QuizQuestion[]> {
  const result: Record<Difficulty, QuizQuestion[]> = {
    Easy: [],
    Medium: [],
    Hard: [],
    Impossible: [],
  };
  const groups = quizData.astronomy_questions;
  (Object.keys(groups) as Difficulty[]).forEach((d) => {
    const enriched = groups[d].map((q, i) => {
      const key = `${d}-${i}`;
      const choice = CHOICES[key];
      let options: string[] | undefined;
      let correctIndex: number | undefined;
      let answer: string;

      if (choice) {
        const shuffled = shuffleOptions(choice.options, choice.correctIndex);
        options = shuffled.options;
        correctIndex = shuffled.correctIndex;
        answer = options[correctIndex];
      } else {
        answer = extractAnswer(q.hint);
      }

      return {
        key,
        question: q.question,
        hint: q.hint,
        answer,
        options,
        correctIndex,
      };
    });
    // Shuffle the question order itself
    result[d] = shuffle(enriched);
  });
  return result;
}

const QUESTIONS: Record<Difficulty, QuizQuestion[]> = buildQuestions();

/* ---- Category meta ---- */
interface CategoryMeta {
  id: Difficulty;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  gradient: string;
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: "Easy",
    label: "Easy",
    description: "Les bases de l'astronomie. Pour débuter en douceur.",
    icon: <Sparkles size={22} />,
    accent: "#10B981",
    gradient:
      "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.03))",
  },
  {
    id: "Medium",
    label: "Medium",
    description: "Pour ceux qui veulent approfondir leurs connaissances.",
    icon: <Brain size={22} />,
    accent: "#3B82F6",
    gradient:
      "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.03))",
  },
  {
    id: "Hard",
    label: "Hard",
    description: "Physique stellaire, cosmologie et phénomènes avancés.",
    icon: <Rocket size={22} />,
    accent: "#F59E0B",
    gradient:
      "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.03))",
  },
  {
    id: "Impossible",
    label: "Impossible",
    description: "Relativité, trous noirs, théorie des cordes. Experts only.",
    icon: <Atom size={22} />,
    accent: "#EF4444",
    gradient:
      "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.03))",
  },
];

type Phase = "home" | "playing" | "finished";

export default function Quiz() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("home");
  const [category, setCategory] = useState<Difficulty | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const [hintUsed, setHintUsed] = useState(0);
  const [results, setResults] = useState<
    {
      question: QuizQuestion;
      known: boolean;
      usedHint: boolean;
      mode: "choice" | "flashcard";
    }[]
  >([]);

  const list = useMemo(
    () => (category ? QUESTIONS[category] : []),
    [category],
  );
  const current = list[currentIndex];

  const goHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const startCategory = useCallback((c: Difficulty) => {
    setCategory(c);
    setCurrentIndex(0);
    setHintUsed(0);
    setHintRevealed(false);
    setAnswerRevealed(false);
    setPickedIndex(null);
    setResults([]);
    setPhase("playing");
  }, []);

  const revealHint = () => {
    if (!hintRevealed) {
      setHintRevealed(true);
      setHintUsed((n) => n + 1);
    }
  };

  const revealAnswer = () => {
    if (current?.options) {
      setPickedIndex(-1);
    }
    setAnswerRevealed(true);
  };

  const pickChoice = (i: number) => {
    if (!current?.options || pickedIndex !== null) return;
    setPickedIndex(i);
    setAnswerRevealed(true);
  };

  const markKnown = () => {
    if (!current) return;
    setResults((r) => [
      ...r,
      {
        question: current,
        known: true,
        usedHint: hintUsed > 0,
        mode: current.options ? "choice" : "flashcard",
      },
    ]);
    next();
  };

  const markUnknown = () => {
    if (!current) return;
    setResults((r) => [
      ...r,
      {
        question: current,
        known: false,
        usedHint: hintUsed > 0,
        mode: current.options ? "choice" : "flashcard",
      },
    ]);
    next();
  };

  const next = () => {
    if (currentIndex + 1 >= list.length) {
      setPhase("finished");
    } else {
      setCurrentIndex((i) => i + 1);
      setHintRevealed(false);
      setAnswerRevealed(false);
      setPickedIndex(null);
    }
  };

  const restart = () => {
    setPhase("home");
    setCategory(null);
    setCurrentIndex(0);
    setHintUsed(0);
    setHintRevealed(false);
    setAnswerRevealed(false);
    setPickedIndex(null);
    setResults([]);
  };

  /** Commit the QCM pick and advance to the next question. */
  const commitPick = useCallback(() => {
    if (!current || pickedIndex === null) return;
    const ok = pickedIndex === current.correctIndex;
    setResults((r) => [
      ...r,
      {
        question: current,
        known: ok,
        usedHint: hintUsed > 0,
        mode: "choice",
      },
    ]);
    next();
  }, [current, pickedIndex, hintUsed]);

  return (
    <PageTransition>
      <div className={styles.page}>
        <AnimatePresence mode="wait">
          {phase === "home" && (
            <HomeView
              key="home"
              onSelect={startCategory}
              counts={{
                Easy: QUESTIONS.Easy.length,
                Medium: QUESTIONS.Medium.length,
                Hard: QUESTIONS.Hard.length,
                Impossible: QUESTIONS.Impossible.length,
              }}
            />
          )}

          {phase === "playing" && category && current && (
            <PlayView
              key={`play-${category}-${currentIndex}`}
              category={category}
              question={current}
              index={currentIndex}
              total={list.length}
              hintRevealed={hintRevealed}
              answerRevealed={answerRevealed}
              pickedIndex={pickedIndex}
              onRevealHint={revealHint}
              onRevealAnswer={revealAnswer}
              onPick={pickChoice}
              onCommitPick={commitPick}
              onKnown={markKnown}
              onUnknown={markUnknown}
              onExit={goHome}
            />
          )}

          {phase === "finished" && category && (
            <ResultView
              key="result"
              category={category}
              results={results}
              onRestart={restart}
              onExit={goHome}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

/* ====================================================================
   Sub-views
   ==================================================================== */

interface HomeViewProps {
  onSelect: (c: Difficulty) => void;
  counts: Record<Difficulty, number>;
}

function HomeView({ onSelect, counts }: HomeViewProps) {
  return (
    <motion.section
      className={styles.home}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <header className={styles.homeHeader}>
        <span className={styles.kicker}>QUIZ COSMOS</span>
        <h1 className={styles.homeTitle}>
          Choisis ton <em>niveau</em>
        </h1>
        <p className={styles.homeSubtitle}>
          4 paliers, des centaines de questions, et des indices pour t'aider
          quand tu sèches.
        </p>
      </header>

      <div className={styles.categoryGrid}>
        {CATEGORIES.map((c, i) => (
          <motion.button
            key={c.id}
            className={styles.categoryCard}
            style={
              {
                "--accent": c.accent,
                "--gradient": c.gradient,
              } as React.CSSProperties
            }
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            whileHover={{ y: -6 }}
            onClick={() => counts[c.id] > 0 && onSelect(c.id)}
            disabled={counts[c.id] === 0}
          >
            <div className={styles.categoryTop}>
              <span className={styles.categoryIcon}>{c.icon}</span>
              <span className={styles.categoryCount}>
                {counts[c.id]} question{counts[c.id] > 1 ? "s" : ""}
              </span>
            </div>
            <h3 className={styles.categoryLabel}>{c.label}</h3>
            <p className={styles.categoryDesc}>{c.description}</p>
            <span className={styles.categoryArrow}>
              <ArrowRight size={16} />
            </span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}

interface PlayViewProps {
  category: Difficulty;
  question: QuizQuestion;
  index: number;
  total: number;
  hintRevealed: boolean;
  answerRevealed: boolean;
  pickedIndex: number | null;
  onRevealHint: () => void;
  onRevealAnswer: () => void;
  onPick: (i: number) => void;
  onCommitPick: () => void;
  onKnown: () => void;
  onUnknown: () => void;
  onExit: () => void;
}

function PlayView({
  category,
  question,
  index,
  total,
  hintRevealed,
  answerRevealed,
  pickedIndex,
  onRevealHint,
  onRevealAnswer,
  onPick,
  onCommitPick,
  onKnown,
  onUnknown,
  onExit,
}: PlayViewProps) {
  const meta = CATEGORIES.find((c) => c.id === category)!;
  const progress = ((index + 1) / total) * 100;
  const hasChoices = !!question.options;
  const correctIndex = question.correctIndex ?? -1;

  return (
    <motion.section
      className={styles.play}
      style={{ "--accent": meta.accent } as React.CSSProperties}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top bar */}
      <div className={styles.playTop}>
        <button
          className={styles.exitBtn}
          onClick={onExit}
          aria-label="Retour au menu"
          title="Retour au menu"
        >
          <Home size={16} />
        </button>
        <div className={styles.progress}>
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className={styles.progressText}>
            {index + 1} / {total}
          </span>
        </div>
        <span
          className={styles.diffBadge}
          style={{ color: meta.accent, borderColor: meta.accent }}
        >
          {meta.label}
        </span>
      </div>

      {/* Question card */}
      <div className={styles.questionCard}>
        <span className={styles.qLabel}>
          {hasChoices ? "QUESTION • QCM" : "QUESTION"}
        </span>
        <h2 className={styles.qText}>{question.question}</h2>

        {/* QCM options */}
        {hasChoices && question.options && (
          <div className={styles.optionsGrid}>
            {question.options.map((opt, i) => {
              const isPicked = pickedIndex === i;
              const isCorrect = i === correctIndex;
              const showResult = answerRevealed;
              return (
                <motion.button
                  key={i}
                  className={[
                    styles.option,
                    showResult && isCorrect ? styles.optionCorrect : "",
                    showResult && isPicked && !isCorrect
                      ? styles.optionWrong
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  whileHover={!showResult ? { scale: 1.02 } : undefined}
                  whileTap={!showResult ? { scale: 0.98 } : undefined}
                  onClick={() => onPick(i)}
                  disabled={showResult}
                >
                  <span className={styles.optionLetter}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={styles.optionText}>{opt}</span>
                  {showResult && isCorrect && (
                    <CheckCircle2 size={16} className={styles.optionIcon} />
                  )}
                  {showResult && isPicked && !isCorrect && (
                    <XCircle size={16} className={styles.optionIcon} />
                  )}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Actions: hint + answer */}
        <div className={styles.actions}>
          <motion.button
            className={`${styles.actionBtn} ${styles.hintBtn} ${hintRevealed ? styles.actionUsed : ""}`}
            whileHover={!hintRevealed ? { scale: 1.02 } : undefined}
            whileTap={!hintRevealed ? { scale: 0.98 } : undefined}
            onClick={onRevealHint}
            disabled={hintRevealed}
          >
            <Lightbulb size={16} />
            {hintRevealed ? "Indice utilisé" : "Voir l'indice"}
          </motion.button>

          {!hasChoices && (
            <motion.button
              className={`${styles.actionBtn} ${styles.answerBtn} ${answerRevealed ? styles.actionUsed : ""}`}
              whileHover={!answerRevealed ? { scale: 1.02 } : undefined}
              whileTap={!answerRevealed ? { scale: 0.98 } : undefined}
              onClick={onRevealAnswer}
              disabled={answerRevealed}
            >
              <KeyRound size={16} />
              {answerRevealed ? "Réponse révélée" : "Voir la réponse"}
            </motion.button>
          )}
        </div>

        <AnimatePresence>
          {hintRevealed && (
            <motion.div
              className={styles.hintBox}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span className={styles.hintLabel}>
                <Lightbulb size={14} /> INDICE
              </span>
              <p>{question.hint}</p>
            </motion.div>
          )}

          {!hasChoices && answerRevealed && (
            <motion.div
              className={styles.answerBox}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span className={styles.answerLabel}>
                <KeyRound size={14} /> RÉPONSE
              </span>
              <p>{question.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Self-eval or auto-next for QCM */}
      {hasChoices ? (
        pickedIndex !== null && (
          <motion.button
            className={styles.nextBtn}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCommitPick}
          >
            Question suivante
            <ArrowRight size={16} />
          </motion.button>
        )
      ) : (
        <div className={styles.evalBar}>
          <motion.button
            className={`${styles.evalBtn} ${styles.evalWrong}`}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onUnknown}
          >
            <XCircle size={18} /> Je ne savais pas
          </motion.button>
          <motion.button
            className={`${styles.evalBtn} ${styles.evalGood}`}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onKnown}
          >
            <CheckCircle2 size={18} /> Je savais
          </motion.button>
        </div>
      )}
    </motion.section>
  );
}

interface ResultViewProps {
  category: Difficulty;
  results: {
    question: QuizQuestion;
    known: boolean;
    usedHint: boolean;
    mode: "choice" | "flashcard";
  }[];
  onRestart: () => void;
  onExit: () => void;
}

function ResultView({
  category,
  results,
  onRestart,
  onExit,
}: ResultViewProps) {
  const meta = CATEGORIES.find((c) => c.id === category)!;
  const known = results.filter((r) => r.known).length;
  const total = results.length;
  const percent = total > 0 ? Math.round((known / total) * 100) : 0;
  const noHint = results.filter((r) => r.known && !r.usedHint).length;

  let message = "Continue à explorer !";
  if (percent >= 90) message = "Maîtrise impressionnante !";
  else if (percent >= 70) message = "Très solide !";
  else if (percent >= 50) message = "Bon début !";

  return (
    <motion.section
      className={styles.result}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        className={styles.exitBtnResult}
        onClick={onExit}
        aria-label="Retour au menu principal"
        title="Retour au menu"
      >
        <Home size={16} />
        Quitter
      </button>

      <div
        className={styles.trophyRing}
        style={{ "--accent": meta.accent } as React.CSSProperties}
      >
        <Trophy size={40} />
      </div>

      <span
        className={styles.diffBadge}
        style={{ color: meta.accent, borderColor: meta.accent }}
      >
        {meta.label}
      </span>

      <h2 className={styles.resultTitle}>{message}</h2>

      <div className={styles.scoreRow}>
        <div className={styles.scoreBlock}>
          <span className={styles.scoreNum}>{known}</span>
          <span className={styles.scoreLbl}>correctes</span>
        </div>
        <div className={styles.scoreBlock}>
          <span className={styles.scoreNum}>{total - known}</span>
          <span className={styles.scoreLbl}>ratées</span>
        </div>
        <div className={styles.scoreBlock}>
          <span className={styles.scoreNum}>{percent}%</span>
          <span className={styles.scoreLbl}>score</span>
        </div>
      </div>

      <p className={styles.resultMeta}>
        {noHint} réponses données sans indice
      </p>

      <div className={styles.reviewList}>
        {results.map((r, i) => (
          <motion.div
            key={i}
            className={`${styles.reviewItem} ${r.known ? styles.reviewOk : styles.reviewKo}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <span className={styles.reviewIcon}>
              {r.known ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
            </span>
            <span className={styles.reviewQ}>{r.question.question}</span>
            {r.usedHint && (
              <Lightbulb size={12} className={styles.reviewHintIcon} />
            )}
          </motion.div>
        ))}
      </div>

      <motion.button
        className={styles.restartBtn}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onRestart}
      >
        <RotateCcw size={16} />
        Choisir un autre niveau
      </motion.button>
    </motion.section>
  );
}
