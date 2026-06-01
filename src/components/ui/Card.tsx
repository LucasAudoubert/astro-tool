import { motion } from "framer-motion";
import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
  delay?: number;
}

export default function Card({
  children,
  className,
  hover = true,
  glow = false,
  onClick,
  delay = 0,
}: CardProps) {
  return (
    <motion.div
      className={clsx(
        styles.card,
        hover && styles.hover,
        glow && styles.glow,
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
