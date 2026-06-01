import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  title: string;
  linkText?: string;
  linkTo?: string;
}

export default function SectionHeader({
  title,
  linkText,
  linkTo,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={styles.header}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className={styles.title}>{title}</h2>
      {linkText && linkTo && (
        <Link to={linkTo} className={styles.link}>
          {linkText}
          <ArrowRight size={14} />
        </Link>
      )}
    </motion.div>
  );
}
