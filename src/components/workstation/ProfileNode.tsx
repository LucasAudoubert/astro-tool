import { ArrowUpRight, Trophy, Zap } from "lucide-react";
import styles from "./Workstation.module.css";

interface ProfileNodeProps {
  username?: string;
  role?: string;
  level?: number;
  xp?: number;
  xpMax?: number;
  rank?: string;
  streak?: number;
  quizzes?: number;
  observations?: number;
}

const SEGMENTS = 16;

export default function ProfileNode({
  username = "Observateur-7",
  role = "Astronomer · Tier II",
  level = 12,
  xp = 1250,
  xpMax = 2000,
  rank = "Spectre I",
  streak = 14,
  quizzes = 47,
  observations = 128,
}: ProfileNodeProps) {
  const ratio = xp / xpMax;
  const filledCount = Math.floor(ratio * SEGMENTS);
  const partialFill = (ratio * SEGMENTS) - filledCount;

  return (
    <section className={`${styles.panel} ${styles.col4}`}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>
          <span className={styles.panelDot} />
          Operator Profile · Session Node
        </div>
        <div className={styles.panelMeta}>
          <span>SYNCED</span>
        </div>
      </div>

      <div className={styles.panelBody}>
        <div className={styles.profileHead}>
          <div className={styles.profileAvatar}>
            {username.slice(0, 2).toUpperCase()}
          </div>
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>{username}</span>
            <span className={styles.profileRole}>{role}</span>
          </div>
          <div className={styles.profileStats}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <Zap size={10} style={{ color: "var(--ws-cyan)" }} />
              {streak}d
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <Trophy size={10} style={{ color: "var(--ws-cyan)" }} />
              {rank}
            </span>
          </div>
        </div>

        <div>
          <div className={styles.xpLabel}>
            <span>Niveau {level} · progression</span>
            <span className={styles.xpLabelValue}>
              {xp.toLocaleString("fr-FR")} / {xpMax.toLocaleString("fr-FR")} XP
            </span>
          </div>
          <div className={styles.xpBar} style={{ marginTop: 8 }}>
            {Array.from({ length: SEGMENTS }).map((_, i) => {
              const isFilled = i < filledCount;
              const isPartial = i === filledCount && partialFill > 0;
              return (
                <div
                  key={i}
                  className={`${styles.xpSeg} ${
                    isFilled
                      ? styles.xpSegFilled
                      : isPartial
                      ? styles.xpSegPartial
                      : ""
                  }`}
                />
              );
            })}
          </div>
          <div className={styles.profileFooter}>
            <span>NEXT TIER</span>
            <span className={styles.profileFooterVal}>
              NIV {level + 1} · {Math.max(0, xpMax - xp).toLocaleString("fr-FR")} XP
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 1,
            background: "var(--ws-border)",
            border: "1px solid var(--ws-border)",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              background: "var(--ws-bg)",
              padding: "0.65rem 0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span className={styles.weatherStatusKey}>QUIZZES</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                color: "var(--ws-text)",
              }}
            >
              {quizzes}
            </span>
          </div>
          <div
            style={{
              background: "var(--ws-bg)",
              padding: "0.65rem 0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span className={styles.weatherStatusKey}>OBSERV.</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                color: "var(--ws-text)",
              }}
            >
              {observations}
            </span>
          </div>
          <div
            style={{
              background: "var(--ws-bg)",
              padding: "0.65rem 0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "flex-start",
            }}
          >
            <span className={styles.weatherStatusKey}>ACTIONS</span>
            <button
              className={styles.heroCtaGhost}
              style={{ padding: "4px 8px", fontSize: 10 }}
            >
              View
              <ArrowUpRight size={10} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
