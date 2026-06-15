import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Wrench,
  Clock,
  Award,
  Weight,
  Rocket,
  Sun,
  GraduationCap,
  ArrowLeftRight,
} from "lucide-react";
import Header from "../../components/layout/Header";
import Card from "../../components/ui/Card";
import SectionHeader from "../../components/ui/SectionHeader";
import PageTransition from "../../components/ui/PageTransition";
import styles from "./Dashboard.module.css";

/* ---- Category cards data ---- */
const categories = [
  {
    title: "Gravité &\nPhysique",
    desc: "Poids, chute libre, force gravitationnelle, énergie…",
    icon: <Weight size={32} strokeWidth={1.5} />,
    path: "/gravity",
    color: "#6366F1",
  },
  {
    title: "Voyage spatial\n& Distances",
    desc: "Vitesse lumière, relativité, distances cosmiques…",
    icon: <Rocket size={32} strokeWidth={1.5} />,
    path: "/travel",
    color: "#8B5CF6",
  },
  {
    title: "Système\nsolaire",
    desc: "Planètes en temps réel, tailles, âges, position…",
    icon: <Sun size={32} strokeWidth={1.5} />,
    path: "/solar-system",
    color: "#F59E0B",
  },
  {
    title: "Quiz &\nApprentissage",
    desc: "Constellations, culture astro, quiz interactifs…",
    icon: <GraduationCap size={32} strokeWidth={1.5} />,
    path: "/quiz",
    color: "#10B981",
  },
  {
    title: "Convertisseurs\n& Calculateurs",
    desc: "Unités astro, âge sur les planètes, et plus…",
    icon: <ArrowLeftRight size={32} strokeWidth={1.5} />,
    path: "/converters",
    color: "#3B82F6",
  },
];

/* ---- Quick tools ---- */
const quickTools = [
  { label: "Poids sur Mars", icon: <Weight size={16} />, path: "/gravity" },
  { label: "Âge sur Jupiter", icon: <Sun size={16} />, path: "/converters" },
  { label: "Distance Terre – Lune", icon: <Rocket size={16} />, path: "/travel" },
  { label: "Vitesse lumière", icon: <ArrowLeftRight size={16} />, path: "/converters" },
  { label: "Force gravitationnelle", icon: <Weight size={16} />, path: "/gravity" },
  { label: "Énergie de fuite", icon: <Rocket size={16} />, path: "/gravity" },
];

/* ---- Fake activity ---- */
const recentActivity = [
  {
    title: "Calcul du poids sur Mars",
    result: "26.41 kg",
    time: "Il y a 2h",
    color: "#ff6b6b",
  },
  {
    title: "Quiz Constellations",
    result: "Score : 85%",
    time: "Il y a 5h",
    color: "#fdcb6e",
  },
  {
    title: "Âge sur Jupiter",
    result: "12.3 années",
    time: "Hier",
    color: "#55efc4",
  },
  {
    title: "Distance Andromède",
    result: "2.537 M al",
    time: "Hier",
    color: "#74b9ff",
  },
];

/* ---- Stats ---- */
const stats = [
  {
    label: "Quizzes complétés",
    value: 24,
    icon: <CheckCircle2 size={16} />,
    color: "#10B981",
  },
  {
    label: "Outils utilisés",
    value: 15,
    icon: <Wrench size={16} />,
    color: "#3B82F6",
  },
  {
    label: "Temps d'exploration",
    value: "18h 42m",
    icon: <Clock size={16} />,
    color: "#F59E0B",
  },
  {
    label: "Badges obtenus",
    value: 8,
    icon: <Award size={16} />,
    color: "#8B5CF6",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <Header
        title="Tableau de bord"
        subtitle="Explorez l'univers avec nos outils professionnels"
      />

      <div className={styles.dashboard}>
        {/* ---- Main Content ---- */}
        <div className={styles.content}>
          {/* Hero banner */}
          <motion.div
            className={styles.hero}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.heroOverlay} />
            <div className={styles.heroContent}>
              <span className={styles.heroBadge}>OUTIL À LA UNE</span>
              <h2 className={styles.heroTitle}>Carte du ciel en direct</h2>
              <p className={styles.heroDesc}>
                Observe la voûte céleste en temps réel depuis n'importe où sur
                Terre.
              </p>
              <motion.button
                className={styles.heroBtn}
                whileHover={{ scale: 1.04, x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/solar-system")}
              >
                Explorer maintenant
                <ArrowRight size={16} />
              </motion.button>
            </div>
            <div className={styles.heroStars}>
              {Array.from({ length: 30 }).map((_, i) => (
                <span
                  key={i}
                  className={styles.heroStar}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Carousel dots (visual only) */}
          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.dotActive}`} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>

          {/* Explorer categories */}
          <SectionHeader
            title="Explorer l'univers"
            linkText="Tout voir"
            linkTo="/tools"
          />
          <div className={styles.categoryGrid}>
            {categories.map((cat, i) => (
              <Card
                key={cat.path}
                className={styles.categoryCard}
                glow
                delay={0.1 * i}
                onClick={() => navigate(cat.path)}
              >
                <div
                  className={styles.catIcon}
                  style={{ background: `${cat.color}20` }}
                >
                  <span style={{ color: cat.color }}>{cat.icon}</span>
                </div>
                <h3 className={styles.catTitle}>{cat.title}</h3>
                <p className={styles.catDesc}>{cat.desc}</p>
                <span className={styles.catArrow} style={{ color: cat.color }}>
                  <ArrowRight size={16} />
                </span>
              </Card>
            ))}
          </div>

          {/* Quick tools */}
          <SectionHeader title="Outils rapides" />
          <div className={styles.quickGrid}>
            {quickTools.map((tool, i) => (
              <motion.button
                key={tool.label}
                className={styles.quickTool}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.3 }}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(tool.path)}
              >
                <span className={styles.quickIcon}>{tool.icon}</span>
                <span className={styles.quickLabel}>{tool.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Recent activity */}
          <SectionHeader title="Activité récente" />
          <div className={styles.activityGrid}>
            {recentActivity.map((act, i) => (
              <motion.div
                key={act.title}
                className={styles.activityItem}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i + 0.4 }}
              >
                <div
                  className={styles.activityDot}
                  style={{ background: act.color }}
                />
                <div className={styles.activityInfo}>
                  <span className={styles.activityTitle}>{act.title}</span>
                  <span className={styles.activityResult}>{act.result}</span>
                </div>
                <span className={styles.activityTime}>{act.time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---- Sidebar widgets ---- */}
        <div className={styles.widgets}>
          {/* Events */}
          <Card hover={false} delay={0.2}>
            <div className={styles.widgetHeader}>
              <h3 className={styles.widgetTitle}>Événement à venir</h3>
              <button
                className={styles.widgetLink}
                onClick={() => navigate("/events")}
              >
                Voir tout
              </button>
            </div>
            <div className={styles.eventCard}>
              <span className={styles.eventLabel}>Pluie de météores</span>
              <h3 className={styles.eventName}>Perséides</h3>
              <p className={styles.eventDate}>12 août – 13 août 2026</p>
              <p className={styles.eventDetail}>Pic d'activité dans 7 jours</p>
              <motion.button
                className={styles.eventBtn}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                En savoir plus
              </motion.button>
            </div>
          </Card>

          {/* Stats */}
          <Card hover={false} delay={0.35}>
            <h3 className={styles.widgetTitle}>Statistiques</h3>
            <div className={styles.statsList}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statRow}>
                  <div
                    className={styles.statIcon}
                    style={{ color: stat.color }}
                  >
                    {stat.icon}
                  </div>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statValue}>{stat.value}</span>
                </div>
              ))}
            </div>
            <motion.button
              className={styles.profileBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/profile")}
            >
              Voir mon profil
              <ArrowRight size={14} />
            </motion.button>
          </Card>

          {/* Progression */}
          <Card hover={false} delay={0.5}>
            <h3 className={styles.widgetTitle}>Progression</h3>
            <div className={styles.progressBlock}>
              <span className={styles.progressLabel}>Ton niveau</span>
              <div className={styles.levelRow}>
                <span className={styles.levelNum}>Niveau 12</span>
                <span className={styles.levelXp}>1 250 / 2 000 XP</span>
              </div>
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  animate={{ width: "62.5%" }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
                />
              </div>
            </div>
            <div className={styles.badgePreview}>
              <span className={styles.badgeLabel}>Prochain badge</span>
              <div className={styles.badgeRow}>
                <div className={styles.badgeInfo}>
                  <h4 className={styles.badgeName}>Explorateur galactique</h4>
                  <p className={styles.badgeReq}>Atteins 2 000 XP</p>
                </div>
                <div className={styles.badgeIcon}>🌌</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
