import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";
import StarField from "../ui/StarField";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <StarField />
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
