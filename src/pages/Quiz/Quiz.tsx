import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Star,
  RotateCcw,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Header from "../../components/layout/Header";
import PageTransition from "../../components/ui/PageTransition";
import Card from "../../components/ui/Card";
import { quizQuestions } from "../../data/quizzes";
import type { QuizQuestion } from "../../types";
import styles from "./Quiz.module.css";

type Category = "all" | "constellation" | "planet" | "physics" | "general";
type Difficulty = "all" | "easy" | "medium" | "hard";

export default function Quiz() {
  const [category, setCategory] = useState<Category>("all");
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<
    { question: QuizQuestion; selected: number; correct: boolean }[]
  >([]);

  const filteredQuestions = quizQuestions.filter((q) => {
    if (category !== "all" && q.category !== category) return false;
    if (difficulty !== "all" && q.difficulty !== difficulty) return false;
    return true;
  });

  const currentQuestion = filteredQuestions[currentIndex];

  const handleAnswer = useCallback(
    (index: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(index);
      setShowExplanation(true);
      const correct = index === currentQuestion.correctIndex;
      if (correct) setScore((s) => s + 1);
      setAnswers((a) => [
        ...a,
        { question: currentQuestion, selected: index, correct },
      ]);
    },
    [selectedAnswer, currentQuestion],
  );

  const nextQuestion = () => {
    if (currentIndex + 1 >= filteredQuestions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const restart = () => {
    setStarted(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  const categories: { id: Category; label: string }[] = [
    { id: "all", label: "Tous" },
    { id: "constellation", label: "Constellations" },
    { id: "planet", label: "Planètes" },
    { id: "physics", label: "Physique" },
    { id: "general", label: "Général" },
  ];

  const difficulties: { id: Difficulty; label: string; color: string }[] = [
    { id: "all", label: "Tous", color: "var(--text-secondary)" },
    { id: "easy", label: "Facile", color: "var(--accent-success)" },
    { id: "medium", label: "Moyen", color: "var(--accent-warning)" },
    { id: "hard", label: "Difficile", color: "var(--accent-danger)" },
  ];

  return (
    <PageTransition>
      <Header
        title="Quiz & Apprentissage"
        subtitle="Teste tes connaissances sur l'univers"
      />
      <div className={styles.page}>
        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div
              key="setup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.setup}
            >
              <div className={styles.setupIcon}>
                <GraduationCap size={48} />
              </div>
              <h2 className={styles.setupTitle}>
                Prêt à tester tes connaissances ?
              </h2>
              <p className={styles.setupDesc}>
                Choisis une catégorie et une difficulté pour commencer.
              </p>

              <div className={styles.filterSection}>
                <span className={styles.filterLabel}>Catégorie</span>
                <div className={styles.filterGrid}>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      className={`${styles.filterBtn} ${category === c.id ? styles.filterBtnActive : ""}`}
                      onClick={() => setCategory(c.id)}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <span className={styles.filterLabel}>Difficulté</span>
                <div className={styles.filterGrid}>
                  {difficulties.map((d) => (
                    <button
                      key={d.id}
                      className={`${styles.filterBtn} ${difficulty === d.id ? styles.filterBtnActive : ""}`}
                      onClick={() => setDifficulty(d.id)}
                    >
                      <span style={{ color: d.color }}>●</span> {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className={styles.questionCount}>
                {filteredQuestions.length} question
                {filteredQuestions.length > 1 ? "s" : ""} disponible
                {filteredQuestions.length > 1 ? "s" : ""}
              </p>

              <motion.button
                className={styles.startBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => filteredQuestions.length > 0 && setStarted(true)}
                disabled={filteredQuestions.length === 0}
              >
                <Star size={18} />
                Commencer le quiz
              </motion.button>
            </motion.div>
          ) : finished ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={styles.results}
            >
              <div className={styles.resultIcon}>
                {score >= filteredQuestions.length * 0.8
                  ? "🎉"
                  : score >= filteredQuestions.length * 0.5
                    ? "👏"
                    : "💪"}
              </div>
              <h2 className={styles.resultTitle}>Quiz terminé !</h2>
              <div className={styles.scoreDisplay}>
                <span className={styles.scoreNum}>{score}</span>
                <span className={styles.scoreSep}>/</span>
                <span className={styles.scoreTotal}>
                  {filteredQuestions.length}
                </span>
              </div>
              <p className={styles.scorePercent}>
                {Math.round((score / filteredQuestions.length) * 100)}% de
                bonnes réponses
              </p>

              {/* Review */}
              <div className={styles.reviewList}>
                {answers.map((a, i) => (
                  <div
                    key={i}
                    className={`${styles.reviewItem} ${a.correct ? styles.reviewCorrect : styles.reviewWrong}`}
                  >
                    <span className={styles.reviewIcon}>
                      {a.correct ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <XCircle size={16} />
                      )}
                    </span>
                    <span className={styles.reviewQuestion}>
                      {a.question.question}
                    </span>
                    <span className={styles.reviewAnswer}>
                      {a.correct
                        ? "✓"
                        : a.question.options[a.question.correctIndex]}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                className={styles.restartBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restart}
              >
                <RotateCcw size={16} />
                Recommencer
              </motion.button>
            </motion.div>
          ) : currentQuestion ? (
            <motion.div
              key={`q-${currentIndex}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className={styles.quizCard}
            >
              {/* Progress */}
              <div className={styles.quizProgress}>
                <div className={styles.quizProgressBar}>
                  <motion.div
                    className={styles.quizProgressFill}
                    animate={{
                      width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%`,
                    }}
                  />
                </div>
                <span className={styles.quizProgressText}>
                  {currentIndex + 1} / {filteredQuestions.length}
                </span>
              </div>

              <div className={styles.quizMeta}>
                <span
                  className={`${styles.diffBadge} ${styles[`diff_${currentQuestion.difficulty}`]}`}
                >
                  {currentQuestion.difficulty === "easy"
                    ? "Facile"
                    : currentQuestion.difficulty === "medium"
                      ? "Moyen"
                      : "Difficile"}
                </span>
                <span className={styles.catBadge}>
                  {currentQuestion.category}
                </span>
              </div>

              <h2 className={styles.questionText}>
                {currentQuestion.question}
              </h2>

              <div className={styles.optionsGrid}>
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === currentQuestion.correctIndex;
                  const showResult = showExplanation;

                  return (
                    <motion.button
                      key={i}
                      className={`${styles.option} ${showResult && isCorrect ? styles.optionCorrect : ""} ${showResult && isSelected && !isCorrect ? styles.optionWrong : ""}`}
                      whileHover={!showResult ? { scale: 1.02 } : undefined}
                      whileTap={!showResult ? { scale: 0.98 } : undefined}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                    >
                      <span className={styles.optionLetter}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className={styles.optionText}>{opt}</span>
                      {showResult && isCorrect && (
                        <CheckCircle2 size={18} className={styles.optionIcon} />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle size={18} className={styles.optionIcon} />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    className={styles.explanation}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p>{currentQuestion.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {showExplanation && (
                <motion.button
                  className={styles.nextBtn}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextQuestion}
                >
                  {currentIndex + 1 >= filteredQuestions.length
                    ? "Voir les résultats"
                    : "Question suivante →"}
                </motion.button>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
