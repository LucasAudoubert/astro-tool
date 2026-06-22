import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";
import StarField from "../ui/StarField";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={styles.layout}
      data-sidebar-collapsed={collapsed ? "true" : "false"}
    >
      <StarField />
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
