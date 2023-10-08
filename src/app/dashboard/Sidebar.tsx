"use client";

import { useSidebar } from "./SidebarContext";
import Logo from "@/components/Logo";
import Nav from "./Nav";

import styles from "./sidebar.module.scss";

const Sidebar = () => {
  const { sidebar } = useSidebar();

  return (
    <aside className={styles.sidebar} data-active={sidebar || undefined}>
      <div className={styles.content}>
        <header>
          <Logo />
        </header>
        <Nav />
      </div>
    </aside>
  );
};

export default Sidebar;
