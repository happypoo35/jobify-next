import { Suspense } from "react";
import { logout } from "./actions";
import { SidebarContextProvider } from "./SidebarContext";
import Logo from "@/components/Logo";
import Sidebar from "./Sidebar";
import SidebarMobile from "./SidebarMobile";
import ToggleSidebar from "./ToggleSidebar";
import LogoutButton from "./LogoutButton";

import styles from "./layout.module.scss";

export const metadata = {
  title: "Dashboard",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.dashboard}>
      <SidebarContextProvider>
        <Sidebar />
        <SidebarMobile />
        <div className={styles.content}>
          <header className={styles.header}>
            <div data-container>
              <Logo className={styles.logo} />
              <ToggleSidebar />
              <h1 data-h3>Dashboard</h1>
              <form action={logout} className={styles.logout}>
                <LogoutButton />
              </form>
            </div>
          </header>
          <main data-container>
            <Suspense>{children}</Suspense>
          </main>
        </div>
      </SidebarContextProvider>
    </div>
  );
};

export default Layout;
