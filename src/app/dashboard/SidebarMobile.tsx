"use client";

import { useRef } from "react";
import { FiLogOut } from "react-icons/fi";
import { useSidebar } from "./SidebarContext";
import { logout } from "./actions";
import useOutsideClick from "@/hooks/useOutsideClick";
import Nav from "./Nav";

import styles from "./sidebarMobile.module.scss";

const SidebarMobile = () => {
  const { sidebarMobile, setSidebarMobile, tablet } = useSidebar();
  const sidebarRef = useRef(null);

  useOutsideClick(sidebarRef, () => {
    if (!tablet || !sidebarMobile.active) return;
    setSidebarMobile((p) => ({ ...p, animate: true }));
  });

  return (
    <aside
      className={styles.sidebar}
      data-active={sidebarMobile.active || undefined}
      data-animate={sidebarMobile.animate || undefined}
      onAnimationEnd={() => {
        if (sidebarMobile.animate) {
          setSidebarMobile({ animate: false, active: false });
        }
      }}
    >
      <div ref={sidebarRef} className={styles.content}>
        <Nav>
          <form action={logout}>
            <button type="submit">
              <FiLogOut />
              Logout
            </button>
          </form>
        </Nav>
      </div>
    </aside>
  );
};

export default SidebarMobile;
