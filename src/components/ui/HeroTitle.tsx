import { useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import styles from "./HeroTitle.module.css";

interface Line {
  text: string;
  accent?: boolean;
}

interface HeroTitleProps {
  lines: Line[];
}

interface LetterProps {
  char: string;
  index: number;
  total: number;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  accent?: boolean;
  delay: number;
}

function Letter({
  char,
  index,
  total,
  springX,
  springY,
  accent,
  delay,
}: LetterProps) {
  // Chaque lettre se déplace proportionnellement à sa distance du centre
  // → effet de parallaxe doux et naturel
  const factor = (index - (total - 1) / 2) * 0.025;
  const x = useTransform(springX, (v) => v * factor);
  const y = useTransform(springY, (v) => v * factor * 0.6);

  return (
    <motion.span
      className={`${styles.letter} ${accent ? styles.accent : ""}`}
      style={{ x, y }}
      initial={{ y: "110%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 1, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export default function HeroTitle({ lines }: HeroTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring pour un retour fluide et organique
  const springCfg = { damping: 25, stiffness: 200, mass: 0.5 };
  const sx = useSpring(mouseX, springCfg);
  const sy = useSpring(mouseY, springCfg);

  const onMove = (e: ReactMouseEvent<HTMLHeadingElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - r.left - r.width / 2);
    mouseY.set(e.clientY - r.top - r.height / 2);
  };

  const onLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <h1
      ref={ref}
      className={styles.title}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {lines.map((line, li) => (
        <span key={li} className={styles.line}>
          {line.text.split("").map((c, ci) => (
            <Letter
              key={`${li}-${ci}`}
              char={c}
              index={ci}
              total={line.text.length}
              springX={sx}
              springY={sy}
              accent={line.accent}
              delay={(li === 0 ? 0.1 : 0.3) + ci * 0.025}
            />
          ))}
        </span>
      ))}
    </h1>
  );
}