import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, Bell, X, User } from "lucide-react";
import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className={styles.header}>
      <div className={styles.titleBlock}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <div className={styles.actions}>
        {/* Search */}
        <AnimatePresence>
          {searchOpen ? (
            <motion.div
              className={styles.searchExpanded}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Search size={16} className={styles.searchIcon} />
              <input
                autoFocus
                className={styles.searchInput}
                placeholder="Rechercher un outil, une planète..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className={styles.searchClose}
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
              >
                <X size={14} />
              </button>
            </motion.div>
          ) : (
            <motion.button
              className={styles.searchBtn}
              onClick={() => setSearchOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={16} />
              <span className={styles.searchPlaceholder}>Rechercher...</span>
              <kbd className={styles.kbd}>
                <Command size={10} />K
              </kbd>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Notifications */}
        <motion.button
          className={styles.iconBtn}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell size={18} />
          <span className={styles.notifDot} />
        </motion.button>

        {/* Avatar */}
        <motion.button
          className={styles.avatar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User size={18} />
        </motion.button>
      </div>
    </header>
  );
}
