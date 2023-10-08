"use client";

import { FaAlignLeft } from "react-icons/fa";
import { useSidebar } from "./SidebarContext";

import styles from "./toggleSidebar.module.scss";

const ToggleSidebar = () => {
  const { tablet, sidebarMobile, setSidebar, setSidebarMobile } = useSidebar();

  const handleToggle = () => {
    if (tablet) {
      if (!sidebarMobile.animate) {
        setSidebarMobile((p) => ({ ...p, active: true }));
      } else {
        setSidebarMobile((p) => ({ ...p, animate: true }));
      }
    } else {
      setSidebar((p) => (p = !p));
    }
  };

  return (
    <button
      className={styles.hamburger}
      aria-label="toggle menu"
      onClick={handleToggle}
    >
      <FaAlignLeft />
    </button>
  );
};

export default ToggleSidebar;
