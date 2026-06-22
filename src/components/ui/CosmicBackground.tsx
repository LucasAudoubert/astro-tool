import { useMemo } from "react";
import styles from "./CosmicBackground.module.css";

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  layer: 1 | 2 | 3;
};

type ShootingStar = {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  angle: number;
  distance: number; // viewport units to travel
};

type DustParticle = {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
};

export default function CosmicBackground() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 180 }, (_, i) => {
      const layer = (((i % 3) + 1) as 1 | 2 | 3);
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: layer === 1 ? Math.random() * 1.2 + 0.4 : layer === 2 ? Math.random() * 1.6 + 0.8 : Math.random() * 2.2 + 1.2,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + (layer === 1 ? 4 : layer === 2 ? 3 : 2.5),
        layer,
      };
    });
  }, []);

  const shootingStars = useMemo<ShootingStar[]>(() => {
    // Only ~half spawn as "full-traverse" shots that cross the entire viewport.
    // The others keep the shorter mid-screen travel.
    return Array.from({ length: 6 }, (_, i) => {
      const isFullTraverse = i % 2 === 0;
      return {
        id: i,
        top: isFullTraverse ? Math.random() * 90 : Math.random() * 70,
        left: isFullTraverse ? Math.random() * 90 : Math.random() * 80,
        delay: Math.random() * 15 + i * 4,
        duration: isFullTraverse
          ? Math.random() * 1.2 + 1.8 // longer flight time to cross the screen
          : Math.random() * 1.5 + 1.2,
        angle: Math.random() * 20 + 200, // 200-220deg = diagonal top-right to bottom-left
        distance: isFullTraverse ? 130 : 50, // vw to travel
      };
    });
  }, []);

  const dust = useMemo<DustParticle[]>(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 20,
      duration: Math.random() * 25 + 30,
      drift: (Math.random() - 0.5) * 200,
    }));
  }, []);

  return (
    <div className={styles.cosmic} aria-hidden="true">
      {/* Aurora gradient sweep */}
      <div className={styles.aurora} />

      {/* Nebula clouds */}
      <div className={styles.nebulaWrapper}>
        <div className={`${styles.nebula} ${styles.nebula1}`} />
        <div className={`${styles.nebula} ${styles.nebula2}`} />
        <div className={`${styles.nebula} ${styles.nebula3}`} />
        <div className={`${styles.nebula} ${styles.nebula4}`} />
      </div>

      {/* Star layers with parallax twinkle */}
      <div className={styles.starLayer}>
        {stars.map((star) => (
          <span
            key={star.id}
            className={`${styles.star} ${styles[`layer${star.layer}`]}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Drifting cosmic dust */}
      <div className={styles.dustLayer}>
        {dust.map((p) => (
          <span
            key={p.id}
            className={styles.dust}
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ["--drift" as string]: `${p.drift}px`,
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <div className={styles.shootingLayer}>
        {shootingStars.map((s) => (
          <span
            key={s.id}
            className={styles.shooting}
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              ["--angle" as string]: `${s.angle}deg`,
              ["--travel" as string]: `${s.distance}vw`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle vignette */}
      <div className={styles.vignette} />
    </div>
  );
}
