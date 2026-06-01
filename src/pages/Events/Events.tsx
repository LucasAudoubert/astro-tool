import { motion } from "framer-motion";
import { CalendarDays, MapPin, Gauge, Zap } from "lucide-react";
import Header from "../../components/layout/Header";
import PageTransition from "../../components/ui/PageTransition";
import Card from "../../components/ui/Card";
import { meteorShowers } from "../../data/meteorShowers";
import styles from "./Events.module.css";

export default function Events() {
  // Find next upcoming shower (simplified)
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const now = new Date();
  const currentMonth = now.getMonth();

  const getMonthIndex = (peak: string) => {
    const lowerPeak = peak.toLowerCase();
    return months.findIndex((m) => lowerPeak.includes(m));
  };

  const upcoming = [...meteorShowers].sort((a, b) => {
    const aMonth = getMonthIndex(a.peak);
    const bMonth = getMonthIndex(b.peak);
    const aDiff =
      aMonth >= currentMonth
        ? aMonth - currentMonth
        : 12 - currentMonth + aMonth;
    const bDiff =
      bMonth >= currentMonth
        ? bMonth - currentMonth
        : 12 - currentMonth + bMonth;
    return aDiff - bDiff;
  });

  const next = upcoming[0];

  return (
    <PageTransition>
      <Header
        title="Événements célestes"
        subtitle="Pluies de météores et phénomènes astronomiques"
      />
      <div className={styles.page}>
        {/* Featured next event */}
        <motion.div
          className={styles.featured}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.featuredStars}>
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.span
                key={i}
                className={styles.shootingStar}
                initial={{ opacity: 0, x: Math.random() * 100, y: 0 }}
                animate={{ opacity: [0, 1, 0], x: -50, y: 100 }}
                transition={{
                  duration: 1 + Math.random(),
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  repeatDelay: 2 + Math.random() * 3,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 40}%`,
                }}
              />
            ))}
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.featuredBadge}>Prochain événement</span>
            <h2 className={styles.featuredName}>{next.name}</h2>
            <p className={styles.featuredPeak}>Pic: {next.peak}</p>
            <p className={styles.featuredDesc}>{next.description}</p>
            <div className={styles.featuredStats}>
              <div className={styles.featuredStat}>
                <MapPin size={14} />
                <span>{next.constellation}</span>
              </div>
              <div className={styles.featuredStat}>
                <Gauge size={14} />
                <span>{next.zhr} météores/h</span>
              </div>
              <div className={styles.featuredStat}>
                <Zap size={14} />
                <span>{next.speed} km/s</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Calendar */}
        <h3 className={styles.calendarTitle}>
          <CalendarDays size={18} />
          Calendrier des pluies de météores
        </h3>

        <div className={styles.eventGrid}>
          {meteorShowers.map((shower, i) => {
            const isPast = getMonthIndex(shower.peak) < currentMonth;

            return (
              <Card
                key={shower.name}
                delay={0.05 * i}
                className={`${styles.eventCard} ${isPast ? styles.eventPast : ""}`}
              >
                <div className={styles.eventHeader}>
                  <span className={styles.eventName}>{shower.name}</span>
                  <span className={styles.eventZhr}>{shower.zhr}/h</span>
                </div>
                <span className={styles.eventPeak}>{shower.peak}</span>
                <span className={styles.eventConstellation}>
                  📍 {shower.constellation}
                </span>
                <p className={styles.eventDesc}>{shower.description}</p>
                <div className={styles.eventSpeed}>
                  <div className={styles.eventSpeedBar}>
                    <motion.div
                      className={styles.eventSpeedFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${(shower.speed / 71) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.05 * i }}
                    />
                  </div>
                  <span className={styles.eventSpeedVal}>
                    {shower.speed} km/s
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
