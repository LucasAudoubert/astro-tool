import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import Header from "../../components/layout/Header";
import PageTransition from "../../components/ui/PageTransition";
import styles from "./Placeholder.module.css";

interface PlaceholderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function Placeholder({
  title,
  subtitle,
  icon = <Construction size={48} />,
}: PlaceholderProps) {
  return (
    <PageTransition>
      <Header title={title} subtitle={subtitle} />
      <div className={styles.page}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={styles.iconWrapper}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {icon}
          </motion.div>
          <h2 className={styles.title}>En construction</h2>
          <p className={styles.desc}>
            Cette section sera bientôt disponible. Reviens bientôt explorer de
            nouvelles fonctionnalités !
          </p>
          <div className={styles.dots}>
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.span
                key={i}
                className={styles.dot}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
