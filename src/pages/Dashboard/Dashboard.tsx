import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  Sparkles,
  Compass,
  Telescope,
} from "lucide-react";
import PageTransition from "../../components/ui/PageTransition";
import CosmicBackground from "../../components/ui/CosmicBackground";
import styles from "./Dashboard.module.css";

/* ---- Quick destinations ---- */
const destinations = [
  {
    label: "Système solaire",
    icon: <Sparkles size={18} strokeWidth={1.5} />,
    path: "/solar-system",
  },
  {
    label: "Voyage spatial",
    icon: <Rocket size={18} strokeWidth={1.5} />,
    path: "/travel",
  },
  {
    label: "Quiz",
    icon: <Compass size={18} strokeWidth={1.5} />,
    path: "/quiz",
  },
  {
    label: "Explorateur",
    icon: <Telescope size={18} strokeWidth={1.5} />,
    path: "/solar-system",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting =
    hour < 6
      ? "Bonne nuit"
      : hour < 12
      ? "Bonjour"
      : hour < 18
      ? "Bon après-midi"
      : "Bonsoir";

  return (
    <PageTransition>
      <CosmicBackground />

      <main className={styles.page}>
        {/* ---- Hero ---- */}
        <section className={styles.hero}>
          <motion.span
            className={styles.kicker}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {greeting}, explorateur
          </motion.span>

          <h1 className={styles.title}>
            <span className={styles.titleLine}>
              <span className={styles.titleWord}>Explorez</span>
            </span>
            <span className={styles.titleLine}>
              <span className={`${styles.titleWord} ${styles.titleAccent}`}>
                l'univers
              </span>
            </span>
          </h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Une boîte à outils pour comprendre le cosmos — des planètes aux
            confins de l'espace.
          </motion.p>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <motion.button
              className={styles.ctaPrimary}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/solar-system")}
            >
              Commencer l'exploration
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              className={styles.ctaGhost}
              whileHover={{ x: 4 }}
              onClick={() => navigate("/events")}
            >
              Événements à venir
            </motion.button>
          </motion.div>
        </section>

        {/* ---- Quick destinations ---- */}
        <motion.nav
          className={styles.destinations}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {destinations.map((d, i) => (
            <motion.button
              key={d.label}
              className={styles.destBtn}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() => navigate(d.path)}
            >
              <span className={styles.destIcon}>{d.icon}</span>
              <span className={styles.destLabel}>{d.label}</span>
            </motion.button>
          ))}
        </motion.nav>
      </main>
    </PageTransition>
  );
}
