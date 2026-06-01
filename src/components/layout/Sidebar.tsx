import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Weight,
  Rocket,
  Sun,
  GraduationCap,
  ArrowLeftRight,
  Wrench,
  Eye,
  CalendarDays,
  User,
  TrendingUp,
  Award,
  Settings,
} from "lucide-react";
import clsx from "clsx";
import styles from "./Sidebar.module.css";

interface NavSection {
  title: string;
  items: { label: string; path: string; icon: React.ReactNode }[];
}

const navigation: NavSection[] = [
  {
    title: "",
    items: [{ label: "Accueil", path: "/", icon: <Home size={18} /> }],
  },
  {
    title: "EXPLORER",
    items: [
      {
        label: "Gravité & Physique",
        path: "/gravity",
        icon: <Weight size={18} />,
      },
      { label: "Voyage spatial", path: "/travel", icon: <Rocket size={18} /> },
      {
        label: "Système solaire",
        path: "/solar-system",
        icon: <Sun size={18} />,
      },
      {
        label: "Quiz & Apprentissage",
        path: "/quiz",
        icon: <GraduationCap size={18} />,
      },
      {
        label: "Convertisseurs",
        path: "/converters",
        icon: <ArrowLeftRight size={18} />,
      },
      { label: "Outils divers", path: "/tools", icon: <Wrench size={18} /> },
    ],
  },
  {
    title: "OBSERVATION",
    items: [
      { label: "Veille astronomique", path: "/watch", icon: <Eye size={18} /> },
      {
        label: "Événements célestes",
        path: "/events",
        icon: <CalendarDays size={18} />,
      },
    ],
  },
  {
    title: "PROFIL",
    items: [
      { label: "Mon profil", path: "/profile", icon: <User size={18} /> },
      {
        label: "Progression",
        path: "/progression",
        icon: <TrendingUp size={18} />,
      },
      { label: "Badges", path: "/badges", icon: <Award size={18} /> },
      { label: "Paramètres", path: "/settings", icon: <Settings size={18} /> },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <motion.div
          className={styles.logoIcon}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          🪐
        </motion.div>
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>ASTRO</span>
          <span className={styles.logoSub}>PLAYGROUND</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {navigation.map((section, i) => (
          <div key={i} className={styles.section}>
            {section.title && (
              <span className={styles.sectionTitle}>{section.title}</span>
            )}
            <ul className={styles.navList}>
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={clsx(
                        styles.navItem,
                        isActive && styles.active,
                      )}
                    >
                      {isActive && (
                        <motion.div
                          className={styles.activeIndicator}
                          layoutId="sidebar-active"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className={styles.navIcon}>{item.icon}</span>
                      <span className={styles.navLabel}>{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className={styles.userCard}>
        <div className={styles.userAvatar}>
          <span>🧑‍🚀</span>
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Astronaute</span>
          <span className={styles.userLevel}>Niveau 12</span>
        </div>
        <div className={styles.xpBar}>
          <motion.div
            className={styles.xpFill}
            initial={{ width: 0 }}
            animate={{ width: "62.5%" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          />
        </div>
        <span className={styles.xpText}>1 250 / 2 000 XP</span>
      </div>
    </aside>
  );
}
